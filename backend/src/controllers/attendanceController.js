// controllers/attendanceController.js
const { db } = require('../config/db');

// Mark attendance
exports.markAttendance = (req, res) => {
  const { schoolId } = req.user;
  const { date, class: studentClass, section, attendanceRecords } = req.body;

  if (!date || !studentClass || !section || !attendanceRecords) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Start transaction
  db.serialize(() => {
    // Delete existing attendance for the same date and class
    const deleteQuery = `
      DELETE FROM attendance 
      WHERE date = ? AND schoolId = ? 
      AND studentId IN (SELECT id FROM students WHERE class = ? AND section = ?)
    `;

    db.run(deleteQuery, [date, schoolId, studentClass, section], (err) => {
      if (err) {
        console.error('Error clearing existing attendance:', err);
        return res.status(500).json({ error: 'Failed to mark attendance' });
      }

      // Insert new attendance records
      let completed = 0;
      attendanceRecords.forEach(record => {
        const insertQuery = `
          INSERT INTO attendance (studentId, date, status, remarks, schoolId)
          VALUES (?, ?, ?, ?, ?)
        `;

        db.run(insertQuery, [record.studentId, date, record.status, record.remarks, schoolId], (err) => {
          if (err) {
            console.error('Error marking attendance:', err);
          }
          completed++;

          if (completed === attendanceRecords.length) {
            res.json({ message: 'Attendance marked successfully' });
          }
        });
      });
    });
  });
};

// Get attendance by class and date
exports.getAttendanceByClass = (req, res) => {
  const { schoolId } = req.user;
  const { class: studentClass, section, date } = req.query;

  if (!studentClass || !date) {
    return res.status(400).json({ error: 'Class and date are required' });
  }

  let query = `
    SELECT s.id as studentId, s.studentId as rollNo, s.firstName, s.lastName, 
           a.status, a.remarks, a.date
    FROM students s
    LEFT JOIN attendance a ON s.id = a.studentId AND a.date = ?
    WHERE s.schoolId = ? AND s.class = ?
  `;
  let params = [date, schoolId, studentClass];

  if (section) {
    query += ` AND s.section = ?`;
    params.push(section);
  }

  query += ` ORDER BY s.rollNumber`;

  db.all(query, params, (err, attendance) => {
    if (err) {
      console.error('Error fetching attendance:', err);
      return res.status(500).json({ error: 'Failed to fetch attendance' });
    }
    res.json(attendance);
  });
};

// Get student attendance summary
exports.getAttendanceSummary = (req, res) => {
  const { schoolId } = req.user;
  const { studentId, month, year } = req.query;

  if (!studentId || !month || !year) {
    return res.status(400).json({ error: 'Student ID, month, and year are required' });
  }

  const query = `
    SELECT 
      COUNT(*) as totalDays,
      SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as presentDays,
      SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) as absentDays,
      SUM(CASE WHEN status = 'Late' THEN 1 ELSE 0 END) as lateDays
    FROM attendance 
    WHERE studentId = ? AND schoolId = ? 
    AND strftime('%Y-%m', date) = ?
  `;

  const monthStr = `${year}-${month.toString().padStart(2, '0')}`;

  db.get(query, [studentId, schoolId, monthStr], (err, summary) => {
    if (err) {
      console.error('Error fetching attendance summary:', err);
      return res.status(500).json({ error: 'Failed to fetch attendance summary' });
    }
    res.json(summary || { totalDays: 0, presentDays: 0, absentDays: 0, lateDays: 0 });
  });
};

// Get monthly attendance report
exports.getMonthlyReport = (req, res) => {
  const { schoolId } = req.user;
  const { class: studentClass, section, month, year } = req.query;

  if (!studentClass || !month || !year) {
    return res.status(400).json({ error: 'Class, month, and year are required' });
  }

  const query = `
    SELECT 
      s.studentId, s.firstName, s.lastName,
      COUNT(a.id) as totalDays,
      SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) as presentDays,
      SUM(CASE WHEN a.status = 'Absent' THEN 1 ELSE 0 END) as absentDays,
      ROUND((SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(a.id)), 2) as attendancePercentage
    FROM students s
    LEFT JOIN attendance a ON s.id = a.studentId 
      AND strftime('%Y-%m', a.date) = ?
    WHERE s.schoolId = ? AND s.class = ? ${section ? 'AND s.section = ?' : ''}
    GROUP BY s.id
    ORDER BY s.rollNumber
  `;

  const monthStr = `${year}-${month.toString().padStart(2, '0')}`;
  const params = section ? [monthStr, schoolId, studentClass, section] : [monthStr, schoolId, studentClass];

  db.all(query, params, (err, report) => {
    if (err) {
      console.error('Error fetching monthly report:', err);
      return res.status(500).json({ error: 'Failed to fetch monthly report' });
    }
    res.json(report);
  });
};