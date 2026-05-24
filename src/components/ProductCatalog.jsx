import React from 'react';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { allProducts, makeupData } from '../Data'; 

function ProductCatalog() {
  const { categoryName } = useParams(); 
  const navigate = useNavigate();

  const currentCategory = categoryName ? categoryName.toLowerCase().trim() : "";

  // 1. Cari Look/Inspirasi mana yang memiliki sub-produk ini (Abaikan huruf besar/kecil & spasi)
  const activeLook = makeupData.find(look => 
    look.categories.some(cat => 
      cat.items.some(item => item.toLowerCase().trim() === currentCategory)
    )
  );

  // 2. Cari tahu indeks kategori mana yang sedang aktif untuk membuka Accordion secara otomatis
  const activeCategoryIndex = activeLook 
    ? activeLook.categories.findIndex(cat => 
        cat.items.some(item => item.toLowerCase().trim() === currentCategory)
      ) 
    : 0;

  // 3. Filter produk untuk sisi kanan sesuai type yang aktif
  const filteredProducts = allProducts.filter(p => {
    if (!p.type) return false;
    return p.type.toLowerCase().trim() === currentCategory;
  });

  return (
    <main className="py-5" style={{ backgroundColor: '#fffbf2', minHeight: '100vh' }}>
      <Container>
        
        {/* TOMBOL BACK MURNI: Menggunakan history browser asli, dijamin kembali ke page sebelumya */}
        <Button 
          variant="link" 
          onClick={() => navigate(-1)} 
          className="text-dark text-decoration-none mb-4 p-0 d-inline-flex align-items-center"
          style={{ 
            fontWeight: '500', 
            fontSize: '0.95rem', 
            gap: '8px', 
            cursor: 'pointer',
            position: 'relative',
            zIndex: 9999 // Memaksa tombol berada di paling depan agar tidak tertutup banner
          }}
        >
          &larr; Back to Inspirations
        </Button>

        {/* Banner Atas Title */}
        <div className="text-center py-4 mb-5 rounded-4 shadow-sm" style={{ background: '#fff0f3', border: '1px solid #fbcad9' }}>
          <h1 className="fw-bold text-uppercase m-0" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px' }}>
            {categoryName}
          </h1>
        </div>

        <Row>
          {/* SIDEBAR KIRI: Menggunakan defaultActiveKey agar menu bawaan lepas dan bisa bebas diklik */}
          <Col md={3} className="mb-4">
            <Accordion 
              defaultActiveKey={String(activeCategoryIndex)} 
              key={String(activeCategoryIndex)} // Memaksa re-render Accordion agar folder kebuka pas ganti sub-menu
              className="shadow-sm rounded-3 overflow-hidden"
            >
              {activeLook && activeLook.categories.map((cat, idx) => (
                <Accordion.Item eventKey={String(idx)} key={idx}>
                  <Accordion.Header className="fw-bold">
                    {cat.name}
                  </Accordion.Header>
                  <Accordion.Body className="p-2 bg-white">
                    <div className="d-flex flex-column gap-1">
                      
                      {cat.items.map((item, i) => {
                        const isActive = item.toLowerCase().trim() === currentCategory;
                        return (
                          <button
                            key={i}
                            onClick={() => navigate(`/catalog/${item.trim()}`)}
                            className="text-start border-0 p-2 rounded bg-transparent"
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: isActive ? '600' : '400',
                              color: isActive ? '#c3073f' : '#555555', 
                              backgroundColor: isActive ? '#fff4f6' : 'transparent',
                              transition: 'all 0.2s ease',
                              width: '100%',
                              cursor: 'pointer'
                            }}
                          >
                            {item}
                          </button>
                        );
                      })}

                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>

          {/* KOLOM KANAN: Grid Daftar Produk Peach Pastel */}
          <Col md={9}>
            <Row className="g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod, idx) => (
                  <Col key={idx} xs={12} sm={6} md={4}>
                    <Card className="h-100 border-0 shadow-sm rounded-0" style={{ backgroundColor: '#fde4cf' }}>
                      <div className="bg-white m-3 p-4 text-center" style={{ height: '220px' }}>
                        <Card.Img 
                          variant="top" 
                          src={prod.img} 
                          className="h-100 w-100"
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <Card.Body className="pt-0 text-center">
                        <Card.Title className="fw-bold mb-1" style={{ fontSize: '1rem', height: '3rem', overflow: 'hidden' }}>
                          {prod.name.toUpperCase()}
                        </Card.Title>
                        <Card.Text className="text-muted small italic">
                          {prod.brand}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col className="text-center py-5">
                  <h4 className="text-muted">No products found for "{categoryName}".</h4>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default ProductCatalog;