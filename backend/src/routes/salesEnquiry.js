const express = require('express');
const router = express.Router();
const salesEnquiryController = require('../controllers/salesEnquiryController');

// Public route - No authentication required
router.post('/', salesEnquiryController.createEnquiry);

module.exports = router;
