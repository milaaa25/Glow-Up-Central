// routes/rutinitasRoutes.js
const express = require('express');
const router = express.Router();
const { getRutinitas } = require('../controllers/rutinitasController');

router.get('/', getRutinitas); // GET /rutinitas

module.exports = router;
