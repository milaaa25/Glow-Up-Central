// controllers/contactController.js
const { pool } = require('../config/db');

// Subjek yang valid, sesuai dropdown di Kontak.jsx
const VALID_SUBJEK = ['Pertanyaan Produk', 'Pemesanan', 'Keluhan', 'Kerja Sama', 'Lainnya'];

// POST /api/contact
// Submit pesan dari form kontak (sesuai validasi di Kontak.jsx)
async function createContactMessage(req, res) {
  try {
    const { nama, email, subjek, pesan } = req.body;
    const errors = {};

    // Validasi sama seperti di frontend (Kontak.jsx -> validate())
    if (!nama || !nama.trim()) errors.nama = 'Nama wajib diisi';

    if (!email || !email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Format email tidak valid';
    }

    if (!subjek) {
      errors.subjek = 'Pilih subjek terlebih dahulu';
    } else if (!VALID_SUBJEK.includes(subjek)) {
      errors.subjek = 'Subjek tidak valid';
    }

    if (!pesan || !pesan.trim()) {
      errors.pesan = 'Pesan wajib diisi';
    } else if (pesan.trim().length < 20) {
      errors.pesan = 'Pesan minimal 20 karakter';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const [result] = await pool.query(
      'INSERT INTO contact_message (nama, email, subjek, pesan) VALUES (?, ?, ?, ?)',
      [nama.trim(), email.trim(), subjek, pesan.trim()]
    );

    res.status(201).json({
      success: true,
      message: 'Pesan berhasil diterima!',
      data: { id: result.insertId, nama, email, subjek, pesan },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengirim pesan. Coba lagi.' });
  }
}

// GET /api/contact
// Ambil semua pesan kontak (buat admin/dashboard, bukan dipakai user biasa)
async function getAllContactMessages(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_message ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data pesan.' });
  }
}

// DELETE /api/contact/:id
async function deleteContactMessage(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM contact_message WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan.' });
    }
    res.json({ success: true, message: 'Pesan berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menghapus pesan.' });
  }
}

module.exports = {
  createContactMessage,
  getAllContactMessages,
  deleteContactMessage,
};
