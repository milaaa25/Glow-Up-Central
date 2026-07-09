// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const { getQuizQuestions, submitQuiz } = require('../controllers/quizController');

router.get('/', getQuizQuestions);   // GET /quiz
router.post('/submit', submitQuiz);  // POST /quiz/submit

module.exports = router;
