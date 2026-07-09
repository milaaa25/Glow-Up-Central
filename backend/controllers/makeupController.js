// controllers/makeupController.js
const { pool } = require('../config/db');

// GET /api/makeup
// Ambil semua produk makeup (untuk halaman Makeup.jsx - allProducts di Data.jsx)
async function getAllMakeupProducts(req, res) {
  try {
    const { type } = req.query; // ?type=Foundation dll
    let query = 'SELECT * FROM makeup_product';
    const params = [];

    if (type) {
      query += ' WHERE type = ?';
      params.push(type);
    }
    query += ' ORDER BY id ASC';

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data produk makeup.' });
  }
}

// GET /api/makeup/:id
async function getMakeupById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM makeup_product WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Produk makeup tidak ditemukan.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil produk makeup.' });
  }
}

// POST /api/makeup
async function createMakeup(req, res) {
  try {
    const { brand, name, type, img } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Nama produk wajib diisi.' });

    const [result] = await pool.query(
      'INSERT INTO makeup_product (brand, name, type, img) VALUES (?, ?, ?, ?)',
      [brand, name, type, img]
    );
    res.status(201).json({ success: true, message: 'Produk makeup berhasil ditambahkan.', data: { id: result.insertId, name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menambahkan produk makeup.' });
  }
}

// PUT /api/makeup/:id
async function updateMakeup(req, res) {
  try {
    const { id } = req.params;
    const { brand, name, type, img } = req.body;

    const [existing] = await pool.query('SELECT id FROM makeup_product WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });

    await pool.query(
      'UPDATE makeup_product SET brand=?, name=?, type=?, img=? WHERE id=?',
      [brand, name, type, img, id]
    );
    res.json({ success: true, message: 'Produk makeup berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui produk makeup.' });
  }
}

// DELETE /api/makeup/:id
async function deleteMakeup(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM makeup_product WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
    res.json({ success: true, message: 'Produk makeup berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menghapus produk makeup.' });
  }
}

module.exports = { getAllMakeupProducts, getMakeupById, createMakeup, updateMakeup, deleteMakeup };
