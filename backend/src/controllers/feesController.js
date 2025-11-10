// controllers/feesController.js
const { db } = require('../config/db');

// Get all fees for a school
exports.getAllFees = (req, res) => {
  const { schoolId } = req.user;
  const { status, studentId } = req.query;

  let query = `
    SELECT sf.*, s.studentId, s.firstName, s.lastName, s.class, s.section 
    FROM student_fees sf
    JOIN students s ON sf.studentId = s.id
    WHERE sf.schoolId = ?
  `;
  let params = [schoolId];

  if (status) {
    query += ` AND sf.status = ?`;
    params.push(status);
  }
  if (studentId) {
    query += ` AND s.studentId = ?`;
    params.push(studentId);
  }

  query += ` ORDER BY sf.dueDate DESC`;

  db.all(query, params, (err, fees) => {
    if (err) {
      console.error('Error fetching fees:', err);
      return res.status(500).json({ error: 'Failed to fetch fees' });
    }
    res.json(fees);
  });
};

// Add fee record
exports.addFee = (req, res) => {
  const { schoolId } = req.user;
  const { studentId, feeType, amount, dueDate } = req.body;

  if (!studentId || !feeType || !amount || !dueDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Verify student belongs to the same school
  const verifyQuery = `SELECT id FROM students WHERE id = ? AND schoolId = ?`;
  
  db.get(verifyQuery, [studentId, schoolId], (err, student) => {
    if (err || !student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const insertQuery = `
      INSERT INTO student_fees (studentId, feeType, amount, dueDate, status, schoolId)
      VALUES (?, ?, ?, ?, 'pending', ?)
    `;

    db.run(insertQuery, [studentId, feeType, amount, dueDate, schoolId], function(err) {
      if (err) {
        console.error('Error adding fee:', err);
        return res.status(500).json({ error: 'Failed to add fee record' });
      }

      res.status(201).json({
        message: 'Fee record added successfully',
        feeId: this.lastID
      });
    });
  });
};

// Update fee payment status
exports.updateFeeStatus = (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;
  const { status, paidDate, transactionId } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  const query = `
    UPDATE student_fees 
    SET status = ?, paidDate = ?, transactionId = ?
    WHERE id = ? AND schoolId = ?
  `;

  db.run(query, [status, paidDate, transactionId, id, schoolId], function(err) {
    if (err) {
      console.error('Error updating fee:', err);
      return res.status(500).json({ error: 'Failed to update fee' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Fee record not found' });
    }
    res.json({ message: 'Fee status updated successfully' });
  });
};

// Delete fee record
exports.deleteFee = (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;

  const query = `DELETE FROM student_fees WHERE id = ? AND schoolId = ?`;

  db.run(query, [id, schoolId], function(err) {
    if (err) {
      console.error('Error deleting fee:', err);
      return res.status(500).json({ error: 'Failed to delete fee record' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Fee record not found' });
    }
    res.json({ message: 'Fee record deleted successfully' });
  });
};

// Get fee summary by class
exports.getFeeSummaryByClass = (req, res) => {
  const { schoolId } = req.user;

  const query = `
    SELECT 
      s.class,
      s.section,
      COUNT(sf.id) as totalFees,
      SUM(CASE WHEN sf.status = 'paid' THEN sf.amount ELSE 0 END) as totalCollected,
      SUM(CASE WHEN sf.status = 'pending' THEN sf.amount ELSE 0 END) as totalPending
    FROM students s
    LEFT JOIN student_fees sf ON s.id = sf.studentId
    WHERE s.schoolId = ?
    GROUP BY s.class, s.section
    ORDER BY s.class, s.section
  `;

  db.all(query, [schoolId], (err, summary) => {
    if (err) {
      console.error('Error fetching fee summary:', err);
      return res.status(500).json({ error: 'Failed to fetch fee summary' });
    }
    res.json(summary);
  });
};