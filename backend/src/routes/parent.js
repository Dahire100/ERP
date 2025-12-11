// routes/parent.js
const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const { verifyToken } = require('../middleware/auth');
const { verifyRole } = require('../middleware/roleAuth');

// Dashboard
router.get('/dashboard', verifyToken, verifyRole(['parent']), parentController.getParentDashboard);

// Child Information
router.get('/child/:childId', verifyToken, verifyRole(['parent']), parentController.getChildDetails);

// Attendance
router.get('/child/:childId/attendance', verifyToken, verifyRole(['parent']), parentController.getChildAttendance);

// Homework
router.get('/child/:childId/homework', verifyToken, verifyRole(['parent']), parentController.getChildHomework);

// Exam Results
router.get('/child/:childId/results', verifyToken, verifyRole(['parent']), parentController.getChildExamResults);

// Fees
router.get('/child/:childId/fees', verifyToken, verifyRole(['parent']), parentController.getChildFees);

// Progress Reports
router.get('/child/:childId/progress', verifyToken, verifyRole(['parent']), parentController.getChildProgress);

// Notices
router.get('/notices', verifyToken, verifyRole(['parent']), parentController.getParentNotices);

module.exports = router;
