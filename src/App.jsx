import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Tentang from './components/Tentang'
import Tim from './components/Tim'
import RekomendasiSkincare from './components/RekomendasiSkincare'
import RekomendasiMakeup from './components/RekomendasiMakeup'
import Skincare from './components/Skincare'
import Ingredients from './components/Ingredients'
import JenisKulit from './components/JenisKulit'
import Makeup from './components/Makeup'
import Looks from './components/Looks'
import Tutorial from './components/Tutorial'
import Rutinitas from './components/Rutinitas'
import Tips from './components/Tips'
import Quiz from './components/Quiz'
import Katalog from './components/Katalog'
import Review from './components/Review'
import Kontak from './components/Kontak'
import FiturProduk from './components/FiturProduk'
import FiturIngredients from './components/FiturIngredients'
import ProductCatalog from './components/ProductCatalog'
import DetailLooks from './components/DetailLooks'
import './App.css'

const HomePage = () => (
  <>
    <Hero />
    <RekomendasiSkincare />
    <FiturIngredients />
    <RekomendasiMakeup />
    <FiturProduk />
    <Quiz />
    <Review />
  </>
)

function App() {
  return (
    <BrowserRouter>
      <div style={{ width: '100%', overflowX: 'hidden' }}>

        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/tim" element={<Tim />} />
            <Route path="/skincare" element={<Skincare />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/jenis-kulit" element={<JenisKulit />} />
            <Route path="/makeup" element={<Makeup />} />
            <Route path="/looks" element={<Looks />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/catalog/:categoryName" element={<ProductCatalog />} />
            <Route path="/detail/:id" element={<DetailLooks />} />
            <Route path="/rutinitas" element={<Rutinitas />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/katalog" element={<Katalog />} />
            <Route path="/review" element={<Review />} />
            <Route path="/kontak" element={<Kontak />} />
          </Routes>
        </main>

        <footer>
          <Footer />
        </footer>

      </div>
    </BrowserRouter>
  )
}

export default App