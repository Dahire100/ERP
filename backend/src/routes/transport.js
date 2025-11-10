// routes/transport.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSchoolAdmin } = require('../middleware/auth');
const {
  getTransportRoutes,
  addTransportRoute,
  updateTransportRoute,
  deleteTransportRoute,
  getStudentsByRoute
} = require('../controllers/transportController');

router.use(authenticateToken);

// School admin only routes
router.post('/', requireSchoolAdmin, addTransportRoute);
router.put('/:id', requireSchoolAdmin, updateTransportRoute);
router.delete('/:id', requireSchoolAdmin, deleteTransportRoute);

// Accessible by school admin and teachers
router.get('/', getTransportRoutes);
router.get('/route/:route', getStudentsByRoute);

module.exports = router;