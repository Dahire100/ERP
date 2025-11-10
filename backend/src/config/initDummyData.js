// config/initDummyData.js
const { db } = require('./db');
const bcrypt = require('bcryptjs');

const generateDummyData = () => {
  console.log('📊 Generating dummy data for demo...');

  // Check if dummy data already exists
  db.get(`SELECT COUNT(*) as count FROM students`, (err, result) => {
    if (err || (result && result.count > 0)) {
      console.log('Dummy data already exists, skipping...');
      return;
    }

    // Create a sample approved school
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    const schoolQuery = `
      INSERT OR IGNORE INTO schools (
        schoolName, address, city, state, country, pinCode, contactNumber, email,
        principalName, principalEmail, principalPhone, schoolType, boardType,
        establishmentYear, description, status, adminEmail, adminPassword
      ) VALUES (
        'Frontier Public School', '123 Education Street', 'Cityville', 'State', 'Country', '12345',
        '+1234567890', 'contact@frontier.edu', 'Dr. Principal', 'principal@frontier.edu', 
        '+1234567891', 'Private', 'CBSE', '2000', 'A premier educational institution', 
        'approved', 'admin@frontier.edu', ?
      )
    `;

    db.run(schoolQuery, [hashedPassword], function(err) {
      if (err) {
        console.error('Error creating school:', err);
        return;
      }

      const schoolId = this.lastID;
      console.log(`✅ Created demo school with ID: ${schoolId}`);

      // Create school admin user
      const adminQuery = `
        INSERT OR IGNORE INTO users (email, passwordHash, role, firstName, schoolId, isActive)
        VALUES ('admin@frontier.edu', ?, 'school_admin', 'School', ?, 1)
      `;
      
      db.run(adminQuery, [hashedPassword, schoolId], () => {
        generateDummyStudents(schoolId);
      });
    });
  });
};

const generateDummyStudents = (schoolId) => {
  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const sections = ['A', 'B', 'C'];
  const firstNames = ['Aarav', 'Vihaan', 'Arjun', 'Sai', 'Ishaan', 'Reyansh', 'Aryan', 'Advik', 'Dhruv', 'Kabir', 'Ananya', 'Aadhya', 'Pari', 'Ira', 'Kiara', 'Sara', 'Myra', 'Riya', 'Saanvi', 'Diya'];
  const lastNames = ['Sharma', 'Verma', 'Kumar', 'Singh', 'Patel', 'Reddy', 'Joshi', 'Malhotra', 'Choudhary', 'Gupta'];

  let studentCount = 0;
  const totalStudents = 30; // Reduced for faster setup

  const createNextStudent = (i) => {
    if (i > totalStudents) {
      console.log(`✅ Created ${totalStudents} dummy students`);
      generateDummyTeachers(schoolId);
      return;
    }

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const studentClass = classes[Math.floor(Math.random() * classes.length)];
    const section = sections[Math.floor(Math.random() * sections.length)];
    const randomAdmissionDays = Math.floor(Math.random() * 365);
    const randomAgeDays = 7 * 365 + Math.floor(Math.random() * 5 * 365);

    const query = `
      INSERT INTO students (
        studentId, firstName, lastName, class, section, rollNumber, admissionDate,
        dateOfBirth, gender, address, phone, email, parentName, parentPhone,
        bloodGroup, transportRoute, schoolId
      ) VALUES (
        ?, ?, ?, ?, ?, ?, 
        date('now', '-' || ? || ' days'),
        date('now', '-' || ? || ' days'),
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `;

    const params = [
      `STU${schoolId.toString().padStart(3, '0')}${i.toString().padStart(3, '0')}`,
      firstName, 
      lastName, 
      studentClass, 
      section, 
      i,
      randomAdmissionDays,
      randomAgeDays,
      Math.random() > 0.5 ? 'Male' : 'Female',
      `${Math.floor(Math.random() * 100) + 1} Street, Cityville`,
      '+91' + (9000000000 + Math.floor(Math.random() * 1000000000)),
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.frontier.edu`,
      `Parent of ${firstName}`,
      '+91' + (9000000000 + Math.floor(Math.random() * 1000000000)),
      ['A+', 'B+', 'O+', 'AB+'][Math.floor(Math.random() * 4)],
      ['Route A', 'Route B', 'Route C', 'No Transport'][Math.floor(Math.random() * 4)],
      schoolId
    ];

    db.run(query, params, (err) => {
      if (err) {
        console.error('Error creating student:', err);
      } else {
        studentCount++;
      }
      
      // Create user account for student
      const userQuery = `
        INSERT OR IGNORE INTO users (email, passwordHash, role, firstName, lastName, schoolId, isActive)
        VALUES (?, ?, 'student', ?, ?, ?, 1)
      `;
      
      const studentPassword = bcrypt.hashSync('student123', 10);
      db.run(userQuery, [
        params[11], // email
        studentPassword,
        firstName,
        lastName,
        schoolId
      ]);

      createNextStudent(i + 1);
    });
  };

  createNextStudent(1);
};

const generateDummyTeachers = (schoolId) => {
  const teachers = [
    { firstName: 'Rajesh', lastName: 'Kumar', subjects: 'Mathematics, Physics' },
    { firstName: 'Priya', lastName: 'Sharma', subjects: 'English, Literature' },
    { firstName: 'Amit', lastName: 'Verma', subjects: 'Science, Chemistry' },
    { firstName: 'Sunita', lastName: 'Patel', subjects: 'Social Studies, History' },
    { firstName: 'Anil', lastName: 'Joshi', subjects: 'Computer Science' },
    { firstName: 'Meera', lastName: 'Reddy', subjects: 'Biology, Environmental Science' },
    { firstName: 'Vikram', lastName: 'Singh', subjects: 'Physical Education' },
    { firstName: 'Neha', lastName: 'Gupta', subjects: 'Arts, Music' }
  ];

  let teacherCount = 0;

  const createNextTeacher = (index) => {
    if (index >= teachers.length) {
      console.log(`✅ Created ${teachers.length} dummy teachers`);
      generateDummyFees(schoolId);
      return;
    }

    const teacher = teachers[index];
    const randomDays = Math.floor(Math.random() * 1825); // 5 years in days

    const query = `
      INSERT INTO teachers (
        teacherId, firstName, lastName, email, phone, qualification, subjects,
        joiningDate, address, salary, schoolId
      ) VALUES (
        ?, ?, ?, ?, ?, 'M.Ed, B.Ed', ?,
        date('now', '-' || ? || ' days'),
        ?,
        ?,
        ?
      )
    `;

    const params = [
      `TCH${schoolId.toString().padStart(3, '0')}${(index + 1).toString().padStart(3, '0')}`,
      teacher.firstName,
      teacher.lastName,
      `${teacher.firstName.toLowerCase()}.${teacher.lastName.toLowerCase()}@frontier.edu`,
      '+91' + (9000000000 + Math.floor(Math.random() * 1000000000)),
      teacher.subjects,
      randomDays,
      `${Math.floor(Math.random() * 100) + 1} Teacher Colony, Cityville`,
      40000 + Math.floor(Math.random() * 20000),
      schoolId
    ];

    db.run(query, params, (err) => {
      if (err) {
        console.error('Error creating teacher:', err);
      } else {
        teacherCount++;
        
        // Create user account for teacher
        const userQuery = `
          INSERT OR IGNORE INTO users (email, passwordHash, role, firstName, lastName, schoolId, isActive)
          VALUES (?, ?, 'teacher', ?, ?, ?, 1)
        `;
        
        const teacherPassword = bcrypt.hashSync('teacher123', 10);
        db.run(userQuery, [
          params[3], // email
          teacherPassword,
          teacher.firstName,
          teacher.lastName,
          schoolId
        ]);
      }
      
      createNextTeacher(index + 1);
    });
  };

  createNextTeacher(0);
};

const generateDummyFees = (schoolId) => {
  // Get all student IDs for this school
  db.all(`SELECT id FROM students WHERE schoolId = ?`, [schoolId], (err, students) => {
    if (err || !students || students.length === 0) {
      console.error('Error fetching students for fees:', err);
      console.log('✅ Dummy data generation completed!');
      return;
    }

    const feeTypes = ['Tuition Fee', 'Transport Fee', 'Exam Fee', 'Sports Fee', 'Library Fee'];
    let completedFees = 0;
    const totalFees = students.length * feeTypes.length;

    students.forEach(student => {
      feeTypes.forEach((feeType, index) => {
        const query = `
          INSERT INTO student_fees (
            studentId, feeType, amount, dueDate, status, schoolId
          ) VALUES (
            ?, ?, ?, date('now', '+' || ? || ' months'), ?, ?
          )
        `;

        const params = [
          student.id,
          feeType,
          [1200, 500, 300, 200, 100][index],
          index,
          Math.random() > 0.7 ? 'paid' : 'pending',
          schoolId
        ];

        db.run(query, params, (err) => {
          if (err) {
            console.error('Error creating fee:', err);
          }
          completedFees++;
          
          if (completedFees === totalFees) {
            console.log(`✅ Created ${totalFees} dummy fee records`);
            console.log('🎉 Dummy data generation completed!');
          }
        });
      });
    });
  });
};

module.exports = { generateDummyData };