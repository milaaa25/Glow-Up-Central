import React from 'react'

const gambar = [
  '/images/foundi.jpg', // ganti nama filenya
  '/images/skin.jpg',
  '/images/swatch.jpg',
]

function FiturProduk() {
  return (
    <section style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {gambar.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`foto ${i + 1}`}
            style={{
              width: '100%',
              height: '500px',   // bisa diubah sesuai selera
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default FiturProduk