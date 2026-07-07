// controllers/teamController.js
const { pool } = require('../config/db');

// GET /api/team
// Ambil semua anggota tim
async function getAllTeam(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM team_member ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data tim.' });
  }
}

// GET /api/team/:id
// Ambil satu anggota tim berdasarkan id
async function getTeamById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM team_member WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Anggota tim tidak ditemukan.' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data tim.' });
  }
}

// POST /api/team
// Tambah anggota tim baru
async function createTeamMember(req, res) {
  try {
    const { name, role, photo, email, city, pages } = req.body;

    if (!name || !role) {
      return res.status(400).json({ success: false, message: 'Nama dan role wajib diisi.' });
    }

    const [result] = await pool.query(
      'INSERT INTO team_member (name, role, photo, email, city, pages) VALUES (?, ?, ?, ?, ?, ?)',
      [name, role, photo || null, email || null, city || null, pages || null]
    );

    res.status(201).json({
      success: true,
      message: 'Anggota tim berhasil ditambahkan.',
      data: { id: result.insertId, name, role, photo, email, city, pages },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menambahkan anggota tim.' });
  }
}

// PUT /api/team/:id
// Update data anggota tim
async function updateTeamMember(req, res) {
  try {
    const { id } = req.params;
    const { name, role, photo, email, city, pages } = req.body;

    const [existing] = await pool.query('SELECT id FROM team_member WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Anggota tim tidak ditemukan.' });
    }

    await pool.query(
      'UPDATE team_member SET name = ?, role = ?, photo = ?, email = ?, city = ?, pages = ? WHERE id = ?',
      [name, role, photo, email, city, pages, id]
    );

    res.json({ success: true, message: 'Data anggota tim berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui data tim.' });
  }
}

// DELETE /api/team/:id
async function deleteTeamMember(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM team_member WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Anggota tim tidak ditemukan.' });
    }
    res.json({ success: true, message: 'Anggota tim berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menghapus anggota tim.' });
  }
}

module.exports = {
  getAllTeam,
  getTeamById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
