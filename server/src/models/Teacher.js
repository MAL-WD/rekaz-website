const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Teacher name is required'],
    trim: true
  },
  nameAr: {
    type: String,
    trim: true,
    default: ''
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  subjectAr: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  bioAr: {
    type: String,
    maxlength: 500,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  qualifications: {
    type: [String],
    default: []
  },
  experience: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
