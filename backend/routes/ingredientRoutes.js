// routes/ingredientRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllIngredients,
  getIngredientById,
  getIngredientCombos,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require('../controllers/ingredientController');

router.get('/combos', getIngredientCombos);    // GET    /api/ingredients/combos
router.get('/', getAllIngredients);              // GET    /api/ingredients
router.get('/:id', getIngredientById);          // GET    /api/ingredients/:id
router.post('/', createIngredient);             // POST   /api/ingredients
router.put('/:id', updateIngredient);           // PUT    /api/ingredients/:id
router.delete('/:id', deleteIngredient);        // DELETE /api/ingredients/:id

module.exports = router;
