// controllers/dashboardController.js
const { db } = require('../config/db');

// Get dashboard stats for school admin
exports.getSchoolAdminStats = (req, res) => {
  const { schoolId } = req.user;

  const queries = {
    totalStudents: `SELECT COUNT(*) as count FROM students WHERE schoolId = ?`,
    totalTeachers: `SELECT COUNT(*) as count FROM teachers WHERE schoolId = ?`,
    pendingFees: `SELECT COUNT(*) as count FROM student_fees WHERE schoolId = ? AND status = 'pending'`,
    totalRevenue: `SELECT COALESCE(SUM(amount), 0) as total FROM student_fees WHERE schoolId = ? AND status = 'paid' AND strftime('%Y-%m', paidDate) = strftime('%Y-%m', 'now')`
  };

  const stats = {};
  let completedQueries = 0;

  Object.keys(queries).forEach(key => {
    db.get(queries[key], [schoolId], (err, result) => {
      if (err) {
        console.error(`Error fetching ${key}:`, err);
        stats[key] = key === 'totalRevenue' ? 0 : 0;
      } else {
        stats[key] = key === 'totalRevenue' ? result.total : result.count;
      }

      completedQueries++;
      if (completedQueries === Object.keys(queries).length) {
        res.json(stats);
      }
    });
  });
};

// Get recent students
exports.getRecentStudents = (req, res) => {
  const { schoolId } = req.user;
  const limit = parseInt(req.query.limit) || 5;

  const query = `
    SELECT studentId, firstName, lastName, class, section, admissionDate 
    FROM students 
    WHERE schoolId = ? 
    ORDER BY admissionDate DESC 
    LIMIT ?
  `;

  db.all(query, [schoolId, limit], (err, students) => {
    if (err) {
      console.error('Error fetching recent students:', err);
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(students);
  });
};

// Get fee summary
exports.getFeeSummary = (req, res) => {
  const { schoolId } = req.user;

  const query = `
    SELECT 
      status,
      COUNT(*) as count,
      COALESCE(SUM(amount), 0) as total_amount
    FROM student_fees 
    WHERE schoolId = ? 
    GROUP BY status
  `;

  db.all(query, [schoolId], (err, feeSummary) => {
    if (err) {
      console.error('Error fetching fee summary:', err);
      return res.status(500).json({ error: 'Failed to fetch fee summary' });
    }
    res.json(feeSummary);
  });
};

// Get super admin dashboard stats
exports.getSuperAdminStats = (req, res) => {
  const queries = {
    totalSchools: `SELECT COUNT(*) as count FROM schools WHERE status = 'approved'`,
    pendingRegistrations: `SELECT COUNT(*) as count FROM schools WHERE status = 'pending'`,
    totalStudents: `SELECT COUNT(*) as count FROM students`,
    totalTeachers: `SELECT COUNT(*) as count FROM teachers`
  };

  const stats = {};
  let completedQueries = 0;

  Object.keys(queries).forEach(key => {
    db.get(queries[key], [], (err, result) => {
      if (err) {
        console.error(`Error fetching ${key}:`, err);
        stats[key] = 0;
      } else {
        stats[key] = result.count;
      }

      completedQueries++;
      if (completedQueries === Object.keys(queries).length) {
        res.json(stats);
      }
    });
  });
};

// Get dashboard data based on user role
exports.getDashboardData = (req, res) => {
  const userRole = req.user.role;

  switch (userRole) {
    case 'super_admin':
      exports.getSuperAdminStats(req, res);
      break;
    case 'school_admin':
      // Get multiple data points for school admin
      const schoolId = req.user.schoolId;
      
      const statsQuery = `
        SELECT 
          (SELECT COUNT(*) FROM students WHERE schoolId = ?) as totalStudents,
          (SELECT COUNT(*) FROM teachers WHERE schoolId = ?) as totalTeachers,
          (SELECT COUNT(*) FROM student_fees WHERE schoolId = ? AND status = 'pending') as pendingFees,
          (SELECT COALESCE(SUM(amount), 0) FROM student_fees WHERE schoolId = ? AND status = 'paid' AND strftime('%Y-%m', paidDate) = strftime('%Y-%m', 'now')) as monthlyRevenue
      `;

      db.get(statsQuery, [schoolId, schoolId, schoolId, schoolId], (err, stats) => {
        if (err) {
          console.error('Error fetching dashboard stats:', err);
          return res.status(500).json({ error: 'Failed to fetch dashboard data' });
        }

        // Get recent students
        db.all(
          `SELECT studentId, firstName, lastName, class, section FROM students WHERE schoolId = ? ORDER BY id DESC LIMIT 5`,
          [schoolId],
          (err, recentStudents) => {
            if (err) {
              recentStudents = [];
            }

            res.json({
              stats,
              recentStudents,
              role: 'school_admin'
            });
          }
        );
      });
      break;

    case 'teacher':
      res.json({
        message: 'Teacher dashboard data',
        role: 'teacher',
        upcomingClasses: [],
        recentAttendance: []
      });
      break;

    case 'student':
      res.json({
        message: 'Student dashboard data',
        role: 'student',
        upcomingExams: [],
        feeStatus: {},
        attendance: {}
      });
      break;

    default:
      res.status(403).json({ error: 'Unknown user role' });
  }
};