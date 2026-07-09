import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../api';

const Quiz = ({ goTo }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false); // <-- BARU: nandain fetch gagal

  // State interaksi
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    api.get('/quiz')
      .then((res) => {
        const data = res.data;

        // Guard: kalau backend nyala tapi tabel quiz_question masih kosong/kurang dari 4,
        // atau ada pertanyaan yang opsinya kosong (quiz_options belum keisi)
        const valid = data && data.length >= 4 && data.every((q) => q.opts && q.opts.length > 0);
        if (!valid) {
          setLoadError(true);
          setLoading(false);
          return;
        }

        // Backend sudah mengembalikan { id, text, order, opts: [{ id, label, val }] }
        // langsung dari tabel quiz_question + quiz_options, tidak perlu hardcode lagi.
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Gagal memuat kuis dari backend:', err);
        setLoadError(true);   // <-- BARU: tandai gagal, bukan cuma log doang
        setLoading(false);
      });
  }, []);

  const handleOptionClick = (opt) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsAnswered(true);
    const newAnswers = [...answers, opt.val];
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      const count = {};
      answers.forEach(a => count[a] = (count[a] || 0) + 1);
      let winner = 'kering';
      let max = 0;
      for (const [key, val] of Object.entries(count)) {
        if (val > max) { max = val; winner = key; }
      }
      localStorage.setItem('skinType', winner);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedOpt(null);
    setIsAnswered(false);
    localStorage.removeItem('skinType');
  };

  // Mapping val quiz ke badge di Skincare.jsx
  const skinTypeMap = {
    kering:    'Kering',
    berminyak: 'Berminyak',
    kombinasi: 'Kombinasi',
    sensitif:  'Sensitif',
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '50px', height: '50px', border: '5px solid var(--pink-light)', borderTopColor: 'var(--pink-deep)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <div style={{ color: 'var(--pink-deep)', fontWeight: 'bold', letterSpacing: '2px' }}>MEMUAT KUIS...</div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );

  // --- BARU: TAMPILAN KALAU GAGAL FETCH / DATA KOSONG (ganti crash jadi pesan error) ---
  if (loadError || questions.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: '16px', padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px' }}>⚠️</div>
        <h2 style={{ color: 'var(--pink-deep)', margin: 0 }}>Gagal memuat pertanyaan kuis</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
          Pastikan backend (server.js) sudah dijalankan di <code>http://localhost:5000</code> dan tabel <code>quiz_question</code> sudah terisi minimal 4 baris.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{ padding: '14px 28px', borderRadius: '16px', border: 'none', background: 'var(--pink-deep)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // --- TAMPILAN HASIL ---
  if (showResult) {
    const skinType = localStorage.getItem('skinType') || 'kering';
    let title = '', desc = '', icon = '';

    if (skinType === 'kering') {
      title = 'Kulit Kering';
      desc = 'Dari hasil analisanya, tipe kulitmu Kering nih, Bestie! Nggak perlu panik, kuncinya cuma satu: extra hidrasi. Coba deh mulai rajin pakai produk yang ada Hyaluronic Acid atau Ceramide biar kulitmu kembali plumpy, sehat, dan nggak gampang mengelupas.';
      icon = '💧';
    } else if (skinType === 'berminyak') {
      title = 'Kulit Berminyak';
      desc = 'Wah, tipe kulitmu Berminyak! Tenang aja, minyak alami itu yang bikin wajah lebih awet muda lho. Tapi biar pori-pori nggak gampang tersumbat, pastikan kamu pilih skincare bertekstur gel yang ringan dan jangan skip eksfoliasi rutin ya!';
      icon = '✨';
    } else if (skinType === 'kombinasi') {
      title = 'Kulit Kombinasi';
      desc = 'Tipe kulitmu Kombinasi! Biasanya area T-Zone (dahi & hidung) gampang minyakan, tapi area pipi malah kering. Triknya gampang: pakai pelembap yang super ringan buat seluruh wajah, dan kasih ekstra hidrasi cuma di area pipi aja.';
      icon = '🎯';
    } else {
      title = 'Kulit Sensitif';
      desc = 'Tipe kulitmu masuk kategori Sensitif nih. Artinya, kamu harus lebih picky soal milih skincare. Sebisa mungkin hindari produk yang ada parfum atau alkoholnya. Fokus ke skincare yang soothing (menenangkan) dan jangan pernah lupa patch test dulu!';
      icon = '🌸';
    }

    return (
      <div style={{ padding: '60px 20px', fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'zoomIn 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)' }}>
        <div style={{ maxWidth: '600px', width: '100%', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)', borderRadius: '40px', padding: '50px 40px', boxShadow: '0 25px 50px rgba(74, 60, 49, 0.08)', border: '1px solid rgba(255, 255, 255, 0.8)' }}>
          
          <div style={{ 
            background: 'linear-gradient(135deg, var(--pink-main) 0%, var(--pink-deep) 100%)', 
            borderRadius: '30px', padding: '50px 20px', textAlign: 'center', color: 'white',
            boxShadow: '0 20px 40px rgba(166, 92, 77, 0.3)', position: 'relative', overflow: 'hidden', marginBottom: '40px'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '120px', opacity: '0.1' }}>{icon}</div>
            <div style={{ fontSize: '60px', marginBottom: '15px', animation: 'bounce 2s infinite' }}>{icon}</div>
            <h2 style={{ margin: 0, fontSize: '32px', fontWeight: '800', fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}>{title}</h2>
            <style>{`@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-15px); } 60% { transform: translateY(-7px); } }`}</style>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.8' }}>{desc}</p>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
            <button 
              onClick={() => navigate('/skincare', { state: { skinType: skinTypeMap[skinType], fromQuiz: true } })}
              style={{ padding: '20px', borderRadius: '20px', border: 'none', background: 'linear-gradient(135deg, var(--pink-main), var(--pink-deep))', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 15px 30px rgba(166,92,77,0.25)', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '2px' }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Lihat Rekomendasi Skincare ✨
            </button>
            <button 
              onClick={handleRestart}
              style={{ padding: '20px', borderRadius: '20px', border: '2px solid var(--pink-light)', background: 'transparent', color: 'var(--pink-deep)', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '2px' }}
              onMouseOver={(e) => { e.target.style.background = 'var(--pink-pale)'; e.target.style.borderColor = 'var(--pink-main)'; }}
              onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'var(--pink-light)'; }}
            >
              Ulangi Kuis ↺
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- TAMPILAN PERTANYAAN ---
  const q = questions[currentQ];
  return (
    <div style={{ padding: '40px 20px', background: 'var(--pink-pale)', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'zoomIn 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)' }}>
      <div style={{ maxWidth: '600px', width: '100%', background: '#ffffff', borderRadius: '30px', padding: '50px 40px', boxShadow: '0 20px 60px rgba(74,60,49,0.05)', position: 'relative' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Pertanyaan {currentQ + 1} / {questions.length}</span>
          <span style={{ fontSize: '13px', color: 'var(--pink-main)', fontWeight: 'bold' }}>{Math.round(((currentQ + 1)/questions.length)*100)}%</span>
        </div>
        
        <div style={{ height: '8px', background: 'var(--pink-light)', borderRadius: '10px', marginBottom: '40px', overflow: 'hidden' }}>
          <div style={{ width: `${((currentQ + 1)/questions.length)*100}%`, background: 'linear-gradient(90deg, var(--pink-soft), var(--pink-deep))', height: '100%', borderRadius: '10px', transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}></div>
        </div>
        
        <h2 style={{ fontSize: '24px', color: 'var(--pink-dark)', marginBottom: '40px', textAlign: 'center', lineHeight: '1.4', fontFamily: "'Playfair Display', serif" }} dangerouslySetInnerHTML={{ __html: q.text }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {q.opts.map((opt, i) => {
            let bgColor = '#ffffff';
            let borderColor = 'var(--pink-light)';
            let textColor = 'var(--text-body)';

            if (isAnswered && selectedOpt === opt) {
              bgColor = '#fcefed';
              borderColor = 'var(--pink-main)';
              textColor = 'var(--pink-deep)';
            } else if (!isAnswered && selectedOpt === opt) {
              bgColor = 'var(--pink-pale)';
              borderColor = 'var(--pink-main)';
              textColor = 'var(--pink-deep)';
            }

            return (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                disabled={isAnswered}
                style={{
                  padding: '20px 25px', textAlign: 'left', borderRadius: '20px', 
                  cursor: isAnswered ? 'default' : 'pointer',
                  border: `2px solid ${borderColor}`,
                  background: bgColor,
                  boxShadow: (!isAnswered && selectedOpt === opt) ? '0 10px 20px rgba(200, 122, 105, 0.15)' : '0 4px 10px rgba(0,0,0,0.02)',
                  color: textColor,
                  fontWeight: (isAnswered && selectedOpt === opt) ? '700' : '500',
                  fontSize: '15px',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  transform: (!isAnswered && selectedOpt === opt) ? 'scale(1.02)' : 'scale(1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  opacity: (isAnswered && selectedOpt !== opt) ? 0.6 : 1
                }}
                onMouseOver={(e) => { if(!isAnswered && selectedOpt !== opt) e.currentTarget.style.borderColor = 'var(--pink-soft)'; }}
                onMouseOut={(e) => { if(!isAnswered && selectedOpt !== opt) e.currentTarget.style.borderColor = 'var(--pink-light)'; }}
              >
                <span dangerouslySetInnerHTML={{ __html: opt.label }} />
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <button
            onClick={handleNext}
            style={{
               marginTop: '50px', width: '100%', padding: '22px', borderRadius: '20px', border: 'none',
               background: 'linear-gradient(135deg, var(--pink-main), var(--pink-deep))', 
               color: 'white', fontWeight: 'bold', fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase',
               cursor: 'pointer', transition: 'all 0.3s',
               boxShadow: '0 15px 30px rgba(166,92,77,0.25)',
               animation: 'fadeUp 0.5s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {currentQ === questions.length - 1 ? 'Lihat Hasil Kuis ✨' : 'Selanjutnya →'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
