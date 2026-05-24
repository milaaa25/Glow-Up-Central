import React, { useState } from 'react'

function Tutorial() {
  const [aktif, setAktif] = useState(null)

  const tutorials = [
    {
      icon: '💄', title: 'Base Makeup Sempurna',
      steps: [
        'Mulai dengan kulit yang sudah dirawat (skincare routine)',
        'Aplikasikan primer untuk memperpanjang ketahanan makeup',
        'Gunakan foundation sesuai jenis kulit dengan beauty blender',
        'Tutupi noda dengan concealer segitiga di bawah mata',
        'Set dengan loose powder untuk hasil yang tahan lama',
      ]
    },
    {
      icon: '👁️', title: 'Natural Eye Makeup',
      steps: [
        'Aplikasikan eyeshadow primer di kelopak mata',
        'Sweep warna transition di crease dengan brush fluffy',
        'Aplikasikan warna gelap di outer corner untuk dimensi',
        'Highlight inner corner dengan warna shimmer',
        'Finishkan dengan mascara dan eyeliner tipis',
      ]
    },
    {
      icon: '💋', title: 'Lip yang Tahan Lama',
      steps: [
        'Exfoliate bibir dengan lip scrub',
        'Aplikasikan lip balm tipis sebagai base',
        'Outline bibir dengan lip liner sesuai shade',
        'Isi dengan lip cream atau lipstik pilihan',
        'Blot dengan tissue dan aplikasikan satu lapis lagi',
      ]
    },
  ]

  return (
    <section id="tutorial" style={{ padding: '5rem 0', background: '#fdf6f0', borderTop: '1px solid #e8c5b5' }}>
      <div className="container-fluid">
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d4876b' }}>
          💄 Person 3 — Clara · Tutorial
        </p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2.8rem', fontWeight: 300, color: '#6b3e2e', margin: '1rem 0 3rem' }}>
          Tutorial <em>Step by Step</em>
        </h2>
        <div className="row g-4">
          {tutorials.map((t, i) => (
            <div key={i} className="col-md-4">
              <div
                className="card h-100 p-4"
                style={{ border: '1px solid #e8c5b5', borderRadius: 4, cursor: 'pointer', background: aktif === i ? '#f3e8e0' : 'white' }}
                onClick={() => setAktif(aktif === i ? null : i)}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.icon}</div>
                <h5 style={{ fontFamily: 'Georgia, serif', color: '#6b3e2e', fontSize: '1.2rem', marginBottom: '1rem' }}>{t.title}</h5>
                {aktif === i && (
                  <div>
                    {t.steps.map((step, j) => (
                      <div key={j} className="d-flex gap-2 mb-2">
                        <span style={{ minWidth: 24, height: 24, borderRadius: '50%', background: '#6b3e2e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', flexShrink: 0 }}>{j + 1}</span>
                        <p style={{ fontSize: '0.83rem', color: '#2c1a10', margin: 0, lineHeight: 1.6 }}>{step}</p>
                      </div>
                    ))}
                  </div>
                )}
                {aktif !== i && (
                  <p style={{ fontSize: '0.8rem', color: '#d4876b' }}>Klik untuk lihat tutorial →</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tutorial