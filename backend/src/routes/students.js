// routes/students.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSchoolAdmin } = require('../middleware/auth');
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  importStudents,
  getStudentFees,
  getStudentTransport,
  getStudentAttendance
} = require('../controllers/studentController');

// All routes require authentication
router.use(authenticateToken);

// School admin only routes
router.post('/import', requireSchoolAdmin, importStudents);
router.post('/', requireSchoolAdmin, addStudent);
router.put('/:id', requireSchoolAdmin, updateStudent);
router.delete('/:id', requireSchoolAdmin, deleteStudent);

// Routes accessible by school admin, teachers, and students (for their own data)
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.get('/:id/fees', getStudentFees);
router.get('/:id/transport', getStudentTransport);
router.get('/:id/attendance', getStudentAttendance);

module.exports = router;