import { useState, useEffect, useRef } from 'react';
import './Skincare.css';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

const categories = [
  { id: 'semua',       name: 'Semua' },
  { id: 'cleanser',    name: 'Cleanser' },
  { id: 'serum',       name: 'Serum' },
  { id: 'moisturizer', name: 'Moisturizer' },
  { id: 'sunscreen',   name: 'Sunscreen' },
  { id: 'toner',       name: 'Toner' },
  { id: 'night-cream', name: 'Night Cream' },
  { id: 'eye-care',    name: 'Eye Care' },
  { id: 'exfoliator',  name: 'Exfoliator' },
  { id: 'essence',     name: 'Essence' }
];

const routineSteps = [
  { num: '01', name: 'Cleanser',    product: 'Green Tea Cleanser' },
  { num: '02', name: 'Toner',       product: 'Rose Water Toner' },
  { num: '03', name: 'Essence',     product: 'Niacinamide 10%' },
  { num: '04', name: 'Serum',       product: 'Vitamin C Serum' },
  { num: '05', name: 'Eye Cream',   product: 'Peptide Eye Cream' },
  { num: '06', name: 'Moisturizer', product: 'Hyaluron Moist.' },
  { num: '07', name: 'Sunscreen',   product: 'Sun Shield SPF50+' }
];

// Kolom `badges` di tabel skincare_product disimpan sebagai longtext JSON,
// jadi bisa datang dalam bentuk string mentah dari backend — parse dulu.
function parseBadges(badges) {
  if (Array.isArray(badges)) return badges;
  if (typeof badges === 'string') {
    try {
      const parsed = JSON.parse(badges);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function ProductCard({ product, isHighlighted }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [isHighlighted]);

  const getBadgeClass = (badge) => {
    const badgeMap = {
      'Semua Kulit':  'badge-all',
      'Berminyak':    'badge-oil',
      'Kering':       'badge-dry',
      'Sensitif':     'badge-sens',
      'Kombinasi':    'badge-combo',
      'Sangat Kering':'badge-dry',
      'Kusam':        'badge-dry',
      'Dewasa':       'badge-all'
    };
    return badgeMap[badge] || 'badge-all';
  };

  return (
    <div className="product-col" ref={cardRef}>
      <div
        className="product-card"
        style={isHighlighted ? {
          outline: '3px solid #c97b5a',
          boxShadow: '0 0 20px rgba(201,123,90,0.4)',
          transform: 'scale(1.02)',
          transition: 'all 0.3s ease'
        } : {}}
      >
        <div className="product-img-box">
          <img src={product.img} alt={product.name} className="product-img-photo" />
        </div>
        <div className="product-body">
          <div className="product-cat">{product.category}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-desc">{product.desc}</div>
          <div className="product-badges">
            {product.badges.map((badge, idx) => (
              <span key={idx} className={`badge-skin ${getBadgeClass(badge)}`}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skincare() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading]                       = useState(true);
  const [error, setError]                           = useState(null);
  const [products, setProducts]                     = useState([]);
  const [activeFilter, setActiveFilter]             = useState('semua');
  const [filteredProducts, setFilteredProducts]     = useState([]);
  const [highlightedProduct, setHighlightedProduct] = useState(null);
  const [articles, setArticles]                     = useState([]);

  // Ambil produk skincare dari backend (tabel skincare_product)
  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/skin-types/products');
        const rows = res.data?.data || [];
        const normalized = rows.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          img: p.img,
          desc: p.description,
          badges: parseBadges(p.badges),
        }));
        if (mounted) setProducts(normalized);
      } catch (err) {
        console.error('Gagal memuat produk skincare:', err);
        if (mounted) setError('Gagal memuat data produk skincare. Pastikan backend berjalan.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => { mounted = false; };
  }, []);

  // Konten tips ini murni editorial (tidak ada tabel artikel di backend),
  // jadi tidak perlu "fetch" dari mana pun. Langsung pakai data lokal.
  useEffect(() => {
    const ARTICLE_DATA = [
      { tag: 'Cleansing',  emoji: '🫧', title: 'Double Cleansing: Kenapa Wajib?',         summary: 'Pastikan semua kotoran, sunscreen, dan makeup terangkat sempurna sebelum skincare berikutnya diserap kulit.' },
      { tag: 'Routine',    emoji: '✨', title: 'Urutan Layering Skincare yang Benar',       summary: 'Produk tipis (toner, serum) dulu sebelum produk berat (moisturizer) agar penyerapan optimal.' },
      { tag: 'Sun Care',   emoji: '☀️', title: 'Sunscreen Setiap Hari, Hujan atau Terik',  summary: 'UV A menembus awan dan kaca. Tanpa SPF, proses penuaan berlangsung lebih cepat.' },
      { tag: 'Safety',     emoji: '🧪', title: 'Patch Test Sebelum Coba Produk Baru',      summary: 'Oleskan sedikit produk di belakang telinga. Tunggu 24 jam sebelum ke seluruh wajah.' },
      { tag: 'Hydration',  emoji: '💧', title: 'Hidrasi vs Melembapkan: Beda Lho!',        summary: 'Hydrator (HA) menarik air ke kulit, moisturizer (ceramide) menguncinya. Keduanya perlu dipakai.' },
    ];
    setArticles(ARTICLE_DATA.map((art, i) => ({ id: i + 1, ...art })));
  }, []);

  // Handle navigasi dari Quiz - auto filter badge jenis kulit
  const [quizBadge, setQuizBadge] = useState(null);

  useEffect(() => {
    if (location.state?.fromQuiz && location.state?.skinType) {
      const skinType = location.state.skinType; // e.g. "Berminyak", "Kering", dll
      setQuizBadge(skinType);
      // Scroll ke produk grid setelah sebentar
      setTimeout(() => {
        document.querySelector('.product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
    if (location.state?.scrollToProduct && products.length > 0) {
      const productName = location.state.scrollToProduct;
      const found = products.find(p =>
        p.name.toLowerCase() === productName.toLowerCase()
      );
      if (found) {
        setActiveFilter(found.category);
        setHighlightedProduct(found.id);
        setTimeout(() => setHighlightedProduct(null), 3000);
      }
    }
  }, [location.state, products]);

  useEffect(() => {
    let result = products;
    if (activeFilter !== 'semua') {
      result = result.filter(p => p.category === activeFilter);
    }
    if (quizBadge) {
      result = result.filter(p => p.badges.includes(quizBadge));
    }
    setFilteredProducts(result);
  }, [products, activeFilter, quizBadge]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner-custom"></div>
        <p>Memuat data produk skincare...</p>
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
    <main className="produk-page">
      <div className="page-bar">
        <span className="page-bar-text">Person 2 · Halaman 1/3</span>
        <span className="page-bar-icon">🌿</span>
        <span> Ama — Halaman Skincare Utama</span>
      </div>
      <section className="hero-section">
        <div className="container-custom">
          <div className="hero-label">Perawatan Kulit</div>
          <h1 className="hero-title">Produk <em>Skincare</em><br />Terbaik Kami</h1>
          <p className="hero-sub">
            Produk-produk pilihan yang telah teruji secara dermatologis,
            cocok untuk berbagai jenis kulit.
          </p>
          {/* Banner hasil quiz */}
          {quizBadge && (
            <div style={{
              background: '#fff0f3', border: '1px solid #fbcad9',
              borderRadius: 10, padding: '0.9rem 1.25rem',
              marginBottom: '1rem', display: 'flex',
              alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '0.5rem'
            }}>
              <span style={{ color: '#6b3e2e', fontSize: '0.9rem', fontWeight: 600 }}>
                🧴 Hasil Quiz: menampilkan produk untuk kulit <strong style={{ color: '#c3073f' }}>{quizBadge}</strong>
              </span>
              <button
                onClick={() => setQuizBadge(null)}
                style={{
                  background: 'none', border: '1px solid #fbcad9',
                  borderRadius: 6, padding: '0.25rem 0.75rem',
                  color: '#9b7e70', cursor: 'pointer', fontSize: '0.78rem'
                }}
              >
                ✕ Hapus filter quiz
              </button>
            </div>
          )}

          <div className="filter-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-pill ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isHighlighted={highlightedProduct === product.id}
                />
              ))
            ) : (
              <div className="empty-msg">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--brown)' }}>
                  Produk tidak ditemukan
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '8px' }}>
                  Belum ada produk di kategori ini.
                </p>
              </div>
            )}
          </div>
          <div className="routine-banner">
            <div className="routine-header">
              <div>
                <div className="hero-label">Panduan Pemakaian</div>
                <h2 className="section-title-custom">Urutan Skincare <em>yang Benar</em></h2>
              </div>
            </div>
            <div className="routine-steps">
              {routineSteps.map(step => (
                <div key={step.num} className="routine-step">
                  <div className="step-num">{step.num}</div>
                  <div className="step-name">{step.name}</div>
                  <div className="step-prod">{step.product}</div>
                </div>
              ))}
            </div>
          </div>
          {articles.length > 0 && (
            <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
              <div className="hero-label">Tips dari Kami</div>
              <h2 className="section-title-custom">Tips <em>Skincare</em> Penting</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                {articles.map(art => (
                  <div key={art.id} style={{ background: 'white', border: '1px solid #e8c5b5', borderRadius: 8, padding: '1.2rem' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{art.emoji}</div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4876b', fontWeight: 600 }}>{art.tag}</span>
                    <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#6b3e2e', margin: '0.4rem 0' }}>{art.title}</h4>
                    <p style={{ fontSize: '0.78rem', color: '#9b7e70', lineHeight: 1.6, margin: 0 }}>{art.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="nav-grid">
            <button className="nav-card" onClick={() => navigate('/Ingredients')}>
              <div className="nav-icon">🔬</div>
              <div className="hero-label">Halaman 2</div>
              <h3 className="nav-title">Kandungan Bahan →</h3>
              <p className="nav-sub">Pelajari bahan aktif, keamanan, dan kombinasi yang tepat</p>
            </button>
            <button className="nav-card" onClick={() => navigate('/jenis-kulit')}>
              <div className="nav-icon">🧴</div>
              <div className="hero-label">Halaman 3</div>
              <h3 className="nav-title">Jenis Kulit →</h3>
              <p className="nav-sub">Kenali kulitmu & temukan rutinitas skincare yang tepat</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
