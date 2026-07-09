import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength: 150
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: 2000
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'replied'],
    default: 'pending'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
