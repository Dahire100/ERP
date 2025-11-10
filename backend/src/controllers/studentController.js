// controllers/studentController.js
const { db } = require('../config/db');

// Generate unique student ID
const generateStudentId = (schoolId) => {
  const timestamp = Date.now().toString().slice(-6);
  return `STU${schoolId.toString().padStart(3, '0')}${timestamp}`;
};

// Get all students for a school
exports.getAllStudents = (req, res) => {
  const { schoolId } = req.user;
  const { class: studentClass, section } = req.query;

  let query = `SELECT * FROM students WHERE schoolId = ?`;
  let params = [schoolId];

  if (studentClass) {
    query += ` AND class = ?`;
    params.push(studentClass);
  }
  if (section) {
    query += ` AND section = ?`;
    params.push(section);
  }

  query += ` ORDER BY class, rollNumber`;

  db.all(query, params, (err, students) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(students);
  });
};

// Get student by ID
exports.getStudentById = (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;

  const query = `SELECT * FROM students WHERE id = ? AND schoolId = ?`;
  
  db.get(query, [id, schoolId], (err, student) => {
    if (err) {
      console.error('Error fetching student:', err);
      return res.status(500).json({ error: 'Failed to fetch student' });
    }
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  });
};

// Add new student
exports.addStudent = (req, res) => {
  const { schoolId } = req.user;
  const {
    firstName, lastName, class: studentClass, section, rollNumber,
    dateOfBirth, gender, address, phone, email, parentName, parentPhone,
    bloodGroup, transportRoute
  } = req.body;

  const studentId = generateStudentId(schoolId);
  const admissionDate = new Date().toISOString().split('T')[0];

  const query = `
    INSERT INTO students (
      studentId, firstName, lastName, class, section, rollNumber,
      admissionDate, dateOfBirth, gender, address, phone, email,
      parentName, parentPhone, bloodGroup, transportRoute, schoolId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    studentId, firstName, lastName, studentClass, section, rollNumber,
    admissionDate, dateOfBirth, gender, address, phone, email,
    parentName, parentPhone, bloodGroup, transportRoute, schoolId
  ], function(err) {
    if (err) {
      console.error('Error adding student:', err);
      return res.status(500).json({ error: 'Failed to add student' });
    }

    // Create user account for student
    const userQuery = `
      INSERT INTO users (email, passwordHash, role, firstName, lastName, schoolId, isActive)
      VALUES (?, ?, 'student', ?, ?, ?, 1)
    `;
    
    const studentPassword = 'student123'; // Default password
    const hashedPassword = require('bcryptjs').hashSync(studentPassword, 10);

    db.run(userQuery, [email, hashedPassword, firstName, lastName, schoolId]);

    res.status(201).json({
      message: 'Student added successfully',
      student: {
        id: this.lastID,
        studentId,
        name: `${firstName} ${lastName}`,
        class: studentClass,
        section
      }
    });
  });
};

// Update student
exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;
  const updates = req.body;

  const allowedFields = [
    'firstName', 'lastName', 'class', 'section', 'rollNumber', 'dateOfBirth',
    'gender', 'address', 'phone', 'email', 'parentName', 'parentPhone',
    'bloodGroup', 'transportRoute'
  ];

  const setClause = [];
  const values = [];

  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      setClause.push(`${field} = ?`);
      values.push(updates[field]);
    }
  });

  if (setClause.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  values.push(id, schoolId);

  const query = `UPDATE students SET ${setClause.join(', ')} WHERE id = ? AND schoolId = ?`;

  db.run(query, values, function(err) {
    if (err) {
      console.error('Error updating student:', err);
      return res.status(500).json({ error: 'Failed to update student' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student updated successfully' });
  });
};

// Delete student
exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;

  const query = `DELETE FROM students WHERE id = ? AND schoolId = ?`;

  db.run(query, [id, schoolId], function(err) {
    if (err) {
      console.error('Error deleting student:', err);
      return res.status(500).json({ error: 'Failed to delete student' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  });
};

// Get student fees
exports.getStudentFees = (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;

  const query = `
    SELECT sf.* FROM student_fees sf
    JOIN students s ON sf.studentId = s.id
    WHERE s.id = ? AND s.schoolId = ?
    ORDER BY sf.dueDate DESC
  `;

  db.all(query, [id, schoolId], (err, fees) => {
    if (err) {
      console.error('Error fetching fees:', err);
      return res.status(500).json({ error: 'Failed to fetch fee details' });
    }
    res.json(fees);
  });
};

// Get student transport details
exports.getStudentTransport = (req, res) => {
  const { id } = req.params;
  const { schoolId } = req.user;

  const query = `
    SELECT s.transportRoute, tr.* FROM students s
    LEFT JOIN transport_routes tr ON s.transportRoute = tr.routeName
    WHERE s.id = ? AND s.schoolId = ?
  `;

  db.get(query, [id, schoolId], (err, transport) => {
    if (err) {
      console.error('Error fetching transport:', err);
      return res.status(500).json({ error: 'Failed to fetch transport details' });
    }
    res.json(transport || {});
  });
};

// Get student attendance
exports.getStudentAttendance = (req, res) => {
  const { id } = req.params;
  const { month, year } = req.query;
  const { schoolId } = req.user;

  let query = `SELECT * FROM attendance WHERE studentId = ? AND schoolId = ?`;
  let params = [id, schoolId];

  if (month && year) {
    query += ` AND strftime('%Y-%m', date) = ?`;
    params.push(`${year}-${month.toString().padStart(2, '0')}`);
  }

  query += ` ORDER BY date DESC LIMIT 30`;

  db.all(query, params, (err, attendance) => {
    if (err) {
      console.error('Error fetching attendance:', err);
      return res.status(500).json({ error: 'Failed to fetch attendance' });
    }
    res.json(attendance);
  });
};