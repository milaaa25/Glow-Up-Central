// controllers/productController.js
const { pool } = require('../config/db');

// =============================================
// GET /products
// Mengambil semua produk beserta rating
// =============================================
async function getAllProducts(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, r.rate, r.count
      FROM product p
      LEFT JOIN rating r ON p.id = r.product_id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// =============================================
// GET /products/:id
// Mengambil detail produk berdasarkan ID beserta rating
// =============================================
async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT p.*, r.rate, r.count
      FROM product p
      LEFT JOIN rating r ON p.id = r.product_id
      WHERE p.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error fetching product ${id}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getAllProducts, getProductById };
