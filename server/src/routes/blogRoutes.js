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
  getComments,
  addComment,
  likeComment,
  deleteComment,
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

// Comments routes
router.get('/:blog_id/comments', getComments);
router.post('/:blog_id/comments', addComment);
router.post('/:blog_id/comments/:comment_id/like', likeComment);
router.delete('/:blog_id/comments/:comment_id', deleteComment);

module.exports = router;

