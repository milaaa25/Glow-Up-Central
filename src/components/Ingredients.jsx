// src/pages/KandunganBahan.jsx
import { useState, useEffect } from 'react';
import './Ingredients.css'; // Pastikan file CSS ini sudah dibuat dan diisi dengan style yang sesuai
import { useNavigate } from 'react-router-dom';
import api from '../api';

// Mapping status (badge) -> teks status singkat yang ditampilkan di detail card.
// Data ini murni presentasional, tidak ada di tabel `ingredient`, jadi tetap
// didefinisikan di frontend berdasarkan kolom `badge` yang dikirim backend.
function getStatusText(badge) {
  switch (badge) {
    case 'aman':
      return 'Aman untuk semua kulit';
    case 'hati':
      return 'Hati-hati — mulai pelan';
    default:
      return 'Perlu resep dokter';
  }
}

function IngredientDetailCard({ ingredient }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'aman': return { bg: '#e8f5e8', color: '#2e7d32' };
      case 'hati': return { bg: '#fff3e0', color: '#e65100' };
      default: return { bg: '#fce4e4', color: '#c62828' };
    }
  };

  const statusStyle = getStatusClass(ingredient.badge);

  return (
    <div className="ing-card">
      <div className="ing-icon">{ingredient.icon}</div>
      <div className="ing-card-name">{ingredient.name}</div>
      <div className="ing-card-sub">{ingredient.sub}</div>
      <span className="badge-status" style={{ fontSize: '.7rem', padding: '4px 12px', borderRadius: '20px', background: statusStyle.bg, color: statusStyle.color }}>
        {getStatusText(ingredient.badge)}
      </span>
      <p className="ing-desc mt-3">{ingredient.manfaat}</p>
      <div className="d-flex gap-2 flex-wrap mb-2">
        <span className="ing-tag tag-waktu" style={{ background: '#fff8e1', color: '#f57f17' }}>{ingredient.waktu}</span>
      </div>
      <div className="ing-benefit">{ingredient.benefit}</div>
    </div>
  );
}

function ComboCard({ combo, isGood }) {
  return (
    <div className={`combo-card ${isGood ? 'combo-ok' : 'combo-no'}`}>
      <div className="combo-title">{combo.title}</div>
      <div className="combo-pair">
        <span className="a">{combo.pair.split('✗')[0]}</span>
        {isGood ? <span>+</span> : <span style={{ color: '#c62828', fontWeight: 700 }}>✗</span>}
        <span className="b">{combo.pair.split(isGood ? '+' : '✗')[1]}</span>
      </div>
      <p className="combo-reason">{combo.reason}</p>
    </div>
  );
}

export default function Ingredients() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ingredients, setIngredients] = useState([]); // dari GET /api/ingredients
  const [combos, setCombos] = useState([]);            // dari GET /api/ingredients/combos

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [ingRes, comboRes] = await Promise.all([
          api.get('/ingredients'),
          api.get('/ingredients/combos'),
        ]);

        if (!mounted) return;
        setIngredients(ingRes.data?.data || []);
        setCombos(comboRes.data?.data || []);
      } catch (err) {
        console.error('Gagal memuat data ingredients:', err);
        if (mounted) setError('Gagal memuat data kandungan bahan. Pastikan backend berjalan.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => { mounted = false; };
  }, []);

  const goodCombos = combos.filter(c => c.is_good === 1 || c.is_good === true);
  const badCombos = combos.filter(c => c.is_good === 0 || c.is_good === false);

  const getBadgeClass = (badge) => {
    switch (badge) {
      case 'aman': return 'badge-status badge-aman';
      case 'hati': return 'badge-status badge-hati';
      default: return 'badge-status badge-hindari';
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'aman': return { background: '#e8f5e8', color: '#2e7d32' };
      case 'hati': return { background: '#fff3e0', color: '#e65100' };
      default: return { background: '#fce4e4', color: '#c62828' };
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner-custom"></div>
        <p>Memuat data kandungan bahan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-overlay">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="kandungan-page">
      {/* Page Bar */}
      <div className="page-bar">
        <span className="page-bar-text">Person 2 · Halaman 2/3</span>
        <span className="page-bar-icon">🌿</span>
        <span> Ama — Kandungan Bahan Skincare</span>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-custom">
          <div className="hero-label">Formulasi & Bahan</div>
          <h1 className="hero-title">Kenali <em>Kandungan</em><br />Skincare-mu</h1>
          <p className="hero-sub">Memahami bahan aktif membantu kamu memilih produk yang tepat dan menghindari kombinasi yang berbahaya.</p>

          {/* Table */}
          <div className="ingredient-table">
            <table>
              <thead>
                <tr>
                  <th>Bahan Aktif</th>
                  <th>Manfaat</th>
                  <th>Cocok Untuk</th>
                  <th>Waktu Pakai</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ing) => (
                  <tr key={ing.id}>
                    <td>
                      <div className="ing-name">{ing.name}</div>
                      <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{ing.sub}</div>
                    </td>
                    <td>{ing.manfaat}</td>
                    <td>{ing.cocok}</td>
                    <td>{ing.waktu}</td>
                    <td><span className={getBadgeClass(ing.badge)} style={getBadgeStyle(ing.badge)}>{ing.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail Cards */}
          <div className="mt-5 mb-4">
            <div className="hero-label">Detail Bahan Aktif</div>
            <h2 className="section-title-custom">Panduan <em>Lengkap</em> Setiap Bahan</h2>
          </div>

          <div className="detail-grid-cards">
            {ingredients.map((ing) => (
              <IngredientDetailCard key={ing.id} ingredient={ing} />
            ))}
          </div>

          {/* Kombinasi */}
          <div className="mt-5 mb-3">
            <div className="hero-label">Panduan Kombinasi</div>
            <h2 className="section-title-custom">Bahan yang <em>Boleh</em> & Tidak Boleh Dikombinasi</h2>
            <p className="hero-sub mt-3">Mengombinasikan bahan yang salah bisa membuat produk tidak efektif atau bahkan mengiritasi kulit.</p>
          </div>

          <div className="mt-4">
            <h5 className="combo-section-title" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--sage)' }}>✅ Kombinasi yang Disarankan</h5>
            <div className="combo-grid">
              {goodCombos.map((combo) => (
                <ComboCard key={combo.id} combo={combo} isGood={true} />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h5 className="combo-section-title" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#c62828' }}>❌ Kombinasi yang Harus Dihindari</h5>
            <div className="combo-grid">
              {badCombos.map((combo) => (
                <ComboCard key={combo.id} combo={combo} isGood={false} />
              ))}
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="nav-grid mt-5">
            <button className="nav-card" onClick={() => navigate('/skincare')}>
              <div className="nav-icon">🛍️</div>
              <div className="hero-label">Halaman 1</div>
              <h3 className="nav-title">← Produk Skincare</h3>
              <p className="nav-sub">Lihat katalog produk lengkap kami</p>
            </button>
            <button className="nav-card" onClick={() => navigate('/jenis-kulit')}>
              <div className="nav-icon">🧴</div>
              <div className="hero-label">Halaman 3</div>
              <h3 className="nav-title">Jenis Kulit →</h3>
              <p className="nav-sub">Temukan rutinitas terbaik untuk kulitmu</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
