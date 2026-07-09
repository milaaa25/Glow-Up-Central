// src/pages/JenisKulit.jsx
import { useState, useEffect } from 'react';
import './JenisKulit.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// ── PERUBAHAN DI SINI: terima navigate sebagai prop ──
function SkinDetailSection({ skin, navigate }) {
  const [openAcc, setOpenAcc] = useState('pagi');

  // ── FUNGSI NAVIGATE KE PRODUK SPESIFIK ──
  const goToProduct = (productName) => {
    navigate('/skincare', { state: { scrollToProduct: productName } });
  };

  return (
    <div className="skin-detail-section" style={{ background: skin.bgDetail }}>
      <div className="skin-detail-header">
        <div className="skin-detail-icon" style={{ background: skin.color }}>
          {skin.image ? (
            <img
              src={skin.image}
              alt={skin.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
            />
          ) : (
            skin.emoji
          )}
        </div>
        <div>
          <div className="hero-label" style={{ color: '#c97b5a' }}>{skin.label}</div>
          <h2 className="section-title-custom">Kulit <em>{skin.name.replace('Kulit ', '')}</em></h2>
        </div>
      </div>

      <div className="detail-grid">

        {/* Ciri-ciri */}
        <div>
          <h6 className="section-label">Ciri-ciri</h6>
          <ul className="ciri-list">
            {skin.ciri.map((c, i) => <li key={i}>{skin.emoji} {c}</li>)}
          </ul>
        </div>

        {/* Cara Merawat */}
        <div>
          <h6 className="section-label">Cara Merawat</h6>
          {skin.cara.map(s => (
            <div key={s.num} className="step-item-custom">
              <div className="step-circle" style={{ backgroundColor: '#c97b5a' }}>{s.num}</div>
              <div className="step-text-custom">
                <strong>{s.title}</strong><br />{s.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Rutinitas */}
        <div>
          <h6 className="section-label">Rutinitas Harian</h6>

          <div className="accordion-item-custom">
            <button
              className={`accordion-btn-custom ${openAcc === 'pagi' ? 'active' : ''}`}
              onClick={() => setOpenAcc(openAcc === 'pagi' ? '' : 'pagi')}
              style={{ backgroundColor: skin.bgCard }}
            >
              ☀️ Rutinitas Pagi
            </button>
            {openAcc === 'pagi' && (
              <div className="accordion-body-custom" style={{ backgroundColor: skin.bgCard }}>
                {skin.pagiSteps.map((s, i) => (
                  <div key={i} className="step-item-custom">
                    <div className="step-circle" style={{ backgroundColor: '#7a9e7e' }}>{i + 1}</div>
                    <div className="step-text-custom">
                      <strong>{s.title}</strong><br />{s.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="accordion-item-custom">
            <button
              className={`accordion-btn-custom ${openAcc === 'malam' ? 'active' : ''}`}
              onClick={() => setOpenAcc(openAcc === 'malam' ? '' : 'malam')}
              style={{ backgroundColor: skin.bgCard }}
            >
              🌙 Rutinitas Malam
            </button>
            {openAcc === 'malam' && (
              <div className="accordion-body-custom" style={{ backgroundColor: skin.bgCard }}>
                {skin.malamSteps.map((s, i) => (
                  <div key={i} className="step-item-custom">
                    <div className="step-circle" style={{ backgroundColor: '#c97b5a' }}>{i + 1}</div>
                    <div className="step-text-custom">
                      <strong>{s.title}</strong><br />{s.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── REKOMENDASI PRODUK — klik langsung ke produk di Skincare ── */}
        <div>
          <h6 className="section-label">Rekomendasi Produk</h6>
          <div className="reco-grid">
            {skin.reco.map((r, i) => (
              <div
                key={i}
                className="reco-card-custom"
                onClick={() => goToProduct(r.name)} // ← PERUBAHAN DI SINI
                style={{ cursor: 'pointer' }}
              >
                <div className="reco-img-wrap" style={{ background: skin.bgCard, padding: 0 }}>
                  <img
                    src={r.img}
                    alt={r.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className="reco-body">
                  <div className="reco-cat">{r.cat}</div>
                  <div className="reco-name">{r.name}</div>
                  <div className="reco-ing">{r.ing}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function JenisKulit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSkin, setActiveSkin] = useState(null);
  const [skinTypes, setSkinTypes] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function fetchSkinTypes() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/skin-types/full');
        if (mounted) setSkinTypes(res.data?.data || []);
      } catch (err) {
        console.error('Gagal memuat data jenis kulit:', err);
        if (mounted) setError('Gagal memuat data jenis kulit. Pastikan backend berjalan.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchSkinTypes();
    return () => { mounted = false; };
  }, []);

  return (
    <main className="jenis-kulit-page">

      <div className="page-bar">
        <span className="page-bar-text">Person 2 · Halaman 3/3</span>
        <span className="page-bar-icon">🌿</span>
        <span> Ama — Jenis Kulit & Cara Merawatnya</span>
      </div>

      <section className="hero-section">
        <div className="container-custom">

          <div className="hero-label">Kenali Kulitmu</div>
          <h1 className="hero-title">4 <em>Jenis Kulit</em><br />& Cara Merawatnya</h1>
          <p className="hero-sub">
            Memahami jenis kulitmu adalah langkah pertama untuk memilih produk
            yang tepat dan mendapatkan hasil yang optimal.
          </p>

          {loading ? (
            <div className="loading-overlay">
              <div className="spinner-custom"></div>
              <p>Memuat data jenis kulit...</p>
            </div>
          ) : error ? (
            <div className="loading-overlay">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="skin-grid">
                {skinTypes.map(skin => (
                  <div
                    key={skin.id}
                    className={`skin-card-custom ${activeSkin === skin.id ? 'active' : ''}`}
                    onClick={() => setActiveSkin(activeSkin === skin.id ? null : skin.id)}
                    style={{ backgroundColor: skin.bgCard }}
                  >
                    <div className="skin-img-wrap" style={{ background: skin.color }}>
                      {skin.image ? (
                        <img
                          src={skin.image}
                          alt={skin.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        skin.emoji
                      )}
                    </div>
                    <div className="skin-card-body">
                      <div className="skin-label">{skin.label}</div>
                      <h3 className="skin-name">{skin.name}</h3>
                      <div className="ciri-badges">
                        {skin.ciri.slice(0, 2).map((c, i) => (
                          <span key={i} className="ciri-badge" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="view-detail" style={{ color: '#c97b5a' }}>
                        {activeSkin === skin.id ? '▲ Sembunyikan' : '▼ Lihat Detail'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {activeSkin ? (
                <SkinDetailSection
                  skin={skinTypes.find(s => s.id === activeSkin)}
                  navigate={navigate}
                />
              ) : (
                skinTypes.map(skin => (
                  <SkinDetailSection key={skin.id} skin={skin} navigate={navigate} />
                ))
              )}

              <div className="nav-grid">
                <button className="nav-card" onClick={() => navigate('/Skincare')}>
                  <div className="nav-icon">🛍️</div>
                  <div className="hero-label">Halaman 1</div>
                  <h3 className="nav-title">← Produk Skincare</h3>
                  <p className="nav-sub">Lihat katalog produk lengkap</p>
                </button>
                <button className="nav-card" onClick={() => navigate('/Ingredients')}>
                  <div className="nav-icon">🔬</div>
                  <div className="hero-label">Halaman 2</div>
                  <h3 className="nav-title">← Kandungan Bahan</h3>
                  <p className="nav-sub">Pelajari bahan aktif & kombinasinya</p>
                </button>
              </div>
            </>
          )}

        </div>
      </section>
    </main>
  );
}
