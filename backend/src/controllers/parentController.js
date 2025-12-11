// controllers/parentController.js
const Student = require('../models/Student');
const StudentFee = require('../models/StudentFee');
const Homework = require('../models/Homework');
const Attendance = require('../models/Attendance');
const Exam = require('../models/Exam');
const ExamResult = require('../models/ExamResult');
const StudentProgress = require('../models/StudentProgress');
const Notice = require('../models/Notice');

// Get parent dashboard
exports.getParentDashboard = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;

    // Find all children linked to this parent
    const children = await Student.find({
      schoolId,
      $or: [
        { parentEmail: req.user.email },
        { 'parent.email': req.user.email }
      ]
    })
    .populate('class', 'name section')
    .select('firstName lastName rollNumber class admissionDate');

    if (!children || children.length === 0) {
      return res.json({
        success: true,
        data: {
          children: [],
          stats: {
            totalChildren: 0,
            totalPendingFees: 0,
            upcomingExams: 0,
            unreadNotices: 0
          }
        }
      });
    }

    const studentIds = children.map(c => c._id);

    // Get fee statistics
    const pendingFees = await StudentFee.find({
      studentId: { $in: studentIds },
      status: 'pending'
    });
    const totalPendingFees = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);

    // Get upcoming exams
    const upcomingExams = await Exam.countDocuments({
      schoolId,
      examDate: { $gte: new Date() }
    });

    // Get unread notices
    const unreadNotices = await Notice.countDocuments({
      schoolId,
      isActive: true,
      targetAudience: { $in: ['all', 'parents'] },
      publishedDate: { $lte: new Date() }
    });

    // Get detailed info for each child
    const childrenWithDetails = await Promise.all(
      children.map(async (child) => {
        // Get attendance
        const attendanceRecords = await Attendance.find({
          classId: child.class._id,
          'students.studentId': child._id,
          date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });

        let present = 0, absent = 0;
        attendanceRecords.forEach(record => {
          const studentAttendance = record.students.find(
            s => s.studentId.toString() === child._id.toString()
          );
          if (studentAttendance) {
            if (studentAttendance.status === 'present') present++;
            else if (studentAttendance.status === 'absent') absent++;
          }
        });

        const total = present + absent;
        const attendancePercentage = total > 0 ? Math.round((present / total) * 100) : 0;

        // Get pending homework
        const pendingHomework = await Homework.countDocuments({
          classId: child.class._id,
          status: 'active',
          dueDate: { $gte: new Date() },
          'submissions.studentId': { $ne: child._id }
        });

        // Get latest exam results
        const latestResult = await ExamResult.findOne({
          studentId: child._id
        })
        .populate('examId', 'examName')
        .sort({ createdAt: -1 });

        return {
          ...child.toObject(),
          attendance: {
            present,
            absent,
            total,
            percentage: attendancePercentage
          },
          pendingHomework,
          latestResult: latestResult ? {
            examName: latestResult.examId.examName,
            totalMarks: latestResult.totalMarks,
            obtainedMarks: latestResult.obtainedMarks,
            percentage: latestResult.percentage,
            grade: latestResult.grade
          } : null
        };
      })
    );

    res.json({
      success: true,
      data: {
        children: childrenWithDetails,
        stats: {
          totalChildren: children.length,
          totalPendingFees,
          upcomingExams,
          unreadNotices
        }
      }
    });
  } catch (err) {
    console.error('Error fetching parent dashboard:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data'
    });
  }
};

// Get child details
exports.getChildDetails = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { studentId } = req.params;

    const student = await Student.findOne({
      _id: studentId,
      schoolId,
      $or: [
        { parentEmail: req.user.email },
        { 'parent.email': req.user.email }
      ]
    }).populate('class', 'name section');

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found or access denied'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (err) {
    console.error('Error fetching child details:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch child details'
    });
  }
};

// Get child attendance
exports.getChildAttendance = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    // Verify parent has access
    const student = await Student.findOne({
      _id: studentId,
      schoolId,
      $or: [
        { parentEmail: req.user.email },
        { 'parent.email': req.user.email }
      ]
    });

    if (!student) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const query = {
      classId: student.class,
      'students.studentId': studentId
    };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendanceRecords = await Attendance.find(query).sort({ date: -1 });

    const formattedRecords = attendanceRecords.map(record => {
      const studentAttendance = record.students.find(
        s => s.studentId.toString() === studentId
      );
      return {
        date: record.date,
        status: studentAttendance ? studentAttendance.status : 'unknown',
        remarks: studentAttendance ? studentAttendance.remarks : ''
      };
    });

    // Calculate statistics
    const present = formattedRecords.filter(r => r.status === 'present').length;
    const absent = formattedRecords.filter(r => r.status === 'absent').length;
    const total = present + absent;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    res.json({
      success: true,
      data: {
        records: formattedRecords,
        statistics: {
          present,
          absent,
          total,
          percentage
        }
      }
    });
  } catch (err) {
    console.error('Error fetching child attendance:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch attendance'
    });
  }
};

// Get child homework
exports.getChildHomework = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { studentId } = req.params;
    const { status } = req.query;

    // Verify parent has access
    const student = await Student.findOne({
      _id: studentId,
      schoolId,
      $or: [
        { parentEmail: req.user.email },
        { 'parent.email': req.user.email }
      ]
    });

    if (!student) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const query = { classId: student.class, schoolId };
    if (status) query.status = status;

    const homework = await Homework.find(query)
      .populate('assignedBy', 'firstName lastName')
      .sort({ dueDate: -1 });

    // Add submission status for this student
    const homeworkWithStatus = homework.map(hw => {
      const submission = hw.submissions.find(
        s => s.studentId.toString() === studentId
      );
      
      return {
        ...hw.toObject(),
        studentSubmission: submission ? {
          status: submission.status,
          submittedAt: submission.submittedAt,
          marks: submission.marks,
          feedback: submission.feedback
        } : null
      };
    });

    res.json({
      success: true,
      data: homeworkWithStatus
    });
  } catch (err) {
    console.error('Error fetching child homework:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch homework'
    });
  }
};

// Get child exam results
exports.getChildExamResults = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { studentId } = req.params;

    // Verify parent has access
    const student = await Student.findOne({
      _id: studentId,
      schoolId,
      $or: [
        { parentEmail: req.user.email },
        { 'parent.email': req.user.email }
      ]
    });

    if (!student) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const results = await ExamResult.find({ studentId })
      .populate('examId', 'examName examDate class subject totalMarks')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: results
    });
  } catch (err) {
    console.error('Error fetching exam results:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch exam results'
    });
  }
};

// Get child fees
exports.getChildFees = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { studentId } = req.params;

    // Verify parent has access
    const student = await Student.findOne({
      _id: studentId,
      schoolId,
      $or: [
        { parentEmail: req.user.email },
        { 'parent.email': req.user.email }
      ]
    });

    if (!student) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const fees = await StudentFee.find({ studentId })
      .sort({ dueDate: -1 });

    // Calculate totals
    const totalAmount = fees.reduce((sum, fee) => sum + fee.amount, 0);
    const paidAmount = fees
      .filter(f => f.status === 'paid')
      .reduce((sum, fee) => sum + fee.amount, 0);
    const pendingAmount = totalAmount - paidAmount;

    res.json({
      success: true,
      data: {
        fees,
        summary: {
          totalAmount,
          paidAmount,
          pendingAmount,
          totalRecords: fees.length
        }
      }
    });
  } catch (err) {
    console.error('Error fetching child fees:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch fees'
    });
  }
};

// Get child progress report
exports.getChildProgress = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { studentId } = req.params;
    const { academicYear, term } = req.query;

    // Verify parent has access
    const student = await Student.findOne({
      _id: studentId,
      schoolId,
      $or: [
        { parentEmail: req.user.email },
        { 'parent.email': req.user.email }
      ]
    });

    if (!student) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const query = { studentId };
    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;

    const progressReports = await StudentProgress.find(query)
      .sort({ academicYear: -1, term: -1 });

    res.json({
      success: true,
      data: progressReports
    });
  } catch (err) {
    console.error('Error fetching child progress:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch progress report'
    });
  }
};

// Get notices for parents
exports.getParentNotices = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { type } = req.query;

    const query = {
      schoolId,
      isActive: true,
      targetAudience: { $in: ['all', 'parents'] },
      publishedDate: { $lte: new Date() }
    };

    if (type) query.type = type;

    const notices = await Notice.find(query)
      .populate('postedBy', 'firstName lastName')
      .sort({ isPinned: -1, publishedDate: -1 });

    res.json({
      success: true,
      data: notices
    });
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notices'
    });
  }
};
