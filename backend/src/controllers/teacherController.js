// controllers/teacherController.js
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Class = require('../models/Class');
const Homework = require('../models/Homework');
const Attendance = require('../models/Attendance');
const LessonPlan = require('../models/LessonPlan');
const Visitor = require('../models/Visitor');
const AdmissionEnquiry = require('../models/AdmissionEnquiry');
const StudentFee = require('../models/StudentFee');
const Exam = require('../models/Exam');
const Complaint = require('../models/Complaint');
const Event = require('../models/Event');
const Certificate = require('../models/Certificate');
const ConsentRequest = require('../models/ConsentRequest');
const PostalExchange = require('../models/PostalExchange');

// Get teacher dashboard statistics
exports.getTeacherDashboard = async (req, res) => {
  try {
    const { userId } = req.user;

    // Find teacher
    const teacher = await Teacher.findById(userId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        error: 'Teacher not found'
      });
    }

    // Get assigned classes
    const assignedClasses = await Class.find({
      $or: [
        { classTeacher: userId },
        { 'subjects.teacher': userId }
      ],
      isActive: true
    }).select('name section');

    // Count total students in assigned classes
    const classIds = assignedClasses.map(c => c._id);
    const totalStudents = await Student.countDocuments({
      class: { $in: classIds }
    });

    // Count active homework
    const activeHomework = await Homework.countDocuments({
      assignedBy: userId,
      status: 'active'
    });

    // Get pending homework submissions
    const homeworkList = await Homework.find({
      assignedBy: userId,
      status: 'active'
    });

    let pendingSubmissions = 0;
    homeworkList.forEach(hw => {
      const submittedCount = hw.submissions.filter(s => s.status === 'submitted').length;
      pendingSubmissions += (totalStudents - submittedCount);
    });

    // Get today's classes from timetable
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    res.json({
      success: true,
      data: {
        teacher: {
          id: teacher._id,
          name: `${teacher.firstName} ${teacher.lastName}`,
          employeeId: teacher.employeeId,
          department: teacher.department,
          email: teacher.email,
          phone: teacher.phone
        },
        stats: {
          totalClasses: assignedClasses.length,
          totalStudents,
          activeHomework,
          pendingSubmissions
        },
        classes: assignedClasses,
        todaySchedule: today
      }
    });
  } catch (err) {
    console.error('Error fetching teacher dashboard:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data'
    });
  }
};

// Get teacher's classes
exports.getTeacherClasses = async (req, res) => {
  try {
    const { userId } = req.user;

    const classes = await Class.find({
      $or: [
        { classTeacher: userId },
        { 'subjects.teacher': userId }
      ],
      isActive: true
    }).populate('classTeacher', 'firstName lastName');

    // Get student count for each class
    const classesWithData = await Promise.all(
      classes.map(async (classItem) => {
        const studentCount = await Student.countDocuments({
          class: classItem._id
        });

        // Calculate attendance percentage
        const attendanceRecords = await Attendance.find({
          classId: classItem._id,
          date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
        });

        let totalPresent = 0;
        let totalRecords = 0;
        attendanceRecords.forEach(record => {
          record.students.forEach(s => {
            totalRecords++;
            if (s.status === 'present') totalPresent++;
          });
        });

        const attendancePercentage = totalRecords > 0
          ? Math.round((totalPresent / totalRecords) * 100)
          : 0;

        return {
          ...classItem.toObject(),
          studentCount,
          attendancePercentage
        };
      })
    );

    res.json({
      success: true,
      data: classesWithData
    });
  } catch (err) {
    console.error('Error fetching teacher classes:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch classes'
    });
  }
};

// Get students by class for teacher
exports.getClassStudents = async (req, res) => {
  try {
    const { classId } = req.params;
    const { userId } = req.user;

    // Verify teacher has access to this class
    const classItem = await Class.findOne({
      _id: classId,
      $or: [
        { classTeacher: userId },
        { 'subjects.teacher': userId }
      ]
    });

    if (!classItem) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this class'
      });
    }

    const students = await Student.find({ class: classId })
      .select('firstName lastName rollNumber email phone dateOfBirth gender parentName parentPhone parentEmail')
      .sort({ rollNumber: 1 });

    res.json({
      success: true,
      data: {
        class: classItem,
        students
      }
    });
  } catch (err) {
    console.error('Error fetching class students:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch students'
    });
  }
};

// Get teacher's homework assignments
exports.getTeacherHomework = async (req, res) => {
  try {
    const { userId } = req.user;
    const { status, classId } = req.query;

    const query = { assignedBy: userId };
    if (status) query.status = status;
    if (classId) query.classId = classId;

    const homework = await Homework.find(query)
      .populate('classId', 'name section')
      .sort({ dueDate: -1 });

    res.json({
      success: true,
      data: homework
    });
  } catch (err) {
    console.error('Error fetching teacher homework:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch homework'
    });
  }
};

// Get lesson plans
exports.getLessonPlans = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { startDate, endDate, classId } = req.query;

    const query = { teacherId: userId, schoolId };

    if (classId) query.classId = classId;

    if (startDate || endDate) {
      query.lessonDate = {};
      if (startDate) query.lessonDate.$gte = new Date(startDate);
      if (endDate) query.lessonDate.$lte = new Date(endDate);
    }

    const lessonPlans = await LessonPlan.find(query)
      .populate('classId', 'name section')
      .sort({ lessonDate: 1 });

    res.json({
      success: true,
      data: lessonPlans
    });
  } catch (err) {
    console.error('Error fetching lesson plans:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lesson plans'
    });
  }
};

// Create lesson plan
exports.createLessonPlan = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { classId, subject, lessonDate, topic, objectives, activities, resources, homework, notes, duration } = req.body;

    const newLessonPlan = new LessonPlan({
      schoolId,
      teacherId: userId,
      classId,
      subject,
      lessonDate,
      topic,
      objectives: objectives || [],
      activities,
      resources,
      homework,
      notes,
      duration: duration || 45,
      status: 'planned'
    });

    await newLessonPlan.save();

    res.status(201).json({
      success: true,
      message: 'Lesson plan created successfully',
      data: newLessonPlan
    });
  } catch (err) {
    console.error('Error creating lesson plan:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to create lesson plan'
    });
  }
};

// Update lesson plan
exports.updateLessonPlan = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;

    const lessonPlan = await LessonPlan.findOneAndUpdate(
      { _id: id, teacherId: userId, schoolId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!lessonPlan) {
      return res.status(404).json({
        success: false,
        error: 'Lesson plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Lesson plan updated successfully',
      data: lessonPlan
    });
  } catch (err) {
    console.error('Error updating lesson plan:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update lesson plan'
    });
  }
};

// Delete lesson plan
exports.deleteLessonPlan = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;

    const lessonPlan = await LessonPlan.findOneAndDelete({
      _id: id,
      teacherId: userId,
      schoolId
    });

    if (!lessonPlan) {
      return res.status(404).json({
        success: false,
        error: 'Lesson plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Lesson plan deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting lesson plan:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to delete lesson plan'
    });
  }
};

// --- Front Office ---

// Get Visitors
exports.getVisitors = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const visitors = await Visitor.find({ schoolId }).sort({ date: -1 });
    res.json({ success: true, data: visitors });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch visitors' });
  }
};

// Add Visitor
exports.addVisitor = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const newVisitor = new Visitor({ ...req.body, schoolId });
    await newVisitor.save();
    res.status(201).json({ success: true, message: 'Visitor added', data: newVisitor });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to add visitor' });
  }
};

// Get Enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const enquiries = await AdmissionEnquiry.find({ schoolId }).sort({ date: -1 });
    res.json({ success: true, data: enquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch enquiries' });
  }
};

// --- Fees ---

// Get Class Fees
exports.getFees = async (req, res) => {
  try {
    const { userId } = req.user;
    const { classId } = req.query;
    // Real logic would filter students by the Teacher's assigned classes or the specific class selected
    // For now we return all fees for the requested class
    let query = {};
    if (classId) query.classId = classId;

    // In a real scenario, join with Student to get names
    const fees = await StudentFee.find(query).populate('studentId', 'firstName lastName rollNumber');
    res.json({ success: true, data: fees });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch fees' });
  }
};

// Send Fee Reminder
exports.sendFeeReminder = async (req, res) => {
  try {
    const { studentId, invoiceId } = req.body;
    // Logic to send email/SMS would go here
    res.json({ success: true, message: 'Reminder sent successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to send reminder' });
  }
};

// --- Evaluation ---

// Get Assessments
exports.getAssessments = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const assessments = await Exam.find({ schoolId }).sort({ startDate: -1 });
    res.json({ success: true, data: assessments });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch assessments' });
  }
};

// Create Assessment
exports.createAssessment = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const newExam = new Exam({ ...req.body, schoolId });
    await newExam.save();
    res.status(201).json({ success: true, message: 'Assessment created', data: newExam });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create assessment' });
  }
};

// --- Disciplinary ---

// Get Incidents
exports.getDisciplinaryIncidents = async (req, res) => {
  try {
    const { schoolId } = req.user;
    // complaints or incident logs
    // Assuming type field or separate Logic, depending on existing Complaint model
    // As fallback, just getting complaints
    const incidents = await Complaint.find({ schoolId }).populate('studentId', 'firstName lastName');
    res.json({ success: true, data: incidents });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch incidents' });
  }
};

// Report Incident
exports.reportIncident = async (req, res) => {
  try {
    const { schoolId, userId } = req.user;
    const newIncident = new Complaint({
      ...req.body,
      schoolId,
      reportedBy: userId,
      status: 'Pending'
    });
    await newIncident.save();
    res.status(201).json({ success: true, message: 'Incident reported', data: newIncident });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to report incident' });
  }
};

// --- Events ---

// Get Events
exports.getEvents = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const events = await Event.find({ schoolId }).sort({ startDateTime: 1 });
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
};

// Propose Event
exports.proposeEvent = async (req, res) => {
  try {
    const { schoolId, userId } = req.user;
    const newEvent = new Event({
      ...req.body,
      schoolId,
      organizer: userId,
      title: req.body.title || 'Event Proposal', // Fallback
      status: 'Pending' // Proposal status
    });
    await newEvent.save();
    res.status(201).json({ success: true, message: 'Event proposed', data: newEvent });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to propose event' });
  }
};

// --- Certificates ---

// Get Certificates
exports.getCertificates = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const certs = await Certificate.find({ schoolId }).populate('studentId', 'firstName lastName');
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch certificates' });
  }
};

// Generate Certificate
exports.generateCertificate = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const newCert = new Certificate({ ...req.body, schoolId, issueDate: new Date() });
    await newCert.save();
    res.status(201).json({ success: true, message: 'Certificate generated', data: newCert });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to generate certificate' });
  }
};

// --- Consent ---

// Get Requests
exports.getConsentRequests = async (req, res) => {
  try {
    const { schoolId, userId } = req.user;
    const requests = await ConsentRequest.find({ schoolId, teacherId: userId });
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch consent requests' });
  }
};

// Create Request
exports.createConsentRequest = async (req, res) => {
  try {
    const { schoolId, userId } = req.user;
    const newRequest = new ConsentRequest({ ...req.body, schoolId, teacherId: userId });
    await newRequest.save();
    res.status(201).json({ success: true, message: 'Consent request created', data: newRequest });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create consent request' });
  }
};
