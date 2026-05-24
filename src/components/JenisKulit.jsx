// src/pages/JenisKulit.jsx
import { useState, useEffect } from 'react';
import './JenisKulit.css';
import { useNavigate } from 'react-router-dom';

// ── IMPORT FOTO JENIS KULIT ──
const kulitKering    = '/images/Kulit kering.png';
const kulitBerminyak = '/images/Kulit berminyak.png';
const kulitKombinasi = '/images/Kulit Kombinasi.png';
const kulitSensitif  = '/images/Kulit sensitif.png';

// ── IMPORT FOTO REKOMENDASI PRODUK ──
const imgGreenTeaCleanser      = '/images/GreenTeaCleanser.png';
const imgHyaluronMoisturizer   = '/images/HyaluronMoisturizer.png';
const imgRoseWaterToner        = '/images/RoseWaterToner.png';
const imgRetinolNightRepair    = '/images/RetinolNightRepair.png';
const imgNiacinamideSerum      = '/images/NiacinamideSerum.png';
const imgAHABHAExfoToner       = '/images/AHABHAExfoToner.png';
const imgDailySunShield        = '/images/DailySunShieldSPF.png';
const imgHyaluronicAcidSerum   = '/images/HyaluronicAcidSerum.png';
const imgVitaminCGlowSerum     = '/images/VitaminCGlowSerum.png';
const imgHydratingSunscreen    = '/images/HydratingSunscreenSPF.png';
const imgPeptideEyeCream       = '/images/PeptideEyeCream.png';

const skinTypes = [
  {
    id: 'kering',
    image: kulitKering,
    emoji: '💧',
    label: 'Tipe 1',
    name: 'Kulit Kering',
    color: 'linear-gradient(135deg,#a8c4e0,#7ba3c7)',
    bgCard: '#EBF4FB',
    bgDetail: '#D6EAF8',
    ciri: [
      'Terasa ketat setelah cuci muka',
      'Mudah mengelupas (flaky)',
      'Tampak kusam dan tidak bercahaya',
      'Pori-pori hampir tidak terlihat',
      'Garis halus terlihat lebih jelas',
      'Kulit terasa kasar saat disentuh',
      'Kurang elastis / mudah keriput'
    ],
    cara: [
      { num: 1, title: 'Cuci muka 1–2x sehari', desc: 'Jangan terlalu sering, sabun yang terlalu bersih justru memperparah kekeringan.' },
      { num: 2, title: 'Gunakan cleanser cream/milk', desc: 'Hindari gel cleanser berbusa tebal yang bisa menghilangkan minyak alami.' },
      { num: 3, title: 'Double moisturizer', desc: 'Pakai hydrating toner + rich moisturizer dengan ceramide dan emolien.' },
      { num: 4, title: 'Hindari eksfoliasi berlebih', desc: 'Cukup 1x seminggu dengan AHA lembut, jangan sampai kulit semakin kering.' },
      { num: 5, title: 'Minum air 2L per hari', desc: 'Hidrasi dari dalam sama pentingnya dengan skincare luar.' },
    ],
    pagiSteps: [
      { title: 'Gentle Cleanser', desc: 'Sabun muka lembut tanpa busa tebal' },
      { title: 'Hydrating Toner', desc: 'Ketuk lembut ke wajah, jangan digosok' },
      { title: 'Hyaluronic Acid Serum', desc: 'Aplikasikan di kulit sedikit lembab' },
      { title: 'Rich Moisturizer', desc: 'Cream berbahan ceramide, squalane, atau shea butter' },
      { title: 'SPF 30–50', desc: 'Wajib setiap pagi meski di dalam ruangan' },
    ],
    malamSteps: [
      { title: 'Micellar Water / Oil Cleanser', desc: 'Angkat makeup & sunscreen dulu' },
      { title: 'Gentle Cream Cleanser', desc: 'Double cleanse untuk kulit bersih sempurna' },
      { title: 'Hydrating Toner', desc: '2–3 lapisan untuk deep hydration (7-skin method)' },
      { title: 'Essence / Serum HA', desc: 'Layering kelembapan' },
      { title: 'Retinol (2–3x/minggu)', desc: 'Anti-aging sambil tidur, mulai konsentrasi rendah' },
      { title: 'Rich Night Cream / Face Oil', desc: 'Kunci semua kelembapan semalaman' },
    ],
    reco: [
      { cat: 'Moisturizer', name: 'Hyaluron Moisturizer', ing: 'HA · Ceramide · Squalane',          img: imgHyaluronMoisturizer },
      { cat: 'Cleanser',    name: 'Green Tea Cleanser',   ing: 'Green Tea · Aloe · Glycerin',        img: imgGreenTeaCleanser },
      { cat: 'Toner',       name: 'Rose Water Toner',     ing: 'Rose Water · Glycerin · HA',         img: imgRoseWaterToner },
      { cat: 'Night Cream', name: 'Retinol Night Repair', ing: 'Retinol 0.1% · Peptide · Ceramide',  img: imgRetinolNightRepair },
    ]
  },
  {
    id: 'berminyak',
    image: kulitBerminyak,
    emoji: '✨',
    label: 'Tipe 2',
    name: 'Kulit Berminyak',
    color: 'linear-gradient(135deg,#f5d888,#e8b85a)',
    bgCard: '#FEF9E7',
    bgDetail: '#FDF2CA',
    ciri: [
      'Kilap berlebih di seluruh wajah',
      'Pori-pori tampak besar & tersumbat',
      'Rentan komedo hitam & putih',
      'Jerawat sering muncul',
      'Foundation mudah luntur',
      'Produksi sebum berlebih',
      'Wajah terlihat mengkilap 2–3 jam setelah cuci muka'
    ],
    cara: [
      { num: 1, title: 'Cuci muka 2x sehari', desc: 'Jangan lebih — over-cleansing justru memancing produksi minyak lebih banyak.' },
      { num: 2, title: 'Pilih produk oil-free & non-comedogenic', desc: 'Periksa label, hindari bahan berat seperti coconut oil & mineral oil murni.' },
      { num: 3, title: 'Tetap pakai moisturizer!', desc: 'Kulit berminyak tetap butuh hidrasi. Pilih yang gel/water-based, ringan.' },
      { num: 4, title: 'Eksfoliasi rutin 2–3x/minggu', desc: 'BHA (Salicylic Acid) adalah teman terbaik kulit berminyak.' },
      { num: 5, title: 'Gunakan clay mask 1–2x/minggu', desc: 'Menyerap kelebihan minyak dan membersihkan pori secara mendalam.' },
    ],
    pagiSteps: [
      { title: 'Gel/Foam Cleanser', desc: 'Pilih yang mengandung Salicylic Acid atau Tea Tree' },
      { title: 'Toner Astringent', desc: 'Kontrol minyak, tutup pori, dengan Witch Hazel / Niacinamide' },
      { title: 'Niacinamide Serum', desc: 'Kontrol sebum & perkecil pori' },
      { title: 'Gel Moisturizer (Oil-Free)', desc: 'Hidrasi tanpa menyumbat pori' },
      { title: 'SPF 50 (Matte/Gel)', desc: 'Pilih sunscreen bertekstur ringan, tidak greasy' },
    ],
    malamSteps: [
      { title: 'Oil Cleanser', desc: 'Minyak justru mengangkat minyak (like dissolves like)' },
      { title: 'Foam/Gel Cleanser', desc: 'Double cleanse untuk bersih menyeluruh' },
      { title: 'BHA Toner (2–3x/minggu)', desc: 'Eksfoliasi dalam pori, bergantian dengan AHA' },
      { title: 'Niacinamide + Zinc Serum', desc: 'Kontrol minyak semalaman' },
      { title: 'Lightweight Moisturizer', desc: 'Gel atau emulsi ringan, bukan cream tebal' },
      { title: 'Spot Treatment (jika ada jerawat)', desc: 'Benzoyl Peroxide atau tea tree oil spot treatment' },
    ],
    reco: [
      { cat: 'Cleanser',   name: 'Green Tea Cleanser',   ing: 'Green Tea · Salicylic · Niacinamide', img: imgGreenTeaCleanser },
      { cat: 'Serum',      name: 'Niacinamide 10% Serum', ing: 'Niacinamide · Zinc PCA',             img: imgNiacinamideSerum },
      { cat: 'Exfoliator', name: 'AHA BHA Exfo Toner',   ing: 'BHA 2% · AHA 5%',                    img: imgAHABHAExfoToner },
      { cat: 'Sunscreen',  name: 'Daily Sun Shield SPF50+', ing: 'SPF50+ · PA++++ · Matte',          img: imgDailySunShield },
    ]
  },
  {
    id: 'kombinasi',
    image: kulitKombinasi,
    emoji: '⚖️',
    label: 'Tipe 3',
    name: 'Kulit Kombinasi',
    color: 'linear-gradient(135deg,#b8d4c0,#8fba98)',
    bgCard: '#EAFAF1',
    bgDetail: '#D5F5E3',
    ciri: [
      'T-zone (dahi, hidung, dagu) berminyak',
      'Pipi terasa normal atau kering',
      'Komedo di sekitar hidung',
      'Pori besar di area T-zone',
      'Jerawat hanya di T-zone',
      'Pipi bisa mengelupas di musim dingin',
      'Susah memilih satu produk yang pas'
    ],
    cara: [
      { num: 1, title: 'Multi-masking', desc: 'Clay mask di T-zone, hydrating mask di pipi — sekaligus dalam satu sesi!' },
      { num: 2, title: 'Pilih produk balanced', desc: 'Gel cream atau emulsi ringan yang bisa kerja untuk kedua area sekaligus.' },
      { num: 3, title: 'Spot treatment BHA di T-zone', desc: 'Fokuskan eksfoliasi hanya di area yang membutuhkan.' },
      { num: 4, title: 'Extra moisture di pipi', desc: 'Tambahkan face oil ringan atau sleeping mask khusus di area pipi malam hari.' },
      { num: 5, title: 'Niacinamide adalah sahabatmu', desc: 'Cocok untuk keduanya — mengontrol T-zone sekaligus tidak mengeringkan pipi.' },
    ],
    pagiSteps: [
      { title: 'Gentle Gel Cleanser', desc: 'Bersih tapi tidak strip skin barrier' },
      { title: 'Balancing Toner', desc: 'pH balancing untuk seluruh wajah' },
      { title: 'Niacinamide Serum', desc: 'Untuk seluruh wajah — aman dan efektif' },
      { title: 'Gel Cream Moisturizer', desc: 'Ringan untuk T-zone, cukup untuk pipi' },
      { title: 'SPF 50', desc: 'Pilih yang light-weight dan non-greasy' },
    ],
    malamSteps: [
      { title: 'Double Cleanse', desc: 'Micellar water lalu gentle cleanser' },
      { title: 'BHA Toner (T-zone saja)', desc: 'Gunakan cotton bud, fokus dahi hidung dagu' },
      { title: 'Hydrating Toner (pipi)', desc: 'Extra hydration di area kering' },
      { title: 'Vitamin C atau Retinol', desc: 'Bergantian, untuk seluruh wajah' },
      { title: 'Light Moisturizer', desc: 'Untuk seluruh wajah, tambahkan face oil di pipi jika perlu' },
    ],
    reco: [
      { cat: 'Serum',       name: 'Niacinamide 10% Serum', ing: 'Niacinamide · Zinc · HA',           img: imgNiacinamideSerum },
      { cat: 'Moisturizer', name: 'Hyaluron Moisturizer',  ing: 'HA · Ceramide · Light',             img: imgHyaluronMoisturizer },
      { cat: 'Exfoliator',  name: 'AHA BHA Exfo Toner',    ing: 'BHA · AHA · Calming',               img: imgAHABHAExfoToner },
      { cat: 'Serum',       name: 'Vitamin C Glow Serum',  ing: 'Vit C 15% · Ferulic Acid',          img: imgVitaminCGlowSerum },
    ]
  },
  {
    id: 'sensitif',
    image: kulitSensitif,
    emoji: '🌸',
    label: 'Tipe 4',
    name: 'Kulit Sensitif',
    color: 'linear-gradient(135deg,#f0b8c8,#e89ab0)',
    bgCard: '#FDF2F8',
    bgDetail: '#FADBD8',
    ciri: [
      'Mudah kemerahan (redness)',
      'Terasa gatal atau terbakar saat memakai produk baru',
      'Reaksi terhadap perubahan suhu',
      'Kulit kencang dan tipis',
      'Bekas kemerahan lama hilang',
      'Mudah iritasi akibat fragrance/alkohol',
      'Sering muncul ruam atau dermatitis'
    ],
    cara: [
      { num: 1, title: 'Pilih produk fragrance-free & hypoallergenic', desc: 'Hindari wewangian, alkohol, dan pewarna buatan dalam produk.' },
      { num: 2, title: 'Patch test setiap produk baru', desc: 'Coba di belakang telinga atau pergelangan tangan 24 jam sebelum dipakai ke wajah.' },
      { num: 3, title: 'Minimal ingredient list', desc: 'Makin sedikit bahan aktif, makin kecil risiko reaksi. Hindari produk dengan 20+ bahan.' },
      { num: 4, title: 'Hindari eksfoliasi fisik', desc: 'Scrub fisik bisa merusak lapisan kulit tipis. Pilih enzim eksfolian atau AHA konsentrasi rendah.' },
      { num: 5, title: 'Prioritaskan barrier repair', desc: 'Ceramide, Centella Asiatica, dan Panthenol adalah trio penyelamat kulit sensitif.' },
    ],
    pagiSteps: [
      { title: 'Air Biasa / Micellar Water', desc: 'Pagi hari tidak perlu cleanser — cukup bilas dengan air dingin' },
      { title: 'Soothing Toner (alcohol-free)', desc: 'Rose water atau toner Centella, tepuk lembut jangan digosok' },
      { title: 'Ceramide Serum / Centella Serum', desc: 'Perkuat barrier dan kurangi kemerahan' },
      { title: 'Rich Barrier Moisturizer', desc: 'Ceramide + Panthenol + Squalane' },
      { title: 'Mineral Sunscreen SPF 50', desc: 'Zinc Oxide / Titanium Dioxide — lebih lembut dari chemical sunscreen' },
    ],
    malamSteps: [
      { title: 'Micellar Water (lembut)', desc: 'Tanpa alkohol, tanpa pewangi' },
      { title: 'Gentle Cream Cleanser', desc: 'Hindari foam cleanser yang terlalu alkali' },
      { title: 'Soothing Toner', desc: 'Centella, Aloe Vera, atau Rose Water' },
      { title: 'Ceramide Moisturizer', desc: 'Kunci barrier semalaman' },
      { title: 'Facial Oil (opsional)', desc: 'Rosehip atau squalane — hanya jika kulit sangat kering' },
    ],
    reco: [
      { cat: 'Toner',       name: 'Rose Water Toner',     ing: 'Rose · Centella · Aloe',             img: imgRoseWaterToner },
      { cat: 'Cleanser',    name: 'Green Tea Cleanser',   ing: 'Green Tea · Aloe · No Fragrance',    img: imgGreenTeaCleanser },
      { cat: 'Moisturizer', name: 'Hyaluron Moisturizer', ing: 'HA · Ceramide · Panthenol',          img: imgHyaluronMoisturizer },
      { cat: 'Eye Care',    name: 'Peptide Eye Cream',    ing: 'Peptide · Caffeine · Ceramide',      img: imgPeptideEyeCream },
    ]
  }
];

// ── PERUBAHAN DI SINI: terima navigate sebagai prop ──
function SkinDetailSection({ skin, navigate }) {
  const [openAcc, setOpenAcc] = useState('pagi');

  // ── FUNGSI NAVIGATE KE PRODUK SPESIFIK ──
  const goToProduct = (productName) => {
    navigate('/skincare', { state: { scrollToProduct: productName } });
  };

  return (
    <div className="skin-detail-section" style={{ background: skin.bgDetail }}>
      <div className="skin-detail-header">
        <div className="skin-detail-icon" style={{ background: skin.color }}>
          {skin.image ? (
            <img
              src={skin.image}
              alt={skin.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
            />
          ) : (
            skin.emoji
          )}
        </div>
        <div>
          <div className="hero-label" style={{ color: '#c97b5a' }}>{skin.label}</div>
          <h2 className="section-title-custom">Kulit <em>{skin.name.replace('Kulit ', '')}</em></h2>
        </div>
      </div>

      <div className="detail-grid">

        {/* Ciri-ciri */}
        <div>
          <h6 className="section-label">Ciri-ciri</h6>
          <ul className="ciri-list">
            {skin.ciri.map((c, i) => <li key={i}>{skin.emoji} {c}</li>)}
          </ul>
        </div>

        {/* Cara Merawat */}
        <div>
          <h6 className="section-label">Cara Merawat</h6>
          {skin.cara.map(s => (
            <div key={s.num} className="step-item-custom">
              <div className="step-circle" style={{ backgroundColor: '#c97b5a' }}>{s.num}</div>
              <div className="step-text-custom">
                <strong>{s.title}</strong><br />{s.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Rutinitas */}
        <div>
          <h6 className="section-label">Rutinitas Harian</h6>

          <div className="accordion-item-custom">
            <button
              className={`accordion-btn-custom ${openAcc === 'pagi' ? 'active' : ''}`}
              onClick={() => setOpenAcc(openAcc === 'pagi' ? '' : 'pagi')}
              style={{ backgroundColor: skin.bgCard }}
            >
              ☀️ Rutinitas Pagi
            </button>
            {openAcc === 'pagi' && (
              <div className="accordion-body-custom" style={{ backgroundColor: skin.bgCard }}>
                {skin.pagiSteps.map((s, i) => (
                  <div key={i} className="step-item-custom">
                    <div className="step-circle" style={{ backgroundColor: '#7a9e7e' }}>{i + 1}</div>
                    <div className="step-text-custom">
                      <strong>{s.title}</strong><br />{s.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="accordion-item-custom">
            <button
              className={`accordion-btn-custom ${openAcc === 'malam' ? 'active' : ''}`}
              onClick={() => setOpenAcc(openAcc === 'malam' ? '' : 'malam')}
              style={{ backgroundColor: skin.bgCard }}
            >
              🌙 Rutinitas Malam
            </button>
            {openAcc === 'malam' && (
              <div className="accordion-body-custom" style={{ backgroundColor: skin.bgCard }}>
                {skin.malamSteps.map((s, i) => (
                  <div key={i} className="step-item-custom">
                    <div className="step-circle" style={{ backgroundColor: '#c97b5a' }}>{i + 1}</div>
                    <div className="step-text-custom">
                      <strong>{s.title}</strong><br />{s.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── REKOMENDASI PRODUK — klik langsung ke produk di Skincare ── */}
        <div>
          <h6 className="section-label">Rekomendasi Produk</h6>
          <div className="reco-grid">
            {skin.reco.map((r, i) => (
              <div
                key={i}
                className="reco-card-custom"
                onClick={() => goToProduct(r.name)} // ← PERUBAHAN DI SINI
                style={{ cursor: 'pointer' }}
              >
                <div className="reco-img-wrap" style={{ background: skin.bgCard, padding: 0 }}>
                  <img
                    src={r.img}
                    alt={r.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className="reco-body">
                  <div className="reco-cat">{r.cat}</div>
                  <div className="reco-name">{r.name}</div>
                  <div className="reco-ing">{r.ing}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function JenisKulit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeSkin, setActiveSkin] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="jenis-kulit-page">

      <div className="page-bar">
        <span className="page-bar-text">Person 2 · Halaman 3/3</span>
        <span className="page-bar-icon">🌿</span>
        <span> Ama — Jenis Kulit & Cara Merawatnya</span>
      </div>

      <section className="hero-section">
        <div className="container-custom">

          <div className="hero-label">Kenali Kulitmu</div>
          <h1 className="hero-title">4 <em>Jenis Kulit</em><br />& Cara Merawatnya</h1>
          <p className="hero-sub">
            Memahami jenis kulitmu adalah langkah pertama untuk memilih produk
            yang tepat dan mendapatkan hasil yang optimal.
          </p>

          {loading ? (
            <div className="loading-overlay">
              <div className="spinner-custom"></div>
              <p>Memuat data jenis kulit...</p>
            </div>
          ) : (
            <>
              <div className="skin-grid">
                {skinTypes.map(skin => (
                  <div
                    key={skin.id}
                    className={`skin-card-custom ${activeSkin === skin.id ? 'active' : ''}`}
                    onClick={() => setActiveSkin(activeSkin === skin.id ? null : skin.id)}
                    style={{ backgroundColor: skin.bgCard }}
                  >
                    <div className="skin-img-wrap" style={{ background: skin.color }}>
                      {skin.image ? (
                        <img
                          src={skin.image}
                          alt={skin.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        skin.emoji
                      )}
                    </div>
                    <div className="skin-card-body">
                      <div className="skin-label">{skin.label}</div>
                      <h3 className="skin-name">{skin.name}</h3>
                      <div className="ciri-badges">
                        {skin.ciri.slice(0, 2).map((c, i) => (
                          <span key={i} className="ciri-badge" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="view-detail" style={{ color: '#c97b5a' }}>
                        {activeSkin === skin.id ? '▲ Sembunyikan' : '▼ Lihat Detail'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {activeSkin ? (
                <SkinDetailSection
                  skin={skinTypes.find(s => s.id === activeSkin)}
                  navigate={navigate}
                />
              ) : (
                skinTypes.map(skin => (
                  <SkinDetailSection key={skin.id} skin={skin} navigate={navigate} />
                ))
              )}

              <div className="nav-grid">
                <button className="nav-card" onClick={() => navigate('/Skincare')}>
                  <div className="nav-icon">🛍️</div>
                  <div className="hero-label">Halaman 1</div>
                  <h3 className="nav-title">← Produk Skincare</h3>
                  <p className="nav-sub">Lihat katalog produk lengkap</p>
                </button>
                <button className="nav-card" onClick={() => navigate('/Ingredients')}>
                  <div className="nav-icon">🔬</div>
                  <div className="hero-label">Halaman 2</div>
                  <h3 className="nav-title">← Kandungan Bahan</h3>
                  <p className="nav-sub">Pelajari bahan aktif & kombinasinya</p>
                </button>
              </div>
            </>
          )}

        </div>
      </section>
    </main>
  );
}