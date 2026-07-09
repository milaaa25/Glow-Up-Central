// controllers/lookController.js
const { pool } = require('../config/db');

// GET /api/looks
// Ambil semua makeup look (untuk Looks.jsx)
async function getAllLooks(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM makeup_look ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data looks.' });
  }
}

// GET /api/looks/:id
// Ambil detail satu look beserta kategori produk dan tutorial step-nya (untuk DetailLooks.jsx)
async function getLookById(req, res) {
  try {
    const { id } = req.params;
    const [looks] = await pool.query('SELECT * FROM makeup_look WHERE id = ?', [id]);
    if (looks.length === 0) return res.status(404).json({ success: false, message: 'Look tidak ditemukan.' });

    const [categories] = await pool.query(
      'SELECT * FROM look_category WHERE look_id = ? ORDER BY id ASC', [id]
    );
    const [steps] = await pool.query(
      'SELECT * FROM tutorial_step WHERE look_id = ? ORDER BY step_number ASC', [id]
    );

    res.json({
      success: true,
      data: {
        ...looks[0],
        categories: categories.map(c => ({
          name: c.name,
          items: typeof c.items === 'string' ? JSON.parse(c.items) : c.items
        })),
        tutorialSteps: steps
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil detail look.' });
  }
}

// POST /api/looks
async function createLook(req, res) {
  try {
    const { title, artist, description, img } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Judul look wajib diisi.' });

    const [result] = await pool.query(
      'INSERT INTO makeup_look (title, artist, description, img) VALUES (?, ?, ?, ?)',
      [title, artist, description, img]
    );
    res.status(201).json({ success: true, message: 'Look berhasil ditambahkan.', data: { id: result.insertId, title } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menambahkan look.' });
  }
}

// PUT /api/looks/:id
async function updateLook(req, res) {
  try {
    const { id } = req.params;
    const { title, artist, description, img } = req.body;

    const [existing] = await pool.query('SELECT id FROM makeup_look WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ success: false, message: 'Look tidak ditemukan.' });

    await pool.query(
      'UPDATE makeup_look SET title=?, artist=?, description=?, img=? WHERE id=?',
      [title, artist, description, img, id]
    );
    res.json({ success: true, message: 'Look berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui look.' });
  }
}

// DELETE /api/looks/:id
async function deleteLook(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM makeup_look WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Look tidak ditemukan.' });
    res.json({ success: true, message: 'Look berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menghapus look.' });
  }
}

module.exports = { getAllLooks, getLookById, createLook, updateLook, deleteLook };
