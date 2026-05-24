import React from 'react'

const fotos = [
  '/images/vitC.jpg',
  '/images/hyalu.jpg',
  '/images/niacin.jpg',
  '/images/centella.jpg',
]

function FotoGrid() {
  return (
    <section style={{ width: '100%' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 400px)', // ubah tingginya sesuai selera
      }}>
        {fotos.map((src, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <img
              src={src}
              alt={`foto ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default FotoGrid