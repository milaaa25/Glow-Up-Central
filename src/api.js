// src/api.js
// Instance axios terpusat untuk semua request ke backend Express lokal.
// Backend harus dijalankan dulu: cd backend && npm run dev (default port 5000)
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
})

export default api
