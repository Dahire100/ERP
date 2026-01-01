// controllers/profileController.js
const User = require('../models/User');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const School = require('../models/School');

// Get current user profile
exports.getMyProfile = async (req, res) => {
    const { schoolId, _id: userId, role } = req.user;

    try {
        let profile = null;
        // Always fetch user to get preferences
        const user = await User.findById(userId).select('-password');

        // Fetch profile based on role
        switch (role) {
            case 'student':
                profile = await Student.findOne({ _id: userId, schoolId })
                    .populate('class', 'name section')
                    .populate('schoolId', 'name address phone email logo');
                break;

            case 'teacher':
            case 'accountant':
            case 'librarian':
            case 'receptionist':
            case 'driver':
            case 'other':
                // Try looking in Staff collection first (for non-teaching) or User collection
                const staff = await Staff.findOne({ email: req.user.email, schoolId });
                if (staff) {
                    profile = staff;
                } else {
                    profile = user;
                }
                break;

            case 'admin':
            case 'superadmin':
                profile = user;
                break;

            default:
                profile = user;
        }

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json({
            role,
            profile,
            user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                preferences: user.preferences
            }
        });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

// Update current user profile
exports.updateMyProfile = async (req, res) => {
    const { schoolId, _id: userId, role } = req.user;
    const updates = req.body;
    const preferencesUpdate = updates.preferences;

    // Prevent updating sensitive fields
    delete updates.password;
    delete updates.role;
    delete updates.schoolId;
    delete updates._id;
    delete updates.preferences; // Handle separately

    try {
        let updatedProfile = null;

        // Update User preferences if provided
        if (preferencesUpdate) {
            await User.findByIdAndUpdate(userId, { $set: { preferences: preferencesUpdate } });
        }

        // Update User basic info if provided (firstName, lastName, etc)
        // Some common fields might need to be synced to User model
        if (updates.firstName || updates.lastName || updates.phone) {
            await User.findByIdAndUpdate(userId, updates);
        }

        switch (role) {
            case 'student':
                updatedProfile = await Student.findOneAndUpdate(
                    { _id: userId, schoolId },
                    updates,
                    { new: true, runValidators: true }
                );
                break;

            case 'teacher':
            case 'accountant':
            case 'librarian':
            case 'receptionist':
            case 'driver':
                // Try Staff first
                const staff = await Staff.findOne({ email: req.user.email, schoolId });
                if (staff) {
                    Object.assign(staff, updates);
                    updatedProfile = await staff.save();
                } else {
                    updatedProfile = await User.findByIdAndUpdate(userId, updates, { new: true });
                }
                break;

            default:
                updatedProfile = await User.findByIdAndUpdate(userId, updates, { new: true });
        }

        // Refetch user to get updated preferences
        const updatedUser = await User.findById(userId).select('preferences');

        res.json({
            message: 'Profile updated successfully',
            data: updatedProfile,
            preferences: updatedUser.preferences
        });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const { _id: userId } = req.user;
    const { currentPassword, newPassword } = req.body;
    const bcrypt = require('bcryptjs');

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current and new password are required' });
    }

    try {
        // Determine which collection to check based on user type (simplified using User model for auth)
        // In this architecture, authentication happens via User model, so password is there
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid current password' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ error: 'Failed to change password' });
    }
};
