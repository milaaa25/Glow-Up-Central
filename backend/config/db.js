// config/db.js
// Koneksi ke database MySQL (XAMPP) menggunakan connection pool
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'glow_up_central',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Tes koneksi saat server pertama kali jalan
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Database terhubung:', process.env.DB_NAME || 'glow_up_central');
    conn.release();
  } catch (err) {
    console.error('❌ Gagal konek ke database:', err.message);
  }
}

module.exports = { pool, testConnection };
