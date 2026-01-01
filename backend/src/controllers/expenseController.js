// controllers/expenseController.js
const Expense = require('../models/Expense');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { category, status, startDate, endDate } = req.query;

    const query = { schoolId };
    if (category) query.category = category;
    if (status) query.status = status;
    
    if (startDate || endDate) {
      query.expenseDate = {};
      if (startDate) query.expenseDate.$gte = new Date(startDate);
      if (endDate) query.expenseDate.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(query)
      .populate('addedBy', 'firstName lastName')
      .sort({ expenseDate: -1 });

    // Calculate total
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.json({
      success: true,
      data: expenses,
      summary: {
        total,
        count: expenses.length
      }
    });
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch expenses'
    });
  }
};

// Get expense statistics
exports.getExpenseStats = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { year, month } = req.query;

    const currentYear = year || new Date().getFullYear();
    const startDate = new Date(currentYear, month ? month - 1 : 0, 1);
    const endDate = month 
      ? new Date(currentYear, month, 0, 23, 59, 59)
      : new Date(currentYear, 11, 31, 23, 59, 59);

    const expenses = await Expense.find({
      schoolId,
      expenseDate: { $gte: startDate, $lte: endDate },
      status: { $ne: 'cancelled' }
    });

    // Category-wise breakdown
    const categoryBreakdown = expenses.reduce((acc, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = 0;
      }
      acc[exp.category] += exp.amount;
      return acc;
    }, {});

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.json({
      success: true,
      data: {
        total,
        count: expenses.length,
        categoryBreakdown,
        period: { startDate, endDate }
      }
    });
  } catch (err) {
    console.error('Error fetching expense stats:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
};

// Create expense
exports.createExpense = async (req, res) => {
  try {
    const { schoolId, userId } = req.user;
    const { category, title, description, amount, expenseDate, paidTo, paymentMethod, receiptNumber, attachments } = req.body;

    const newExpense = new Expense({
      schoolId,
      category,
      title,
      description,
      amount,
      expenseDate: expenseDate || new Date(),
      paidTo,
      paymentMethod: paymentMethod || 'cash',
      receiptNumber,
      attachments: attachments || [],
      addedBy: userId,
      status: 'paid'
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: 'Expense recorded successfully',
      data: newExpense
    });
  } catch (err) {
    console.error('Error creating expense:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to record expense'
    });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { id } = req.params;

    const expense = await Expense.findOneAndUpdate(
      { _id: id, schoolId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.json({
      success: true,
      message: 'Expense updated successfully',
      data: expense
    });
  } catch (err) {
    console.error('Error updating expense:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update expense'
    });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { id } = req.params;

    const expense = await Expense.findOneAndUpdate(
      { _id: id, schoolId },
      { $set: { status: 'cancelled' } },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.json({
      success: true,
      message: 'Expense cancelled successfully'
    });
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to delete expense'
    });
  }
};
