// controllers/lessonPlannerController.js
const LessonPlan = require('../models/LessonPlan');
const Class = require('../models/Class');

// Create lesson plan
exports.createLessonPlan = async (req, res) => {
    const { schoolId, _id: userId } = req.user;
    const {
        classId,
        subject,
        lessonDate,
        topic,
        objectives,
        activities,
        resources,
        homework,
        notes,
        duration,
        status
    } = req.body;

    if (!classId || !subject || !lessonDate || !topic) {
        return res.status(400).json({ error: 'Class, subject, lesson date, and topic are required' });
    }

    try {
        const lessonPlan = new LessonPlan({
            schoolId,
            teacherId: userId,
            classId,
            subject,
            lessonDate,
            topic,
            objectives: objectives || [],
            activities,
            resources,
            homework,
            notes,
            duration: duration || 45,
            status: status || 'planned'
        });

        await lessonPlan.save();

        const populatedPlan = await LessonPlan.findById(lessonPlan._id)
            .populate('teacherId', 'firstName lastName')
            .populate('classId', 'name section');

        res.status(201).json(populatedPlan);
    } catch (err) {
        console.error('Error creating lesson plan:', err);
        res.status(500).json({ error: 'Failed to create lesson plan' });
    }
};

// Get all lesson plans
exports.getLessonPlans = async (req, res) => {
    const { schoolId } = req.user;
    const { classId, subject, status, startDate, endDate, page = 1, limit = 10 } = req.query;

    try {
        const query = { schoolId };
        if (classId) query.classId = classId;
        if (subject) query.subject = subject;
        if (status) query.status = status;

        if (startDate && endDate) {
            query.lessonDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const lessonPlans = await LessonPlan.find(query)
            .populate('teacherId', 'firstName lastName')
            .populate('classId', 'name section')
            .sort({ lessonDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await LessonPlan.countDocuments(query);

        res.json({
            lessonPlans,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (err) {
        console.error('Error fetching lesson plans:', err);
        res.status(500).json({ error: 'Failed to fetch lesson plans' });
    }
};

// Get lesson plan by ID
exports.getLessonPlanById = async (req, res) => {
    const { schoolId } = req.user;
    const { id } = req.params;

    try {
        const lessonPlan = await LessonPlan.findOne({ _id: id, schoolId })
            .populate('teacherId', 'firstName lastName')
            .populate('classId', 'name section');

        if (!lessonPlan) {
            return res.status(404).json({ error: 'Lesson plan not found' });
        }

        res.json(lessonPlan);
    } catch (err) {
        console.error('Error fetching lesson plan:', err);
        res.status(500).json({ error: 'Failed to fetch lesson plan' });
    }
};

// Update lesson plan
exports.updateLessonPlan = async (req, res) => {
    const { schoolId } = req.user;
    const { id } = req.params;
    const updates = req.body;

    try {
        const lessonPlan = await LessonPlan.findOneAndUpdate(
            { _id: id, schoolId },
            updates,
            { new: true, runValidators: true }
        )
            .populate('teacherId', 'firstName lastName')
            .populate('classId', 'name section');

        if (!lessonPlan) {
            return res.status(404).json({ error: 'Lesson plan not found' });
        }

        res.json(lessonPlan);
    } catch (err) {
        console.error('Error updating lesson plan:', err);
        res.status(500).json({ error: 'Failed to update lesson plan' });
    }
};

// Delete lesson plan
exports.deleteLessonPlan = async (req, res) => {
    const { schoolId } = req.user;
    const { id } = req.params;

    try {
        const lessonPlan = await LessonPlan.findOneAndDelete({ _id: id, schoolId });

        if (!lessonPlan) {
            return res.status(404).json({ error: 'Lesson plan not found' });
        }

        res.json({ message: 'Lesson plan deleted successfully' });
    } catch (err) {
        console.error('Error deleting lesson plan:', err);
        res.status(500).json({ error: 'Failed to delete lesson plan' });
    }
};

// Get lesson plans by teacher
exports.getLessonPlansByTeacher = async (req, res) => {
    const { schoolId, _id: userId } = req.user;
    const { startDate, endDate } = req.query;

    try {
        const query = { schoolId, teacherId: userId };

        if (startDate && endDate) {
            query.lessonDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const lessonPlans = await LessonPlan.find(query)
            .populate('classId', 'name section')
            .sort({ lessonDate: -1 });

        res.json(lessonPlans);
    } catch (err) {
        console.error('Error fetching teacher lesson plans:', err);
        res.status(500).json({ error: 'Failed to fetch lesson plans' });
    }
};

// Get lesson plan topics
exports.getTopics = async (req, res) => {
    const { schoolId } = req.user;
    const { classId, subject } = req.query;

    if (!classId || !subject) {
        return res.status(400).json({ error: 'Class and subject are required' });
    }

    try {
        const topics = await LessonPlan.find({
            schoolId,
            classId,
            subject
        })
            .select('topic lessonDate status')
            .sort({ lessonDate: -1 });

        res.json(topics);
    } catch (err) {
        console.error('Error fetching topics:', err);
        res.status(500).json({ error: 'Failed to fetch topics' });
    }
};

// Get lesson plan report
exports.getLessonPlanReport = async (req, res) => {
    const { schoolId } = req.user;
    const { classId, subject, startDate, endDate } = req.query;

    try {
        const query = { schoolId };
        if (classId) query.classId = classId;
        if (subject) query.subject = subject;

        if (startDate && endDate) {
            query.lessonDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const report = await LessonPlan.aggregate([
            { $match: query },
            {
                $group: {
                    _id: {
                        classId: '$classId',
                        subject: '$subject'
                    },
                    total: { $sum: 1 },
                    planned: {
                        $sum: { $cond: [{ $eq: ['$status', 'planned'] }, 1, 0] }
                    },
                    inProgress: {
                        $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
                    },
                    completed: {
                        $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
                    },
                    cancelled: {
                        $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
                    }
                }
            },
            {
                $lookup: {
                    from: 'classes',
                    localField: '_id.classId',
                    foreignField: '_id',
                    as: 'classInfo'
                }
            },
            {
                $project: {
                    _id: 0,
                    classId: '$_id.classId',
                    className: { $arrayElemAt: ['$classInfo.name', 0] },
                    subject: '$_id.subject',
                    total: 1,
                    planned: 1,
                    inProgress: 1,
                    completed: 1,
                    cancelled: 1,
                    completionRate: {
                        $cond: [
                            { $gt: ['$total', 0] },
                            { $multiply: [{ $divide: ['$completed', '$total'] }, 100] },
                            0
                        ]
                    }
                }
            }
        ]);

        res.json(report);
    } catch (err) {
        console.error('Error fetching lesson plan report:', err);
        res.status(500).json({ error: 'Failed to fetch report' });
    }
};
