// models/Income.js
const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['fees', 'donation', 'grant', 'sale', 'other']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  incomeDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  receivedFrom: {
    type: String,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'cheque', 'upi', 'card'],
    default: 'cash'
  },
  receiptNumber: {
    type: String,
    trim: true
  },
  attachments: [{
    filename: String,
    url: String,
    uploadedAt: Date
  }],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

incomeSchema.index({ schoolId: 1, incomeDate: -1 });
incomeSchema.index({ schoolId: 1, category: 1 });

module.exports = mongoose.model('Income', incomeSchema);
