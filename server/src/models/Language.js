const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Language name is required'],
    trim: true
  },
  nameAr: {
    type: String,
    trim: true,
    default: ''
  },
  code: {
    type: String,
    required: [true, 'Language code is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    default: ''
  },
  descriptionAr: {
    type: String,
    default: ''
  },
  icon: {
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

module.exports = mongoose.model('Language', languageSchema);
