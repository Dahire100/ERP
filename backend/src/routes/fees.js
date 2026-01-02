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

const { verifyRole } = require('../middleware/roleAuth');

router.use(authenticateToken);

// School admin only routes
router.post('/', requireSchoolAdmin, addFee);
router.put('/:id', requireSchoolAdmin, updateFeeStatus);
router.delete('/:id', requireSchoolAdmin, deleteFee);

// Accessible by school admin and teachers
router.get('/', verifyRole(['school_admin', 'teacher', 'super_admin']), getAllFees);
router.get('/summary', verifyRole(['school_admin', 'teacher', 'super_admin']), getFeeSummaryByClass);

module.exports = router;