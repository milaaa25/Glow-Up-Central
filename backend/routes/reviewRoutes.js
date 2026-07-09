// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { getReviews, createReview } = require('../controllers/reviewController');

router.get('/', getReviews);     // GET /reviews?product_name=...
router.post('/', createReview); // POST /reviews

module.exports = router;
