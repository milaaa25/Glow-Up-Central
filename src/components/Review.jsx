import { useState, useEffect } from "react";
import api from '../api';

const C = {
  cream: "#fdf6f0", soft: "#f3e8e0", rose: "#e8c5b5",
  roseDark: "#c9956e", brown: "#6b3e2e", text: "#2c1a10",
  muted: "#9b7e70", white: "#ffffff", accent: "#d4876b",
};
const font = {
  serif: "'Cormorant Garamond', serif",
  sans: "'DM Sans', sans-serif",
};

const ALL_REVIEWS = [
  { id: 1,  stars: 5, name: "Sari W.",    age: 24, city: "Jakarta",    product: "Niacinamide 10% Serum",     text: "Serum ini benar-benar mengubah kulitku! Pori-pori mengecil drastis dalam 3 minggu pemakaian, minyak berkurang, dan bekas jerawat mulai memudar. Harga terjangkau untuk hasil sebagus ini!" },
  { id: 2,  stars: 5, name: "Rina A.",    age: 22, city: "Surabaya",   product: "Airy Sunscreen SPF50+",     text: "Akhirnya nemu sunscreen yang tidak meninggalkan white cast sama sekali! Ringan, cepat meresap, tidak bikin wajah greasy. Sudah jadi sunscreen wajib harian saya." },
  { id: 3,  stars: 5, name: "Maya D.",    age: 19, city: "Bandung",    product: "Vitamin C 15% Serum",       text: "Kulit saya jadi lebih cerah dan glowing sejak pakai serum ini! Bekas jerawat juga berkurang signifikan. Sangat puas, worth every rupiah yang dikeluarkan." },
  { id: 4,  stars: 5, name: "Lisa P.",    age: 26, city: "Yogyakarta", product: "Honey Glow Sleep Mask",     text: "Masker tidur honey glow ini ajaib! Bangun pagi kulit terasa seperti habis facial di salon. Kandungan manuka honey-nya kerasa banget hasilnya, kulit plump dan glowing." },
  { id: 5,  stars: 5, name: "Ayu F.",     age: 23, city: "Medan",      product: "Vitamin C 15% Serum",       text: "Vitamin C serum ini jadi favorit harian saya, kulit terasa lebih cerah sejak minggu pertama pemakaian. Harga sangat reasonable untuk kualitasnya!" },
  { id: 6,  stars: 5, name: "Nadia K.",   age: 22, city: "Semarang",   product: "Aloe Vera Soothing Serum",  text: "Aloe vera serum-nya lembut banget dan tidak menyebabkan iritasi sama sekali pada kulit sensitif saya. Sangat cocok untuk kulit yang mudah kemerahan. Highly recommended!" },
  { id: 7,  stars: 5, name: "Dewi R.",    age: 28, city: "Bali",       product: "Jade Gua Sha Stone",        text: "Gua sha stone-nya bagus banget! Setelah 2 minggu pakai rutin setiap pagi, wajah saya terasa lebih firm dan kontur lebih terlihat. Hasilnya nyata!" },
  { id: 8,  stars: 5, name: "Indah S.",   age: 30, city: "Surabaya",   product: "Retinol 0.3% Night Serum",  text: "Retinol serum-nya luar biasa! Tekstur kulit membaik signifikan dalam 3 minggu. Tidak terlalu kuat untuk pemula, transisinya mulus tanpa purging yang parah." },
  { id: 9,  stars: 5, name: "Citra A.",   age: 20, city: "Jakarta",    product: "Beauty Blender Pro",        text: "Suka banget dengan beauty blender-nya! Aplikasi foundation jadi mulus banget, tidak ada streaks atau bercak. Sudah rekomend ke semua teman-teman saya!" },
  { id: 10, stars: 5, name: "Hana R.",    age: 32, city: "Surabaya",   product: "EMS Microcurrent Lifter",   text: "EMS microcurrent lifter-nya luar biasa! Setelah 4 minggu rutin pakai, rahang saya terasa lebih tegas dan kulit lebih kencang. Mahal tapi sebanding!" },
  { id: 11, stars: 5, name: "Santi L.",   age: 24, city: "Jakarta",    product: "Centella Calming Toner",    text: "Toner centella ini penyelamat kulit saya pasca chemical peeling! Menenangkan iritasi dengan cepat dan mengembalikan kondisi kulit ke normal. Sangat recommended!" },
  { id: 12, stars: 5, name: "Tika W.",    age: 22, city: "Bandung",    product: "Hydrating Foam Cleanser",   text: "Pembersih ini benar-benar membersihkan wajah saya secara menyeluruh! Pori terasa bersih dan kulit tidak tertarik sama sekali setelah cuci muka." },
  { id: 13, stars: 4, name: "Tika M.",    age: 25, city: "Makassar",   product: "Pro Brush Set 12pcs",       text: "Brush set 12pcs-nya mantap. Semua kuas yang dibutuhkan sudah ada dalam satu set. Bulu-bulunya lembut dan tidak rontok. Minus satu karena handle-nya agak licin." },
  { id: 14, stars: 4, name: "Putri L.",   age: 21, city: "Medan",      product: "Water Stain Lip Tint",      text: "Lip tint water stain-nya bagus untuk tampilan natural. Warna fade dengan cantik jadi ombre. Sayangnya tidak tahan lama kalau makan makanan berminyak." },
  { id: 15, stars: 4, name: "Winda P.",   age: 27, city: "Surabaya",   product: "Velvet Matte Lipstick",     text: "Velvet matte lipstick pigmen-nya wow banget! Agak kering di bibir kalau dipakai seharian, tapi untuk event singkat sangat oke dan warnanya cantik." },
  { id: 16, stars: 4, name: "Olla R.",    age: 20, city: "Depok",      product: "Volume Lift Mascara",       text: "Mascara volume lift ini oke untuk sehari-hari. Tidak waterproof jadi kalau hujan agak luntur, tapi untuk hari biasa bagus dan tidak clumping sama sekali." },
  { id: 17, stars: 4, name: "Dina R.",    age: 28, city: "Bandung",    product: "Hyaluronic Acid Toner",     text: "Toner HA ini nyaman di kulit dan cepat meresap. Hidrasi terasa cukup baik untuk kulit saya yang kering. Minus karena tidak ada pump, jadi suka tumpah." },
  { id: 18, stars: 4, name: "Vera T.",    age: 27, city: "Jakarta",    product: "Ultrasonic Skin Scrubber",  text: "Spatula ultrasonik ini benar-benar mengangkat kotoran dari pori! Setelah pakai, kulit terasa lebih bersih dan produk skincare lebih mudah meresap." },
  { id: 19, stars: 3, name: "Fitri H.",   age: 27, city: "Palembang",  product: "Cushion Foundation Pro",    text: "Cushion foundation-nya bagus untuk coverage, tapi sayangnya shade yang tersedia tidak terlalu cocok untuk kulit saya yang lebih gelap. Semoga ada shade lebih inklusif." },
  { id: 20, stars: 3, name: "Ina R.",     age: 24, city: "Jakarta",    product: "Shimmer Highlighter Stick", text: "Highlighter stick ini warnanya cantik tapi daya tahannya biasa saja. Di tengah hari hilang dan perlu touch-up. Untuk acara singkat oke, tapi untuk seharian kurang." },
  { id: 21, stars: 3, name: "Keke S.",    age: 25, city: "Surabaya",   product: "Skin Tint SPF30",           text: "Skin tint ini mudah diaplikasikan dan bagus untuk casual. Sayangnya coverage-nya tidak sepenuhnya penuh, masih terlihat beberapa blemish untuk kulit bermasalah." },
  { id: 22, stars: 2, name: "Kiki S.",    age: 23, city: "Semarang",   product: "Lip Plumper Gloss",         text: "Lip gloss ini bikin bibir agak tidak nyaman. Hasilnya ada tapi hanya bertahan sangat sebentar sekali. Tidak akan beli lagi, lebih suka lip oil biasa yang aman." },
  { id: 23, stars: 2, name: "Leli A.",    age: 25, city: "Bandung",    product: "Waterproof Eyeliner Felt",  text: "Eyeliner-nya warnanya memang bagus tapi formula-nya kurang tahan lama. Dalam 2-3 jam sudah mulai luntur bahkan tanpa kena air. Untuk harga segini harusnya lebih baik." },
  { id: 24, stars: 1, name: "Peni A.",    age: 24, city: "Yogyakarta", product: "Silicone Facial Brush",     text: "Kuas silikon ini tidak bekerja seperti yang diklaim. Pori-pori saya justru tersumbat setelah pemakaian rutin. Sangat tidak sesuai ekspektasi dari deskripsi produk." },
];

// ===================== STARS =====================
function Stars({ count }) {
  return (
    <span style={{ color: C.roseDark, fontSize: "0.88rem", letterSpacing: "1px" }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

// ===================== REVIEW CARD =====================
function ReviewCard({ r }) {
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.rose}`,
      borderRadius: 4, padding: "1.8rem",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(107,62,46,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
        <div>
          <strong style={{ fontSize: "0.9rem", color: C.brown }}>{r.name}</strong>
          <span style={{ fontSize: "0.72rem", color: C.muted, marginLeft: "0.5rem" }}>
            {r.age} th · {r.city}
          </span>
        </div>
        <Stars count={r.stars} />
      </div>
      <p style={{
        fontSize: "0.68rem", letterSpacing: "0.1em",
        textTransform: "uppercase", color: C.accent, marginBottom: "0.7rem",
      }}>
        {r.product}
      </p>
      <p style={{ fontSize: "0.83rem", color: C.muted, lineHeight: 1.75 }}>
        {r.text}
      </p>
    </div>
  );
}

// ===================== MAIN EXPORT =====================
export default function Review() {
  const [filterStar, setFilterStar] = useState("all");
  const [page, setPage]             = useState(1);
  const [loading, setLoading]       = useState(true);
  const [apiReviewers, setApiReviewers] = useState([]); // ← DATA DARI API
  const PER_PAGE = 6;

  useEffect(() => {
    api.get('/reviews')
      .then((res) => {
        const STAR_LEVELS = [5, 4, 3, 2, 1];

        // Guard: kalau review dari backend kurang dari 5, jangan bikin chip
        // (biar gak crash akses res.data[i] yang undefined)
        if (!res.data || res.data.length < STAR_LEVELS.length) {
          setApiReviewers([]);
          return;
        }

        // Transform: 1 chip per bintang (5 chip), sisanya diabaikan
        const chips = STAR_LEVELS.map((star, i) => ({
          id:    res.data[i].id,
          star:  star,
          count: ALL_REVIEWS.filter(r => r.stars === star).length,
        }));
        setApiReviewers(chips);
      })
      .catch((err) => {
        console.error('Gagal memuat reviews dari backend:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Loading indicator (dinilai di UTS)
  if (loading) {
    return (
      <div style={{ background: "#fdf6f0", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 40, height: 40,
          border: "3px solid #e8c5b5", borderTop: "3px solid #c9956e",
          borderRadius: "50%", animation: "spin 0.8s linear infinite"
        }} />
        <p style={{ color: "#9b7e70", marginTop: "1rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
          Memuat ulasan pelanggan...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  const filtered = filterStar === "all"
    ? ALL_REVIEWS
    : ALL_REVIEWS.filter(r => r.stars === Number(filterStar));

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const avgRating = (ALL_REVIEWS.reduce((a, r) => a + r.stars, 0) / ALL_REVIEWS.length).toFixed(1);
  const starCounts = [5, 4, 3, 2, 1].map(s => ({
    star: s,
    count: ALL_REVIEWS.filter(r => r.stars === s).length,
  }));

  const handleFilter = (val) => {
    setFilterStar(val);
    setPage(1);
  };

  return (
    <div style={{ fontFamily: font.sans, background: C.cream, minHeight: "100vh" }}>

      {/* PAGE SECTION BAR */}
      <div style={{
        background: C.soft, borderBottom: `1px solid ${C.rose}`,
        padding: "8px 2rem", display: "flex", alignItems: "center", gap: "1.5rem",
      }}>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>

        {/* HEADER */}
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, marginBottom: "0.8rem", fontWeight: 500 }}>
        
        </p>
        <h2 style={{
          fontFamily: font.serif, fontSize: "2.8rem",
          fontWeight: 300, color: C.brown, marginBottom: "1rem", lineHeight: 1.2,
        }}>
          Apa Kata <em style={{ fontStyle: "italic" }}>Pelanggan?</em>
        </h2>
        <p style={{ fontSize: "0.95rem", color: C.muted, lineHeight: 1.8, maxWidth: 550, marginBottom: "3rem" }}>
          Ulasan jujur dari ratusan pelanggan setia GLŌW.
        </p>

        {/* FILTER BINTANG DARI API */}
        {apiReviewers.length > 0 && (
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, fontWeight: 600, marginBottom: "0.8rem" }}>
              Filter Berdasarkan Bintang
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {apiReviewers.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { handleFilter(String(r.star)); setPage(1); }}
                  style={{
                    background: filterStar === String(r.star) ? C.roseDark : C.white,
                    border: `1px solid ${C.rose}`,
                    borderRadius: 4, padding: "0.4rem 0.9rem",
                    fontSize: "0.75rem",
                    color: filterStar === String(r.star) ? C.white : C.brown,
                    cursor: "pointer",
                    fontWeight: filterStar === String(r.star) ? 600 : 400,
                    transition: "all 0.2s ease",
                  }}
                >
                  {"★".repeat(r.star)}{"☆".repeat(5 - r.star)} ({r.count})
                </button>
              ))}
              <button
                onClick={() => { handleFilter("all"); setPage(1); }}
                style={{
                  background: filterStar === "all" ? C.roseDark : C.white,
                  border: `1px solid ${C.rose}`,
                  borderRadius: 4, padding: "0.4rem 0.9rem",
                  fontSize: "0.75rem",
                  color: filterStar === "all" ? C.white : C.brown,
                  cursor: "pointer",
                  fontWeight: filterStar === "all" ? 600 : 400,
                  transition: "all 0.2s ease",
                }}
              >
                Semua
              </button>
            </div>
          </div>
        )}

        {/* RATING SUMMARY */}
        <div style={{
          background: C.white, border: `1px solid ${C.rose}`,
          borderRadius: 4, padding: "2rem 2.5rem", marginBottom: "3rem",
          display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center",
        }}>
          <div style={{ textAlign: "center", minWidth: 100 }}>
            <div style={{
              fontFamily: font.serif, fontSize: "4rem",
              fontWeight: 600, color: C.brown, lineHeight: 1,
            }}>
              {avgRating}
            </div>
            <Stars count={Math.round(Number(avgRating))} />
            <div style={{ fontSize: "0.72rem", color: C.muted, marginTop: 4 }}>
              dari {ALL_REVIEWS.length} ulasan
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            {starCounts.map(({ star, count }) => (
              <div key={star} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: "0.75rem", color: C.muted, width: 10 }}>{star}</span>
                <span style={{ color: C.roseDark, fontSize: "0.8rem" }}>★</span>
                <div style={{ flex: 1, height: 6, background: C.soft, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    width: `${(count / ALL_REVIEWS.length) * 100}%`,
                    height: "100%", background: C.roseDark, borderRadius: 3,
                  }} />
                </div>
                <span style={{ fontSize: "0.72rem", color: C.muted, width: 20 }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INFO JUMLAH ULASAN */}
        <div style={{ marginBottom: "1.5rem", textAlign: "right" }}>
          <span style={{ fontSize: "0.75rem", color: C.muted }}>
            {filtered.length} ulasan ditemukan
          </span>
        </div>

        {/* REVIEW GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {paginated.map(r => <ReviewCard key={r.id} r={r} />)}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <>
            <div style={{
              display: "flex", justifyContent: "center",
              alignItems: "center", gap: "0.5rem",
              marginTop: "3rem", flexWrap: "wrap",
            }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: "8px 16px", border: `1.5px solid ${C.rose}`,
                  borderRadius: 4, background: "transparent",
                  color: page === 1 ? C.rose : C.brown,
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  fontFamily: font.sans, fontSize: "0.82rem",
                }}>
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{
                  width: 38, height: 38, borderRadius: 4, cursor: "pointer",
                  border: page === p ? "none" : `1.5px solid ${C.rose}`,
                  background: page === p ? C.brown : "transparent",
                  color: page === p ? C.white : C.brown,
                  fontFamily: font.sans, fontSize: "0.85rem",
                  fontWeight: page === p ? 600 : 400,
                }}>
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  padding: "8px 16px", border: `1.5px solid ${C.rose}`,
                  borderRadius: 4, background: "transparent",
                  color: page === totalPages ? C.rose : C.brown,
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  fontFamily: font.sans, fontSize: "0.82rem",
                }}>
                Next →
              </button>
            </div>
            <p style={{ textAlign: "center", fontSize: "0.72rem", color: C.muted, marginTop: "0.8rem" }}>
              Halaman {page} dari {totalPages}
            </p>
          </>
        )}

      </div>
    </div>
  );
}
