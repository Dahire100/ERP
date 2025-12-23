// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./src/config/db');
const { seedDatabase } = require('./src/config/seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDB();

// Import routes
const authRoutes = require('./src/routes/auth');
const otpRoutes = require('./src/routes/otp');
const schoolRegistrationRoutes = require('./src/routes/schoolRegistration');
const studentRoutes = require('./src/routes/students');
const teacherRoutes = require('./src/routes/teachers');
const feesRoutes = require('./src/routes/fees');
const transportRoutes = require('./src/routes/transport');
const attendanceRoutes = require('./src/routes/attendance');
const examsRoutes = require('./src/routes/exams');
const dashboardRoutes = require('./src/routes/dashboard');

// Admin portal routes
const classRoutes = require('./src/routes/classes');
const subjectRoutes = require('./src/routes/subjects');
const homeworkRoutes = require('./src/routes/homework');
const noticeRoutes = require('./src/routes/notices');
const expenseRoutes = require('./src/routes/expenses');
const incomeRoutes = require('./src/routes/income');
const timetableRoutes = require('./src/routes/timetable');
const libraryRoutes = require('./src/routes/library');
const hostelRoutes = require('./src/routes/hostel');

// Teacher & Parent portal routes
const teacherPortalRoutes = require('./src/routes/teacher');
const parentPortalRoutes = require('./src/routes/parent');
const communicationRoutes = require('./src/routes/communication');
const onlineClassRoutes = require('./src/routes/onlineClass');
const leaveRoutes = require('./src/routes/leave');
const sectionRoutes = require('./src/routes/sections');
const complaintRoutes = require('./src/routes/complaints');
const admissionEnquiryRoutes = require('./src/routes/admissionEnquiry');
const visitorRoutes = require('./src/routes/visitors');
const phoneCallLogRoutes = require('./src/routes/phoneCallLog');
const postalExchangeRoutes = require('./src/routes/postalExchange');
const frontOfficeSetupRoutes = require('./src/routes/frontOfficeSetup');
const gatePassRoutes = require('./src/routes/gatePass');
const entranceExamRoutes = require('./src/routes/entranceExam');









// Student portal routes
const studentPortalRoutes = require('./src/routes/studentPortal');

// Certificate routes
const certificateRoutes = require('./src/routes/certificates');


// CMS & Subscription routes
const cmsRoutes = require('./src/routes/cms');
const subscriptionRoutes = require('./src/routes/subscription');
const eventRoutes = require('./src/routes/events');

// Super Admin routes
const superAdminRoutes = require('./src/routes/superAdmin');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/schools', schoolRegistrationRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Admin portal routes
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/hostel', hostelRoutes);
app.use('/api/certificates', certificateRoutes);

// Teacher & Parent portal routes
app.use('/api/teacher', teacherPortalRoutes);
app.use('/api/parent', parentPortalRoutes);
app.use('/api/messages', communicationRoutes);
app.use('/api/online-classes', onlineClassRoutes);
app.use('/api/leave-requests', leaveRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admission-enquiry', admissionEnquiryRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/phone-call-log', phoneCallLogRoutes);
app.use('/api/postal-exchange', postalExchangeRoutes);
app.use('/api/front-office-setup', frontOfficeSetupRoutes);
app.use('/api/gate-pass', gatePassRoutes);
app.use('/api/entrance-exam', entranceExamRoutes);
app.use('/api/student-categories', require('./src/routes/studentCategory'));









// Student portal routes
app.use('/api/student', studentPortalRoutes);

// CMS & Subscription routes
app.use('/api/cms', cmsRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/events', eventRoutes);

// Super Admin routes
app.use('/api/super-admin', superAdminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Frontier ERP Backend is running',
    timestamp: new Date().toISOString(),
    routes: [
      '/api/auth/login',
      '/api/otp/send-otp',
      '/api/otp/verify-otp',
      '/api/schools/register',
      '/api/students',
      '/api/teachers',
      '/api/fees',
      '/api/transport',
      '/api/attendance',
      '/api/exams',
      '/api/dashboard',
      '/api/classes',
      '/api/subjects',
      '/api/homework',
      '/api/notices',
      '/api/expenses',
      '/api/income',
      '/api/timetable',
      '/api/library',
      '/api/hostel',
      '/api/teacher',
      '/api/parent',
      '/api/messages',
      '/api/online-classes',
      '/api/leave-requests',
      '/api/leave-requests',
      '/api/student',
      '/api/cms',
      '/api/subscription'
    ]
  });
});

// Seed database after a delay
// Seed database after a delay
// DISABLE SEEDING AS PER REQUEST - Relying on actual registration flow
// setTimeout(() => {
//   seedDatabase();
// }, 2000);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🕒 Started at ${new Date().toISOString()}`);
  console.log(`🍃 MongoDB initialized`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log('\n📋 Core API Routes:');
  console.log('   POST /api/otp/send-otp - Send OTP for login');
  console.log('   POST /api/otp/verify-otp - Verify OTP and login');
  console.log('   POST /api/schools/register - Register new school');
  console.log('   GET  /api/dashboard - Get dashboard data');
  console.log('\n📚 Admin Portal Routes:');
  console.log('   GET  /api/classes - Class management');
  console.log('   GET  /api/subjects - Subject management');
  console.log('   GET  /api/homework - Homework management');
  console.log('   GET  /api/notices - Notice board');
  console.log('   GET  /api/expenses - Expense tracking');
  console.log('   GET  /api/income - Income tracking');
  console.log('   GET  /api/timetable - Timetable management');
  console.log('   GET  /api/library - Library management');
  console.log('   GET  /api/hostel - Hostel management');
  console.log('\n🔐 OTP-based authentication enabled');
});
// Server verified and active