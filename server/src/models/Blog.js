const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    blog_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    banner: {
      type: String,
      default: '',
    },
    des: {
      type: String,
      maxlength: 300,
      default: '',
    },
    content: {
      type: mongoose.Schema.Types.Mixed, // EditorJS JSON output
      default: {},
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String, // author name (plain string for now)
      default: 'Rekaz Team',
    },
    authorImage: {
      type: String,
      default: '',
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    draft: {
      type: Boolean,
      default: false,
    },
    activity: {
      total_likes: { type: Number, default: 0 },
      total_comments: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model('Blog', blogSchema);
