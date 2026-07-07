// routes/faqRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllFAQ,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = require('../controllers/faqController');

router.get('/', getAllFAQ);        // GET    /api/faq
router.get('/:id', getFAQById);    // GET    /api/faq/:id
router.post('/', createFAQ);       // POST   /api/faq
router.put('/:id', updateFAQ);     // PUT    /api/faq/:id
router.delete('/:id', deleteFAQ);  // DELETE /api/faq/:id

module.exports = router;
