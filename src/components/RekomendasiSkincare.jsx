import React, { useState, useEffect } from 'react'
import axios from 'axios'

function RekomendasiSkincare() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        await axios.get('https://fakestoreapi.com/products?limit=20')
        const localData = await import('../data/products.json')
        const skincare = localData.default.filter(p => p.category === 'skincare').slice(0, 6)
        setProducts(skincare)
      } catch (err) {
        setError('Gagal memuat produk.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const getRecommendationTag = (rating) => {
    if (rating >= 4.8) return '⭐ Top Rated'
    if (rating >= 4.5) return '✨ Highly Recommended'
    if (rating >= 4.0) return '👍 Recommended'
    return '💡 Worth Trying'
  }

  return (
    <section id="rekomendasi-skincare" style={{ width: '100%', background: 'white', borderTop: '1px solid #e8c5b5' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '6rem 4rem' }}>

        <p style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d4876b', marginBottom: '0.8rem' }}>
          🌿 Skincare
        </p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 300, color: '#6b3e2e', marginBottom: '3rem' }}>
          Rekomendasi <em style={{ fontStyle: 'italic', color: '#d4876b' }}>Skincare</em>
        </h2>

        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#9b7e70' }}>
            <div style={{ width: 44, height: 44, border: '3px solid #e8c5b5', borderTopColor: '#6b3e2e', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }}></div>
            <p style={{ fontSize: '0.85rem' }}>Memuat produk skincare...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#fff0ed', border: '1px solid #e8c5b5', color: '#6b3e2e' }}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {products.map(product => (
              <div
                key={product.id}
                style={{ background: '#fdf6f0', border: '1px solid #e8c5b5', borderRadius: 4, overflow: 'hidden', transition: 'transform 0.25s, box-shadow 0.25s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(107,62,46,0.13)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3e8e0', padding: '1rem' }}>
                  <img src={product.image} alt={product.title} style={{ maxHeight: 160, maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4876b', marginBottom: 4 }}>{product.subcategory}</p>
                  <h5 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#6b3e2e', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                    {product.title.length > 45 ? product.title.slice(0, 45) + '…' : product.title}
                  </h5>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#f0a500', fontSize: '0.8rem' }}>
                      {'★'.repeat(Math.round(product.rating.rate))}
                      {'☆'.repeat(5 - Math.round(product.rating.rate))}
                      <span style={{ color: '#9b7e70', marginLeft: 4, fontSize: '0.72rem' }}>({product.rating.count})</span>
                    </span>
                    <span style={{ fontSize: '0.72rem', background: '#f3e8e0', color: '#6b3e2e', padding: '4px 10px', borderRadius: 20 }}>
                      {getRecommendationTag(product.rating.rate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default RekomendasiSkincare