// controllers/leaveController.js
const LeaveRequest = require('../models/LeaveRequest');

// Get all leave requests (admin view)
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { status, requesterType } = req.query;

    const query = { schoolId };
    if (status) query.status = status;
    if (requesterType) query.requesterType = requesterType;

    const leaveRequests = await LeaveRequest.find(query)
      .populate('requesterId', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: leaveRequests
    });
  } catch (err) {
    console.error('Error fetching leave requests:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leave requests'
    });
  }
};

// Get user's leave requests
exports.getMyLeaveRequests = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { status } = req.query;

    const query = {
      schoolId,
      requesterId: userId
    };

    if (status) query.status = status;

    const leaveRequests = await LeaveRequest.find(query)
      .populate('approvedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: leaveRequests
    });
  } catch (err) {
    console.error('Error fetching leave requests:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leave requests'
    });
  }
};

// Create leave request
exports.createLeaveRequest = async (req, res) => {
  try {
    const { userId, schoolId, role } = req.user;
    const { leaveType, startDate, endDate, reason, attachments } = req.body;

    // Calculate total days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const newLeaveRequest = new LeaveRequest({
      schoolId,
      requesterId: userId,
      requesterType: role,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      attachments: attachments || [],
      status: 'pending'
    });

    await newLeaveRequest.save();

    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      data: newLeaveRequest
    });
  } catch (err) {
    console.error('Error creating leave request:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to create leave request'
    });
  }
};

// Update leave request
exports.updateLeaveRequest = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;

    // Only allow update if pending
    const leaveRequest = await LeaveRequest.findOne({
      _id: id,
      requesterId: userId,
      schoolId,
      status: 'pending'
    });

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found or cannot be updated'
      });
    }

    // Recalculate total days if dates changed
    if (req.body.startDate || req.body.endDate) {
      const start = new Date(req.body.startDate || leaveRequest.startDate);
      const end = new Date(req.body.endDate || leaveRequest.endDate);
      req.body.totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }

    Object.assign(leaveRequest, req.body);
    await leaveRequest.save();

    res.json({
      success: true,
      message: 'Leave request updated successfully',
      data: leaveRequest
    });
  } catch (err) {
    console.error('Error updating leave request:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update leave request'
    });
  }
};

// Cancel leave request
exports.cancelLeaveRequest = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;

    const leaveRequest = await LeaveRequest.findOneAndUpdate(
      {
        _id: id,
        requesterId: userId,
        schoolId,
        status: { $in: ['pending', 'approved'] }
      },
      {
        $set: { status: 'cancelled' }
      },
      { new: true }
    );

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found or cannot be cancelled'
      });
    }

    res.json({
      success: true,
      message: 'Leave request cancelled successfully'
    });
  } catch (err) {
    console.error('Error cancelling leave request:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel leave request'
    });
  }
};

// Approve leave request (admin/teacher)
exports.approveLeaveRequest = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;
    const { approvalRemarks } = req.body;

    const leaveRequest = await LeaveRequest.findOneAndUpdate(
      {
        _id: id,
        schoolId,
        status: 'pending'
      },
      {
        $set: {
          status: 'approved',
          approvedBy: userId,
          approvalDate: new Date(),
          approvalRemarks
        }
      },
      { new: true }
    );

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found or already processed'
      });
    }

    res.json({
      success: true,
      message: 'Leave request approved successfully',
      data: leaveRequest
    });
  } catch (err) {
    console.error('Error approving leave request:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to approve leave request'
    });
  }
};

// Reject leave request (admin/teacher)
exports.rejectLeaveRequest = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;
    const { rejectionReason } = req.body;

    const leaveRequest = await LeaveRequest.findOneAndUpdate(
      {
        _id: id,
        schoolId,
        status: 'pending'
      },
      {
        $set: {
          status: 'rejected',
          approvedBy: userId,
          approvalDate: new Date(),
          rejectionReason
        }
      },
      { new: true }
    );

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found or already processed'
      });
    }

    res.json({
      success: true,
      message: 'Leave request rejected',
      data: leaveRequest
    });
  } catch (err) {
    console.error('Error rejecting leave request:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to reject leave request'
    });
  }
};

// Delete leave request
exports.deleteLeaveRequest = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;

    const leaveRequest = await LeaveRequest.findOneAndDelete({
      _id: id,
      requesterId: userId,
      schoolId,
      status: 'pending'
    });

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found or cannot be deleted'
      });
    }

    res.json({
      success: true,
      message: 'Leave request deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting leave request:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to delete leave request'
    });
  }
};
