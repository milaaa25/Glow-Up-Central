import React from 'react'

function Tentang() {
  return (
    <section id="tentang" style={{ padding: '5rem 0', background: '#fdf6f0', borderTop: '1px solid #e8c5b5' }}>
      <div className="container">
        <div className="row g-5 align-items-center">

          <div className="col-lg-6">
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d4876b' }}>
              Tentang Kami
            </p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2.8rem', fontWeight: 300, color: '#6b3e2e', margin: '1rem 0' }}>
              Tempat Memulai <em>Perjalanan Cantikmu</em>
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#9b7e70', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              Pernah bingung mau mulai skincare dari mana? Ngerasa buang-buang uang karena salah beli produk terus? Udah coba banyak produk tapi kulit tetap bermasalah? 
              Atau pengen coba makeup tapi takut kelihatan menor? Atau mungkin kamu juga pernah beli complexion tapi warnanya nggak match sama sekali - yang ujungnya cuma 
              nganggur di meja rias?  Tenang, semua kebingungan itu wajar kok. <b>GLŌW UP CENTRAL terbentuk dari keresahan yang sama. </b> 
            </p>
            <p style={{ fontSize: '0.9rem', color: '#9b7e70', lineHeight: 1.85, marginBottom: '2rem' }}>
             GLŌW UP CENTRAL merupakan platform edukasi kecantikan yang dirancang untuk membantu kamu memahami kebutuhan kulitmu, menemukan produk yang tepat, dan memberikan tips perawatan yang mudah diikuti.
             Kami percaya bahwa setiap orang berhak mendapatkan kulit sehat dan tampilan yang membuat mereka merasa percaya diri, tanpa harus bingung atau merasa terintimidasi oleh standar kecantikan yang tidak realistis.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#9b7e70', lineHeight: 1.85, marginBottom: '2rem' }}>
              Di sini, kamu bisa belajar tentang berbagai hal, dimulai dari cara memilih skincare yang tepat untuk jenis kulitmu, memahami kandungan bahan aktif yang ada di dalamnya, hingga langkah-langkah makeup dasar sampai dengan yang lebih profesional, yang bisa kamu coba sendiri di rumah. Kami juga menyediakan review produk yang jujur dan informatif, serta tips perawatan yang bisa kamu terapkan sehari-hari untuk mendapatkan kulit yang sehat dan glowing.
            </p>
            <div style={{ background: 'linear-gradient(135deg, #f3e8e0, #e8c5b5)', border: '1px solid #e8c5b5', padding: '2rem', borderRadius: 4 }}>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.3rem', color: '#6b3e2e', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                "Kulit yang sehat bukan tentang tampil sempurna dan kecantikan bukan tentang mengikuti tren, tapi tentang memahami dirimu sendiri."
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <img
              src="/images/tentang.jpg" 
              alt="tentang kami"
              style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 4, display: 'block' }}
            />
            <div className="row g-3 mt-3">
              {[['50+', 'Produk Direkomendasikan'], ['15', 'Halaman Konten'], ['5', 'Kontributor']].map(([num, label]) => (
                <div key={label} className="col-4 text-center p-3" style={{ background: '#fdf6f0', border: '1px solid #e8c5b5' }}>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 600, color: '#d4876b' }}>{num}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9b7e70' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Tentang