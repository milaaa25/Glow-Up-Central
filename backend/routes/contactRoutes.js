// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const {
  createContactMessage,
  getAllContactMessages,
  deleteContactMessage,
} = require('../controllers/contactController');

router.post('/', createContactMessage);       // POST   /api/contact
router.get('/', getAllContactMessages);       // GET    /api/contact
router.delete('/:id', deleteContactMessage);  // DELETE /api/contact/:id

module.exports = router;
