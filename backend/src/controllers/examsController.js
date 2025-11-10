// controllers/examsController.js
const { db } = require('../config/db');

// Get all exams
exports.getAllExams = (req, res) => {
  const { schoolId } = req.user;
  const { class: studentClass } = req.query;

  let query = `SELECT * FROM exams WHERE schoolId = ?`;
  let params = [schoolId];

  if (studentClass) {
    query += ` AND class = ?`;
    params.push(studentClass);
  }

  query += ` ORDER BY examDate DESC`;

  db.all(query, params, (err, exams) => {
    if (err) {
      console.error('Error fetching exams:', err);
      return res.status(500).json({ error: 'Failed to fetch exams' });
    }
    res.json(exams);
  });
};

// Add exam
exports.addExam = (req, res) => {
  const { schoolId } = req.user;
  const { examName, class: studentClass, subject, examDate, totalMarks } = req.body;

  if (!examName || !studentClass || !subject || !examDate || !totalMarks) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO exams (examName, class, subject, examDate, totalMarks, schoolId)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [examName, studentClass, subject, examDate, totalMarks, schoolId], function(err) {
    if (err) {
      console.error('Error adding exam:', err);
      return res.status(500).json({ error: 'Failed to add exam' });
    }

    res.status(201).json({
      message: 'Exam added successfully',
      examId: this.lastID
    });
  });
};

// Update exam
exports.updateExam = (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;
  const updates = req.body;

  const allowedFields = ['examName', 'class', 'subject', 'examDate', 'totalMarks'];
  const setClause = [];
  const values = [];

  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      setClause.push(`${field} = ?`);
      values.push(updates[field]);
    }
  });

  if (setClause.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  values.push(id, schoolId);

  const query = `UPDATE exams SET ${setClause.join(', ')} WHERE id = ? AND schoolId = ?`;

  db.run(query, values, function(err) {
    if (err) {
      console.error('Error updating exam:', err);
      return res.status(500).json({ error: 'Failed to update exam' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ message: 'Exam updated successfully' });
  });
};

// Delete exam
exports.deleteExam = (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;

  const query = `DELETE FROM exams WHERE id = ? AND schoolId = ?`;

  db.run(query, [id, schoolId], function(err) {
    if (err) {
      console.error('Error deleting exam:', err);
      return res.status(500).json({ error: 'Failed to delete exam' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ message: 'Exam deleted successfully' });
  });
};

// Add exam result
exports.addResult = (req, res) => {
  const { schoolId } = req.user;
  const { examId, studentId, marksObtained, grade, remarks } = req.body;

  if (!examId || !studentId || marksObtained === undefined) {
    return res.status(400).json({ error: 'Exam ID, Student ID, and marks are required' });
  }

  // Verify exam and student belong to the same school
  const verifyQuery = `
    SELECT 1 FROM exams e 
    JOIN students s ON e.class = s.class 
    WHERE e.id = ? AND s.id = ? AND e.schoolId = ? AND s.schoolId = ?
  `;

  db.get(verifyQuery, [examId, studentId, schoolId, schoolId], (err, result) => {
    if (err || !result) {
      return res.status(400).json({ error: 'Invalid exam or student' });
    }

    const insertQuery = `
      INSERT OR REPLACE INTO results (studentId, examId, marksObtained, grade, remarks, schoolId)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(insertQuery, [studentId, examId, marksObtained, grade, remarks, schoolId], function(err) {
      if (err) {
        console.error('Error adding result:', err);
        return res.status(500).json({ error: 'Failed to add result' });
      }

      res.json({ message: 'Result added successfully' });
    });
  });
};

// Get exam results
exports.getExamResults = (req, res) => {
  const { schoolId } = req.user;
  const { examId } = req.params;

  const query = `
    SELECT r.*, s.studentId, s.firstName, s.lastName, s.class, s.section,
           e.examName, e.subject, e.totalMarks
    FROM results r
    JOIN students s ON r.studentId = s.id
    JOIN exams e ON r.examId = e.id
    WHERE r.schoolId = ? AND r.examId = ?
    ORDER BY s.rollNumber
  `;

  db.all(query, [schoolId, examId], (err, results) => {
    if (err) {
      console.error('Error fetching results:', err);
      return res.status(500).json({ error: 'Failed to fetch results' });
    }
    res.json(results);
  });
};

// Get student results
exports.getStudentResults = (req, res) => {
  const { schoolId } = req.user;
  const { studentId } = req.params;

  const query = `
    SELECT r.*, e.examName, e.subject, e.examDate, e.totalMarks
    FROM results r
    JOIN exams e ON r.examId = e.id
    WHERE r.schoolId = ? AND r.studentId = ?
    ORDER BY e.examDate DESC
  `;

  db.all(query, [schoolId, studentId], (err, results) => {
    if (err) {
      console.error('Error fetching student results:', err);
      return res.status(500).json({ error: 'Failed to fetch student results' });
    }
    res.json(results);
  });
};