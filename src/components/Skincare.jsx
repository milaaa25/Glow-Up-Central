import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Skincare.css';
import { useNavigate, useLocation } from 'react-router-dom';

const imgGreenTeaCleanser        = '/images/GreenTeaCleanser.png';
const imgHyaluronFoamCleanser    = '/images/HyaluronFoamCleanser.png';
const imgSalicylicGelCleanser    = '/images/SalicylicGelCleanser.png';
const imgCentellaCreamCleanser   = '/images/CentellaCreamCleanser.png';
const imgVitaminCGlowSerum       = '/images/VitaminCGlowSerum.png';
const imgHyaluronicAcidSerum     = '/images/HyaluronicAcidSerum.png';
const imgNiacinamideSerum        = '/images/NiacinamideSerum.png';
const imgRetinolSerum            = '/images/RetinolSerum.png';
const imgCentellaCalmSerum       = '/images/CentellaCalmSerum.png';
const imgHyaluronMoisturizer     = '/images/HyaluronMoisturizer.png';
const imgOilFreeGelMoisturizer   = '/images/Oil-FreeGelMoisturizer.png';
const imgRichBarrierCream        = '/images/RichBarrierCream.png';
const imgCalmingSensitiveCream   = '/images/CalmingSensitiveCream.png';
const imgDailySunShield          = '/images/DailySunShieldSPF.png';
const imgMatteControlSPF         = '/images/MatteControlSPF.png';
const imgHydratingSunscreen      = '/images/HydratingSunscreenSPF.png';
const imgMineralSunscreen        = '/images/MineralSunscreenSPF.png';
const imgRoseWaterToner          = '/images/RoseWaterToner.png';
const imgTeaTreeToner            = '/images/TeaTreeClarifyingToner.png';
const imgDeepHydrationToner      = '/images/DeepHydrationToner.png';
const imgBalancingComboToner     = '/images/BalancingComboToner.png';
const imgRetinolNightRepair      = '/images/RetinolNightRepair.png';
const imgOvernightRichRepair     = '/images/OvernightRichRepairCream.png';
const imgAcneControlNightGel     = '/images/AcneControlNight Gel.png';
const imgSoothingNightBalm       = '/images/SoothingNightBalm.png';
const imgPeptideEyeCream         = '/images/PeptideEyeCream.png';
const imgHAHydratingEyeSerum     = '/images/HAHydratingEyeSerum.png';
const imgBrighteningEyeConc      = '/images/BrighteningEyeConcentrate.png';
const imgAHABHAExfoToner         = '/images/AHABHAExfoToner.png';
const imgGlycolicAcidToner       = '/images/GlycolicAcidToner.png';
const imgBHA2PoreCleanser        = '/images/BHAPoreCleanser.png';
const imgEnzymeGentleExfoliator  = '/images/EnzymeGentleExfoliator.png';
const imgNiacinamideEssence      = '/images/NiacinamideEssence.png';
const imgSnailMucinEssence       = '/images/SnailMucinEssence.png';
const imgCentellaAsiaticaEssence = '/images/CentellaAsiaticaEssence.png';
const imgBrighteningFerment      = '/images/BrighteningFermentEssence.png';

const products = [
  { id: 1,  name: 'Green Tea Cleanser',          category: 'cleanser',    img: imgGreenTeaCleanser,        desc: 'Pembersih lembut dengan ekstrak teh hijau kaya antioksidan. Cocok untuk kulit sensitif dan berminyak.',                                    badges: ['Semua Kulit', 'Berminyak', 'Sensitif'] },
  { id: 2,  name: 'Hyaluron Foam Cleanser',      category: 'cleanser',    img: imgHyaluronFoamCleanser,    desc: 'Sabun busa lembut dengan Hyaluronic Acid yang membersihkan tanpa menghilangkan kelembapan alami kulit kering.',                           badges: ['Kering', 'Kombinasi'] },
  { id: 3,  name: 'Salicylic Gel Cleanser',      category: 'cleanser',    img: imgSalicylicGelCleanser,    desc: 'Gel cleanser dengan Salicylic Acid 0.5% untuk membersihkan pori dari dalam dan mencegah komedo serta jerawat.',                           badges: ['Berminyak', 'Kombinasi'] },
  { id: 4,  name: 'Centella Cream Cleanser',     category: 'cleanser',    img: imgCentellaCreamCleanser,   desc: 'Pembersih krim tanpa busa dengan Centella Asiatica dan Ceramide. Sangat lembut untuk kulit sensitif dan reaktif.',                         badges: ['Sensitif', 'Kering'] },
  { id: 5,  name: 'Vitamin C Glow Serum',        category: 'serum',       img: imgVitaminCGlowSerum,       desc: 'Serum brightening dengan 15% Vitamin C stabil yang membantu memudarkan bekas jerawat dan mencerahkan.',                                   badges: ['Semua Kulit', 'Kusam'] },
  { id: 6,  name: 'Hyaluronic Acid Serum',       category: 'serum',       img: imgHyaluronicAcidSerum,     desc: 'Serum hidrasi intensif dengan HA multi-molekul untuk kulit kering dan dehidrasi. Menyerap cepat dan tidak lengket.',                       badges: ['Kering', 'Sensitif'] },
  { id: 7,  name: 'Niacinamide 10% Serum',       category: 'serum',       img: imgNiacinamideSerum,        desc: 'Serum niacinamide konsentrasi tinggi untuk mengontrol minyak, memperkecil pori, dan mencerahkan kulit berminyak.',                         badges: ['Berminyak', 'Kombinasi'] },
  { id: 8,  name: 'Retinol Serum 0.3%',          category: 'serum',       img: imgRetinolSerum,            desc: 'Serum retinol konsentrasi sedang cocok untuk pemula. Anti-aging dan membantu regenerasi sel kulit saat malam hari.',                       badges: ['Dewasa', 'Kombinasi'] },
  { id: 9,  name: 'Centella Calm Serum',         category: 'serum',       img: imgCentellaCalmSerum,       desc: 'Serum menenangkan dengan Centella Asiatica 80% untuk kulit sensitif yang mudah merah, iritasi, dan reaktif.',                             badges: ['Sensitif', 'Semua Kulit'] },
  { id: 10, name: 'Hyaluron Moisturizer',        category: 'moisturizer', img: imgHyaluronMoisturizer,     desc: 'Pelembap ringan dengan Hyaluronic Acid yang memberikan hidrasi berlapis tahan 24 jam untuk semua jenis kulit.',                            badges: ['Kering', 'Kombinasi'] },
  { id: 11, name: 'Oil-Free Gel Moisturizer',    category: 'moisturizer', img: imgOilFreeGelMoisturizer,   desc: 'Pelembap gel ringan tanpa minyak dengan Zinc dan Niacinamide. Mengontrol kilap sepanjang hari tanpa menyumbat pori.',                      badges: ['Berminyak', 'Kombinasi'] },
  { id: 12, name: 'Rich Barrier Cream',          category: 'moisturizer', img: imgRichBarrierCream,        desc: 'Krim pelembap kaya dengan Ceramide, Squalane, dan Shea Butter untuk nutrisi intensif kulit sangat kering dan kusam.',                      badges: ['Sangat Kering'] },
  { id: 13, name: 'Calming Sensitive Cream',     category: 'moisturizer', img: imgCalmingSensitiveCream,   desc: 'Krim pelembap fragrance-free dengan Panthenol dan Allantoin khusus untuk kulit sensitif dan reaktif yang mudah merah.',                    badges: ['Sensitif', 'Kering'] },
  { id: 14, name: 'Daily Sun Shield SPF50+',     category: 'sunscreen',   img: imgDailySunShield,          desc: 'Sunscreen ringan PA++++ tidak meninggalkan white cast. Wajib setiap hari untuk perlindungan optimal.',                                     badges: ['Semua Kulit', 'Berminyak'] },
  { id: 15, name: 'Matte Control SPF50+',        category: 'sunscreen',   img: imgMatteControlSPF,         desc: 'Sunscreen matte finish dengan teknologi sebum-control. Kulit berminyak tetap terlindungi tanpa kilap berlebih seharian.',                  badges: ['Berminyak', 'Kombinasi'] },
  { id: 16, name: 'Hydrating Sunscreen SPF40',   category: 'sunscreen',   img: imgHydratingSunscreen,      desc: 'Sunscreen berbasis krim dengan HA dan Glycerin. Memberikan perlindungan UV sekaligus melembapkan kulit kering seharian.',                  badges: ['Kering', 'Sensitif'] },
  { id: 17, name: 'Mineral Sunscreen SPF50',     category: 'sunscreen',   img: imgMineralSunscreen,        desc: 'Sunscreen mineral dengan Zinc Oxide untuk kulit sensitif. Formulasi lembut, fragrance-free, dan bebas iritan kimia.',                      badges: ['Sensitif', 'Semua Kulit'] },
  { id: 18, name: 'Rose Water Toner',            category: 'toner',       img: imgRoseWaterToner,          desc: 'Toner soothing dengan air mawar Damask yang menyeimbangkan pH kulit dan menghidrasi tanpa alkohol.',                                      badges: ['Sensitif', 'Kering'] },
  { id: 19, name: 'Tea Tree Clarifying Toner',   category: 'toner',       img: imgTeaTreeToner,            desc: 'Toner dengan Tea Tree dan Witch Hazel untuk mengontrol minyak berlebih, mengecilkan pori, dan mencegah jerawat.',                         badges: ['Berminyak', 'Kombinasi'] },
  { id: 20, name: 'Deep Hydration Toner',        category: 'toner',       img: imgDeepHydrationToner,      desc: 'Toner serum dengan HA dan Glycerin berlapis untuk kulit kering yang membutuhkan hidrasi ekstra sebelum moisturizer.',                     badges: ['Kering', 'Semua Kulit'] },
  { id: 21, name: 'Balancing Combo Toner',       category: 'toner',       img: imgBalancingComboToner,     desc: 'Toner penyeimbang untuk kulit kombinasi. Mengontrol T-zone berminyak sekaligus menghidrasi area pipi yang kering.',                       badges: ['Kombinasi', 'Semua Kulit'] },
  { id: 22, name: 'Retinol Night Repair',        category: 'night-cream', img: imgRetinolNightRepair,      desc: 'Krim malam dengan Retinol 0.1% dan Peptide untuk regenerasi sel kulit saat tidur. Anti-aging terpercaya.',                               badges: ['Dewasa', 'Kombinasi'] },
  { id: 23, name: 'Overnight Rich Repair Cream', category: 'night-cream', img: imgOvernightRichRepair,     desc: 'Krim malam super kaya dengan Shea Butter, Ceramide, dan Peptide untuk recovery total kulit kering dan kusam saat tidur.',               badges: ['Sangat Kering'] },
  { id: 24, name: 'Acne Control Night Gel',      category: 'night-cream', img: imgAcneControlNightGel,     desc: 'Gel krim malam ringan dengan Niacinamide dan Zinc untuk mengontrol produksi sebum dan mencegah jerawat baru muncul.',                    badges: ['Berminyak', 'Kombinasi'] },
  { id: 25, name: 'Soothing Night Balm',         category: 'night-cream', img: imgSoothingNightBalm,       desc: 'Balm malam fragrance-free dengan Centella, Allantoin, dan Ceramide untuk memulihkan kulit sensitif yang teriritasi.',                   badges: ['Sensitif', 'Kering'] },
  { id: 26, name: 'Peptide Eye Cream',           category: 'eye-care',    img: imgPeptideEyeCream,         desc: 'Krim mata dengan Tripeptide dan Caffeine untuk mengurangi dark circle, puffiness, dan garis halus di area mata.',                        badges: ['Semua Kulit'] },
  { id: 27, name: 'HA Hydrating Eye Serum',      category: 'eye-care',    img: imgHAHydratingEyeSerum,     desc: 'Serum mata ringan dengan HA dan Vitamin E untuk mengatasi area mata kering, kusam, dan garis halus akibat dehidrasi.',                  badges: ['Kering', 'Sensitif'] },
  { id: 28, name: 'Brightening Eye Concentrate', category: 'eye-care',    img: imgBrighteningEyeConc,      desc: 'Konsentrat mata dengan Vitamin C dan Niacinamide untuk mencerahkan dark circle dan area sekitar mata yang kusam.',                       badges: ['Semua Kulit', 'Kusam'] },
  { id: 29, name: 'AHA BHA Exfo Toner',          category: 'exfoliator',  img: imgAHABHAExfoToner,         desc: 'Eksfoliasi kimia lembut dengan AHA 5% + BHA 2% untuk kulit cerah dan pori bersih. Gunakan 2-3x seminggu.',                               badges: ['Berminyak', 'Kombinasi'] },
  { id: 30, name: 'Glycolic Acid 7% Toner',      category: 'exfoliator',  img: imgGlycolicAcidToner,       desc: 'Eksfoliasi AHA dengan Glycolic Acid 7% untuk meratakan tekstur kulit kering dan kusam. Hasilkan kulit halus bercahaya.',                 badges: ['Kering', 'Kombinasi'] },
  { id: 31, name: 'BHA 2% Pore Cleanser',        category: 'exfoliator',  img: imgBHA2PoreCleanser,        desc: 'Eksfoliator BHA fokus untuk membersihkan komedo dan pori tersumbat pada kulit berminyak. Gunakan malam hari 3x/minggu.',                 badges: ['Berminyak'] },
  { id: 32, name: 'Enzyme Gentle Exfoliator',    category: 'exfoliator',  img: imgEnzymeGentleExfoliator,  desc: 'Eksfoliasi enzim dari papaya dan pumpkin yang super lembut. Aman untuk kulit sensitif yang tidak tahan eksfoliasi kimia.',              badges: ['Sensitif', 'Kering'] },
  { id: 33, name: 'Niacinamide Essence 10%',     category: 'essence',     img: imgNiacinamideEssence,      desc: 'Essence dengan Niacinamide 10% + Zinc untuk mencerahkan, memperkecil pori, dan mengontrol minyak secara optimal.',                       badges: ['Semua Kulit', 'Berminyak'] },
  { id: 34, name: 'Snail Mucin Essence 96%',     category: 'essence',     img: imgSnailMucinEssence,       desc: 'Essence snail secretion filtrate 96% untuk hidrasi dan regenerasi intensif pada kulit kering dan kurang elastis.',                       badges: ['Kering', 'Semua Kulit'] },
  { id: 35, name: 'Centella Asiatica Essence',   category: 'essence',     img: imgCentellaAsiaticaEssence, desc: 'Essence Centella 70% untuk menenangkan kulit sensitif merah dan reaktif sekaligus memperkuat skin barrier secara perlahan.',            badges: ['Sensitif', 'Kering'] },
  { id: 36, name: 'Brightening Ferment Essence', category: 'essence',     img: imgBrighteningFerment,      desc: 'Essence fermentasi dengan Galactomyces dan Alpha Arbutin untuk mencerahkan dan meratakan warna kulit kombinasi kusam.',                  badges: ['Kombinasi', 'Semua Kulit'] }
];

const categories = [
  { id: 'semua',       name: 'Semua' },
  { id: 'cleanser',    name: 'Cleanser' },
  { id: 'serum',       name: 'Serum' },
  { id: 'moisturizer', name: 'Moisturizer' },
  { id: 'sunscreen',   name: 'Sunscreen' },
  { id: 'toner',       name: 'Toner' },
  { id: 'night-cream', name: 'Night Cream' },
  { id: 'eye-care',    name: 'Eye Care' },
  { id: 'exfoliator',  name: 'Exfoliator' },
  { id: 'essence',     name: 'Essence' }
];

const routineSteps = [
  { num: '01', name: 'Cleanser',    product: 'Green Tea Cleanser' },
  { num: '02', name: 'Toner',       product: 'Rose Water Toner' },
  { num: '03', name: 'Essence',     product: 'Niacinamide 10%' },
  { num: '04', name: 'Serum',       product: 'Vitamin C Serum' },
  { num: '05', name: 'Eye Cream',   product: 'Peptide Eye Cream' },
  { num: '06', name: 'Moisturizer', product: 'Hyaluron Moist.' },
  { num: '07', name: 'Sunscreen',   product: 'Sun Shield SPF50+' }
];

function ProductCard({ product, isHighlighted }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [isHighlighted]);

  const getBadgeClass = (badge) => {
    const badgeMap = {
      'Semua Kulit':  'badge-all',
      'Berminyak':    'badge-oil',
      'Kering':       'badge-dry',
      'Sensitif':     'badge-sens',
      'Kombinasi':    'badge-combo',
      'Sangat Kering':'badge-dry',
      'Kusam':        'badge-dry',
      'Dewasa':       'badge-all'
    };
    return badgeMap[badge] || 'badge-all';
  };

  return (
    <div className="product-col" ref={cardRef}>
      <div
        className="product-card"
        style={isHighlighted ? {
          outline: '3px solid #c97b5a',
          boxShadow: '0 0 20px rgba(201,123,90,0.4)',
          transform: 'scale(1.02)',
          transition: 'all 0.3s ease'
        } : {}}
      >
        <div className="product-img-box">
          <img src={product.img} alt={product.name} className="product-img-photo" />
        </div>
        <div className="product-body">
          <div className="product-cat">{product.category}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-desc">{product.desc}</div>
          <div className="product-badges">
            {product.badges.map((badge, idx) => (
              <span key={idx} className={`badge-skin ${getBadgeClass(badge)}`}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skincare() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading]                       = useState(true);
  const [activeFilter, setActiveFilter]             = useState('semua');
  const [filteredProducts, setFilteredProducts]     = useState(products);
  const [highlightedProduct, setHighlightedProduct] = useState(null);
  const [articles, setArticles]                     = useState([]);

  useEffect(() => {
    const ARTICLE_DATA = [
      { tag: 'Cleansing',  emoji: '🫧', title: 'Double Cleansing: Kenapa Wajib?',         summary: 'Pastikan semua kotoran, sunscreen, dan makeup terangkat sempurna sebelum skincare berikutnya diserap kulit.' },
      { tag: 'Routine',    emoji: '✨', title: 'Urutan Layering Skincare yang Benar',       summary: 'Produk tipis (toner, serum) dulu sebelum produk berat (moisturizer) agar penyerapan optimal.' },
      { tag: 'Sun Care',   emoji: '☀️', title: 'Sunscreen Setiap Hari, Hujan atau Terik',  summary: 'UV A menembus awan dan kaca. Tanpa SPF, proses penuaan berlangsung lebih cepat.' },
      { tag: 'Safety',     emoji: '🧪', title: 'Patch Test Sebelum Coba Produk Baru',      summary: 'Oleskan sedikit produk di belakang telinga. Tunggu 24 jam sebelum ke seluruh wajah.' },
      { tag: 'Hydration',  emoji: '💧', title: 'Hidrasi vs Melembapkan: Beda Lho!',        summary: 'Hydrator (HA) menarik air ke kulit, moisturizer (ceramide) menguncinya. Keduanya perlu dipakai.' },
    ];
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then((res) => {
        const merged = ARTICLE_DATA.map((art, i) => ({
          id:      res.data[i].id,
          tag:     art.tag,
          emoji:   art.emoji,
          title:   art.title,
          summary: art.summary,
        }));
        setArticles(merged);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Handle navigasi dari Quiz - auto filter badge jenis kulit
  const [quizBadge, setQuizBadge] = useState(null);

  useEffect(() => {
    if (location.state?.fromQuiz && location.state?.skinType) {
      const skinType = location.state.skinType; // e.g. "Berminyak", "Kering", dll
      setQuizBadge(skinType);
      // Scroll ke produk grid setelah sebentar
      setTimeout(() => {
        document.querySelector('.product-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
    }
    if (location.state?.scrollToProduct) {
      const productName = location.state.scrollToProduct;
      const found = products.find(p =>
        p.name.toLowerCase() === productName.toLowerCase()
      );
      if (found) {
        setActiveFilter(found.category);
        setHighlightedProduct(found.id);
        setTimeout(() => setHighlightedProduct(null), 3000);
      }
    }
  }, [location.state]);

  useEffect(() => {
    let result = products;
    if (activeFilter !== 'semua') {
      result = result.filter(p => p.category === activeFilter);
    }
    if (quizBadge) {
      result = result.filter(p => p.badges.includes(quizBadge));
    }
    setFilteredProducts(result);
  }, [activeFilter, quizBadge]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner-custom"></div>
        <p>Memuat data produk skincare...</p>
      </div>
    );
  }

  return (
    <main className="produk-page">
      <div className="page-bar">
        <span className="page-bar-text">Person 2 · Halaman 1/3</span>
        <span className="page-bar-icon">🌿</span>
        <span> Ama — Halaman Skincare Utama</span>
      </div>
      <section className="hero-section">
        <div className="container-custom">
          <div className="hero-label">Perawatan Kulit</div>
          <h1 className="hero-title">Produk <em>Skincare</em><br />Terbaik Kami</h1>
          <p className="hero-sub">
            Produk-produk pilihan yang telah teruji secara dermatologis,
            cocok untuk berbagai jenis kulit.
          </p>
          {/* Banner hasil quiz */}
          {quizBadge && (
            <div style={{
              background: '#fff0f3', border: '1px solid #fbcad9',
              borderRadius: 10, padding: '0.9rem 1.25rem',
              marginBottom: '1rem', display: 'flex',
              alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '0.5rem'
            }}>
              <span style={{ color: '#6b3e2e', fontSize: '0.9rem', fontWeight: 600 }}>
                🧴 Hasil Quiz: menampilkan produk untuk kulit <strong style={{ color: '#c3073f' }}>{quizBadge}</strong>
              </span>
              <button
                onClick={() => setQuizBadge(null)}
                style={{
                  background: 'none', border: '1px solid #fbcad9',
                  borderRadius: 6, padding: '0.25rem 0.75rem',
                  color: '#9b7e70', cursor: 'pointer', fontSize: '0.78rem'
                }}
              >
                ✕ Hapus filter quiz
              </button>
            </div>
          )}

          <div className="filter-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-pill ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isHighlighted={highlightedProduct === product.id}
                />
              ))
            ) : (
              <div className="empty-msg">
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--brown)' }}>
                  Produk tidak ditemukan
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '8px' }}>
                  Belum ada produk di kategori ini.
                </p>
              </div>
            )}
          </div>
          <div className="routine-banner">
            <div className="routine-header">
              <div>
                <div className="hero-label">Panduan Pemakaian</div>
                <h2 className="section-title-custom">Urutan Skincare <em>yang Benar</em></h2>
              </div>
            </div>
            <div className="routine-steps">
              {routineSteps.map(step => (
                <div key={step.num} className="routine-step">
                  <div className="step-num">{step.num}</div>
                  <div className="step-name">{step.name}</div>
                  <div className="step-prod">{step.product}</div>
                </div>
              ))}
            </div>
          </div>
          {articles.length > 0 && (
            <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
              <div className="hero-label">Tips dari Kami</div>
              <h2 className="section-title-custom">Tips <em>Skincare</em> Penting</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                {articles.map(art => (
                  <div key={art.id} style={{ background: 'white', border: '1px solid #e8c5b5', borderRadius: 8, padding: '1.2rem' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{art.emoji}</div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4876b', fontWeight: 600 }}>{art.tag}</span>
                    <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#6b3e2e', margin: '0.4rem 0' }}>{art.title}</h4>
                    <p style={{ fontSize: '0.78rem', color: '#9b7e70', lineHeight: 1.6, margin: 0 }}>{art.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="nav-grid">
            <button className="nav-card" onClick={() => navigate('/Ingredients')}>
              <div className="nav-icon">🔬</div>
              <div className="hero-label">Halaman 2</div>
              <h3 className="nav-title">Kandungan Bahan →</h3>
              <p className="nav-sub">Pelajari bahan aktif, keamanan, dan kombinasi yang tepat</p>
            </button>
            <button className="nav-card" onClick={() => navigate('/jenis-kulit')}>
              <div className="nav-icon">🧴</div>
              <div className="hero-label">Halaman 3</div>
              <h3 className="nav-title">Jenis Kulit →</h3>
              <p className="nav-sub">Kenali kulitmu & temukan rutinitas skincare yang tepat</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
