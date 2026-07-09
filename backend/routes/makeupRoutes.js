// routes/makeupRoutes.js
const express = require('express');
const router = express.Router();
const { getAllMakeupProducts, getMakeupById, createMakeup, updateMakeup, deleteMakeup } = require('../controllers/makeupController');

router.get('/', getAllMakeupProducts);   // GET    /api/makeup
router.get('/:id', getMakeupById);       // GET    /api/makeup/:id
router.post('/', createMakeup);          // POST   /api/makeup
router.put('/:id', updateMakeup);        // PUT    /api/makeup/:id
router.delete('/:id', deleteMakeup);     // DELETE /api/makeup/:id

module.exports = router;
