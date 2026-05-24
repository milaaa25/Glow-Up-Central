import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={{ background: '#6b3e2e', color: 'white', width: '100%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 4rem' }}>

        {/* 2 kolom */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>

          {/* Kolom kiri — Menu */}
          <div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 400, marginBottom: '2rem', opacity: 0.9 }}>
              Menu
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'Tentang Kami', to: '/tentang' },
                { label: 'Produk Skincare', to: '/skincare' },
                { label: 'Produk Makeup', to: '/makeup' },
                { label: 'Tutorial', to: '/tutorial' },
                { label: 'Quiz Jenis Kulit', to: '/quiz' },
                { label: 'Katalog Produk', to: '/katalog' },
                { label: 'Kontak', to: '/kontak' },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    style={{ color: 'white', textDecoration: 'none', fontSize: '0.88rem', opacity: 0.75, transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.75}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom kanan — Contact */}
          <div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 400, marginBottom: '2rem', opacity: 0.9 }}>
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '1.3rem', fontFamily: 'Georgia, serif', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                  GLŌW UP CENTRAL
                </p>
                <p style={{ fontSize: '0.82rem', opacity: 0.65, marginBottom: 0 }}>
                  Skincare · Makeup · Self-Care · Edukasi Kecantikan
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
                <p style={{ fontSize: '0.85rem', opacity: 0.75, margin: 0 }}>
                  <i className="bi bi-envelope"></i> hello@glowUpcentral.com
                </p>
                <p style={{ fontSize: '0.85rem', opacity: 0.75, margin: 0 }}>
                  <i className="bi bi-telephone"></i> +62 812-3456-7890
                </p>
                <p style={{ fontSize: '0.85rem', opacity: 0.75, margin: 0 }}>
                  <i className="bi bi-instagram"></i> @glowUpcentral.id
                </p>
              </div>

              {/* Sosmed icon */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.9rem', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
                >
                  <i className="bi bi-instagram" style={{ fontSize: '1.2rem' }}></i>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '0.9rem', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
                >
                  <i className="bi bi-tiktok" style={{ fontSize: '1.2rem' }}></i>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Garis bawah + copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: '1.5rem', paddingTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.72rem', opacity: 0.5, margin: 0 }}>
            © 2026 GLŌW UP CENTRAL. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer