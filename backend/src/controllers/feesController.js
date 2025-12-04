// controllers/feesController.js
const StudentFee = require('../models/StudentFee');
const Student = require('../models/Student');

// Get all fees for a school
exports.getAllFees = async (req, res) => {
  const { schoolId } = req.user;
  const { status, studentId } = req.query;

  try {
    const query = { schoolId };
    if (status) query.status = status;

    if (studentId) {
      // If filtering by studentId (which is likely the custom ID string, not ObjectId), 
      // we first need to find the student ObjectId
      const student = await Student.findOne({ studentId, schoolId });
      if (student) {
        query.studentId = student._id;
      } else {
        // If student not found, return empty list
        return res.json([]);
      }
    }

    const fees = await StudentFee.find(query)
      .populate('studentId', 'studentId firstName lastName class section')
      .sort({ dueDate: -1 });

    res.json(fees);
  } catch (err) {
    console.error('Error fetching fees:', err);
    res.status(500).json({ error: 'Failed to fetch fees' });
  }
};

// Add fee record
exports.addFee = async (req, res) => {
  const { schoolId } = req.user;
  const { studentId, feeType, amount, dueDate } = req.body;

  if (!studentId || !feeType || !amount || !dueDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Verify student belongs to the same school
    const student = await Student.findOne({ _id: studentId, schoolId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const newFee = new StudentFee({
      studentId,
      feeType,
      amount,
      dueDate,
      status: 'pending',
      schoolId
    });

    await newFee.save();

    res.status(201).json({
      message: 'Fee record added successfully',
      feeId: newFee._id
    });
  } catch (err) {
    console.error('Error adding fee:', err);
    res.status(500).json({ error: 'Failed to add fee record' });
  }
};

// Update fee payment status
exports.updateFeeStatus = async (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;
  const { status, paidDate, transactionId } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const fee = await StudentFee.findOneAndUpdate(
      { _id: id, schoolId },
      {
        status,
        paidDate: paidDate || (status === 'paid' ? new Date() : undefined),
        transactionId
      },
      { new: true }
    );

    if (!fee) {
      return res.status(404).json({ error: 'Fee record not found' });
    }
    res.json({ message: 'Fee status updated successfully' });
  } catch (err) {
    console.error('Error updating fee:', err);
    res.status(500).json({ error: 'Failed to update fee' });
  }
};

// Delete fee record
exports.deleteFee = async (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;

  try {
    const fee = await StudentFee.findOneAndDelete({ _id: id, schoolId });
    if (!fee) {
      return res.status(404).json({ error: 'Fee record not found' });
    }
    res.json({ message: 'Fee record deleted successfully' });
  } catch (err) {
    console.error('Error deleting fee:', err);
    res.status(500).json({ error: 'Failed to delete fee record' });
  }
};

// Get fee summary by class
exports.getFeeSummaryByClass = async (req, res) => {
  const { schoolId } = req.user;

  try {
    const summary = await StudentFee.aggregate([
      { $match: { schoolId: new require('mongoose').Types.ObjectId(schoolId) } },
      {
        $lookup: {
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: 'student'
        }
      },
      { $unwind: '$student' },
      {
        $group: {
          _id: { class: '$student.class', section: '$student.section' },
          totalFees: { $sum: 1 },
          totalCollected: {
            $sum: {
              $cond: [{ $eq: ['$status', 'paid'] }, '$amount', 0]
            }
          },
          totalPending: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pending'] }, '$amount', 0]
            }
          }
        }
      },
      {
        $project: {
          class: '$_id.class',
          section: '$_id.section',
          totalFees: 1,
          totalCollected: 1,
          totalPending: 1,
          _id: 0
        }
      },
      { $sort: { class: 1, section: 1 } }
    ]);

    res.json(summary);
  } catch (err) {
    console.error('Error fetching fee summary:', err);
    res.status(500).json({ error: 'Failed to fetch fee summary' });
  }
};