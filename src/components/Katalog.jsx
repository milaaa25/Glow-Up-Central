import { useState, useEffect } from "react";
import api from "../api";

const C = {
  cream: "#fdf6f0", soft: "#f3e8e0", rose: "#e8c5b5",
  roseDark: "#c9956e", brown: "#6b3e2e", text: "#2c1a10",
  muted: "#9b7e70", white: "#ffffff", accent: "#d4876b",
};
const font = {
  serif: "'Cormorant Garamond', serif",
  sans: "'DM Sans', sans-serif",
};

// ===================== BADGE STYLE =====================
const BADGE_STYLE = {
  Bestseller: { background: "#6b3e2e", color: "#fff" },
  Hot:        { background: "#c9956e", color: "#fff" },
  New:        { background: "#e8c5b5", color: "#6b3e2e" },
};

// ===================== PRODUCT CARD =====================
function ProductCard({ p }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.white,
        border: `1px solid ${C.rose}`,
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 16px 40px rgba(107,62,46,0.12)" : "none",
      }}
    >
      {/* ── GAMBAR PRODUK ── */}
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        {p.image ? (
          <img
            src={p.image}
            alt={p.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {}
        <div style={{
          display: p.image ? "none" : "flex",
          width: "100%", height: "100%",
          alignItems: "center", justifyContent: "center",
          fontSize: "3.5rem",
          background: `linear-gradient(145deg, ${C.soft}, ${C.rose})`,
          position: p.image ? "absolute" : "static",
          top: 0, left: 0,
        }}>
          {p.emoji}
        </div>

        {}
        {p.badge && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            fontSize: "0.62rem", fontWeight: 500,
            letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "3px 10px", borderRadius: 20,
            ...BADGE_STYLE[p.badge],
          }}>
            {p.badge}
          </span>
        )}
      </div>

      {/* ── INFO PRODUK ── */}
      <div style={{ padding: "1.2rem 1.5rem 1.8rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{
          fontSize: "0.65rem", letterSpacing: "0.15em",
          textTransform: "uppercase", color: C.accent, marginBottom: "0.4rem",
        }}>
          {p.brand}
        </p>
        <h3 style={{
          fontFamily: font.serif, fontSize: "1.15rem",
          fontWeight: 600, color: C.brown,
          marginBottom: "0.5rem", lineHeight: 1.3,
        }}>
          {p.name}
        </h3>
        <p style={{
          fontSize: "0.82rem", color: C.muted,
          lineHeight: 1.7, flex: 1,
        }}>
          {p.desc}
        </p>
        <p style={{
          fontSize: "1rem", fontWeight: 500,
          color: C.brown, marginTop: "1rem",
        }}>
          {p.price}
        </p>
      </div>
    </div>
  );
}

// ===================== CATEGORY SECTION =====================
function CategorySection({ label, emoji, products, search }) {
  const filtered = products.filter(p =>
    !search ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={{ marginBottom: "4rem" }}>
      <h2 style={{
        fontFamily: font.serif, fontSize: "2rem",
        fontWeight: 300, color: C.brown, marginBottom: "1.5rem",
      }}>
        {emoji} <em style={{ fontStyle: "italic" }}>{label}</em>
      </h2>
      <div style={{ width: 48, height: 2, background: C.roseDark, marginBottom: "1.8rem" }} />

      {filtered.length === 0 ? (
        <p style={{ color: C.muted, fontStyle: "italic" }}>Tidak ada produk ditemukan.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "1.5rem",
        }}>
          {filtered.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </section>
  );
}

// ===================== MAIN EXPORT =====================
export default function KatalogProduk() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Semua produk dari backend (tabel `product`), dikelompokkan per category:
  // 'makeup' | 'skincare' | 'alat'
  const [productsDb, setProductsDb] = useState({ makeup: [], skincare: [], alat: [] });

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/products');
        const rows = res.data || [];

        const normalized = rows.map(p => ({
          id: p.id,
          name: p.title,
          brand: p.brand,
          price: p.price,
          desc: p.description,
          emoji: p.emoji || "",
          image: p.image,
          badge: p.badge,
          category: p.category,
        }));

        const grouped = {
          makeup: normalized.filter(p => p.category === 'makeup'),
          skincare: normalized.filter(p => p.category === 'skincare'),
          alat: normalized.filter(p => p.category === 'alat'),
        };

        if (mounted) setProductsDb(grouped);
      } catch (err) {
        console.error('Gagal memuat katalog produk:', err);
        if (mounted) setError('Gagal memuat data katalog produk. Pastikan backend berjalan.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => { mounted = false; };
  }, []);

  const tabs = [
    { key: "all",      label: "Semua"       },
    { key: "makeup",   label: "💄 Makeup"   },
    { key: "skincare", label: "🧴 Skincare" },
    { key: "alat",     label: "🔧 Alat"     },
  ];

  const categories = [
    { key: "makeup",   label: "Makeup",           emoji: "💄" },
    { key: "skincare", label: "Skincare",          emoji: "🧴" },
    { key: "alat",     label: "Alat Kecantikan",   emoji: "🔧" },
  ];

  const showCat = (key) => tab === "all" || tab === key;

  return (
    <div style={{ fontFamily: font.sans, background: C.cream, minHeight: "100vh" }}>

      {/* PAGE SECTION BAR */}
      <div style={{
        background: C.soft, borderBottom: `1px solid ${C.rose}`,
        padding: "8px 2rem", display: "flex", alignItems: "center", gap: "1.5rem",
      }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted }}>
          Person 5 · Halaman 1/3
        </span>
        <span style={{ fontSize: "0.75rem", color: C.brown, fontWeight: 500 }}>
          ⭐ Jejes — Katalog Produk
        </span>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem" }}>

        {/* HEADER */}
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent, marginBottom: "0.8rem", fontWeight: 500 }}>
          
        </p>
        <h2 style={{
          fontFamily: font.serif, fontSize: "2.8rem",
          fontWeight: 300, color: C.brown, marginBottom: "1rem", lineHeight: 1.2,
        }}>
          Katalog <em style={{ fontStyle: "italic" }}>Produk</em> GLŌW
        </h2>
        <p style={{ fontSize: "0.95rem", color: C.muted, lineHeight: 1.8, maxWidth: 550, marginBottom: "3rem" }}>
          Temukan koleksi lengkap produk skincare, makeup, dan alat kecantikan kami.
        </p>

        {/* FILTER & SEARCH */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: "1rem",
          background: C.white, border: `1px solid ${C.rose}`,
          padding: "1rem 1.5rem", borderRadius: 4, marginBottom: "3rem",
        }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)} style={{
                padding: "7px 16px", borderRadius: 4, cursor: "pointer",
                border: tab === t.key ? "none" : `1.5px solid ${C.rose}`,
                background: tab === t.key ? C.brown : "transparent",
                color: tab === t.key ? C.white : C.muted,
                fontSize: "0.78rem", letterSpacing: "0.06em",
                textTransform: "uppercase", fontFamily: font.sans,
                transition: "all 0.2s", fontWeight: tab === t.key ? 500 : 400,
              }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 12, top: "50%",
              transform: "translateY(-50%)", opacity: 0.4, pointerEvents: "none",
            }}>🔍</span>
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                paddingLeft: 36, paddingRight: 14,
                paddingTop: 9, paddingBottom: 9,
                border: `1.5px solid ${C.rose}`, borderRadius: 4,
                fontFamily: font.sans, fontSize: "0.88rem",
                color: C.text, background: C.cream, outline: "none", width: 220,
              }}
              onFocus={e => e.target.style.borderColor = C.accent}
              onBlur={e => e.target.style.borderColor = C.rose}
            />
          </div>
        </div>

        {loading ? (
          <p style={{ color: C.muted, fontStyle: "italic" }}>Memuat katalog produk...</p>
        ) : error ? (
          <p style={{ color: "#c62828" }}>{error}</p>
        ) : (
          /* PRODUCT SECTIONS */
          categories.map((cat, idx) => showCat(cat.key) && (
            <div key={cat.key}>
              <CategorySection
                label={cat.label}
                emoji={cat.emoji}
                products={productsDb[cat.key]}
                search={search}
              />
              {tab === "all" && idx < categories.length - 1 && (
                <hr style={{ borderColor: C.soft, marginBottom: "3rem" }} />
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
}
