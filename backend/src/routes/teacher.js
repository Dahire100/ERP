// routes/teacher.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { verifyToken } = require('../middleware/auth');
const { verifyRole } = require('../middleware/roleAuth');

// Dashboard
router.get('/dashboard', verifyToken, verifyRole(['teacher']), teacherController.getTeacherDashboard);

// Classes
router.get('/classes', verifyToken, verifyRole(['teacher']), teacherController.getTeacherClasses);
router.get('/classes/:classId/students', verifyToken, verifyRole(['teacher']), teacherController.getClassStudents);

// Homework
router.get('/homework', verifyToken, verifyRole(['teacher']), teacherController.getTeacherHomework);

// Lesson Plans
router.get('/lesson-plans', verifyToken, verifyRole(['teacher']), teacherController.getLessonPlans);
router.post('/lesson-plans', verifyToken, verifyRole(['teacher']), teacherController.createLessonPlan);
router.put('/lesson-plans/:id', verifyToken, verifyRole(['teacher']), teacherController.updateLessonPlan);
router.delete('/lesson-plans/:id', verifyToken, verifyRole(['teacher']), teacherController.deleteLessonPlan);

module.exports = router;
