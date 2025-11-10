// routes/exams.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSchoolAdmin } = require('../middleware/auth');
const {
  getAllExams,
  addExam,
  updateExam,
  deleteExam,
  addResult,
  getExamResults,
  getStudentResults
} = require('../controllers/examsController');

router.use(authenticateToken);

// School admin only routes
router.post('/', requireSchoolAdmin, addExam);
router.put('/:id', requireSchoolAdmin, updateExam);
router.delete('/:id', requireSchoolAdmin, deleteExam);
router.post('/results', requireSchoolAdmin, addResult);

// Accessible by school admin, teachers, and students
router.get('/', getAllExams);
router.get('/:examId/results', getExamResults);
router.get('/student/:studentId/results', getStudentResults);

module.exports = router;