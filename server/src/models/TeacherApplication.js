const mongoose = require('mongoose');

const teacherApplicationSchema = new mongoose.Schema({
  referenceNumber: {
    type: String,
    required: true,
    unique: true
  },
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  birthDate: {
    type: String
  },
  wilaya: {
    type: String,
    default: 'Béchar'
  },
  city: {
    type: String,
    default: 'Béchar'
  },
  // Professional Information
  subjectSpecialty: {
    type: String,
    required: [true, 'Subject specialty is required']
  },
  educationLevel: {
    type: String,
    required: [true, 'Education level is required'],
    enum: ['licence', 'master', 'doctorat', 'other']
  },
  educationField: {
    type: String
  },
  yearsExperience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5-10', '10+'],
    default: '1-3'
  },
  targetLevels: [{
    type: String
  }],
  teachingMode: {
    type: String,
    enum: ['presentiel', 'online', 'hybrid'],
    default: 'presentiel'
  },
  availability: {
    type: String,
    enum: ['weekend', 'evening', 'flexible', 'fulltime'],
    default: 'flexible'
  },
  currentInstitution: {
    type: String
  },
  // Extra
  motivation: {
    type: String,
    maxlength: [3000, 'Motivation text cannot exceed 3000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interview', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TeacherApplication = mongoose.model('TeacherApplication', teacherApplicationSchema);

module.exports = TeacherApplication;
