// controllers/attendanceController.js
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Mark attendance
exports.markAttendance = async (req, res) => {
  const { schoolId } = req.user;
  const { date, class: studentClass, section, attendanceRecords } = req.body;

  if (!date || !studentClass || !section || !attendanceRecords) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Convert date string to Date object for query
    const attendanceDate = new Date(date);
    const startOfDay = new Date(attendanceDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(attendanceDate.setHours(23, 59, 59, 999));

    // Get all student IDs from the records
    const studentIds = attendanceRecords.map(r => r.studentId);

    // Delete existing attendance for these students on this date
    await Attendance.deleteMany({
      schoolId,
      date: { $gte: startOfDay, $lte: endOfDay },
      studentId: { $in: studentIds }
    });

    // Prepare bulk operations
    const bulkOps = attendanceRecords.map(record => ({
      insertOne: {
        document: {
          studentId: record.studentId,
          date: new Date(date),
          status: record.status,
          remarks: record.remarks,
          schoolId,
          class: studentClass,
          section
        }
      }
    }));

    if (bulkOps.length > 0) {
      await Attendance.bulkWrite(bulkOps);
    }

    res.json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error('Error marking attendance:', err);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};

// Get attendance by class and date
exports.getAttendanceByClass = async (req, res) => {
  const { schoolId } = req.user;
  const { class: studentClass, section, date } = req.query;

  if (!studentClass || !date) {
    return res.status(400).json({ error: 'Class and date are required' });
  }

  try {
    const attendanceDate = new Date(date);
    const startOfDay = new Date(attendanceDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(attendanceDate.setHours(23, 59, 59, 999));

    // Get all students in the class
    const query = { schoolId, class: studentClass };
    if (section) query.section = section;

    const students = await Student.find(query).sort({ rollNumber: 1 });

    // Get attendance for these students on the date
    const attendanceRecords = await Attendance.find({
      schoolId,
      date: { $gte: startOfDay, $lte: endOfDay },
      studentId: { $in: students.map(s => s._id) }
    });

    // Map attendance to students
    const result = students.map(student => {
      const record = attendanceRecords.find(a => a.studentId.toString() === student._id.toString());
      return {
        studentId: student._id,
        rollNo: student.studentId, // Using studentId as rollNo based on original code intent
        firstName: student.firstName,
        lastName: student.lastName,
        status: record ? record.status : null,
        remarks: record ? record.remarks : null,
        date: record ? record.date : date
      };
    });

    res.json(result);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};

// Get student attendance summary
exports.getAttendanceSummary = async (req, res) => {
  const { schoolId } = req.user;
  const { studentId, month, year } = req.query;

  if (!studentId || !month || !year) {
    return res.status(400).json({ error: 'Student ID, month, and year are required' });
  }

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const summary = await Attendance.aggregate([
      {
        $match: {
          schoolId: new require('mongoose').Types.ObjectId(schoolId),
          studentId: new require('mongoose').Types.ObjectId(studentId),
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalDays: { $sum: 1 },
          presentDays: {
            $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } // Lowercase 'present' to match enum
          },
          absentDays: {
            $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] }
          },
          lateDays: {
            $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalDays: 1,
          presentDays: 1,
          absentDays: 1,
          lateDays: 1
        }
      }
    ]);

    res.json(summary[0] || { totalDays: 0, presentDays: 0, absentDays: 0, lateDays: 0 });
  } catch (err) {
    console.error('Error fetching attendance summary:', err);
    res.status(500).json({ error: 'Failed to fetch attendance summary' });
  }
};

// Get monthly attendance report
exports.getMonthlyReport = async (req, res) => {
  const { schoolId } = req.user;
  const { class: studentClass, section, month, year } = req.query;

  if (!studentClass || !month || !year) {
    return res.status(400).json({ error: 'Class, month, and year are required' });
  }

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // Get all students in class
    const studentQuery = { schoolId, class: studentClass };
    if (section) studentQuery.section = section;

    const students = await Student.find(studentQuery).sort({ rollNumber: 1 });

    // Get attendance for the month
    const attendance = await Attendance.aggregate([
      {
        $match: {
          schoolId: new require('mongoose').Types.ObjectId(schoolId),
          class: studentClass,
          ...(section && { section }),
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$studentId',
          totalDays: { $sum: 1 },
          presentDays: {
            $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
          },
          absentDays: {
            $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] }
          }
        }
      }
    ]);

    // Merge students with attendance data
    const report = students.map(student => {
      const record = attendance.find(a => a._id.toString() === student._id.toString());
      const totalDays = record ? record.totalDays : 0;
      const presentDays = record ? record.presentDays : 0;
      const absentDays = record ? record.absentDays : 0;

      return {
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        totalDays,
        presentDays,
        absentDays,
        attendancePercentage: totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0
      };
    });

    res.json(report);
  } catch (err) {
    console.error('Error fetching monthly report:', err);
    res.status(500).json({ error: 'Failed to fetch monthly report' });
  }
};