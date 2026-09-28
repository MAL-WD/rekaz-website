const express = require('express');
const router = express.Router();
const {
  createTeacherApplication,
  getTeacherApplications
} = require('../controllers/teacherApplicationController');

router.route('/')
  .post(createTeacherApplication)
  .get(getTeacherApplications);

module.exports = router;
