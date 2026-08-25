const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
  referenceNumber: {
    type: String,
    required: true,
    unique: true
  },
  programType: {
    type: String,
    required: [true, 'Program type is required'],
    enum: ['cem', 'lycee', 'formation', 'consultation']
  },
  level: {
    type: String,
    required: [true, 'Level is required']
  },
  filiere: {
    type: String
  },
  formationCategory: {
    type: String
  },
  subjects: [{
    type: String
  }],
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  birthDate: {
    type: String
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
  wilaya: {
    type: String,
    default: 'Béchar'
  },
  city: {
    type: String,
    default: 'Béchar'
  },
  currentSchool: {
    type: String
  },
  parentName: {
    type: String
  },
  parentPhone: {
    type: String
  },
  parentRelation: {
    type: String
  },
  learningMode: {
    type: String,
    enum: ['presentiel', 'online', 'hybrid'],
    default: 'presentiel'
  },
  schedulePreference: {
    type: String,
    enum: ['weekend', 'evening', 'flexible'],
    default: 'weekend'
  },
  notes: {
    type: String,
    maxlength: [2000, 'Notes cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Inscription = mongoose.model('Inscription', inscriptionSchema);

module.exports = Inscription;
