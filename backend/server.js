// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');

const teamRoutes = require('./routes/teamRoutes');
const faqRoutes = require('./routes/faqRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());          // izinkan request dari frontend React (beda port)
app.use(express.json());  // parsing body JSON

// Route dasar, buat cek server hidup
app.get('/', (req, res) => {
  res.json({ message: 'GLOW Up Central API - Bagian Mila (Tim, FAQ, Kontak) 🌸' });
});

// Routes utama
app.use('/api/team', teamRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/contact', contactRoutes);

// Handle route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

// Jalankan server
app.listen(PORT, async () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  await testConnection();
});
