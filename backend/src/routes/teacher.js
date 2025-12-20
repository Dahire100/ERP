// routes/teacher.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const { verifyToken } = require('../middleware/auth');
const { verifyRole } = require('../middleware/roleAuth');

// Middleware to ensure restricted access
// All routes require 'teacher' role
router.use(verifyToken, verifyRole(['teacher']));

// Dashboard
router.get('/dashboard', teacherController.getTeacherDashboard);

// Classes
router.get('/classes', teacherController.getTeacherClasses);
router.get('/classes/:classId/students', teacherController.getClassStudents);

// Homework
router.get('/homework', teacherController.getTeacherHomework);

// Lesson Plans
router.get('/lesson-plans', teacherController.getLessonPlans);
router.post('/lesson-plans', teacherController.createLessonPlan);
router.put('/lesson-plans/:id', teacherController.updateLessonPlan);
router.delete('/lesson-plans/:id', teacherController.deleteLessonPlan);

// --- New Modules ---

// Front Office
router.get('/front-office/visitors', teacherController.getVisitors);
router.post('/front-office/visitors', teacherController.addVisitor);
router.get('/front-office/enquiries', teacherController.getEnquiries);

// Fees
router.get('/fees', teacherController.getFees);
router.post('/fees/remind', teacherController.sendFeeReminder);

// Evaluation
router.get('/evaluation/assessments', teacherController.getAssessments);
router.post('/evaluation/assessments', teacherController.createAssessment);

// Disciplinary
router.get('/disciplinary', teacherController.getDisciplinaryIncidents);
router.post('/disciplinary', teacherController.reportIncident);

// Events
router.get('/events', teacherController.getEvents);
router.post('/events/propose', teacherController.proposeEvent);

// Certificates
router.get('/certificates', teacherController.getCertificates);
router.post('/certificates', teacherController.generateCertificate);

// Consent Letters
router.get('/consent', teacherController.getConsentRequests);
router.post('/consent', teacherController.createConsentRequest);

module.exports = router;
