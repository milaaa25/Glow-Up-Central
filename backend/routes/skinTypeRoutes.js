// routes/skinTypeRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllSkinTypes,
  getAllSkinTypesFull,
  getSkinTypeById,
  getSkinTypeRoutine,
  getAllSkincareProducts,
} = require('../controllers/skinTypeController');

router.get('/products', getAllSkincareProducts);    // GET /api/skin-types/products
router.get('/full', getAllSkinTypesFull);            // GET /api/skin-types/full  ← dipakai JenisKulit.jsx
router.get('/', getAllSkinTypes);                    // GET /api/skin-types
router.get('/:id', getSkinTypeById);                // GET /api/skin-types/:id
router.get('/:id/routine', getSkinTypeRoutine);     // GET /api/skin-types/:id/routine?time=pagi

module.exports = router;
