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

const { verifyRole } = require('../middleware/roleAuth');

// All routes require authentication
router.use(authenticateToken);

// School admin only routes
router.post('/import', requireSchoolAdmin, importStudents);
router.post('/', requireSchoolAdmin, addStudent);
router.put('/:id', requireSchoolAdmin, updateStudent);
router.delete('/:id', requireSchoolAdmin, deleteStudent);

// Routes accessible by school admin and teachers (students use studentPortal routes)
router.get('/', verifyRole(['school_admin', 'teacher', 'super_admin']), getAllStudents);
router.get('/:id', verifyRole(['school_admin', 'teacher', 'super_admin']), getStudentById);
router.get('/:id/fees', verifyRole(['school_admin', 'teacher', 'super_admin']), getStudentFees);
router.get('/:id/transport', verifyRole(['school_admin', 'teacher', 'super_admin']), getStudentTransport);
router.get('/:id/attendance', verifyRole(['school_admin', 'teacher', 'super_admin']), getStudentAttendance);

module.exports = router;