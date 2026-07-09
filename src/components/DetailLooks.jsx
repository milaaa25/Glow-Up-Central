import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { makeupData } from '../Data';
import './DetailLooks.css';

function DetailLooks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api.get(`/looks/${id}`)
      .then((res) => {
        const d = res.data?.data;
        if (!d) {
          setNotFound(true);
          return;
        }
        setDetail({
          title: d.title,
          artist: d.artist,
          description: d.description,
          img: d.img,
          categories: d.categories || [],
          tutorial: (d.tutorialSteps || []).map((t) => ({
            step: t.step_number,
            title: t.title,
            desc: t.description,
          })),
        });
      })
      .catch((err) => {
        console.error('DetailLooks API error:', err);
        // Fallback ke data statis lokal kalau backend tidak bisa dihubungi
        const fallback = makeupData.find((item) => item.id == id);
        if (fallback) {
          setDetail(fallback);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <div style={{ display: 'inline-block', width: 40, height: 40, border: '3px solid #fbcad9', borderTop: '3px solid #c3073f', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p className="text-muted mt-3">Memuat detail look...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </Container>
    );
  }

  if (notFound || !detail) {
    return (
      <Container className="text-center py-5">
        <h3>Ups! Detail Look Tidak Ditemukan</h3>
        <Button variant="dark" onClick={() => navigate('/')}>Kembali ke Beranda</Button>
      </Container>
    );
  }

  return (
    <main className="py-5" style={{ backgroundColor: '#fffbf2', minHeight: '100vh' }}>
      <Container>

        {/* Tombol Back */}
        <button 
          onClick={() => navigate(-1)}
          className="text-dark text-decoration-none mb-4 p-0"
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', fontSize: '0.95rem' }}
        >
          &larr; Back to Inspirations
        </button>

        {/* Gambar + Judul + Deskripsi */}
        <Row className="mb-5 align-items-center">
          <Col md={5}>
            <img 
              src={detail.img} 
              alt={detail.title} 
              className="img-fluid rounded-4 shadow-sm w-100" 
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={7} className="ps-md-5 mt-4 mt-md-0">
            <h1 className="fw-bold display-6">{detail.title}</h1>
            <p className="text-muted">
              Inspiration by <span className="text-dark fw-bold">{detail.artist}</span>
            </p>
            <hr />
            <p className="lh-lg text-secondary" style={{ textAlign: 'justify' }}>
              {detail.description}
            </p>
          </Col>
        </Row>

        {/* Section Kategori Produk */}
        {detail.categories && detail.categories.length > 0 && (
          <>
            <div className="text-center mt-4 mb-4">
              <h3 className="fw-bold">🛍️ Produk yang Dipakai</h3>
              <p className="text-muted">Kategori produk yang membentuk look ini.</p>
            </div>
            <Row className="g-3 mb-5">
              {detail.categories.map((c, idx) => (
                <Col key={idx} xs={12} sm={6} md={3}>
                  <div className="h-100 p-3 rounded-4 shadow-sm text-center" style={{ backgroundColor: '#fde4cf' }}>
                    <h6 className="fw-bold mb-2" style={{ color: '#6b3e2e' }}>{c.name}</h6>
                    <p className="small text-secondary mb-0">{(c.items || []).join(', ')}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Section Tutorial */}
        {detail.tutorial && detail.tutorial.length > 0 && (
          <>
            <div className="text-center mt-5 mb-4">
              <h3 className="fw-bold">✨ Tutorial Cara Makeup</h3>
              <p className="text-muted">Ikuti langkah-langkah berikut untuk mendapatkan look ini.</p>
            </div>

            <Row className="g-4 mb-5">
              {detail.tutorial.map((t) => (
                <Col key={t.step} xs={12} sm={6} md={4}>
                  <div 
                    className="h-100 p-4 rounded-4 shadow-sm"
                    style={{ backgroundColor: '#fff0f3', border: '1px solid #fbcad9' }}
                  >
                    <div 
                      className="fw-bold mb-2 d-inline-flex align-items-center justify-content-center rounded-circle"
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        backgroundColor: '#c3073f', 
                        color: '#fff', 
                        fontSize: '0.9rem' 
                      }}
                    >
                      {t.step}
                    </div>
                    <h6 className="fw-bold mt-2 mb-1" style={{ color: '#6b3e2e' }}>{t.title}</h6>
                    <p className="text-secondary small lh-lg mb-0" style={{ textAlign: 'justify' }}>
                      {t.desc}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}

      </Container>
    </main>
  );
}

export default DetailLooks;
