// controllers/studyMaterialController.js
const StudyMaterial = require('../models/StudyMaterial');

// Create study material
exports.createStudyMaterial = async (req, res) => {
    const { schoolId, _id: userId } = req.user;
    const {
        title,
        description,
        type,
        subject,
        classes,
        fileUrl
    } = req.body;

    if (!title || !type || !fileUrl) {
        return res.status(400).json({ error: 'Title, type, and file URL are required' });
    }

    try {
        const studyMaterial = new StudyMaterial({
            schoolId,
            title,
            description,
            type,
            subject,
            classes: classes || [],
            fileUrl,
            uploadedBy: userId,
            isActive: true
        });

        await studyMaterial.save();

        const populatedMaterial = await StudyMaterial.findById(studyMaterial._id)
            .populate('uploadedBy', 'firstName lastName')
            .populate('classes', 'name section');

        res.status(201).json(populatedMaterial);
    } catch (err) {
        console.error('Error creating study material:', err);
        res.status(500).json({ error: 'Failed to create study material' });
    }
};

// Get all study materials
exports.getStudyMaterials = async (req, res) => {
    const { schoolId } = req.user;
    const { type, subject, classId, isActive, page = 1, limit = 10 } = req.query;

    try {
        const query = { schoolId };
        if (type) query.type = type;
        if (subject) query.subject = subject;
        if (classId) query.classes = classId;
        if (isActive !== undefined) query.isActive = isActive === 'true';

        const materials = await StudyMaterial.find(query)
            .populate('uploadedBy', 'firstName lastName')
            .populate('classes', 'name section')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await StudyMaterial.countDocuments(query);

        res.json({
            materials,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (err) {
        console.error('Error fetching study materials:', err);
        res.status(500).json({ error: 'Failed to fetch study materials' });
    }
};

// Get study material by ID
exports.getStudyMaterialById = async (req, res) => {
    const { schoolId } = req.user;
    const { id } = req.params;

    try {
        const material = await StudyMaterial.findOne({ _id: id, schoolId })
            .populate('uploadedBy', 'firstName lastName')
            .populate('classes', 'name section');

        if (!material) {
            return res.status(404).json({ error: 'Study material not found' });
        }

        res.json(material);
    } catch (err) {
        console.error('Error fetching study material:', err);
        res.status(500).json({ error: 'Failed to fetch study material' });
    }
};

// Update study material
exports.updateStudyMaterial = async (req, res) => {
    const { schoolId } = req.user;
    const { id } = req.params;
    const updates = req.body;

    try {
        const material = await StudyMaterial.findOneAndUpdate(
            { _id: id, schoolId },
            updates,
            { new: true, runValidators: true }
        )
            .populate('uploadedBy', 'firstName lastName')
            .populate('classes', 'name section');

        if (!material) {
            return res.status(404).json({ error: 'Study material not found' });
        }

        res.json(material);
    } catch (err) {
        console.error('Error updating study material:', err);
        res.status(500).json({ error: 'Failed to update study material' });
    }
};

// Delete study material
exports.deleteStudyMaterial = async (req, res) => {
    const { schoolId } = req.user;
    const { id } = req.params;

    try {
        const material = await StudyMaterial.findOneAndDelete({ _id: id, schoolId });

        if (!material) {
            return res.status(404).json({ error: 'Study material not found' });
        }

        res.json({ message: 'Study material deleted successfully' });
    } catch (err) {
        console.error('Error deleting study material:', err);
        res.status(500).json({ error: 'Failed to delete study material' });
    }
};

// Toggle active status
exports.toggleActiveStatus = async (req, res) => {
    const { schoolId } = req.user;
    const { id } = req.params;

    try {
        const material = await StudyMaterial.findOne({ _id: id, schoolId });

        if (!material) {
            return res.status(404).json({ error: 'Study material not found' });
        }

        material.isActive = !material.isActive;
        await material.save();

        res.json({
            message: `Study material ${material.isActive ? 'activated' : 'deactivated'} successfully`,
            isActive: material.isActive
        });
    } catch (err) {
        console.error('Error toggling active status:', err);
        res.status(500).json({ error: 'Failed to toggle active status' });
    }
};

// Get materials by class
exports.getMaterialsByClass = async (req, res) => {
    const { schoolId } = req.user;
    const { classId } = req.params;

    try {
        const materials = await StudyMaterial.find({
            schoolId,
            classes: classId,
            isActive: true
        })
            .populate('uploadedBy', 'firstName lastName')
            .sort({ createdAt: -1 });

        res.json(materials);
    } catch (err) {
        console.error('Error fetching materials by class:', err);
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
};

// Get materials by type
exports.getMaterialsByType = async (req, res) => {
    const { schoolId } = req.user;
    const { type } = req.params;

    try {
        const materials = await StudyMaterial.find({
            schoolId,
            type,
            isActive: true
        })
            .populate('uploadedBy', 'firstName lastName')
            .populate('classes', 'name section')
            .sort({ createdAt: -1 });

        res.json(materials);
    } catch (err) {
        console.error('Error fetching materials by type:', err);
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
};

// Get material statistics
exports.getMaterialStats = async (req, res) => {
    const { schoolId } = req.user;

    try {
        const stats = await StudyMaterial.aggregate([
            { $match: { schoolId: new require('mongoose').Types.ObjectId(schoolId) } },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    active: {
                        $sum: { $cond: ['$isActive', 1, 0] }
                    },
                    byType: {
                        $push: '$type'
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    total: 1,
                    active: 1,
                    inactive: { $subtract: ['$total', '$active'] },
                    syllabus: {
                        $size: {
                            $filter: {
                                input: '$byType',
                                cond: { $eq: ['$$this', 'syllabus'] }
                            }
                        }
                    },
                    book: {
                        $size: {
                            $filter: {
                                input: '$byType',
                                cond: { $eq: ['$$this', 'book'] }
                            }
                        }
                    },
                    circular: {
                        $size: {
                            $filter: {
                                input: '$byType',
                                cond: { $eq: ['$$this', 'circular'] }
                            }
                        }
                    },
                    assignment: {
                        $size: {
                            $filter: {
                                input: '$byType',
                                cond: { $eq: ['$$this', 'assignment'] }
                            }
                        }
                    },
                    other: {
                        $size: {
                            $filter: {
                                input: '$byType',
                                cond: { $eq: ['$$this', 'other'] }
                            }
                        }
                    }
                }
            }
        ]);

        res.json(stats[0] || {
            total: 0,
            active: 0,
            inactive: 0,
            syllabus: 0,
            book: 0,
            circular: 0,
            assignment: 0,
            other: 0
        });
    } catch (err) {
        console.error('Error fetching material stats:', err);
        res.status(500).json({ error: 'Failed to fetch material statistics' });
    }
};
