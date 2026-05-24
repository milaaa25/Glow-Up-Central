import React from 'react'

function Hero() {
  return (
    <section id="home" style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      marginTop: '-66px',
    }}>
      {/* Background Image Full */}
      <img
        src="/images/h1-HD.jpg"
        alt="h1-HD"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Overlay gelap di kiri */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
      }} />

      {/* Teks di atas gambar */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 'clamp(2rem, 8%, 8rem)',
        paddingTop: '66px',
      }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.6rem 1.2rem',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.4)',
            background: 'rgba(255,255,255,0.15)',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d4876b', display: 'inline-block' }} />
            <span style={{ fontSize: '0.78rem', color: 'white', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Selamat Datang di GLŌW UP CENTRAL
            </span>
          </div>

          <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#f0c4a8', marginBottom: '1rem' }}>
            Skincare · Makeup · Self-Care
          </p>

          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(3rem, 5vw, 5.5rem)',
            fontWeight: 300,
            color: 'white',
            lineHeight: 1.05,
            margin: '0 0 1.5rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}>
            Cantik dari<br />
            <em style={{ fontStyle: 'italic', color: '#f0c4a8' }}>Dalam & Luar</em>
          </h1>

          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 440 }}>
            Temukan rutinitas perawatan kulit dan makeup yang sesuai dengan jenis kulitmu. Mulai perjalanan glowing-mu hari ini.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/katalog" style={{
              background: '#6b3e2e',
              color: 'white',
              padding: '14px 32px',
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
              borderRadius: '4px',
              transition: 'background 0.25s',
            }}>
              Jelajahi Produk
            </a>
            <a href="/quiz" style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1.5px solid rgba(255,255,255,0.6)',
              padding: '14px 32px',
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-block',
              borderRadius: '4px',
              backdropFilter: 'blur(8px)',
            }}>
              Cek Jenis Kulit
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero