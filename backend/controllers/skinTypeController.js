// controllers/skinTypeController.js
const { pool } = require('../config/db');

// Helper: mapping visual per skin type (sesuai JenisKulit.jsx)
function getSkinTypeVisual(id, idx) {
  const visuals = {
    kering:    { image: '/images/Kulit kering.png',     emoji: '💧', label: 'Tipe 1', color: 'linear-gradient(135deg,#a8c4e0,#7ba3c7)', bgCard: '#EBF4FB', bgDetail: '#D6EAF8' },
    berminyak: { image: '/images/Kulit berminyak.png',  emoji: '✨', label: 'Tipe 2', color: 'linear-gradient(135deg,#f5d888,#e8b85a)', bgCard: '#FEF9E7', bgDetail: '#FDF2CA' },
    kombinasi: { image: '/images/Kulit Kombinasi.png',  emoji: '⚖️', label: 'Tipe 3', color: 'linear-gradient(135deg,#b8d4c0,#8fba98)', bgCard: '#EAFAF1', bgDetail: '#D5F5E3' },
    sensitif:  { image: '/images/Kulit sensitif.png',   emoji: '🌸', label: 'Tipe 4', color: 'linear-gradient(135deg,#f0b8c8,#e89ab0)', bgCard: '#FDF2F8', bgDetail: '#FADBD8' },
  };
  return visuals[id] || { image: null, emoji: null, label: `Tipe ${idx + 1}`, color: '', bgCard: '', bgDetail: '' };
}

// Helper: mapping icon & benefit per ingredient
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
// GET /api/skin-types
// Ambil semua jenis kulit (list sederhana)
// =============================================
async function getAllSkinTypes(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM skin_type ORDER BY id ASC');
    const data = rows.map((item, idx) => ({
      ...item,
      ...getSkinTypeVisual(item.id, idx),
    }));
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data tipe kulit.' });
  }
}

// =============================================
// GET /api/skin-types/full
// Ambil semua jenis kulit LENGKAP dengan
// ciri, cara, pagiSteps, malamSteps, reco
// (dipakai JenisKulit.jsx)
// =============================================
async function getAllSkinTypesFull(req, res) {
  try {
    const [skinTypes] = await pool.query('SELECT * FROM skin_type ORDER BY id ASC');
    const [details]   = await pool.query('SELECT * FROM skin_type_detail ORDER BY step_number ASC');
    const [recos]     = await pool.query('SELECT * FROM skin_type_reco');

    const fullData = skinTypes.map((skin, idx) => {
      const visual = getSkinTypeVisual(skin.id, idx);
      const myDetails = details.filter(d => d.skin_type_id === skin.id);
      const myRecos   = recos.filter(r => r.skin_type_id === skin.id);

      return {
        id:        skin.id,
        name:      skin.name,
        image:     visual.image,
        emoji:     visual.emoji,
        label:     visual.label,
        color:     visual.color,
        bgCard:    visual.bgCard,
        bgDetail:  visual.bgDetail,
        ciri:      myDetails.filter(d => d.type === 'ciri').map(d => d.title),
        cara:      myDetails.filter(d => d.type === 'cara').map(d => ({ num: d.step_number, title: d.title, desc: d.description })),
        pagiSteps: myDetails.filter(d => d.type === 'pagi').map(d => ({ title: d.title, desc: d.description })),
        malamSteps:myDetails.filter(d => d.type === 'malam').map(d => ({ title: d.title, desc: d.description })),
        reco:      myRecos.map(r => ({
          cat:  r.category,
          name: r.name,
          ing:  r.ingredients,
          img:  r.img || `/images/${r.name.replace(/ /g, '')}.png`
        })),
      };
    });

    res.json({ success: true, data: fullData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data tipe kulit lengkap.' });
  }
}

// =============================================
// GET /api/skin-types/:id
// Ambil satu skin type berdasarkan id
// =============================================
async function getSkinTypeById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM skin_type WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Tipe kulit tidak ditemukan.' });

    const visual = getSkinTypeVisual(id, 0);
    res.json({ success: true, data: { ...rows[0], ...visual } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil tipe kulit.' });
  }
}

// =============================================
// GET /api/skin-types/:id/routine
// Ambil rutinitas berdasarkan skin type
// =============================================
async function getSkinTypeRoutine(req, res) {
  try {
    const { id } = req.params;
    const { time } = req.query; // ?time=pagi / malam

    let query = 'SELECT * FROM skin_routine WHERE skin_type_id = ?';
    const params = [id];
    if (time) { query += ' AND time_of_day = ?'; params.push(time); }
    query += ' ORDER BY step_order ASC';

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil rutinitas.' });
  }
}

// =============================================
// GET /api/skincare-products
// Ambil semua produk skincare (untuk Skincare.jsx)
// =============================================
async function getAllSkincareProducts(req, res) {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM skincare_product';
    const params = [];
    if (category && category !== 'all') { query += ' WHERE category = ?'; params.push(category); }
    query += ' ORDER BY id ASC';

    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Gagal mengambil produk skincare.' });
  }
}

module.exports = {
  getAllSkinTypes,
  getAllSkinTypesFull,
  getSkinTypeById,
  getSkinTypeRoutine,
  getAllSkincareProducts,
};
