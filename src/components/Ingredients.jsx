// src/pages/KandunganBahan.jsx
import { useState, useEffect } from 'react';
import './Ingredients.css'; // Pastikan file CSS ini sudah dibuat dan diisi dengan style yang sesuai
import { useNavigate } from 'react-router-dom';


const ingredientData = [
  { name: 'Niacinamide', sub: 'Vitamin B3', manfaat: 'Mencerahkan, memperkecil pori, mengontrol minyak', cocok: 'Semua jenis kulit', waktu: 'Pagi & Malam', status: 'Aman', badge: 'aman' },
  { name: 'Vitamin C', sub: 'Ascorbic Acid', manfaat: 'Antioksidan kuat, brightening, memudarkan bekas jerawat', cocok: 'Kulit kusam & bekas jerawat', waktu: 'Pagi', status: 'Aman', badge: 'aman' },
  { name: 'Retinol', sub: 'Vitamin A', manfaat: 'Anti-aging, regenerasi sel, mengatasi jerawat', cocok: 'Kulit dewasa & berjerawat', waktu: 'Malam', status: 'Hati-hati', badge: 'hati' },
  { name: 'AHA (Glycolic Acid)', sub: 'Alpha Hydroxy Acid', manfaat: 'Eksfoliasi permukaan, tekstur halus, brightening', cocok: 'Kulit kering & kusam', waktu: 'Malam', status: 'Hati-hati', badge: 'hati' },
  { name: 'BHA (Salicylic Acid)', sub: 'Beta Hydroxy Acid', manfaat: 'Membersihkan pori dari dalam, anti jerawat', cocok: 'Kulit berminyak & berjerawat', waktu: 'Malam', status: 'Hati-hati', badge: 'hati' },
  { name: 'Hyaluronic Acid', sub: 'Sodium Hyaluronate', manfaat: 'Hidrasi berlapis, mengisi kelembapan, plumping', cocok: 'Semua jenis kulit', waktu: 'Pagi & Malam', status: 'Aman', badge: 'aman' },
  { name: 'Peptide', sub: 'Amino Acid Chain', manfaat: 'Produksi kolagen, anti-aging, elastisitas kulit', cocok: 'Semua kulit, terutama dewasa', waktu: 'Pagi & Malam', status: 'Aman', badge: 'aman' },
  { name: 'Benzoyl Peroxide', sub: 'BP', manfaat: 'Membunuh bakteri jerawat, mengeringkan bintil', cocok: 'Kulit berjerawat aktif', waktu: 'Malam', status: 'Hati-hati', badge: 'hati' },
  { name: 'Kojic Acid', sub: 'Brightening Agent', manfaat: 'Menghambat produksi melanin, memudarkan hiperpigmentasi', cocok: 'Kulit berminyak & kusam', waktu: 'Malam', status: 'Hati-hati', badge: 'hati' },
  { name: 'Ceramide', sub: 'Lipid Barrier', manfaat: 'Memperkuat skin barrier, mengunci kelembapan', cocok: 'Kulit kering & sensitif', waktu: 'Pagi & Malam', status: 'Aman', badge: 'aman' },
  { name: 'Zinc PCA', sub: 'Mineral', manfaat: 'Mengontrol sebum, anti inflamasi, penyembuhan jerawat', cocok: 'Kulit berminyak & berjerawat', waktu: 'Pagi & Malam', status: 'Aman', badge: 'aman' },
  { name: 'Hydroquinone', sub: 'Depigmenting', manfaat: 'Menghambat melanin kuat, memudarkan flek hitam', cocok: 'Hiperpigmentasi berat', waktu: 'Malam (resep dokter)', status: 'Perlu Resep', badge: 'hindari' }
];

const detailIngredients = [
  { icon: '✨', name: 'Niacinamide', sub: 'Vitamin B3 • Water-Soluble', status: 'aman', statusText: 'Aman untuk semua kulit', desc: 'Bahan multifungsi terbaik. Bekerja di semua jenis kulit tanpa iritasi. Mengontrol produksi sebum, memperkecil tampilan pori, mencerahkan, dan memperkuat skin barrier dalam satu bahan.', waktu: '☀️🌙 Pagi & Malam', benefit: '✓ Brightening  ✓ Pori  ✓ Barrier  ✓ Acne' },
  { icon: '🍊', name: 'Vitamin C', sub: 'Ascorbic Acid • Antioksidan', status: 'aman', statusText: 'Aman — pakai di pagi hari', desc: 'Antioksidan terkuat untuk kulit. Melindungi dari radikal bebas dan UV, mencerahkan kulit kusam, serta memudarkan bekas jerawat. Pilih formula stabil (Ascorbyl Glucoside) jika kulit sensitif.', waktu: '☀️ Pagi hari saja', benefit: '✓ Brightening  ✓ Anti-UV  ✓ Bekas jerawat' },
  { icon: '🌙', name: 'Retinol', sub: 'Vitamin A • Retinoid', status: 'hati', statusText: 'Hati-hati — mulai pelan', desc: 'Raja anti-aging. Mempercepat pergantian sel kulit, merangsang kolagen, dan mengatasi jerawat. Mulai dengan konsentrasi rendah (0.025%) 2x seminggu. Wajib sunscreen di pagi hari!', waktu: '🌙 Malam hari saja', benefit: '✓ Anti-aging  ✓ Jerawat  ✓ Kolagen  ✓ Tekstur' },
  { icon: '💧', name: 'Hyaluronic Acid', sub: 'HA • Humektan', status: 'aman', statusText: 'Aman untuk semua kulit', desc: 'Humektan super yang mampu menahan 1000x beratnya dalam air. Menghidrasi tanpa menyumbat pori, cocok layering dengan produk lain. Aplikasikan di kulit lembab untuk hasil optimal.', waktu: '☀️🌙 Pagi & Malam', benefit: '✓ Hidrasi  ✓ Plumping  ✓ Non-comedogenic' },
  { icon: '🔬', name: 'AHA (Glycolic Acid)', sub: 'Alpha Hydroxy Acid • Exfoliant', status: 'hati', statusText: 'Hati-hati — jangan terlalu sering', desc: 'Eksfoliasi kimia permukaan kulit. Mengangkat sel kulit mati, meratakan tekstur, dan membantu penyerapan produk berikutnya. Gunakan 2-3x seminggu, tidak setiap hari. Wajib SPF!', waktu: '🌙 Malam (2-3x/minggu)', benefit: '✓ Tekstur  ✓ Brightening  ✓ Penyerapan produk' },
  { icon: '🧴', name: 'BHA (Salicylic Acid)', sub: 'Beta Hydroxy Acid • Oil-Soluble', status: 'hati', statusText: 'Hati-hati — sensitif kulit', desc: 'Satu-satunya eksfolian yang larut minyak, bisa masuk ke dalam pori. Ideal untuk kulit berminyak dan berkomedo. Memiliki sifat anti-inflamasi alami. Gunakan malam hari, 2-3x seminggu.', waktu: '🌙 Malam (2-3x/minggu)', benefit: '✓ Komedo  ✓ Jerawat  ✓ Pori dalam' },
  { icon: '🛡️', name: 'Ceramide', sub: 'Lipid • Barrier Repair', status: 'aman', statusText: 'Aman untuk semua kulit', desc: 'Komponen alami skin barrier yang melindungi kulit dari iritan luar dan mencegah kehilangan air. Sangat penting untuk kulit kering, sensitif, atau yang sedang recovery dari eksfoliasi berlebih.', waktu: '☀️🌙 Pagi & Malam', benefit: '✓ Barrier  ✓ Hidrasi  ✓ Sensitif aman' },
  { icon: '⚗️', name: 'Peptide', sub: 'Amino Acid Chain • Anti-Aging', status: 'aman', statusText: 'Aman — semua kulit', desc: 'Rangkaian asam amino yang memberi sinyal kulit untuk memproduksi kolagen lebih banyak. Meningkatkan elastisitas, mengurangi garis halus, dan memperkuat struktur kulit. Bisa dikombinasi dengan banyak bahan.', waktu: '☀️🌙 Pagi & Malam', benefit: '✓ Kolagen  ✓ Elastisitas  ✓ Anti-aging' },
  { icon: '⚡', name: 'Benzoyl Peroxide', sub: 'BP • Antibakteri', status: 'hati', statusText: 'Hati-hati — bisa iritasi', desc: 'Senjata ampuh melawan jerawat aktif dengan membunuh bakteri P.acnes. Mulai dengan konsentrasi rendah (2.5%). Hanya gunakan sebagai spot treatment. Bisa memutihkan kain/bantal — hati-hati!', waktu: '🌙 Malam — spot treatment', benefit: '✓ Jerawat aktif  ✓ Antibakteri' }
];

const goodCombos = [
  { title: 'Niacinamide + Hyaluronic Acid', pair: 'Niacinamide + HA', reason: 'Kombinasi sempurna untuk hidrasi dan brightening bersamaan. Keduanya aman digunakan pagi & malam tanpa konflik apapun.' },
  { title: 'Vitamin C + Vitamin E + Ferulic Acid', pair: 'Vit C + Vit E + Ferulic', reason: 'Trio antioksidan legendaris. Vitamin E dan Ferulic Acid menstabilkan Vitamin C dan melipatgandakan efektivitasnya hingga 8x.' },
  { title: 'Retinol + Peptide', pair: 'Retinol + Peptide', reason: 'Kombinasi anti-aging terbaik. Retinol mempercepat pergantian sel, Peptide merangsang produksi kolagen baru. Gunakan malam hari.' },
  { title: 'Niacinamide + Zinc', pair: 'Niacinamide + Zinc PCA', reason: 'Duet pengontrol minyak dan anti-jerawat. Zinc membantu mengurangi produksi sebum, Niacinamide memperkecil pori secara bersamaan.' },
  { title: 'AHA/BHA + Niacinamide', pair: 'AHA/BHA + Niacinamide', reason: 'Gunakan AHA/BHA terlebih dahulu (tunggu 20-30 menit), lalu Niacinamide. Niacinamide membantu menenangkan kulit setelah eksfoliasi.' },
  { title: 'Ceramide + Retinol', pair: 'Ceramide + Retinol', reason: 'Ceramide membantu mengurangi iritasi dari Retinol dan memperkuat skin barrier yang bisa melemah akibat retinoid. Sangat dianjurkan!' }
];

const badCombos = [
  { title: 'Retinol + AHA/BHA', pair: 'Retinol ✗ AHA/BHA', reason: 'Kombinasi over-exfoliating yang berbahaya! Kulit bisa mengalami iritasi parah, kemerahan, dan pengelupasan. Gunakan di malam yang berbeda.' },
  { title: 'Vitamin C + AHA/BHA', pair: 'Vit C ✗ AHA/BHA', reason: 'pH yang berbeda membuat keduanya tidak efektif. Vitamin C butuh pH rendah tapi AHA/BHA juga pH rendah — bersaing dan bisa iritasi.' },
  { title: 'Retinol + Vitamin C', pair: 'Retinol ✗ Vit C', reason: 'Vitamin C (pagi) + Retinol (malam) adalah strategi tepat. Jangan gunakan bersamaan — bisa menyebabkan iritasi dan keduanya jadi tidak stabil.' },
  { title: 'Benzoyl Peroxide + Retinol', pair: 'BP ✗ Retinol', reason: 'Benzoyl Peroxide mengoksidasi dan merusak Retinol, membuatnya tidak efektif. Gunakan di malam yang berbeda atau pilih salah satu saja.' },
  { title: 'Benzoyl Peroxide + Vitamin C', pair: 'BP ✗ Vit C', reason: 'Benzoyl Peroxide mengoksidasi Vitamin C dan mengurangi efektivitasnya secara drastis. Pisahkan pemakaian pagi dan malam.' },
  { title: 'AHA + BHA (Bersamaan)', pair: 'AHA ✗ BHA bersamaan', reason: 'Double exfoliant berlebihan untuk kulit. Boleh digunakan bergantian malam (AHA Senin, BHA Rabu), tapi jangan dalam satu waktu sekaligus.' }
];

function IngredientDetailCard({ ingredient }) {
  const getStatusClass = (status) => {
    switch(status) {
      case 'aman': return { bg: '#e8f5e8', color: '#2e7d32' };
      case 'hati': return { bg: '#fff3e0', color: '#e65100' };
      default: return { bg: '#fce4e4', color: '#c62828' };
    }
  };

  const statusStyle = getStatusClass(ingredient.status);

  return (
    <div className="ing-card">
      <div className="ing-icon">{ingredient.icon}</div>
      <div className="ing-card-name">{ingredient.name}</div>
      <div className="ing-card-sub">{ingredient.sub}</div>
      <span className="badge-status" style={{ fontSize: '.7rem', padding: '4px 12px', borderRadius: '20px', background: statusStyle.bg, color: statusStyle.color }}>
        {ingredient.statusText}
      </span>
      <p className="ing-desc mt-3">{ingredient.desc}</p>
      <div className="d-flex gap-2 flex-wrap mb-2">
        <span className="ing-tag tag-waktu" style={{ background: '#fff8e1', color: '#f57f17' }}>{ingredient.waktu}</span>
      </div>
      <div className="ing-benefit">{ingredient.benefit}</div>
    </div>
  );
}

function ComboCard({ combo, isGood }) {
  return (
    <div className={`combo-card ${isGood ? 'combo-ok' : 'combo-no'}`}>
      <div className="combo-title">{combo.title}</div>
      <div className="combo-pair">
        <span className="a">{combo.pair.split('✗')[0]}</span>
        {isGood ? <span>+</span> : <span style={{ color: '#c62828', fontWeight: 700 }}>✗</span>}
        <span className="b">{combo.pair.split(isGood ? '+' : '✗')[1]}</span>
      </div>
      <p className="combo-reason">{combo.reason}</p>
    </div>
  );
}

export default function Ingredients() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const getBadgeClass = (badge) => {
    switch(badge) {
      case 'aman': return 'badge-status badge-aman';
      case 'hati': return 'badge-status badge-hati';
      default: return 'badge-status badge-hindari';
    }
  };

  const getBadgeStyle = (badge) => {
    switch(badge) {
      case 'aman': return { background: '#e8f5e8', color: '#2e7d32' };
      case 'hati': return { background: '#fff3e0', color: '#e65100' };
      default: return { background: '#fce4e4', color: '#c62828' };
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner-custom"></div>
        <p>Memuat data kandungan bahan...</p>
      </div>
    );
  }

  return (
    <main className="kandungan-page">
      {/* Page Bar */}
      <div className="page-bar">
        <span className="page-bar-text">Person 2 · Halaman 2/3</span>
        <span className="page-bar-icon">🌿</span>
        <span> Ama — Kandungan Bahan Skincare</span>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container-custom">
          <div className="hero-label">Formulasi & Bahan</div>
          <h1 className="hero-title">Kenali <em>Kandungan</em><br />Skincare-mu</h1>
          <p className="hero-sub">Memahami bahan aktif membantu kamu memilih produk yang tepat dan menghindari kombinasi yang berbahaya.</p>

          {/* Table */}
          <div className="ingredient-table">
            <table>
              <thead>
                <tr>
                  <th>Bahan Aktif</th>
                  <th>Manfaat</th>
                  <th>Cocok Untuk</th>
                  <th>Waktu Pakai</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ingredientData.map((ing, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="ing-name">{ing.name}</div>
                      <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{ing.sub}</div>
                    </td>
                    <td>{ing.manfaat}</td>
                    <td>{ing.cocok}</td>
                    <td>{ing.waktu}</td>
                    <td><span className={getBadgeClass(ing.badge)} style={getBadgeStyle(ing.badge)}>{ing.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detail Cards */}
          <div className="mt-5 mb-4">
            <div className="hero-label">Detail Bahan Aktif</div>
            <h2 className="section-title-custom">Panduan <em>Lengkap</em> Setiap Bahan</h2>
          </div>

          <div className="detail-grid-cards">
            {detailIngredients.map((ing, idx) => (
              <IngredientDetailCard key={idx} ingredient={ing} />
            ))}
          </div>

          {/* Kombinasi */}
          <div className="mt-5 mb-3">
            <div className="hero-label">Panduan Kombinasi</div>
            <h2 className="section-title-custom">Bahan yang <em>Boleh</em> & Tidak Boleh Dikombinasi</h2>
            <p className="hero-sub mt-3">Mengombinasikan bahan yang salah bisa membuat produk tidak efektif atau bahkan mengiritasi kulit.</p>
          </div>

          <div className="mt-4">
            <h5 className="combo-section-title" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--sage)' }}>✅ Kombinasi yang Disarankan</h5>
            <div className="combo-grid">
              {goodCombos.map((combo, idx) => (
                <ComboCard key={idx} combo={combo} isGood={true} />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h5 className="combo-section-title" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#c62828' }}>❌ Kombinasi yang Harus Dihindari</h5>
            <div className="combo-grid">
              {badCombos.map((combo, idx) => (
                <ComboCard key={idx} combo={combo} isGood={false} />
              ))}
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="nav-grid mt-5">
            <button className="nav-card" onClick={() => navigate('/skincare')}>
              <div className="nav-icon">🛍️</div>
              <div className="hero-label">Halaman 1</div>
              <h3 className="nav-title">← Produk Skincare</h3>
              <p className="nav-sub">Lihat katalog produk lengkap kami</p>
            </button>
            <button className="nav-card" onClick={() => navigate('/jenis-kulit')}>
              <div className="nav-icon">🧴</div>
              <div className="hero-label">Halaman 3</div>
              <h3 className="nav-title">Jenis Kulit →</h3>
              <p className="nav-sub">Temukan rutinitas terbaik untuk kulitmu</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}