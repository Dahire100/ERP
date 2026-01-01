// controllers/incomeController.js
const Income = require('../models/Income');

// Get all income records
exports.getAllIncome = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { category, startDate, endDate } = req.query;

    const query = { schoolId };
    if (category) query.category = category;
    
    if (startDate || endDate) {
      query.incomeDate = {};
      if (startDate) query.incomeDate.$gte = new Date(startDate);
      if (endDate) query.incomeDate.$lte = new Date(endDate);
    }

    const incomeRecords = await Income.find(query)
      .populate('addedBy', 'firstName lastName')
      .sort({ incomeDate: -1 });

    // Calculate total
    const total = incomeRecords.reduce((sum, inc) => sum + inc.amount, 0);

    res.json({
      success: true,
      data: incomeRecords,
      summary: {
        total,
        count: incomeRecords.length
      }
    });
  } catch (err) {
    console.error('Error fetching income:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch income records'
    });
  }
};

// Get income statistics
exports.getIncomeStats = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { year, month } = req.query;

    const currentYear = year || new Date().getFullYear();
    const startDate = new Date(currentYear, month ? month - 1 : 0, 1);
    const endDate = month 
      ? new Date(currentYear, month, 0, 23, 59, 59)
      : new Date(currentYear, 11, 31, 23, 59, 59);

    const incomeRecords = await Income.find({
      schoolId,
      incomeDate: { $gte: startDate, $lte: endDate }
    });

    // Category-wise breakdown
    const categoryBreakdown = incomeRecords.reduce((acc, inc) => {
      if (!acc[inc.category]) {
        acc[inc.category] = 0;
      }
      acc[inc.category] += inc.amount;
      return acc;
    }, {});

    const total = incomeRecords.reduce((sum, inc) => sum + inc.amount, 0);

    res.json({
      success: true,
      data: {
        total,
        count: incomeRecords.length,
        categoryBreakdown,
        period: { startDate, endDate }
      }
    });
  } catch (err) {
    console.error('Error fetching income stats:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
};

// Create income record
exports.createIncome = async (req, res) => {
  try {
    const { schoolId, userId } = req.user;
    const { category, title, description, amount, incomeDate, receivedFrom, paymentMethod, receiptNumber, attachments } = req.body;

    const newIncome = new Income({
      schoolId,
      category,
      title,
      description,
      amount,
      incomeDate: incomeDate || new Date(),
      receivedFrom,
      paymentMethod: paymentMethod || 'cash',
      receiptNumber,
      attachments: attachments || [],
      addedBy: userId
    });

    await newIncome.save();

    res.status(201).json({
      success: true,
      message: 'Income recorded successfully',
      data: newIncome
    });
  } catch (err) {
    console.error('Error creating income:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to record income'
    });
  }
};

// Update income
exports.updateIncome = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { id } = req.params;

    const income = await Income.findOneAndUpdate(
      { _id: id, schoolId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!income) {
      return res.status(404).json({
        success: false,
        error: 'Income record not found'
      });
    }

    res.json({
      success: true,
      message: 'Income updated successfully',
      data: income
    });
  } catch (err) {
    console.error('Error updating income:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update income'
    });
  }
};

// Delete income
exports.deleteIncome = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { id } = req.params;

    const income = await Income.findOneAndDelete({ _id: id, schoolId });

    if (!income) {
      return res.status(404).json({
        success: false,
        error: 'Income record not found'
      });
    }

    res.json({
      success: true,
      message: 'Income deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to delete income'
    });
  }
};
