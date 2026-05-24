import React, { useState, useEffect } from 'react'
import axios from 'axios'


const TEAM_DATA = [
  { name: 'Mila',   role: 'Branding & Konten',      pages: 'Home · Tentang · Tim',           photo: '/images/o2.jpg' },
  { name: 'Ama',    role: 'Skincare Expert',          pages: 'Skincare · Bahan · Jenis Kulit', photo: '/images/o1.jpg' },
  { name: 'Anes',   role: 'Makeup Artist',            pages: 'Makeup · Looks · Tutorial',      photo: '/images/o3.jpg' },
  { name: 'Maudi',  role: 'Lifestyle & Rutinitas',    pages: 'Rutinitas · Tips · Quiz',         photo: '/images/04.jpg' },
  { name: 'Jesika', role: 'Produk & Review',          pages: 'Katalog · Review · Kontak',       photo: '/images/05.jpg' },
]

function Tim() {
  const [team, setTeam]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    
    axios.get('https://jsonplaceholder.typicode.com/users?_limit=10')
      .then((res) => {
        const users = res.data
       
        const merged = TEAM_DATA.map((member, i) => ({
          ...member,
          email: users[i]?.email || '-',
          city:  users[i]?.address?.city || 'Indonesia',
        }))
        setTeam(merged)
      })
      .catch((err) => {
        console.error('Tim API error:', err)
        setError('Gagal memuat data tim.')
        setTeam(TEAM_DATA)
      })
      .finally(() => setLoading(false))
  }, [])


  if (loading) {
    return (
      <section id="tim" style={{ width: '100%', background: '#fdf6f0', borderTop: '1px solid #e8c5b5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '6rem 4rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: 40, height: 40, border: '3px solid #e8c5b5', borderTop: '3px solid #d4876b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ color: '#9b7e70', marginTop: '1rem', fontFamily: 'Georgia, serif' }}>Memuat data tim...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </section>
    )
  }

  return (
    <section id="tim" style={{ width: '100%', background: '#fdf6f0', borderTop: '1px solid #e8c5b5' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '6rem 4rem' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#6b3e2e', marginBottom: '0.5rem' }}>
          Tim <em style={{ fontStyle: 'italic', color: '#d4876b' }}>Kontributor</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
          {team.map((m) => (
            <div key={m.name} style={{ background: 'white', border: '1px solid #e8c5b5', borderRadius: 8, padding: '2rem 1.5rem', textAlign: 'center', transition: 'transform 0.25s, box-shadow 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(107,62,46,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <img
                src={m.photo}
                alt={m.name}
                style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem', display: 'block', border: '3px solid #e8c5b5' }}
              />
              <h5 style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#6b3e2e', marginBottom: '0.3rem' }}>{m.name}</h5>
              <p style={{ fontSize: '0.78rem', color: '#9b7e70', marginBottom: '0.3rem' }}>{m.role}</p>
              <p style={{ fontSize: '0.72rem', color: '#d4876b', marginBottom: '0.3rem' }}>{m.pages}</p>
              <p style={{ fontSize: '0.68rem', color: '#b0908a', marginBottom: 0 }}>📍 {m.city}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tim