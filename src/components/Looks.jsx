import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import api from '../api';
import './Looks.css';

// Fallback statis dipakai kalau backend sedang tidak jalan,
// supaya halaman tetap bisa ditampilkan.
const FALLBACK_INSPIRATIONS = [
  { id: 1, title: "Natural Makeup Look", artist: "natural makeup look ini menghadirkan tampilan riasan yang simple, fresh, dan effortless dengan hasil akhir yang ringan namun tetap flawless.", img: "https://i.pinimg.com/736x/82/6c/82/826c828b5465411a36e6afe85e2d4a83.jpg" },
  { id: 2, title: "Glam Evening Look", artist: "Makeup ini cocok digunakan untuk pesta, acara formal, photoshoot, maupun special occasion karena memberikan tampilan yang lebih stunning dan percaya diri.", img: "https://i.pinimg.com/736x/16/a8/be/16a8be8e6ebe29b358b3c1839d0f7bde.jpg" },
  { id: 3, title: "K-Makeup Look", artist: "Fokus utama makeup look ini terletak pada complexion ringan, alis natural, eye makeup soft, serta penggunaan warna-warna lembut yang memberikan kesan youthful dan clean.", img: "https://i.pinimg.com/736x/86/9b/71/869b7145c0636f6b97fb62c307c7fc4c.jpg" },
  { id: 4, title: "Sunset Bronze Look", artist: "Look ini menghadirkan tampilan makeup hangat dengan perpaduan warna bronze, sentuhan orange yang terinspirasi dari suasana sunset ✨", img: "https://i.pinimg.com/736x/e4/8a/e6/e48ae684515b90c9771271d6fa05220d.jpg" },
  { id: 5, title: "baddie Makeup Look", artist: "look ini ada pada complexion yang flawless dan tegas, contour yang terdefinisi, alis yang rapi dan bold, serta eye makeup yang tajam untuk memberikan kesan powerful.", img: "https://i.pinimg.com/1200x/19/83/1b/19831b5353ea2c4ba23fbfa41624f37e.jpg" },
  { id: 6, title: "Straweberry Makeup", artist: "Look ini menghadirkan tampilan riasan yang fresh, cute, dan youthful dengan dominasi warna pink dan soft red, blush on yang merona di pipi dan hidung 🍓✨", img: "https://i.pinimg.com/736x/f7/0c/2b/f70c2b86826668e152c0f58a76bc6c62.jpg" },
  { id: 7, title: "Ulzzang makeup", artist: "gaya riasan yang berfokus pada tampilan yang imut, awet muda (youthful), dan boneka-bikin (doll-like)", img: "https://i.pinimg.com/1200x/ed/6e/ea/ed6eea41e6b312977fa02faeaaa9a19b.jpg" },
  { id: 8, title: "Igari makeup", artist: "riasan wajah asal Jepang yang memberikan kesan segar, imut, dan agak menggemaskan", img: "https://i.pinimg.com/736x/d5/23/d0/d523d016fa56bf4d336e06e4c1653858.jpg" },
];

function Looks() {
  const navigate = useNavigate();
  const [inspirations, setInspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/looks')
      .then((res) => {
        const rows = res.data?.data || [];
        if (rows.length === 0) {
          setInspirations(FALLBACK_INSPIRATIONS);
          return;
        }
        setInspirations(rows.map((r) => ({
          id: r.id,
          title: r.title,
          artist: r.description || r.artist,
          img: r.img,
        })));
      })
      .catch((err) => {
        console.error('Looks API error:', err);
        setError('Gagal memuat data looks dari server, menampilkan data cadangan.');
        setInspirations(FALLBACK_INSPIRATIONS);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="looks-page">
        <Container>
          <div className="text-center py-5">
            <div style={{ display: 'inline-block', width: 40, height: 40, border: '3px solid #e8c5b5', borderTop: '3px solid #d4876b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: '#9b7e70', marginTop: '1rem' }}>Memuat inspirasi makeup...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="looks-page"> {/* Poin Laporan: Semantic Main */}
      <Container>
        <div className="text-center mb-5">
          <h1 className="fw-bold">Makeup Inspiration</h1>
          <p className="text-muted">Temukan tren kecantikan terbaru dari komunitas Glow Up Central</p>
          {error && <p className="text-danger small">{error}</p>}
        </div>

        <Row className="g-4"> {/* Poin Laporan: Grid System */}
          {inspirations.map((item) => (
            <Col key={item.id} xs={12} sm={6} lg={3}>
              {/* Poin Laporan: Efek Visual (hover/shadow di CSS) */}
              <Card className="h-100 border-0 shadow-sm inspiration-card">
                <div className="overflow-hidden">
                  <Card.Img
                    variant="top"
                    src={item.img}
                    className="card-img-hover"
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="fs-5">{item.title}</Card.Title>
                  <Card.Text className="text-secondary small">
                    Created {item.artist}
                  </Card.Text>

                  <button variant="outline-dark" onClick={() => navigate(`/detail/${item.id}`)} className="w-100 rounded-pill mt-2">
                    See Details
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default Looks;
