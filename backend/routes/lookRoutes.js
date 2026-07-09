// routes/lookRoutes.js
const express = require('express');
const router = express.Router();
const { getAllLooks, getLookById, createLook, updateLook, deleteLook } = require('../controllers/lookController');

router.get('/', getAllLooks);           // GET    /api/looks
router.get('/:id', getLookById);        // GET    /api/looks/:id (beserta kategori & tutorial step)
router.post('/', createLook);           // POST   /api/looks
router.put('/:id', updateLook);         // PUT    /api/looks/:id
router.delete('/:id', deleteLook);      // DELETE /api/looks/:id

module.exports = router;
