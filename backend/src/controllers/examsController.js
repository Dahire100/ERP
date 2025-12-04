// controllers/examsController.js
const Exam = require('../models/Exam');
const ExamResult = require('../models/ExamResult');
const Student = require('../models/Student');

// Get all exams
exports.getAllExams = async (req, res) => {
  const { schoolId } = req.user;
  const { class: studentClass } = req.query;

  try {
    const query = { schoolId };
    if (studentClass) query.class = studentClass;

    const exams = await Exam.find(query).sort({ date: -1 });
    res.json(exams);
  } catch (err) {
    console.error('Error fetching exams:', err);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
};

// Add exam
exports.addExam = async (req, res) => {
  const { schoolId } = req.user;
  const { examName, class: studentClass, subject, examDate, totalMarks, startTime, endTime } = req.body;

  if (!examName || !studentClass || !subject || !examDate || !totalMarks) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newExam = new Exam({
      examName,
      class: studentClass,
      subject,
      date: examDate,
      startTime: startTime || '09:00', // Default if not provided
      endTime: endTime || '12:00', // Default if not provided
      totalMarks,
      schoolId
    });

    await newExam.save();

    res.status(201).json({
      message: 'Exam added successfully',
      examId: newExam._id
    });
  } catch (err) {
    console.error('Error adding exam:', err);
    res.status(500).json({ error: 'Failed to add exam' });
  }
};

// Update exam
exports.updateExam = async (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;
  const updates = req.body;

  const allowedFields = ['examName', 'class', 'subject', 'examDate', 'totalMarks', 'startTime', 'endTime'];
  const updateData = {};

  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      // Map examDate to date for schema
      const schemaField = field === 'examDate' ? 'date' : field;
      updateData[schemaField] = updates[field];
    }
  });

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  try {
    const exam = await Exam.findOneAndUpdate(
      { _id: id, schoolId },
      { $set: updateData },
      { new: true }
    );

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ message: 'Exam updated successfully' });
  } catch (err) {
    console.error('Error updating exam:', err);
    res.status(500).json({ error: 'Failed to update exam' });
  }
};

// Delete exam
exports.deleteExam = async (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;

  try {
    const exam = await Exam.findOneAndDelete({ _id: id, schoolId });
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Also delete associated results
    await ExamResult.deleteMany({ examId: id, schoolId });

    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    console.error('Error deleting exam:', err);
    res.status(500).json({ error: 'Failed to delete exam' });
  }
};

// Add exam result
exports.addResult = async (req, res) => {
  const { schoolId } = req.user;
  const { examId, studentId, marksObtained, grade, remarks } = req.body;

  if (!examId || !studentId || marksObtained === undefined) {
    return res.status(400).json({ error: 'Exam ID, Student ID, and marks are required' });
  }

  try {
    // Verify exam and student belong to the same school
    const exam = await Exam.findOne({ _id: examId, schoolId });
    const student = await Student.findOne({ _id: studentId, schoolId });

    if (!exam || !student) {
      return res.status(400).json({ error: 'Invalid exam or student' });
    }

    // Check if student class matches exam class
    if (exam.class !== student.class) {
      return res.status(400).json({ error: 'Student class does not match exam class' });
    }

    // Update or insert result
    await ExamResult.findOneAndUpdate(
      { examId, studentId, schoolId },
      { marksObtained, grade, remarks },
      { upsert: true, new: true }
    );

    res.json({ message: 'Result added successfully' });
  } catch (err) {
    console.error('Error adding result:', err);
    res.status(500).json({ error: 'Failed to add result' });
  }
};

// Get exam results
exports.getExamResults = async (req, res) => {
  const { schoolId } = req.user;
  const { examId } = req.params;

  try {
    const results = await ExamResult.find({ schoolId, examId })
      .populate('studentId', 'studentId firstName lastName class section rollNumber')
      .populate('examId', 'examName subject totalMarks')
      .sort({ 'studentId.rollNumber': 1 });

    // Transform data to match expected format
    const formattedResults = results.map(r => ({
      ...r.toObject(),
      studentId: r.studentId._id, // Keep original ID field
      firstName: r.studentId.firstName,
      lastName: r.studentId.lastName,
      class: r.studentId.class,
      section: r.studentId.section,
      rollNumber: r.studentId.rollNumber,
      examName: r.examId.examName,
      subject: r.examId.subject,
      totalMarks: r.examId.totalMarks
    }));

    res.json(formattedResults);
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};

// Get student results
exports.getStudentResults = async (req, res) => {
  const { schoolId } = req.user;
  const { studentId } = req.params;

  try {
    const results = await ExamResult.find({ schoolId, studentId })
      .populate('examId', 'examName subject date totalMarks')
      .sort({ 'examId.date': -1 });

    // Transform data
    const formattedResults = results.map(r => ({
      ...r.toObject(),
      examName: r.examId.examName,
      subject: r.examId.subject,
      examDate: r.examId.date,
      totalMarks: r.examId.totalMarks
    }));

    res.json(formattedResults);
  } catch (err) {
    console.error('Error fetching student results:', err);
    res.status(500).json({ error: 'Failed to fetch student results' });
  }
};