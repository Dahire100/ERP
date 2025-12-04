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
      '/api/dashboard'
    ]
  });
});

// Seed database after a delay
setTimeout(() => {
  seedDatabase();
}, 2000);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🍃 MongoDB initialized`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log('\n📋 Available API Routes:');
  console.log('   POST /api/otp/send-otp - Send OTP for login');
  console.log('   POST /api/otp/verify-otp - Verify OTP and login');
  console.log('   POST /api/schools/register - Register new school');
  console.log('   GET  /api/students - Get students');
  console.log('   GET  /api/teachers - Get teachers');
  console.log('   GET  /api/fees - Get fees');
  console.log('   GET  /api/transport - Get transport routes');
  console.log('   GET  /api/attendance - Get attendance');
  console.log('   GET  /api/exams - Get exams');
  console.log('   GET  /api/dashboard - Get dashboard data');
  console.log('\n🔐 OTP-based authentication enabled');
});