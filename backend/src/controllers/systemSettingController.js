// controllers/systemSettingController.js
const SystemSetting = require('../models/SystemSetting');

// Get system settings
exports.getSystemSettings = async (req, res) => {
    const { schoolId, role } = req.user;

    // Only admin allowed
    if (role !== 'admin' && role !== 'superadmin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        let settings = await SystemSetting.findOne({ schoolId });

        if (!settings) {
            settings = new SystemSetting({ schoolId });
            await settings.save();
        }

        // Mask secrets for frontend
        const sanitized = settings.toObject();
        if (sanitized.smsGateway) sanitized.smsGateway.token = '********';
        if (sanitized.emailGateway) sanitized.emailGateway.password = '********';
        if (sanitized.paymentGateway) sanitized.paymentGateway.keySecret = '********';

        res.json(sanitized);
    } catch (err) {
        console.error('Error fetching system settings:', err);
        res.status(500).json({ error: 'Failed to fetch system settings' });
    }
};

// Update system settings
exports.updateSystemSettings = async (req, res) => {
    const { schoolId, role } = req.user;
    const updates = req.body;

    if (role !== 'admin' && role !== 'superadmin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const settings = await SystemSetting.findOne({ schoolId });
        if (!settings) {
            return res.status(404).json({ error: 'Settings not found' });
        }

        // Handle secrets: only update if new value provided and not masked
        if (updates.smsGateway) {
            if (updates.smsGateway.token === '********') delete updates.smsGateway.token;
            Object.assign(settings.smsGateway, updates.smsGateway);
        }

        if (updates.emailGateway) {
            if (updates.emailGateway.password === '********') delete updates.emailGateway.password;
            Object.assign(settings.emailGateway, updates.emailGateway);
        }

        if (updates.paymentGateway) {
            if (updates.paymentGateway.keySecret === '********') delete updates.paymentGateway.keySecret;
            Object.assign(settings.paymentGateway, updates.paymentGateway);
        }

        if (updates.backupSetting) Object.assign(settings.backupSetting, updates.backupSetting);
        if (updates.maintenanceMode) Object.assign(settings.maintenanceMode, updates.maintenanceMode);
        if (updates.sessionTimeout) settings.sessionTimeout = updates.sessionTimeout;

        await settings.save();

        res.json({ message: 'System settings updated successfully' });
    } catch (err) {
        console.error('Error updating system settings:', err);
        res.status(500).json({ error: 'Failed to update system settings' });
    }
};

// Backup Database (Mock)
exports.triggerBackup = async (req, res) => {
    const { schoolId, role } = req.user;

    if (role !== 'admin' && role !== 'superadmin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        // In a real app, this would dump the MongoDB database
        const settings = await SystemSetting.findOne({ schoolId });
        if (settings) {
            settings.backupSetting.lastBackup = new Date();
            await settings.save();
        }

        res.json({ message: 'Backup initiated successfully' });
    } catch (err) {
        console.error('Error triggering backup:', err);
        res.status(500).json({ error: 'Failed to trigger backup' });
    }
};
