// controllers/rutinitasController.js
const { pool } = require('../config/db');

// =============================================
// GET /rutinitas
// Mengambil data rutinitas skincare
// =============================================
async function getRutinitas(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM skin_routine');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching rutinitas:', err);
    res.status(500).json({ error: 'Gagal mengambil data rutinitas' });
  }
}

module.exports = { getRutinitas };
