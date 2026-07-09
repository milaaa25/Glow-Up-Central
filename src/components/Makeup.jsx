import React, { useState, useEffect } from 'react';
import api from '../api';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Mapping type produk ke kategori besar
const FACE_TYPES = ["Skin Tint","Concealer","Setting Spray","Foundation","Countur","Highlighter","Bronzer","Face Mist","Cushion","Cream Blush","Liquid Blush Pink"];
const EYES_TYPES = ["Eyeliner","Eyeshadow","Clear Mascara","Brown Mascara"];
const LIPS_TYPES = ["Nude Lip Balm","Pink Lip Tint","Lip Stain","Glossy Tint","Matte Red Lipstick","Lip Liner","Nude Gloss","Orange Lip","Vinyl Ink","Lip Tint","Lip Matte"];

const CATEGORIES = [
  { key: 'Semua', icon: '🛍️', label: 'Semua' },
  { key: 'Face',  icon: '💫', label: 'Face' },
  { key: 'Eyes',  icon: '👁️', label: 'Eyes' },
  { key: 'Lips',  icon: '💋', label: 'Lips' },
];

function Makeup() {
  const [activeType, setActiveType] = useState('Semua');
  const [activeSubType, setActiveSubType] = useState('Semua');
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [products, setProducts]     = useState([]);       // dari GET /api/makeup (tabel makeup_product)
  const [apiCategories, setApiCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/makeup');
        const rows = res.data?.data || [];

        if (!mounted) return;
        setProducts(rows);

        // id dari API dipakai sebagai key unik untuk tiap kategori badge
        const cats = CATEGORIES.map((cat, i) => ({
          id:    rows[i]?.id ?? i, // fallback ke index kalau data kurang
          key:   cat.key,
          icon:  cat.icon,
          label: cat.label,
        }));
        setApiCategories(cats);
      } catch (err) {
        console.error('Makeup API error:', err);
        setError('Gagal memuat data produk makeup. Pastikan backend berjalan.');
        // Fallback tanpa id API
        setApiCategories(CATEGORIES.map((cat, i) => ({ id: i, ...cat })));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => { mounted = false; };
  }, []);

  function getFilteredProducts(activeKey) {
    if (activeKey === 'Semua') return products;
    if (activeKey === 'Face')  return products.filter(p => FACE_TYPES.includes(p.type));
    if (activeKey === 'Eyes')  return products.filter(p => EYES_TYPES.includes(p.type));
    if (activeKey === 'Lips')  return products.filter(p => LIPS_TYPES.includes(p.type));
    return products;
  }

  // Semua type unik dari products
  const allTypes = ['Semua', ...new Set(products.map(p => p.type))];

  // Filter: pertama badge kategori, lalu pill per type
  let filteredProducts = getFilteredProducts(activeType);
  if (activeSubType !== 'Semua') {
    filteredProducts = filteredProducts.filter(p => p.type === activeSubType);
  }

  // Pill type yang relevan untuk kategori aktif
  const relevantTypes = activeType === 'Semua'
    ? allTypes
    : ['Semua', ...new Set(getFilteredProducts(activeType).map(p => p.type))];

  if (loading) {
    return (
      <main className="py-5" style={{ backgroundColor: '#fffbf2', minHeight: '100vh' }}>
        <Container>
          <div className="text-center py-5">
            <div style={{
              display: 'inline-block', width: 40, height: 40,
              border: '3px solid #fbcad9', borderTop: '3px solid #c3073f',
              borderRadius: '50%', animation: 'spin 0.8s linear infinite'
            }} />
            <p style={{ color: '#9b7e70', marginTop: '1rem' }}>Memuat data produk makeup...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        </Container>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-5" style={{ backgroundColor: '#fffbf2', minHeight: '100vh' }}>
        <Container>
          <p className="text-center text-muted">{error}</p>
        </Container>
      </main>
    );
  }

  return (
    <main className="py-5" style={{ backgroundColor: '#fffbf2', minHeight: '100vh' }}>
      <Container>

        {/* Header */}
        <div className="text-center py-4 mb-4 rounded-4 shadow-sm" style={{ background: '#fff0f3', border: '1px solid #fbcad9' }}>
          <h1 className="fw-bold text-uppercase m-0" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px', color: '#6b3e2e' }}>
            Produk Makeup
          </h1>
          <p className="text-muted mt-2 mb-0">Temukan semua produk makeup rekomendasi kami</p>
        </div>

        {/* Kategori dari API — bisa diklik sebagai filter */}
        {apiCategories.length > 0 && (
          <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center">
            {apiCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveType(cat.key); setActiveSubType('Semua'); }}
                style={{
                  background: activeType === cat.key ? '#c3073f' : '#fff0f3',
                  border: '1px solid #fbcad9',
                  borderRadius: 8, padding: '0.5rem 1.5rem',
                  fontSize: '0.85rem',
                  color: activeType === cat.key ? '#fff' : '#6b3e2e',
                  fontWeight: activeType === cat.key ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.icon} {cat.label}
                <span style={{ marginLeft: 6, fontSize: '0.72rem', opacity: 0.75 }}>
                  ({getFilteredProducts(cat.key).length})
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Filter pill per type */}
        <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
          {relevantTypes.map((type, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSubType(type)}
              style={{
                background: activeSubType === type ? '#6b3e2e' : '#fff',
                border: '1px solid #d4b8a8',
                borderRadius: 20, padding: '0.3rem 0.9rem',
                fontSize: '0.78rem',
                color: activeSubType === type ? '#fff' : '#6b3e2e',
                fontWeight: activeSubType === type ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Jumlah produk */}
        <p className="text-center text-muted mb-4" style={{ fontSize: '0.82rem' }}>
          Menampilkan <strong>{filteredProducts.length}</strong> produk
        </p>

        {/* Grid Produk */}
        <Row className="g-4">
          {filteredProducts.map((prod) => (
            <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 border-0 shadow-sm rounded-0" style={{ backgroundColor: '#fde4cf' }}>
                <div className="bg-white m-3 p-4 text-center" style={{ height: '200px' }}>
                  <Card.Img
                    variant="top"
                    src={prod.img}
                    className="h-100 w-100"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <Card.Body className="pt-0 text-center">
                  <span style={{ fontSize: '0.7rem', color: '#c3073f', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {prod.type}
                  </span>
                  <Card.Title className="fw-bold mb-1 mt-1" style={{ fontSize: '0.9rem', height: '3rem', overflow: 'hidden' }}>
                    {prod.name.toUpperCase()}
                  </Card.Title>
                  <Card.Text className="text-muted small fst-italic">
                    {prod.brand}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </main>
  );
}

export default Makeup;
