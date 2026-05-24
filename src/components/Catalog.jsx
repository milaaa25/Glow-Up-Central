import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // TAMBAHKAN useLocation
import { allProducts, makeupData } from '../Data'; 

function Catalog() {
  const { categoryName } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation(); // Kunci utama untuk membaca asal halaman

  // Mengambil ID look dari URL jika ada (?look=ID)
  const searchParams = new URLSearchParams(location.search);
  const lookId = searchParams.get('look');

  const currentCategory = categoryName ? categoryName.toLowerCase().trim() : "";

  // 1. Cari data Look yang bener (Cek berdasarkan ID URL dulu, kalau gak ada baru cari manual)
  const activeLook = makeupData.find(look => String(look.id) === String(lookId)) 
    || makeupData.find(look => look.categories.some(cat => cat.items.some(item => item.toLowerCase().trim() === currentCategory)));

  // 2. Cari tahu indeks kategori mana yang sedang aktif untuk membuka Accordion secara otomatis
  const activeCategoryIndex = activeLook 
    ? activeLook.categories.findIndex(cat => cat.items.some(item => item.toLowerCase().trim() === currentCategory)) 
    : 0;

  // 3. Filter produk untuk sisi kanan sesuai type yang aktif
  const filteredProducts = allProducts.filter(
    (p) => p.type && p.type.toLowerCase().trim() === currentCategory
  );

  // Efek otomatis membuka folder Accordion yang sesuai kalau kategori di URL berubah
  useEffect(() => {
    if (activeCategoryIndex !== -1) {
      setActiveKey(String(activeCategoryIndex));
    }
  }, [categoryName, activeCategoryIndex]);

  return (
    <main className="py-5" style={{ backgroundColor: '#fffbf2', minHeight: '100vh' }}>
      <Container>
        
       
<Button 
  variant="link" 
  onClick={() => {
    // Jika ada data ID look yang valid, tembak langsung rutenya
    if (activeLook && activeLook.id) {
      navigate(`/detail/${activeLook.id}`);
    } else {
      // Jika data look kosong/gagal dimuat, paksa browser mundur 1 langkah ke Page 2
      navigate(-1); 
    }
  }} 
  className="text-dark text-decoration-none mb-4 p-0 d-inline-flex align-items-center"
  /* PERBAIKAN: Menambahkan position dan zIndex di style bawah ini */
  style={{ 
    fontWeight: '500', 
    fontSize: '0.95rem', 
    gap: '8px', 
    cursor: 'pointer',
    position: 'relative', // Membuat zIndex bekerja
    zIndex: 9999          // Memaksa tombol maju ke lapisan paling depan agar bisa menerima klik
  }}
>
  &larr; Back to Inspirations
</Button>

        {/* Judul Banner Atas */}
        <div className="text-center py-4 mb-5" style={{ borderBottom: '2px solid #333' }}>
          <h1 className="fw-bold text-uppercase m-0" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '4px', fontSize: '2.5rem' }}>
            {categoryName}
          </h1>
        </div>

        <Row>
        {/* SIDEBAR KIRI: TAMPILAN 4 KOTAK DINAMIS BISA DIKLIK BEBAS */}
<Col md={3} className="mb-4">
  {/* PERBAIKAN UTAMA: Mengubah activeKey menjadi defaultActiveKey agar folder lepas dan bisa diklik buka-tutup */}
  <Accordion defaultActiveKey={String(activeCategoryIndex)} className="shadow-sm rounded-3 overflow-hidden">
    
    {activeLook && activeLook.categories.map((cat, idx) => {
      return (
        <Accordion.Item eventKey={String(idx)} key={idx}>
          <Accordion.Header className="fw-bold">
            {cat.name}
          </Accordion.Header>
          
          <Accordion.Body className="p-2 bg-white">
            <div className="d-flex flex-column gap-1">
              
              {cat.items.map((item, i) => {
                const isActive = item.toLowerCase().trim() === categoryName.toLowerCase().trim();
                return (
                  <button
                    key={i}
                    /* PERBAIKAN NAVIGASI: Kirim string item asli dan pastikan aman dari error */
                    onClick={() => navigate(`/catalog/${item.trim()}?look=${activeLook?.id || ''}`)}
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
      );
    })}

  </Accordion>
</Col>
          {/* SLIDE KANAN: GRID PRODUK */}
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

export default Catalog;