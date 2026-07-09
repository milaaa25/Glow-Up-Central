// controllers/reviewController.js
const { pool } = require('../config/db');

// =============================================
// GET /reviews
// Mengambil semua review (bisa difilter via ?product_name=)
// =============================================
async function getReviews(req, res) {
  const { product_name } = req.query;
  try {
    let query = 'SELECT * FROM review';
    const params = [];

    if (product_name) {
      query += ' WHERE product_name = ?';
      params.push(product_name);
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// =============================================
// POST /reviews
// Menambahkan review baru + auto-update rating produk terkait
// =============================================
async function createReview(req, res) {
  const { stars, reviewer_name, age, city, product_name, text } = req.body;

  if (!stars || !product_name || !text) {
    return res.status(400).json({ error: 'stars, product_name, and text are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO review (stars, reviewer_name, age, city, product_name, text) VALUES (?, ?, ?, ?, ?, ?)',
      [stars, reviewer_name || 'Anonymous', age || null, city || null, product_name, text]
    );

    // 🔥 Auto-update tabel rating setiap ada review baru masuk
    const [products] = await pool.query('SELECT id FROM product WHERE title = ?', [product_name]);
    if (products.length > 0) {
      const productId = products[0].id;
      const [ratings] = await pool.query('SELECT * FROM rating WHERE product_id = ?', [productId]);

      if (ratings.length > 0) {
        const currentRating = ratings[0];
        const newCount = currentRating.count + 1;
        const currentRate = parseFloat(currentRating.rate) || 0;
        const newRate = ((currentRate * currentRating.count) + parseInt(stars)) / newCount;

        await pool.query(
          'UPDATE rating SET rate = ?, count = ? WHERE product_id = ?',
          [newRate.toFixed(2), newCount, productId]
        );
      } else {
        await pool.query(
          'INSERT INTO rating (product_id, rate, count) VALUES (?, ?, ?)',
          [productId, parseInt(stars), 1]
        );
      }
    }

    res.status(201).json({ message: 'Review added successfully', id: result.insertId });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getReviews, createReview };
