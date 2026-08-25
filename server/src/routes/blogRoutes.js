const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getDrafts,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
} = require('../controllers/blogController');

// Public routes
router.get('/', getBlogs);              // GET  /api/blogs
router.get('/drafts', getDrafts);       // GET  /api/blogs/drafts
router.get('/:blog_id', getBlog);       // GET  /api/blogs/:blog_id

// Write routes (add auth middleware here later when needed)
router.post('/', createBlog);           // POST /api/blogs
router.put('/:blog_id', updateBlog);    // PUT  /api/blogs/:blog_id
router.delete('/:blog_id', deleteBlog); // DELETE /api/blogs/:blog_id
router.post('/:blog_id/like', likeBlog);// POST /api/blogs/:blog_id/like

module.exports = router;
