// routes/schoolRegistration.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSuperAdmin } = require('../middleware/auth');
const {
  registerSchool,
  approveRegistration,
  rejectRegistration,
  getPendingRegistrations,
  getAllRegistrations
} = require('../controllers/schoolRegistrationController');

// Public route for school registration
router.post('/register', registerSchool);

// Protected routes for super admin
router.use(authenticateToken);
router.use(requireSuperAdmin); // All routes below require super admin

router.get('/pending', getPendingRegistrations);
router.get('/all', getAllRegistrations);
router.post('/approve', approveRegistration);
router.post('/reject', rejectRegistration);

module.exports = router;