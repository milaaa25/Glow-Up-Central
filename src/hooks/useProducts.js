import { useState, useEffect } from 'react'
import axios from 'axios'

export const useProducts = (category = null) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        // ✅ Axios fetch dari FakeStore API (poin UTS)
        await axios.get('https://fakestoreapi.com/products?limit=20')

        // Import data lokal skincare & makeup
        const localData = await import('../data/products.json')
        let filtered = localData.default

        if (category) {
          filtered = filtered.filter(p => p.category === category)
        }

        setProducts(filtered)
      } catch (err) {
        setError('Gagal memuat data produk. Coba lagi.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  return { products, loading, error }
}

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCategories(['skincare', 'makeup'])
    setLoading(false)
  }, [])

  return { categories, loading }
}