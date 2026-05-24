import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = (nama) => {
    setOpenDropdown(openDropdown === nama ? null : nama)
  }

  const dropdownStyle = (nama, kanan = false) => ({
  display: openDropdown === nama ? 'block' : 'none',
  position: 'absolute',
  background: 'white',
  border: '1px solid #e8c5b5',
  borderRadius: 4,
  padding: '0.75rem',
  minWidth: 180,
  zIndex: 9999,
  top: '100%',
  left: kanan ? 'auto' : 0,
  right: kanan ? 0 : 'auto',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  listStyle: 'none',
})

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{
      background: 'rgba(253,246,240,0.96)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e8c5b5',
      overflow: 'visible',
    }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{
          fontFamily: 'Georgia, serif',
          fontSize: '1.8rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: '#6b3e2e'
        }}>
          GLŌW UP CENTRAL
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9b7e70' }}>
                Home
              </Link>
            </li>

            {/* Dropdown Tentang */}
            <li className="nav-item" style={{ position: 'relative' }}>
              <button onClick={() => toggleDropdown('tentang')} className="nav-link border-0 bg-transparent" style={{ fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9b7e70', cursor: 'pointer' }}>
                Tentang ▾
              </button>
              <ul style={dropdownStyle('tentang')}>
                <li><Link className="dropdown-item" to="/tentang" onClick={() => setOpenDropdown(null)}>💬 Tentang Kami</Link></li>
                <li style={{borderBottom: '1px solid #f3e8e0'}}></li>
                <li><Link className="dropdown-item" to="/tim" onClick={() => setOpenDropdown(null)}>👥 Tim</Link></li>
              </ul>
            </li>

            {/* Dropdown Skincare */}
            <li className="nav-item" style={{ position: 'relative' }}>
              <button onClick={() => toggleDropdown('skincare')} className="nav-link border-0 bg-transparent" style={{ fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9b7e70', cursor: 'pointer' }}>
                Skincare ▾
              </button>
              <ul style={dropdownStyle('skincare')}>
                <li style={{borderBottom: '1px solid #f3e8e0'}}>
                  <Link className="dropdown-item" to="/skincare" onClick={() => setOpenDropdown(null)}>🧴 Produk Skincare</Link></li>
                <li style={{borderBottom: '1px solid #f3e8e0'}}>
                  <Link className="dropdown-item" to="/ingredients" onClick={() => setOpenDropdown(null)}>🔬 Kandungan Bahan</Link></li>
                <li>
                  <Link className="dropdown-item" to="/jenis-kulit" onClick={() => setOpenDropdown(null)}>✨ Jenis Kulit</Link></li>
              </ul>
            </li>

            {/* Dropdown Makeup */}
            <li className="nav-item" style={{ position: 'relative' }}>
              <button onClick={() => toggleDropdown('makeup')} className="nav-link border-0 bg-transparent" style={{ fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9b7e70', cursor: 'pointer' }}>
                Makeup ▾
              </button>
              <ul style={dropdownStyle('makeup')}>
                <li><Link className="dropdown-item" to="/makeup" onClick={() => setOpenDropdown(null)}>💄 Produk Makeup</Link></li>
                <li style={{borderBottom: '1px solid #f3e8e0'}}></li>
                <li><Link className="dropdown-item" to="/looks" onClick={() => setOpenDropdown(null)}>🎨 Inspirasi Looks</Link></li>
              </ul>
            </li>

            {/* Dropdown Panduan */}
            <li className="nav-item" style={{ position: 'relative' }}>
              <button onClick={() => toggleDropdown('panduan')} className="nav-link border-0 bg-transparent" style={{ fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9b7e70', cursor: 'pointer' }}>
                Panduan ▾
              </button>
              <ul style={dropdownStyle('panduan')}>
                <li><Link className="dropdown-item" to="/rutinitas" onClick={() => setOpenDropdown(null)}>🌅 Rutinitas Harian</Link></li>
                <li style={{borderBottom: '1px solid #f3e8e0'}}></li>
                <li><Link className="dropdown-item" to="/tips" onClick={() => setOpenDropdown(null)}>💡 Tips & Trik</Link></li>
                <li style={{borderBottom: '1px solid #f3e8e0'}}></li>
                <li><Link className="dropdown-item" to="/quiz" onClick={() => setOpenDropdown(null)}>📝 Quiz Jenis Kulit</Link></li>
              </ul>
            </li>

            {/* Dropdown Lainnya */}
            <li className="nav-item" style={{ position: 'relative' }}>
              <button onClick={() => toggleDropdown('lainnya')} className="nav-link border-0 bg-transparent" style={{ fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9b7e70', cursor: 'pointer' }}>
                Lainnya ▾
              </button>
              <ul style={dropdownStyle('lainnya', true)}>
                <li><Link className="dropdown-item" to="/katalog" onClick={() => setOpenDropdown(null)}>📚 Katalog Produk</Link></li>
                <li style={{borderBottom: '1px solid #f3e8e0'}}></li>
                <li><Link className="dropdown-item" to="/review" onClick={() => setOpenDropdown(null)}>⭐ Review</Link></li>
                <li style={{borderBottom: '1px solid #f3e8e0'}}></li>
                <li><Link className="dropdown-item" to="/kontak" onClick={() => setOpenDropdown(null)}>📩 Kontak</Link></li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar