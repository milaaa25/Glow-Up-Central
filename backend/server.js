// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');

// Routes - Bagian Mila (Tim, FAQ, Kontak)
const teamRoutes = require('./routes/teamRoutes');
const faqRoutes = require('./routes/faqRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Routes - Bagian Ama (Jenis Kulit, Ingredient, Skincare Products)
const skinTypeRoutes = require('./routes/skinTypeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');

// Routes - Bagian Jesika ()
const reviewRoutes = require('./routes/reviewRoutes');
const productRoutes = require('./routes/productRoutes');

// Routes - Bagian Anes
const lookRoutes = require('./routes/lookRoutes');
const makueupRoutes = require('./routes/makeupRoutes');

// Routes - Bagian Maudi
const quizRoutes = require('./routes/quizRoutes');
const rutinitasRoutes = require('./routes/rutinitasRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());          // izinkan request dari frontend React (beda port)
app.use(express.json());  // parsing body JSON

// Route dasar, buat cek server hidup
app.get('/', (req, res) => {
  res.json({ message: 'GLOW Up Central API - Backend gabungan 🌸🌿' });
});

// Routes - Mila
app.use('/api/team', teamRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/contact', contactRoutes);

// Routes - Ama
app.use('/api/skin-types', skinTypeRoutes);
app.use('/api/ingredients', ingredientRoutes);

// Routes - Jesika
app.use('/api/reviews', reviewRoutes);
app.use('/api/products', productRoutes);

// Routes - Anes
app.use('/api/looks', lookRoutes);
app.use('/api/makeup', makueupRoutes);

// Routes - Maudi
app.use('/api/quiz', quizRoutes);
app.use('/api/rutinitas', rutinitasRoutes);

// Handle route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

// Jalankan server
app.listen(PORT, async () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  await testConnection();
});