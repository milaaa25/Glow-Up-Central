// controllers/ingredientController.js
const { pool } = require('../config/db');

// Helper icon & benefit per ingredient (sesuai Ingredients.jsx)
function getIngredientExtra(name) {
  const map = {
    'Niacinamide':          { icon: '✨', benefit: '✓ Brightening  ✓ Pori  ✓ Barrier  ✓ Acne' },
    'Vitamin C':            { icon: '🍊', benefit: '✓ Brightening  ✓ Anti-UV  ✓ Bekas jerawat' },
    'Retinol':              { icon: '🌙', benefit: '✓ Anti-aging  ✓ Jerawat  ✓ Kolagen  ✓ Tekstur' },
    'AHA (Glycolic Acid)':  { icon: '🔬', benefit: '✓ Tekstur  ✓ Brightening  ✓ Penyerapan produk' },
    'BHA (Salicylic Acid)': { icon: '🧴', benefit: '✓ Komedo  ✓ Jerawat  ✓ Pori dalam' },
    'Hyaluronic Acid':      { icon: '💧', benefit: '✓ Hidrasi  ✓ Plumping  ✓ Non-comedogenic' },
    'Ceramide':             { icon: '🛡️', benefit: '✓ Barrier  ✓ Hidrasi  ✓ Sensitif aman' },
    'Peptide':              { icon: '⚗️', benefit: '✓ Kolagen  ✓ Elastisitas  ✓ Anti-aging' },
    'Benzoyl Peroxide':     { icon: '⚡', benefit: '✓ Jerawat aktif  ✓ Antibakteri' },
    'Kojic Acid':           { icon: '🌾', benefit: '✓ Pigmentasi  ✓ Melasma  ✓ Brightening' },
    'Zinc PCA':             { icon: '🧪', benefit: '✓ Sebum control  ✓ Anti-inflamasi' },
    'Hydroquinone':         { icon: '⚠️', benefit: '✓ Flek hitam kuat  ✓ Hiperpigmentasi' },
  };
  return map[name] || { icon: '🌿', benefit: '-' };
}

// =============================================
// GET /api/ingredients
// Ambil semua bahan aktif lengkap dengan icon & benefit
// (untuk tabel di Ingredients.jsx)
// =============================================
async function getAllIngredients(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM ingredient ORDER BY id ASC');
    const data = rows.map(item => {
      const extra = getIngredientExtra(item.name);
      return {
        ...item,
        icon:    item.icon    || extra.icon,
        benefit: item.benefit || extra.benefit,
      };
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data ingredient.' });
  }
}

// =============================================
// GET /api/ingredients/:id
// =============================================
async function getIngredientById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM ingredient WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Ingredient tidak ditemukan.' });

    const extra = getIngredientExtra(rows[0].name);
    res.json({ success: true, data: { ...rows[0], icon: rows[0].icon || extra.icon, benefit: rows[0].benefit || extra.benefit } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil ingredient.' });
  }
}

// =============================================
// GET /api/ingredients/combos
// Ambil kombinasi bahan (goodCombos di Ingredients.jsx)
// =============================================
async function getIngredientCombos(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM ingredient_combo ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil kombinasi bahan.' });
  }
}

// =============================================
// POST /api/ingredients
// =============================================
async function createIngredient(req, res) {
  try {
    const { name, sub, manfaat, cocok, waktu, status, badge, benefit, icon } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Nama ingredient wajib diisi.' });

    const [result] = await pool.query(
      'INSERT INTO ingredient (name, sub, manfaat, cocok, waktu, status, badge, benefit, icon) VALUES (?,?,?,?,?,?,?,?,?)',
      [name, sub, manfaat, cocok, waktu, status, badge, benefit, icon]
    );
    res.status(201).json({ success: true, message: 'Ingredient berhasil ditambahkan.', data: { id: result.insertId, name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menambahkan ingredient.' });
  }
}

// =============================================
// PUT /api/ingredients/:id
// =============================================
async function updateIngredient(req, res) {
  try {
    const { id } = req.params;
    const { name, sub, manfaat, cocok, waktu, status, badge, benefit, icon } = req.body;

    const [existing] = await pool.query('SELECT id FROM ingredient WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ success: false, message: 'Ingredient tidak ditemukan.' });

    await pool.query(
      'UPDATE ingredient SET name=?,sub=?,manfaat=?,cocok=?,waktu=?,status=?,badge=?,benefit=?,icon=? WHERE id=?',
      [name, sub, manfaat, cocok, waktu, status, badge, benefit, icon, id]
    );
    res.json({ success: true, message: 'Ingredient berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui ingredient.' });
  }
}

// =============================================
// DELETE /api/ingredients/:id
// =============================================
async function deleteIngredient(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM ingredient WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Ingredient tidak ditemukan.' });
    res.json({ success: true, message: 'Ingredient berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal menghapus ingredient.' });
  }
}

module.exports = { getAllIngredients, getIngredientById, getIngredientCombos, createIngredient, updateIngredient, deleteIngredient };
