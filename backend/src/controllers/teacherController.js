// controllers/teacherController.js
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Class = require('../models/Class');
const Homework = require('../models/Homework');
const Attendance = require('../models/Attendance');
const LessonPlan = require('../models/LessonPlan');

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
