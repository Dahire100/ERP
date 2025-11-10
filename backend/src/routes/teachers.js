// routes/teachers.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSchoolAdmin } = require('../middleware/auth');
const { db } = require('../config/db');

// Get all teachers
const getAllTeachers = (req, res) => {
  const { schoolId } = req.user;

  const query = `SELECT * FROM teachers WHERE schoolId = ? ORDER BY firstName, lastName`;

  db.all(query, [schoolId], (err, teachers) => {
    if (err) {
      console.error('Error fetching teachers:', err);
      return res.status(500).json({ error: 'Failed to fetch teachers' });
    }
    res.json(teachers);
  });
};

// Add teacher
const addTeacher = (req, res) => {
  const { schoolId } = req.user;
  const {
    firstName, lastName, email, phone, qualification, subjects,
    joiningDate, address, salary
  } = req.body;

  if (!firstName || !lastName || !email || !subjects) {
    return res.status(400).json({ error: 'First name, last name, email, and subjects are required' });
  }

  const teacherId = `TCH${schoolId.toString().padStart(3, '0')}${Date.now().toString().slice(-4)}`;

  const query = `
    INSERT INTO teachers (
      teacherId, firstName, lastName, email, phone, qualification, subjects,
      joiningDate, address, salary, schoolId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    teacherId, firstName, lastName, email, phone, qualification, subjects,
    joiningDate, address, salary, schoolId
  ], function(err) {
    if (err) {
      console.error('Error adding teacher:', err);
      return res.status(500).json({ error: 'Failed to add teacher' });
    }

    // Create user account for teacher
    const userQuery = `
      INSERT INTO users (email, passwordHash, role, firstName, lastName, schoolId, isActive)
      VALUES (?, ?, 'teacher', ?, ?, ?, 1)
    `;
    
    const teacherPassword = 'teacher123';
    const hashedPassword = require('bcryptjs').hashSync(teacherPassword, 10);

    db.run(userQuery, [email, hashedPassword, firstName, lastName, schoolId]);

    res.status(201).json({
      message: 'Teacher added successfully',
      teacher: {
        id: this.lastID,
        teacherId,
        name: `${firstName} ${lastName}`,
        email
      }
    });
  });
};

// Update teacher
const updateTeacher = (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;
  const updates = req.body;

  const allowedFields = [
    'firstName', 'lastName', 'email', 'phone', 'qualification', 
    'subjects', 'joiningDate', 'address', 'salary'
  ];

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

  const query = `UPDATE teachers SET ${setClause.join(', ')} WHERE id = ? AND schoolId = ?`;

  db.run(query, values, function(err) {
    if (err) {
      console.error('Error updating teacher:', err);
      return res.status(500).json({ error: 'Failed to update teacher' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json({ message: 'Teacher updated successfully' });
  });
};

// Delete teacher
const deleteTeacher = (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;

  const query = `DELETE FROM teachers WHERE id = ? AND schoolId = ?`;

  db.run(query, [id, schoolId], function(err) {
    if (err) {
      console.error('Error deleting teacher:', err);
      return res.status(500).json({ error: 'Failed to delete teacher' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  });
};

router.use(authenticateToken);

// School admin only routes
router.post('/', requireSchoolAdmin, addTeacher);
router.put('/:id', requireSchoolAdmin, updateTeacher);
router.delete('/:id', requireSchoolAdmin, deleteTeacher);

// Accessible by school admin and teachers
router.get('/', getAllTeachers);

module.exports = router;