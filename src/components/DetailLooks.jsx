import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { makeupData } from '../Data'; 
import './DetailLooks.css';

function DetailLooks() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const detail = makeupData.find((item) => item.id == id);

  if (!detail) {
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
