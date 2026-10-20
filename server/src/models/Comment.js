const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    blog_id: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 80,
    },
    comment: {
      type: String,
      required: [true, 'Comment text is required'],
      trim: true,
      maxlength: 1200,
    },
    avatar: {
      type: String,
      default: '',
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
