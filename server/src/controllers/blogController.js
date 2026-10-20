const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const { nanoid } = require('nanoid');

// ─── Helper ─────────────────────────────────────────────────────────────────
const slugify = (title) => {
  const slug = (title || '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
  return slug || `post-${nanoid(6)}`;
};


// ─── GET /api/blogs ─────────────────────────────────────────────────────────
// Returns published blogs (draft: false), paginated
exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const tag = req.query.tag;
    const search = req.query.search;

    const filter = { draft: false };
    if (tag) filter.tags = tag;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('blog_id title banner des tags author authorImage readTime createdAt activity');

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── GET /api/blogs/drafts ───────────────────────────────────────────────────
exports.getDrafts = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: true })
      .sort({ updatedAt: -1 })
      .select('blog_id title banner des tags createdAt updatedAt');
    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── GET /api/blogs/:blog_id ─────────────────────────────────────────────────
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ blog_id: req.params.blog_id });
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── POST /api/blogs ─────────────────────────────────────────────────────────
exports.createBlog = async (req, res) => {
  try {
    const { title, banner, des, content, tags, author, authorImage, readTime, draft } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }

    // Build a unique blog_id
    const baseSlug = req.body.blog_id ? slugify(req.body.blog_id) : slugify(title);
    let blog_id = baseSlug || `post-${nanoid(6)}`;
    const existing = await Blog.findOne({ blog_id });
    if (existing) {
      blog_id = `${blog_id}-${nanoid(5)}`;
    }


    const blog = await Blog.create({
      blog_id,
      title: title.trim(),
      banner: banner || '',
      des: des || '',
      content: content || {},
      tags: tags || [],
      author: author || 'Rēkāz Team',
      authorImage: authorImage || '',
      readTime: readTime || '5 min read',
      draft: draft !== undefined ? draft : false,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── PUT /api/blogs/:blog_id ─────────────────────────────────────────────────
exports.updateBlog = async (req, res) => {
  try {
    const { title, banner, des, content, tags, author, authorImage, readTime, draft } = req.body;

    const blog = await Blog.findOne({ blog_id: req.params.blog_id });
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });

    if (title !== undefined) blog.title = title.trim();
    if (banner !== undefined) blog.banner = banner;
    if (des !== undefined) blog.des = des;
    if (content !== undefined) blog.content = content;
    if (tags !== undefined) blog.tags = tags;
    if (author !== undefined) blog.author = author;
    if (authorImage !== undefined) blog.authorImage = authorImage;
    if (readTime !== undefined) blog.readTime = readTime;
    if (draft !== undefined) blog.draft = draft;

    await blog.save();
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── DELETE /api/blogs/:blog_id ──────────────────────────────────────────────
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ blog_id: req.params.blog_id });
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── POST /api/blogs/:blog_id/like ───────────────────────────────────────────
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ blog_id: req.params.blog_id });
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });

    const { liked } = req.body; // true = like, false = unlike
    blog.activity.total_likes = Math.max(
      0,
      blog.activity.total_likes + (liked ? 1 : -1)
    );
    await blog.save();

    res.json({ success: true, total_likes: blog.activity.total_likes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── GET /api/blogs/:blog_id/comments ─────────────────────────────────────────
exports.getComments = async (req, res) => {
  try {
    const { blog_id } = req.params;
    const comments = await Comment.find({ blog_id }).sort({ createdAt: -1 });
    res.json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── POST /api/blogs/:blog_id/comments ────────────────────────────────────────
exports.addComment = async (req, res) => {
  try {
    const { blog_id } = req.params;
    const { name, comment, avatar } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }
    if (!comment || !comment.trim()) {
      return res.status(400).json({ success: false, error: 'Comment text is required' });
    }

    const blog = await Blog.findOne({ blog_id });
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    const newComment = await Comment.create({
      blog_id,
      name: name.trim(),
      comment: comment.trim(),
      avatar: avatar || '',
    });

    // Increment blog total comments
    blog.activity.total_comments = (blog.activity.total_comments || 0) + 1;
    await blog.save();

    res.status(201).json({
      success: true,
      data: newComment,
      total_comments: blog.activity.total_comments,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── POST /api/blogs/:blog_id/comments/:comment_id/like ───────────────────────
exports.likeComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const commentDoc = await Comment.findById(comment_id);
    if (!commentDoc) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }
    commentDoc.likes = (commentDoc.likes || 0) + 1;
    await commentDoc.save();
    res.json({ success: true, likes: commentDoc.likes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ─── DELETE /api/blogs/:blog_id/comments/:comment_id ──────────────────────────
exports.deleteComment = async (req, res) => {
  try {
    const { blog_id, comment_id } = req.params;
    const commentDoc = await Comment.findByIdAndDelete(comment_id);
    if (commentDoc) {
      const blog = await Blog.findOne({ blog_id });
      if (blog) {
        blog.activity.total_comments = Math.max(0, (blog.activity.total_comments || 1) - 1);
        await blog.save();
      }
    }
    res.json({ success: true, message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

