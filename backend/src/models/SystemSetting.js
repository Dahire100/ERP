// models/SystemSetting.js
const mongoose = require('mongoose');

const systemSettingSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
        unique: true
    },
    smsGateway: {
        provider: String, // Twilio, MSG91, etc.
        sid: String,
        token: String,
        senderId: String,
        isActive: { type: Boolean, default: false }
    },
    emailGateway: {
        provider: String, // SMTP, SendGrid, AWS SES
        host: String,
        port: Number,
        username: String,
        password: String, // Encrypted
        fromEmail: String,
        fromName: String,
        isActive: { type: Boolean, default: false }
    },
    paymentGateway: {
        provider: String, // Stripe, Razorpay, PayPal
        keyId: String,
        keySecret: String, // Encrypted
        currency: { type: String, default: 'INR' },
        isActive: { type: Boolean, default: false }
    },
    backupSetting: {
        frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'never'], default: 'never' },
        lastBackup: Date,
        nextBackup: Date,
        destination: { type: String, enum: ['local', 's3', 'drive'], default: 'local' }
    },
    maintenanceMode: {
        isEnabled: { type: Boolean, default: false },
        message: String
    },
    sessionTimeout: {
        type: Number, // in minutes
        default: 60
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SystemSetting', systemSettingSchema);
