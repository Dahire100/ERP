// controllers/studentController.js
const Student = require('../models/Student');
const User = require('../models/User');
const StudentFee = require('../models/StudentFee');
const bcrypt = require('bcryptjs');

// Generate unique student ID
const generateStudentId = (schoolId) => {
  const timestamp = Date.now().toString().slice(-6);
  // Assuming schoolId is an ObjectId, we can use a substring or just the timestamp
  // For uniqueness, maybe append a random number or use a counter
  return `STU${timestamp}${Math.floor(Math.random() * 1000)}`;
};

// Get all students for a school
exports.getAllStudents = async (req, res) => {
  const { schoolId } = req.user;
  const { class: studentClass, section } = req.query;

  try {
    const query = { schoolId };
    if (studentClass) query.class = studentClass;
    if (section) query.section = section;

    const students = await Student.find(query).sort({ class: 1, rollNumber: 1 });
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;

  try {
    const student = await Student.findOne({ _id: id, schoolId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
};

// Add new student
exports.addStudent = async (req, res) => {
  const { schoolId } = req.user;
  const {
    firstName, lastName, class: studentClass, section, rollNumber,
    dateOfBirth, gender, address, phone, email, parentName, parentPhone,
    bloodGroup, transportRoute
  } = req.body;

  const studentId = generateStudentId(schoolId);
  const admissionDate = new Date();

  try {
    const newStudent = new Student({
      studentId, firstName, lastName, class: studentClass, section, rollNumber,
      admissionDate, dateOfBirth, gender, address, phone, email,
      parentName, parentPhone, bloodGroup, transportRoute, schoolId
    });

    await newStudent.save();

    // Create user account for student
    const studentPassword = 'student123'; // Default password
    const hashedPassword = bcrypt.hashSync(studentPassword, 10);

    await User.create({
      email,
      passwordHash: hashedPassword,
      role: 'student',
      firstName,
      lastName,
      schoolId,
      isActive: true
    });

    res.status(201).json({
      message: 'Student added successfully',
      student: {
        id: newStudent._id,
        studentId,
        name: `${firstName} ${lastName}`,
        class: studentClass,
        section
      }
    });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ error: 'Failed to add student' });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;
  const updates = req.body;

  const allowedFields = [
    'firstName', 'lastName', 'class', 'section', 'rollNumber', 'dateOfBirth',
    'gender', 'address', 'phone', 'email', 'parentName', 'parentPhone',
    'bloodGroup', 'transportRoute'
  ];

  const updateData = {};
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      updateData[field] = updates[field];
    }
  });

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  try {
    const student = await Student.findOneAndUpdate(
      { _id: id, schoolId },
      { $set: updateData },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ error: 'Failed to update student' });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;

  try {
    const student = await Student.findOneAndDelete({ _id: id, schoolId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ error: 'Failed to delete student' });
  }
};

// Get student fees
exports.getStudentFees = async (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;

  try {
    // Verify student belongs to school
    const student = await Student.findOne({ _id: id, schoolId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const fees = await StudentFee.find({ studentId: id, schoolId }).sort({ dueDate: -1 });
    res.json(fees);
  } catch (err) {
    console.error('Error fetching fees:', err);
    res.status(500).json({ error: 'Failed to fetch fee details' });
  }
};

// Get student transport details
exports.getStudentTransport = async (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;

  try {
    const student = await Student.findOne({ _id: id, schoolId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Assuming TransportRoute model exists or just returning route name
    // For now, returning basic info as per schema
    res.json({ transportRoute: student.transportRoute });
  } catch (err) {
    console.error('Error fetching transport:', err);
    res.status(500).json({ error: 'Failed to fetch transport details' });
  }
};

// Get student attendance
exports.getStudentAttendance = async (req, res) => {
  const { id } = req.params;
  const { month, year } = req.query;
  const { schoolId } = req.user;

  try {
    // Placeholder for Attendance model
    // const query = { studentId: id, schoolId };
    // if (month && year) {
    //   // Date filtering logic
    // }
    // const attendance = await Attendance.find(query).sort({ date: -1 }).limit(30);

    res.json([]); // Returning empty array until Attendance model is implemented
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};