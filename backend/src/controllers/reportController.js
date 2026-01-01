// controllers/reportController.js
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Invoice = require('../models/Invoice');
const Expense = require('../models/Expense');
const Class = require('../models/Class');
const User = require('../models/User');

// Get generic dashboard summary (Admin Report)
exports.getDashboardSummary = async (req, res) => {
    const { schoolId } = req.user;

    try {
        const [
            totalStudents,
            totalTeachers,
            totalClasses,
            totalFeesCollected,
            totalExpenses
        ] = await Promise.all([
            Student.countDocuments({ schoolId }),
            User.countDocuments({ schoolId, role: 'teacher' }),
            Class.countDocuments({ schoolId }),
            Invoice.aggregate([
                { $match: { schoolId, status: 'paid' } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]),
            Expense.aggregate([
                { $match: { schoolId } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ])
        ]);

        res.json({
            students: totalStudents,
            teachers: totalTeachers,
            classes: totalClasses,
            income: totalFeesCollected[0]?.total || 0,
            expenses: totalExpenses[0]?.total || 0,
            netProfit: (totalFeesCollected[0]?.total || 0) - (totalExpenses[0]?.total || 0)
        });
    } catch (err) {
        console.error('Error fetching dashboard summary:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard summary' });
    }
};

// Get Student Attendance Report
exports.getAttendanceReport = async (req, res) => {
    const { schoolId } = req.user;
    const { classId, date, month, year } = req.query;

    try {
        const query = { schoolId };
        if (classId) query.class = classId;

        // Determine date range
        if (date) {
            query.date = new Date(date);
        } else if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            query.date = { $gte: startDate, $lte: endDate };
        }

        const attendanceRecords = await Attendance.find(query)
            .populate('student', 'firstName lastName rollNumber')
            .populate('class', 'name section');

        // Aggregate stats
        const stats = {
            totalPresent: attendanceRecords.filter(r => r.status === 'Present').length,
            totalAbsent: attendanceRecords.filter(r => r.status === 'Absent').length,
            totalLate: attendanceRecords.filter(r => r.status === 'Late').length,
            attendancePercentage: 0
        };

        if (attendanceRecords.length > 0) {
            stats.attendancePercentage = ((stats.totalPresent / attendanceRecords.length) * 100).toFixed(2);
        }

        res.json({
            stats,
            records: attendanceRecords
        });
    } catch (err) {
        console.error('Error fetching attendance report:', err);
        res.status(500).json({ error: 'Failed to fetch attendance report' });
    }
};

// Get Financial Report (Income vs Expense)
exports.getFinancialReport = async (req, res) => {
    const { schoolId } = req.user;
    const { startDate, endDate } = req.query;

    try {
        const dateFilter = {};
        if (startDate && endDate) {
            dateFilter.$gte = new Date(startDate);
            dateFilter.$lte = new Date(endDate);
        } else {
            // Default to current year
            const currentYear = new Date().getFullYear();
            dateFilter.$gte = new Date(currentYear, 0, 1);
            dateFilter.$lte = new Date(currentYear, 11, 31);
        }

        const [income, expenses] = await Promise.all([
            Invoice.aggregate([
                {
                    $match: {
                        schoolId,
                        status: 'paid',
                        updatedAt: dateFilter
                    }
                },
                {
                    $group: {
                        _id: { $month: "$updatedAt" },
                        total: { $sum: '$amount' }
                    }
                }
            ]),
            Expense.aggregate([
                {
                    $match: {
                        schoolId,
                        date: dateFilter
                    }
                },
                {
                    $group: {
                        _id: { $month: "$date" },
                        total: { $sum: '$amount' }
                    }
                }
            ])
        ]);

        // Format data for charts (12 months)
        const monthlyData = Array(12).fill(0).map((_, i) => ({
            month: i + 1,
            income: 0,
            expense: 0
        }));

        income.forEach(item => {
            monthlyData[item._id - 1].income = item.total;
        });

        expenses.forEach(item => {
            monthlyData[item._id - 1].expense = item.total;
        });

        res.json({
            summary: monthlyData,
            totalIncome: income.reduce((sum, i) => sum + i.total, 0),
            totalExpense: expenses.reduce((sum, e) => sum + e.total, 0)
        });
    } catch (err) {
        console.error('Error fetching financial report:', err);
        res.status(500).json({ error: 'Failed to fetch financial report' });
    }
};

// Get Class Strength Report
exports.getClassStrengthReport = async (req, res) => {
    const { schoolId } = req.user;

    try {
        const classes = await Class.find({ schoolId }).sort({ name: 1, section: 1 });

        const report = await Promise.all(classes.map(async (cls) => {
            const count = await Student.countDocuments({ schoolId, class: cls._id });
            const boys = await Student.countDocuments({ schoolId, class: cls._id, gender: 'male' });
            const girls = await Student.countDocuments({ schoolId, class: cls._id, gender: 'female' });

            return {
                className: cls.name,
                section: cls.section,
                total: count,
                boys,
                girls,
                capacity: cls.capacity,
                occupancy: cls.capacity ? ((count / cls.capacity) * 100).toFixed(1) : 0
            };
        }));

        res.json(report);
    } catch (err) {
        console.error('Error fetching class strength report:', err);
        res.status(500).json({ error: 'Failed to fetch class strength report' });
    }
};
