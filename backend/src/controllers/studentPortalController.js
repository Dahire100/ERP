// controllers/studentPortalController.js
const Student = require('../models/Student');
const Class = require('../models/Class');
const Attendance = require('../models/Attendance');
const Homework = require('../models/Homework');
const Assignment = require('../models/Assignment');
const Exam = require('../models/Exam');
const ExamResult = require('../models/ExamResult');
const StudentFee = require('../models/StudentFee');
const Timetable = require('../models/Timetable');
const Notice = require('../models/Notice');
const OnlineClass = require('../models/OnlineClass');
const LeaveRequest = require('../models/LeaveRequest');
const Complaint = require('../models/Complaint');
const Certificate = require('../models/Certificate');
const Event = require('../models/Event');
const Quiz = require('../models/Quiz');
const StudentProgress = require('../models/StudentProgress');
const { IssueRecord } = require('../models/Library');
const TransportRoute = require('../models/TransportRoute');
const { HostelAllocation } = require('../models/Hostel');
const StudentDocument = require('../models/StudentDocument');
const StudyMaterial = require('../models/StudyMaterial');
const HostelOutpass = require('../models/HostelOutpass');

// Get student dashboard
exports.getStudentDashboard = async (req, res) => {
  try {
    const { email, schoolId } = req.user;

    // Get student details
    const student = await Student.findOne({ email, schoolId });

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const userId = student._id;

    // Find the Class ID based on name and section
    const studentClassForId = await Class.findOne({
      schoolId,
      name: student.class,
      section: student.section
    });

    const classId = studentClassForId ? studentClassForId._id : null;

    // Get attendance statistics (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const attendanceRecords = classId ? await Attendance.find({
      schoolId,
      classId: classId,
      date: { $gte: thirtyDaysAgo }
    }) : [];

    const studentAttendance = attendanceRecords.filter(record =>
      record.students.some(s =>
        s.studentId.toString() === userId && s.status === 'present'
      )
    );

    const attendancePercentage = attendanceRecords.length > 0
      ? ((studentAttendance.length / attendanceRecords.length) * 100).toFixed(2)
      : 0;

    // Get pending homework count
    const pendingHomework = classId ? await Homework.countDocuments({
      schoolId,
      classId: classId,
      dueDate: { $gte: new Date() },
      status: 'active',
      'submissions.studentId': { $ne: userId }
    }) : 0;

    // Get pending assignments count
    const pendingAssignments = classId ? await Assignment.countDocuments({
      schoolId,
      classId: classId,
      dueDate: { $gte: new Date() },
      status: 'active',
      'submissions.studentId': { $ne: userId }
    }) : 0;

    // Get upcoming exams
    const upcomingExams = classId ? await Exam.find({
      schoolId,
      classId: classId,
      examDate: { $gte: new Date() }
    }).limit(5).sort({ examDate: 1 }) : [];

    // Get latest exam result
    const latestResult = await ExamResult.findOne({
      schoolId,
      studentId: userId
    })
      .populate('examId', 'name examDate totalMarks')
      .sort({ createdAt: -1 });

    // Get pending fees
    const pendingFees = await StudentFee.aggregate([
      {
        $match: {
          schoolId: student.schoolId,
          studentId: student._id,
          status: { $in: ['pending', 'partial'] }
        }
      },
      {
        $group: {
          _id: null,
          totalPending: { $sum: { $subtract: ['$amount', '$paidAmount'] } }
        }
      }
    ]);

    // Get today's timetable
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayTimetable = classId ? await Timetable.findOne({
      schoolId,
      classId: classId,
      dayOfWeek: today
    }).populate('periods.teacherId', 'firstName lastName') : null;

    // Get unread notices count
    const unreadNotices = await Notice.countDocuments({
      schoolId,
      targetAudience: { $in: ['students', 'all'] },
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Get today's online classes
    const todayOnlineClasses = classId ? await OnlineClass.find({
      schoolId,
      classId: classId,
      scheduledDate: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999)
      },
      status: { $in: ['scheduled', 'ongoing'] }
    }).populate('teacherId', 'firstName lastName') : [];

    res.json({
      success: true,
      data: {
        student: {
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          rollNumber: student.rollNumber,
          class: {
            name: student.class,
            section: student.section
          }
        },
        attendance: {
          percentage: attendancePercentage,
          present: studentAttendance.length,
          total: attendanceRecords.length
        },
        academics: {
          pendingHomework,
          pendingAssignments,
          upcomingExams: upcomingExams.length,
          latestResult: latestResult ? {
            exam: latestResult.examId.name,
            percentage: latestResult.percentage,
            grade: latestResult.grade
          } : null
        },
        fees: {
          pendingAmount: pendingFees.length > 0 ? pendingFees[0].totalPending : 0
        },
        todaySchedule: {
          timetable: todayTimetable,
          onlineClasses: todayOnlineClasses
        },
        notifications: {
          unreadNotices
        }
      }
    });
  } catch (err) {
    console.error('Error fetching student dashboard:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data'
    });
  }
};

// Get student profile
exports.getStudentProfile = async (req, res) => {
  try {
    const { email, schoolId } = req.user;

    const student = await Student.findOne({ email, schoolId })
      .populate('schoolId', 'name address phone email');

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (err) {
    console.error('Error fetching student profile:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    });
  }
};

// Update student profile
exports.updateStudentProfile = async (req, res) => {
  try {
    const { email, schoolId } = req.user;
    const allowedUpdates = ['phone', 'address', 'bloodGroup', 'emergencyContact'];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const student = await Student.findOneAndUpdate(
      { email, schoolId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: student
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
};

// Get student attendance
exports.getStudentAttendance = async (req, res) => {
  try {
    const { email, schoolId } = req.user;
    const { startDate, endDate } = req.query;

    const student = await Student.findOne({ email, schoolId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const userId = student._id;

    // Find the Class ID
    const studentClassForId = await Class.findOne({
      schoolId,
      name: student.class,
      section: student.section
    });

    if (!studentClassForId) {
      return res.json({ success: true, data: { attendance: [], statistics: { totalDays: 0, presentDays: 0, absentDays: 0, percentage: 0 } } });
    }

    const query = {
      schoolId,
      classId: studentClassForId._id
    };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendanceRecords = await Attendance.find(query).sort({ date: -1 });

    const attendanceData = attendanceRecords.map(record => {
      const studentRecord = record.students.find(s =>
        s.studentId.toString() === userId
      );
      return {
        date: record.date,
        status: studentRecord ? studentRecord.status : 'absent',
        remarks: studentRecord ? studentRecord.remarks : ''
      };
    });

    const presentDays = attendanceData.filter(a => a.status === 'present').length;
    const absentDays = attendanceData.filter(a => a.status === 'absent').length;
    const totalDays = attendanceData.length;
    const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        attendance: attendanceData,
        statistics: {
          totalDays,
          presentDays,
          absentDays,
          percentage
        }
      }
    });
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch attendance'
    });
  }
};

// Get student homework
exports.getStudentHomework = async (req, res) => {
  try {
    const { email, schoolId } = req.user;
    const { status } = req.query;

    const student = await Student.findOne({ email, schoolId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const userId = student._id;

    // Find the Class ID
    const studentClassForId = await Class.findOne({
      schoolId,
      name: student.class,
      section: student.section
    });

    if (!studentClassForId) {
      return res.json({ success: true, data: [] });
    }

    const query = {
      schoolId,
      classId: studentClassForId._id
    };

    if (status === 'pending') {
      query.dueDate = { $gte: new Date() };
      query['submissions.studentId'] = { $ne: userId };
    } else if (status === 'submitted') {
      query['submissions.studentId'] = userId;
    }

    const homework = await Homework.find(query)
      .populate('teacherId', 'firstName lastName')
      .sort({ dueDate: -1 });

    const homeworkWithSubmission = homework.map(hw => {
      const submission = hw.submissions.find(s =>
        s.studentId.toString() === userId
      );
      return {
        _id: hw._id,
        title: hw.title,
        subject: hw.subject,
        description: hw.description,
        dueDate: hw.dueDate,
        totalMarks: hw.totalMarks,
        teacher: hw.teacherId,
        submission: submission || null
      };
    });

    res.json({
      success: true,
      data: homeworkWithSubmission
    });
  } catch (err) {
    console.error('Error fetching homework:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch homework'
    });
  }
};

// Submit homework
exports.submitHomework = async (req, res) => {
  try {
    const { email: userEmail, schoolId } = req.user;
    const { homeworkId } = req.params;
    const { fileUrl, content } = req.body;

    // Find student first to get their ID
    const student = await Student.findOne({ email: userEmail, schoolId });
    if (!student) return res.status(404).json({ success: false, error: 'Student profile not found' });
    const studentId = student._id;

    const homework = await Homework.findOne({ _id: homeworkId, schoolId });
    if (!homework) {
      return res.status(404).json({
        success: false,
        error: 'Homework not found'
      });
    }

    // Check if already submitted
    const existingSubmission = homework.submissions.find(s =>
      s.studentId.toString() === studentId.toString()
    );

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        error: 'Homework already submitted'
      });
    }

    homework.submissions.push({
      studentId: studentId,
      submittedAt: new Date(),
      fileUrl,
      content,
      status: 'submitted'
    });

    await homework.save();

    res.json({
      success: true,
      message: 'Homework submitted successfully'
    });
  } catch (err) {
    console.error('Error submitting homework:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to submit homework'
    });
  }
};

// Get student assignments
exports.getStudentAssignments = async (req, res) => {
  try {
    const { email, schoolId } = req.user;
    const { status } = req.query;

    const student = await Student.findOne({ email, schoolId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const userId = student._id;

    // Find the Class ID
    const studentClassForId = await Class.findOne({
      schoolId,
      name: student.class,
      section: student.section
    });

    if (!studentClassForId) {
      return res.json({ success: true, data: [] });
    }

    const query = {
      schoolId,
      classId: studentClassForId._id
    };

    if (status === 'pending') {
      query.dueDate = { $gte: new Date() };
      query['submissions.studentId'] = { $ne: userId };
    } else if (status === 'submitted') {
      query['submissions.studentId'] = userId;
    }

    const assignments = await Assignment.find(query)
      .populate('teacherId', 'firstName lastName')
      .sort({ dueDate: -1 });

    const assignmentsWithSubmission = assignments.map(assignment => {
      const submission = assignment.submissions.find(s =>
        s.studentId.toString() === userId
      );
      return {
        _id: assignment._id,
        title: assignment.title,
        subject: assignment.subject,
        description: assignment.description,
        attachments: assignment.attachments,
        dueDate: assignment.dueDate,
        totalMarks: assignment.totalMarks,
        teacher: assignment.teacherId,
        submission: submission || null
      };
    });

    res.json({
      success: true,
      data: assignmentsWithSubmission
    });
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch assignments'
    });
  }
};

// Submit assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { email: userEmail, schoolId } = req.user;
    const { assignmentId } = req.params;
    const { fileUrl, content } = req.body;

    // Find student first to get their ID
    const student = await Student.findOne({ email: userEmail, schoolId });
    if (!student) return res.status(404).json({ success: false, error: 'Student profile not found' });
    const studentId = student._id;

    const assignment = await Assignment.findOne({ _id: assignmentId, schoolId });
    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    const existingSubmission = assignment.submissions.find(s =>
      s.studentId.toString() === studentId.toString()
    );

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        error: 'Assignment already submitted'
      });
    }

    const isLate = new Date() > assignment.dueDate;

    assignment.submissions.push({
      studentId: studentId,
      submittedAt: new Date(),
      fileUrl,
      content,
      status: isLate ? 'late' : 'submitted'
    });

    await assignment.save();

    res.json({
      success: true,
      message: 'Assignment submitted successfully'
    });
  } catch (err) {
    console.error('Error submitting assignment:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to submit assignment'
    });
  }
};

// Get student exams
exports.getStudentExams = async (req, res) => {
  try {
    const { email, schoolId } = req.user;
    const { status } = req.query;

    const student = await Student.findOne({ email, schoolId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Find the Class ID
    const studentClassForId = await Class.findOne({
      schoolId,
      name: student.class,
      section: student.section
    });

    if (!studentClassForId) {
      return res.json({ success: true, data: [] });
    }

    const query = {
      schoolId,
      classId: studentClassForId._id
    };

    if (status === 'upcoming') {
      query.examDate = { $gte: new Date() };
    } else if (status === 'completed') {
      query.examDate = { $lt: new Date() };
    }

    const exams = await Exam.find(query).sort({ examDate: 1 });

    res.json({
      success: true,
      data: exams
    });
  } catch (err) {
    console.error('Error fetching exams:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch exams'
    });
  }
};

// Get student exam results
exports.getStudentResults = async (req, res) => {
  try {
    const { email: userEmail, schoolId } = req.user;

    const student = await Student.findOne({ email: userEmail, schoolId });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });

    const results = await ExamResult.find({ studentId: student._id, schoolId })
      .populate('examId', 'name examDate totalMarks')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: results
    });
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch results'
    });
  }
};

// Get student fees
exports.getStudentFees = async (req, res) => {
  try {
    const { email: userEmail, schoolId } = req.user;

    const student = await Student.findOne({ email: userEmail, schoolId });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });

    const fees = await StudentFee.find({ studentId: student._id, schoolId })
      .sort({ dueDate: -1 });

    const summary = fees.reduce((acc, fee) => {
      acc.totalAmount += fee.amount;
      acc.paidAmount += fee.paidAmount;
      acc.pendingAmount += (fee.amount - fee.paidAmount);
      return acc;
    }, { totalAmount: 0, paidAmount: 0, pendingAmount: 0 });

    res.json({
      success: true,
      data: {
        fees,
        summary
      }
    });
  } catch (err) {
    console.error('Error fetching fees:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch fees'
    });
  }
};

// Get student timetable
exports.getStudentTimetable = async (req, res) => {
  try {
    const { email, schoolId } = req.user;

    const student = await Student.findOne({ email, schoolId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Find the Class ID
    const studentClassForId = await Class.findOne({
      schoolId,
      name: student.class,
      section: student.section
    });

    if (!studentClassForId) {
      return res.json({ success: true, data: [] });
    }

    const timetable = await Timetable.find({
      schoolId,
      classId: studentClassForId._id
    }).populate('periods.teacherId', 'firstName lastName');

    res.json({
      success: true,
      data: timetable
    });
  } catch (err) {
    console.error('Error fetching timetable:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch timetable'
    });
  }
};

// Get student online classes
exports.getStudentOnlineClasses = async (req, res) => {
  try {
    const { email, schoolId } = req.user;
    const { status } = req.query;

    const student = await Student.findOne({ email, schoolId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Find the Class ID
    const studentClassForId = await Class.findOne({
      schoolId,
      name: student.class,
      section: student.section
    });

    if (!studentClassForId) {
      return res.json({ success: true, data: [] });
    }

    const query = {
      schoolId,
      classId: studentClassForId._id
    };

    if (status) {
      query.status = status;
    }

    const onlineClasses = await OnlineClass.find(query)
      .populate('teacherId', 'firstName lastName')
      .sort({ scheduledDate: -1 });

    res.json({
      success: true,
      data: onlineClasses
    });
  } catch (err) {
    console.error('Error fetching online classes:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch online classes'
    });
  }
};

// Get student leave requests
exports.getStudentLeaveRequests = async (req, res) => {
  try {
    const { email: userEmail, schoolId } = req.user;

    const student = await Student.findOne({ email: userEmail, schoolId });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });

    const leaveRequests = await LeaveRequest.find({
      requesterId: student._id,
      schoolId
    })
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

// Get student progress reports
exports.getStudentProgress = async (req, res) => {
  try {
    const { email: userEmail, schoolId } = req.user;
    const { academicYear, term } = req.query;

    const student = await Student.findOne({ email: userEmail, schoolId });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });

    const query = {
      studentId: student._id,
      schoolId
    };

    if (academicYear) query.academicYear = academicYear;
    if (term) query.term = term;

    const progressReports = await StudentProgress.find(query)
      .sort({ academicYear: -1, term: -1 });

    res.json({
      success: true,
      data: progressReports
    });
  } catch (err) {
    console.error('Error fetching progress reports:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch progress reports'
    });
  }
};

// Get student notices
exports.getStudentNotices = async (req, res) => {
  try {
    const { schoolId } = req.user;

    const notices = await Notice.find({
      schoolId,
      targetAudience: { $in: ['students', 'all'] }
    }).sort({ noticeDate: -1 });

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

// Submit complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { email: userEmail, schoolId } = req.user;
    const { complaintType, subject, description, priority, attachments } = req.body;

    const student = await Student.findOne({ email: userEmail, schoolId });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });

    const complaint = new Complaint({
      schoolId,
      complainantId: student._id,
      complainantType: 'student',
      complaintType,
      subject,
      description,
      priority: priority || 'medium',
      attachments: attachments || []
    });

    await complaint.save();

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      data: complaint
    });
  } catch (err) {
    console.error('Error submitting complaint:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to submit complaint'
    });
  }
};

// Get student complaints
exports.getStudentComplaints = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;

    const complaints = await Complaint.find({
      complainantId: userId,
      schoolId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: complaints
    });
  } catch (err) {
    console.error('Error fetching complaints:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch complaints'
    });
  }
};

// Get student certificates
exports.getStudentCertificates = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;

    const certificates = await Certificate.find({
      studentId: userId,
      schoolId
    }).sort({ issuedDate: -1 });

    res.json({
      success: true,
      data: certificates
    });
  } catch (err) {
    console.error('Error fetching certificates:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch certificates'
    });
  }
};

// Get school events
exports.getSchoolEvents = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { status } = req.query;

    const student = await Student.findOne({ _id: userId, schoolId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const query = {
      schoolId,
      $or: [
        { targetAudience: { $in: ['students', 'all'] } },
        { eligibleClasses: student.classId }
      ]
    };

    if (status) {
      query.status = status;
    }

    const events = await Event.find(query).sort({ eventDate: 1 });

    res.json({
      success: true,
      data: events
    });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events'
    });
  }
};

// Register for event
exports.registerForEvent = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { eventId } = req.params;

    const event = await Event.findOne({ _id: eventId, schoolId });
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    // Check if already registered
    const alreadyRegistered = event.registeredParticipants.some(p =>
      p.participantId.toString() === userId
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        error: 'Already registered for this event'
      });
    }

    // Check max participants
    if (event.maxParticipants && event.registeredParticipants.length >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        error: 'Event is full'
      });
    }

    event.registeredParticipants.push({
      participantId: userId,
      participantType: 'student'
    });

    await event.save();

    res.json({
      success: true,
      message: 'Successfully registered for event'
    });
  } catch (err) {
    console.error('Error registering for event:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to register for event'
    });
  }
};

// Get quizzes
exports.getStudentQuizzes = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { status } = req.query;

    const student = await Student.findOne({ _id: userId, schoolId });
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    const query = {
      schoolId,
      classId: student.classId
    };

    if (status) {
      query.status = status;
    }

    const quizzes = await Quiz.find(query)
      .populate('teacherId', 'firstName lastName')
      .sort({ scheduledDate: -1 });

    const quizzesWithAttempt = quizzes.map(quiz => {
      const attempt = quiz.attempts.find(a =>
        a.studentId.toString() === userId
      );
      return {
        _id: quiz._id,
        title: quiz.title,
        subject: quiz.subject,
        description: quiz.description,
        duration: quiz.duration,
        totalMarks: quiz.totalMarks,
        scheduledDate: quiz.scheduledDate,
        startTime: quiz.startTime,
        endTime: quiz.endTime,
        status: quiz.status,
        teacher: quiz.teacherId,
        attempted: !!attempt,
        score: attempt ? attempt.score : null,
        result: attempt ? attempt.result : null
      };
    });

    res.json({
      success: true,
      data: quizzesWithAttempt
    });
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quizzes'
    });
  }
};

// Start quiz
exports.startQuiz = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { quizId } = req.params;

    const quiz = await Quiz.findOne({ _id: quizId, schoolId });
    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    // Check if already attempted
    const existingAttempt = quiz.attempts.find(a =>
      a.studentId.toString() === userId
    );

    if (existingAttempt) {
      return res.status(400).json({
        success: false,
        error: 'Quiz already attempted'
      });
    }

    // Return questions without correct answers
    const questionsForStudent = quiz.questions.map((q, index) => ({
      questionIndex: index,
      question: q.question,
      options: q.options,
      marks: q.marks
    }));

    res.json({
      success: true,
      data: {
        quizId: quiz._id,
        title: quiz.title,
        duration: quiz.duration,
        totalMarks: quiz.totalMarks,
        questions: questionsForStudent
      }
    });
  } catch (err) {
    console.error('Error starting quiz:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to start quiz'
    });
  }
};

// Submit quiz
exports.submitQuiz = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { quizId } = req.params;
    const { answers } = req.body; // Array of { questionIndex, answer }

    const quiz = await Quiz.findOne({ _id: quizId, schoolId });
    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    // Calculate score
    let score = 0;
    answers.forEach(ans => {
      const question = quiz.questions[ans.questionIndex];
      if (question && question.correctAnswer === ans.answer) {
        score += question.marks;
      }
    });

    const percentage = ((score / quiz.totalMarks) * 100).toFixed(2);
    const result = score >= quiz.passingMarks ? 'pass' : 'fail';

    quiz.attempts.push({
      studentId: userId,
      startedAt: new Date(),
      submittedAt: new Date(),
      answers,
      score,
      percentage,
      result
    });

    await quiz.save();

    res.json({
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        score,
        percentage,
        result
      }
    });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to submit quiz'
    });
  }
};

// ===== NEW FEATURES =====

// Get library history
exports.getLibraryHistory = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const records = await IssueRecord.find({ schoolId, 'issuedTo.userId': userId })
      .populate('bookId', 'title author')
      .sort({ issueDate: -1 });
    res.json({ success: true, data: records });
  } catch (err) {
    console.error('Error fetching library history:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch library history' });
  }
};

// Get transport details
exports.getTransportDetails = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const student = await Student.findOne({ _id: userId, schoolId });
    if (!student || !student.transportRoute) {
      return res.json({ success: true, data: null });
    }
    // Assuming transportRoute in student stores the route name
    const route = await TransportRoute.findOne({
      schoolId,
      routeName: student.transportRoute
    });
    res.json({ success: true, data: route });
  } catch (err) {
    console.error('Error fetching transport details:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch transport details' });
  }
};

// Get hostel details
exports.getHostelDetails = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const allocation = await HostelAllocation.findOne({
      schoolId,
      studentId: userId,
      status: 'active'
    })
      .populate('hostelId')
      .populate('roomId');

    res.json({ success: true, data: allocation });
  } catch (err) {
    console.error('Error fetching hostel details:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch hostel details' });
  }
};

// Get student documents
exports.getStudentDocuments = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const docs = await StudentDocument.find({ schoolId, studentId: userId }).sort({ uploadedAt: -1 });
    res.json({ success: true, data: docs });
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch documents' });
  }
};

// Upload student document
exports.uploadStudentDocument = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { title, type, description, fileUrl } = req.body;
    const newDoc = new StudentDocument({
      schoolId,
      studentId: userId,
      title,
      type,
      description,
      fileUrl
    });
    await newDoc.save();
    res.status(201).json({ success: true, message: 'Document uploaded', data: newDoc });
  } catch (err) {
    console.error('Error uploading document:', err);
    res.status(500).json({ success: false, error: 'Failed to upload document' });
  }
};

// Get download center materials
exports.getDownloads = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const student = await Student.findOne({ _id: userId, schoolId });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Match logic: materials with no specific class (all) OR materials for student's class
    // student.class might be an ID if populated, or we need to handle it.
    // Assuming student.class matches the reference in StudyMaterial.classes
    const classId = student.class && student.class._id ? student.class._id : student.class;

    const materials = await StudyMaterial.find({
      schoolId,
      isActive: true,
      $or: [
        { classes: { $size: 0 } }, // For all classes
        { classes: classId }
      ]
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: materials });
  } catch (err) {
    console.error('Error fetching downloads:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch downloads' });
  }
};

// Apply for hostel outpass
exports.applyOutpass = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { fromDate, toDate, reason, parentContact } = req.body;

    const allocation = await HostelAllocation.findOne({
      schoolId,
      studentId: userId,
      status: 'active'
    });

    if (!allocation) {
      return res.status(400).json({
        success: false,
        error: 'You are not allocated to any hostel'
      });
    }

    const newOutpass = new HostelOutpass({
      schoolId,
      studentId: userId,
      hostelId: allocation.hostelId,
      fromDate,
      toDate,
      reason,
      parentContact,
      status: 'pending'
    });

    await newOutpass.save();
    res.status(201).json({ success: true, message: 'Outpass requested successfully' });
  } catch (err) {
    console.error('Error applying outpass:', err);
    res.status(500).json({ success: false, error: 'Failed to apply outpass' });
  }
};

// Get outpass history
exports.getOutpassHistory = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const outpasses = await HostelOutpass.find({ schoolId, studentId: userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: outpasses });
  } catch (err) {
    console.error('Error fetching outpass history:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch outpass history' });
  }
};

module.exports = exports;
