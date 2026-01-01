// routes/fees.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireSchoolAdmin } = require('../middleware/auth');
const {
  getAllFees,
  addFee,
  updateFeeStatus,
  deleteFee,
  getFeeSummaryByClass
} = require('../controllers/feesController');

router.use(authenticateToken);

// School admin only routes
router.post('/', requireSchoolAdmin, addFee);
router.put('/:id', requireSchoolAdmin, updateFeeStatus);
router.delete('/:id', requireSchoolAdmin, deleteFee);

// Accessible by school admin and teachers
router.get('/', getAllFees);
router.get('/summary', getFeeSummaryByClass);

module.exports = router;