// routes/disciplinary.js
const express = require('express');
const router = express.Router();
const disciplinaryController = require('../controllers/disciplinaryController');
const { authenticateToken } = require('../middleware/auth');

// Create incident
router.post('/', authenticateToken, disciplinaryController.createIncident);

// Get all incidents
router.get('/', authenticateToken, disciplinaryController.getIncidents);

// Get incident statistics (before :id route)
router.get('/stats/summary', authenticateToken, disciplinaryController.getIncidentStats);

// Get incidents by student (before :id route)
router.get('/student/:studentId', authenticateToken, disciplinaryController.getIncidentsByStudent);

// Get incident by ID
router.get('/:id', authenticateToken, disciplinaryController.getIncidentById);

// Update incident
router.put('/:id', authenticateToken, disciplinaryController.updateIncident);

// Delete incident
router.delete('/:id', authenticateToken, disciplinaryController.deleteIncident);

module.exports = router;
