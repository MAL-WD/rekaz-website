const express = require('express');
const router = express.Router();
const {
  createInscription,
  getInscriptions
} = require('../controllers/inscriptionController');

router.route('/')
  .post(createInscription)
  .get(getInscriptions);

module.exports = router;
