// controllers/dashboardController.js
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const StudentFee = require('../models/StudentFee');
const School = require('../models/School');

// Get dashboard stats for school admin
exports.getSchoolAdminStats = async (req, res) => {
  const { schoolId } = req.user;

  try {
    const totalStudents = await Student.countDocuments({ schoolId });
    const totalTeachers = await Teacher.countDocuments({ schoolId });
    const pendingFees = await StudentFee.countDocuments({ schoolId, status: 'pending' });

    // Calculate monthly revenue
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const revenueResult = await StudentFee.aggregate([
      {
        $match: {
          schoolId: req.user.schoolId, // Ensure schoolId is ObjectId if stored as such
          status: 'paid',
          updatedAt: { $gte: startOfMonth } // Assuming paid date tracks with updatedAt or create a paidDate field
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      totalStudents,
      totalTeachers,
      pendingFees,
      totalRevenue
    });
  } catch (err) {
    console.error('Error fetching school admin stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Get recent students
exports.getRecentStudents = async (req, res) => {
  const { schoolId } = req.user;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const students = await Student.find({ schoolId })
      .select('studentId firstName lastName class section admissionDate')
      .sort({ admissionDate: -1 })
      .limit(limit);

    res.json(students);
  } catch (err) {
    console.error('Error fetching recent students:', err);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Get fee summary
exports.getFeeSummary = async (req, res) => {
  const { schoolId } = req.user;

  try {
    const feeSummary = await StudentFee.aggregate([
      { $match: { schoolId: req.user.schoolId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          total_amount: { $sum: '$amount' }
        }
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          total_amount: 1,
          _id: 0
        }
      }
    ]);

    res.json(feeSummary);
  } catch (err) {
    console.error('Error fetching fee summary:', err);
    res.status(500).json({ error: 'Failed to fetch fee summary' });
  }
};

// Get super admin dashboard stats
exports.getSuperAdminStats = async (req, res) => {
  try {
    const totalSchools = await School.countDocuments({ status: 'approved' });
    const pendingRegistrations = await School.countDocuments({ status: 'pending' });
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();

    res.json({
      totalSchools,
      pendingRegistrations,
      totalStudents,
      totalTeachers
    });
  } catch (err) {
    console.error('Error fetching super admin stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Get dashboard data based on user role
exports.getDashboardData = async (req, res) => {
  const userRole = req.user.role;

  try {
    switch (userRole) {
      case 'super_admin':
        await exports.getSuperAdminStats(req, res);
        break;

      case 'school_admin':
        // Get multiple data points for school admin
        const schoolId = req.user.schoolId;

        const totalStudents = await Student.countDocuments({ schoolId });
        const totalTeachers = await Teacher.countDocuments({ schoolId });
        const pendingFees = await StudentFee.countDocuments({ schoolId, status: 'pending' });

        // Monthly revenue
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const revenueResult = await StudentFee.aggregate([
          {
            $match: {
              schoolId: schoolId,
              status: 'paid',
              updatedAt: { $gte: startOfMonth }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' }
            }
          }
        ]);

        const monthlyRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        // Recent students
        const recentStudents = await Student.find({ schoolId })
          .select('studentId firstName lastName class section')
          .sort({ _id: -1 })
          .limit(5);

        res.json({
          stats: {
            totalStudents,
            totalTeachers,
            pendingFees,
            monthlyRevenue
          },
          recentStudents,
          role: 'school_admin'
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
  } catch (err) {
    console.error('Error in getDashboardData:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};