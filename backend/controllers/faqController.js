// controllers/faqController.js
const { pool } = require('../config/db');

// GET /api/faq
// Ambil semua FAQ
async function getAllFAQ(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM faq ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data FAQ.' });
  }
}

// GET /api/faq/:id
async function getFAQById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM faq WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'FAQ tidak ditemukan.' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data FAQ.' });
  }
}

// POST /api/faq
// Tambah FAQ baru
async function createFAQ(req, res) {
  try {
    const { questions, answer } = req.body;

    if (!questions || !answer) {
      return res.status(400).json({ success: false, message: 'Pertanyaan dan jawaban wajib diisi.' });
    }

    const [result] = await pool.query(
      'INSERT INTO faq (questions, answer) VALUES (?, ?)',
      [questions, answer]
    );

    res.status(201).json({
      success: true,
      message: 'FAQ berhasil ditambahkan.',
      data: { id: result.insertId, questions, answer },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menambahkan FAQ.' });
  }
}

// PUT /api/faq/:id
async function updateFAQ(req, res) {
  try {
    const { id } = req.params;
    const { questions, answer } = req.body;

    const [existing] = await pool.query('SELECT id FROM faq WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'FAQ tidak ditemukan.' });
    }

    await pool.query(
      'UPDATE faq SET questions = ?, answer = ? WHERE id = ?',
      [questions, answer, id]
    );

    res.json({ success: true, message: 'FAQ berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui FAQ.' });
  }
}

// DELETE /api/faq/:id
async function deleteFAQ(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM faq WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'FAQ tidak ditemukan.' });
    }
    res.json({ success: true, message: 'FAQ berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menghapus FAQ.' });
  }
}

module.exports = {
  getAllFAQ,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};
