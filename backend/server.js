// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./src/config/db');
const { generateDummyData } = require('./src/config/initDummyData');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDB();

// Import routes
const authRoutes = require('./src/routes/auth');
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
    message: 'Frontiar ERP Backend is running',
    timestamp: new Date().toISOString(),
    routes: [
      '/api/auth/login',
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

// Generate dummy data after a delay
setTimeout(() => {
  generateDummyData();
}, 2000);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 SQLite database initialized`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👤 Super Admin: superadmin@frontierlms.com / admin123`);
  console.log(`🏫 Demo School Admin: admin@frontier.edu / admin123`);
  console.log('\n📋 Available API Routes:');
  console.log('   POST /api/auth/login');
  console.log('   POST /api/schools/register');
  console.log('   GET  /api/students');
  console.log('   GET  /api/teachers');
  console.log('   GET  /api/fees');
  console.log('   GET  /api/transport');
  console.log('   GET  /api/attendance');
  console.log('   GET  /api/exams');
  console.log('   GET  /api/dashboard');
});