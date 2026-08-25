const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const { validateContact, validate } = require('../middleware/validateContact');
const { contactLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .post(contactLimiter, validateContact, validate, submitContact)
  .get(getContacts); // Should ideally be protected by auth middleware later

module.exports = router;
