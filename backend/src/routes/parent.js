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

// Timetable
router.get('/child/:studentId/timetable', verifyToken, verifyRole(['parent']), parentController.getChildTimetable);

// Library History
router.get('/child/:studentId/library/history', verifyToken, verifyRole(['parent']), parentController.getChildLibraryHistory);

// Transport
router.get('/child/:studentId/transport', verifyToken, verifyRole(['parent']), parentController.getChildTransport);

// Hostel
router.get('/child/:studentId/hostel', verifyToken, verifyRole(['parent']), parentController.getChildHostel);
router.post('/child/:studentId/hostel/outpass', verifyToken, verifyRole(['parent']), parentController.applyChildOutpass);

// Downloads
router.get('/child/:studentId/downloads', verifyToken, verifyRole(['parent']), parentController.getChildDownloads);

// Leave Application
router.post('/child/:studentId/leave', verifyToken, verifyRole(['parent']), parentController.applyChildLeave);

module.exports = router;
