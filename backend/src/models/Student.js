const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    rollNumber: Number,
    admissionDate: Date,
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    address: String,
    phone: String,
    email: String,
    parentName: String,
    parentPhone: String,
    parentEmail: String,
    bloodGroup: String,
    transportRoute: String,
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
