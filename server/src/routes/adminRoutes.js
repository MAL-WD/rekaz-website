const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { login, getMe, changePassword } = require('../controllers/authController');
const {
  getDashboardStats,
  getTeachers, createTeacher, updateTeacher, deleteTeacher,
  getLanguages, createLanguage, updateLanguage, deleteLanguage,
  updateContactStatus, deleteContact,
  updateInscriptionStatus, deleteInscription,
  updateTeacherAppStatus, deleteTeacherApp
} = require('../controllers/adminController');
const { getContacts } = require('../controllers/contactController');
const { getInscriptions } = require('../controllers/inscriptionController');
const { getTeacherApplications } = require('../controllers/teacherApplicationController');
const {
  getBlogs, getDrafts, getBlog, createBlog, updateBlog, deleteBlog
} = require('../controllers/blogController');

// Auth routes (login is public)
router.post('/auth/login', login);
router.get('/auth/me', protect, getMe);
router.put('/auth/password', protect, changePassword);

// All routes below require auth
router.use(protect);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Teachers CRUD
router.route('/teachers').get(getTeachers).post(createTeacher);
router.route('/teachers/:id').put(updateTeacher).delete(deleteTeacher);

// Languages CRUD
router.route('/languages').get(getLanguages).post(createLanguage);
router.route('/languages/:id').put(updateLanguage).delete(deleteLanguage);

// Blogs CRUD (reuse existing controllers)
router.get('/blogs', getBlogs);
router.get('/blogs/drafts', getDrafts);
router.get('/blogs/:blog_id', getBlog);
router.post('/blogs', createBlog);
router.put('/blogs/:blog_id', updateBlog);
router.delete('/blogs/:blog_id', deleteBlog);

// Contacts
router.get('/contacts', getContacts);
router.put('/contacts/:id/status', updateContactStatus);
router.delete('/contacts/:id', deleteContact);

// Inscriptions
router.get('/inscriptions', getInscriptions);
router.put('/inscriptions/:id/status', updateInscriptionStatus);
router.delete('/inscriptions/:id', deleteInscription);

// Teacher Applications
router.get('/teacher-applications', getTeacherApplications);
router.put('/teacher-applications/:id/status', updateTeacherAppStatus);
router.delete('/teacher-applications/:id', deleteTeacherApp);

module.exports = router;
