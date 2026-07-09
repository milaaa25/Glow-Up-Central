import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Rutinitas.css';

const SKIN_TYPES = [
  { id: 'kering',    label: 'Kulit Kering' },
  { id: 'berminyak', label: 'Kulit Berminyak' },
  { id: 'kombinasi', label: 'Kulit Kombinasi' },
  { id: 'sensitif',  label: 'Kulit Sensitif' },
];

// Mapping product_category (dari tabel skin_routine) ke gambar & emoji yang sudah ada di /public/images
const CATEGORY_VISUAL = {
  'Cleanser':        { img: 'images/cucimuka.jpeg',   icon: '🧼' },
  'Double Cleansing':{ img: 'images/cleansing.jpeg',  icon: '🧴' },
  'Toner':           { img: 'images/toner.jpeg',      icon: '💦' },
  'Serum':           { img: 'images/serum1.jpeg',     icon: '💧' },
  'Moisturizer':      { img: 'images/pelembab.jpeg',  icon: '🧈' },
  'Sunscreen':       { img: 'images/ss30.jpeg',       icon: '☀️' },
  'Sleeping Mask':   { img: 'images/sleepingMask.jpeg', icon: '🌙' },
  'Patch Test':      { img: 'images/WajibPatch.jpeg', icon: '🧪' },
};

function stepVisual(category, timeOfDay) {
  if (category === 'Moisturizer' && timeOfDay === 'malam') {
    return { img: 'images/moistMalem.jpeg', icon: '🧈' };
  }
  return CATEGORY_VISUAL[category] || { img: null, icon: '✨' };
}

const Rutinitas = () => {
  const navigate = useNavigate();
  const [skinType, setSkinType] = useState(() => localStorage.getItem('skinType') || 'kering');
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/rutinitas')
      .then((res) => {
        setRoutines(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error('Rutinitas API error:', err);
        setError('Gagal memuat data rutinitas dari server. Pastikan backend sudah berjalan.');
      })
      .finally(() => setLoading(false));
  }, []);

  const pagiSteps = routines
    .filter(r => r.skin_type_id === skinType && r.time_of_day === 'pagi')
    .sort((a, b) => a.step_order - b.step_order);

  const malamSteps = routines
    .filter(r => r.skin_type_id === skinType && r.time_of_day === 'malam')
    .sort((a, b) => a.step_order - b.step_order);

  const renderStep = (step, timeOfDay) => {
    const visual = stepVisual(step.product_category, timeOfDay);
    return (
      <div className="step" key={step.id}>
        <div className="step-img">
          {visual.img
            ? <img src={visual.img} alt={step.product_category} />
            : <span style={{ fontSize: '2rem' }}>{visual.icon}</span>}
        </div>
        <div className="step-body">
          <div className="step-n">Step {String(step.step_order).padStart(2, '0')}</div>
          <div className="step-name">{visual.icon} {step.product_category}</div>
          <div className="step-desc">{step.description}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="page active" id="page-rutinitas">
      <span className="back-btn" onClick={() => navigate(-1)}>← Kembali ke Panduan</span>

      <div className="rut-banner">
        <img src="images/banner.jpeg" alt="Rutinitas Skincare" className="rut-banner-img" />
        <div className="rut-banner-text">
          <div className="rut-banner-tag">Daily Routine</div>
          <h1 className="rut-banner-title">Rutinitas <em>Skincare</em><br />Pagi &amp; Malam</h1>
          <p className="rut-banner-sub">Kunci dari kulit glowing adalah konsistensi. Pilih jenis kulitmu, lalu ikuti step-step ini tiap pagi dan malam biar kulitmu makin sehat!</p>
        </div>
      </div>

      {/* Selector jenis kulit — data rutinitas di database memang dipecah per jenis kulit */}
      <div className="skin-type-selector" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', margin: '2rem 0' }}>
        {SKIN_TYPES.map(st => (
          <button
            key={st.id}
            onClick={() => setSkinType(st.id)}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: 24,
              border: skinType === st.id ? '2px solid #c9956e' : '1px solid #e8c5b5',
              background: skinType === st.id ? '#c9956e' : '#fff',
              color: skinType === st.id ? '#fff' : '#6b3e2e',
              fontWeight: skinType === st.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {st.label}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#9b7e70' }}>
          <div style={{ display: 'inline-block', width: 40, height: 40, border: '3px solid #e8c5b5', borderTop: '3px solid #c9956e', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ marginTop: '1rem' }}>Memuat rutinitas skincare...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {!loading && error && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#c3073f' }}>{error}</div>
      )}

      {!loading && !error && (
        <div className="split-panels">
          {/* PAGI */}
          <div className="panel pagi">
            <div className="panel-head"><span className="icon">🌤️</span><h2>Rutinitas Pagi</h2></div>
            <div className="steps">
              {pagiSteps.length > 0
                ? pagiSteps.map(s => renderStep(s, 'pagi'))
                : <p className="text-muted">Belum ada data rutinitas pagi untuk jenis kulit ini.</p>}
            </div>
          </div>

          {/* MALAM */}
          <div className="panel malam">
            <div className="panel-head"><span className="icon">🌙</span><h2>Rutinitas Malam</h2></div>
            <div className="steps">
              {malamSteps.length > 0
                ? malamSteps.map(s => renderStep(s, 'malam'))
                : <p className="text-muted">Belum ada data rutinitas malam untuk jenis kulit ini.</p>}
            </div>
          </div>
        </div>
      )}

      <div className="tips-bar">
        <div className="tips-bar-head">Tips<br />Penting<br />yang <em>Wajib</em><br />Kamu Tahu</div>
        <div className="tips-4">
          <div className="tip-mini">
            <div className="tip-mini-icon">⏱️</div>
            <div className="tip-mini-text">Kasih jeda 1-2 menit antar layer skincare biar produknya beneran nyerap dan nggak pilling (menggumpal/daki).</div>
          </div>
          <div className="tip-mini">
            <div className="tip-mini-icon">💧</div>
            <div className="tip-mini-text">Rumus pakai skincare: dari tekstur yang paling cair ke paling kental. Toner duluan, krim belakangan.</div>
          </div>
          <div className="tip-mini">
            <div className="tip-mini-icon">🌡️</div>
            <div className="tip-mini-text">Serum Vitamin C itu gampang banget baper (oksidasi). Pastiin simpan di tempat yang sejuk dan gelap, ya!</div>
          </div>
          <div className="tip-mini">
            <div className="tip-mini-icon">📅</div>
            <div className="tip-mini-text">Sabar itu kunci! Skincare butuh waktu minimal 28 hari (1 siklus kulit) buat nampilin hasil aslinya.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rutinitas;
