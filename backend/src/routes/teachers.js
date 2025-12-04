// routes/teachers.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSchoolAdmin } = require('../middleware/auth');
const Teacher = require('../models/Teacher');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all teachers
const getAllTeachers = async (req, res) => {
  const { schoolId } = req.user;

  try {
    const teachers = await Teacher.find({ schoolId }).sort({ firstName: 1, lastName: 1 });
    res.json(teachers);
  } catch (err) {
    console.error('Error fetching teachers:', err);
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
};

// Add teacher
const addTeacher = async (req, res) => {
  const { schoolId } = req.user;
  const {
    firstName, lastName, email, phone, qualification, subjects,
    joiningDate, address, salary
  } = req.body;

  if (!firstName || !lastName || !email || !subjects) {
    return res.status(400).json({ error: 'First name, last name, email, and subjects are required' });
  }

  const teacherId = `TCH${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;

  try {
    const newTeacher = new Teacher({
      teacherId, firstName, lastName, email, phone, qualification, subjects,
      joiningDate, address, salary, schoolId
    });

    await newTeacher.save();

    // Create user account for teacher
    const teacherPassword = 'teacher123';
    const hashedPassword = bcrypt.hashSync(teacherPassword, 10);

    await User.create({
      email,
      passwordHash: hashedPassword,
      role: 'teacher',
      firstName,
      lastName,
      schoolId,
      isActive: true
    });

    res.status(201).json({
      message: 'Teacher added successfully',
      teacher: {
        id: newTeacher._id,
        teacherId,
        name: `${firstName} ${lastName}`,
        email
      }
    });
  } catch (err) {
    console.error('Error adding teacher:', err);
    res.status(500).json({ error: 'Failed to add teacher' });
  }
};

// Update teacher
const updateTeacher = async (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;
  const updates = req.body;

  const allowedFields = [
    'firstName', 'lastName', 'email', 'phone', 'qualification',
    'subjects', 'joiningDate', 'address', 'salary'
  ];

  const updateData = {};
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      updateData[field] = updates[field];
    }
  });

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  try {
    const teacher = await Teacher.findOneAndUpdate(
      { _id: id, schoolId },
      { $set: updateData },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json({ message: 'Teacher updated successfully' });
  } catch (err) {
    console.error('Error updating teacher:', err);
    res.status(500).json({ error: 'Failed to update teacher' });
  }
};

// Delete teacher
const deleteTeacher = async (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;

  try {
    const teacher = await Teacher.findOneAndDelete({ _id: id, schoolId });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    console.error('Error deleting teacher:', err);
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
};

router.use(authenticateToken);

// School admin only routes
router.post('/', requireSchoolAdmin, addTeacher);
router.put('/:id', requireSchoolAdmin, updateTeacher);
router.delete('/:id', requireSchoolAdmin, deleteTeacher);

// Accessible by school admin and teachers
router.get('/', getAllTeachers);

module.exports = router;