// controllers/subjectController.js
const Subject = require('../models/Subject');

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const { schoolId } = req.user;

    const subjects = await Subject.find({ schoolId, isActive: true })
      .populate('classes', 'name section')
      .sort({ name: 1 });

    res.json({
      success: true,
      data: subjects
    });
  } catch (err) {
    console.error('Error fetching subjects:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subjects'
    });
  }
};

// Create subject
exports.createSubject = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { name, code, description, type, classes } = req.body;

    // Check if subject code already exists
    const existingSubject = await Subject.findOne({ schoolId, code });
    if (existingSubject) {
      return res.status(400).json({
        success: false,
        error: 'Subject code already exists'
      });
    }

    const newSubject = new Subject({
      schoolId,
      name,
      code,
      description,
      type: type || 'theory',
      classes: classes || []
    });

    await newSubject.save();

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: newSubject
    });
  } catch (err) {
    console.error('Error creating subject:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to create subject'
    });
  }
};

// Update subject
exports.updateSubject = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { id } = req.params;

    const subject = await Subject.findOneAndUpdate(
      { _id: id, schoolId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        error: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject updated successfully',
      data: subject
    });
  } catch (err) {
    console.error('Error updating subject:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update subject'
    });
  }
};

// Delete subject
exports.deleteSubject = async (req, res) => {
  try {
    const { schoolId } = req.user;
    const { id } = req.params;

    const subject = await Subject.findOneAndUpdate(
      { _id: id, schoolId },
      { $set: { isActive: false } },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        error: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting subject:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to delete subject'
    });
  }
};
