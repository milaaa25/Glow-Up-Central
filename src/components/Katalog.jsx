import { useState } from "react";

const C = {
  cream: "#fdf6f0", soft: "#f3e8e0", rose: "#e8c5b5",
  roseDark: "#c9956e", brown: "#6b3e2e", text: "#2c1a10",
  muted: "#9b7e70", white: "#ffffff", accent: "#d4876b",
};
const font = {
  serif: "'Cormorant Garamond', serif",
  sans: "'DM Sans', sans-serif",
};


const PRODUCTS_DB = {
  makeup: [
    {
      id: 1,
      name: "Velvet Matte Lipstick",
      brand: "GLŌW Lips",
      price: "Rp 89.000",
      desc: "Lipstik matte tahan lama dengan formula nyaman, tersedia 12 shade elegan.",
      emoji: "",
      image: "/images/Velvet Matte Lipstick.jpg",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Water Stain Lip Tint",
      brand: "GLŌW Lips",
      price: "Rp 65.000",
      desc: "Lip tint cair berbasis air, hasil natural ombre yang ringan di bibir.",
      emoji: "",
      image: "/images/Water Stain Lip Tint.jpg",
      badge: null,
    },
    {
      id: 3,
      name: "Cushion Foundation Pro",
      brand: "GLŌW Base",
      price: "Rp 175.000",
      desc: "Coverage medium-full, SPF40, formula hydrating cocok semua jenis kulit.",
      emoji: "",
      image: "/images/Cushion Foundation Pro.jpg",
      badge: "New",
    },
    {
      id: 4,
      name: "Volume Lift Mascara",
      brand: "GLŌW Eyes",
      price: "Rp 95.000",
      desc: "Mascara volumizing dengan sikat serat ganda untuk bulu mata lebih tebal.",
      emoji: "",
      image: "/images/Volume Lift Mascara.jpg",
      badge: null,
    },
    {
      id: 5,
      name: "Satin Blush Stick",
      brand: "GLŌW Cheeks",
      price: "Rp 110.000",
      desc: "Blush stick mudah di-blend, formula creamy dengan tampilan satin glowing.",
      emoji: "",
      image: "/images/Satin Blush Stick.jpg",
      badge: "Bestseller",
    },
    {
      id: 6,
      name: "Microblading Brow Pen",
      brand: "GLŌW Brows",
      price: "Rp 125.000",
      desc: "Pulpen alis presisi tip ultra-fine, efek rambut seperti microblading asli.",
      emoji: "",
      image: "/images/Microblading Brow Pen.jpg",
      badge: "Hot",
    },
    {
      id: 7,
      name: "HD Concealer Wand",
      brand: "GLŌW Base",
      price: "Rp 88.000",
      desc: "Concealer full coverage untuk dark circle dan blemish, tahan 12 jam.",
      emoji: "",
      image: "/images/HD Concealer Wand.jpg",
      badge: null,
    },
    {
      id: 8,
      name: "Dewy Fix Setting Spray",
      brand: "GLŌW Finish",
      price: "Rp 79.000",
      desc: "Setting spray hyaluronic acid untuk makeup tahan lama & dewy finish.",
      emoji: "",
      image: "/images/Dewy Fix Setting Spray.jpg",
      badge: null,
    },
  ],
  skincare: [
    {
      id: 1,
      name: "Hydrating Foam Cleanser",
      brand: "GLŌW Cleanse",
      price: "Rp 98.000",
      desc: "Pembersih wajah berbusa lembut dengan ceramide, menjaga barrier kulit.",
      emoji: "",
      image: "/images/Hydrating Foam Cleanser.jpg",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Niacinamide Serum",
      brand: "GLŌW Serum",
      price: "Rp 125.000",
      desc: "Serum niacinamide tinggi untuk mengecilkan pori, mencerahkan, atasi noda.",
      emoji: "",
      image: "/images/Niacinamide Serum.jpg",
      badge: "Hot",
    },
    {
      id: 3,
      name: "Vitamin C Serum",
      brand: "GLŌW Serum",
      price: "Rp 148.000",
      desc: "Serum vitamin C stabil dengan ferulic acid untuk kulit cerah dan antioksidan.",
      emoji: "",
      image: "/images/Vitamin C Serum.jpg",
      badge: "Bestseller",
    },
    {
      id: 4,
      name: "Retinol Night Serum",
      brand: "GLŌW Serum",
      price: "Rp 178.000",
      desc: "Serum retinol konsentrasi pemula, regenerasi sel, anti-aging efektif.",
      emoji: "",
      image: "/images/Retinol Night Serum.jpg",
      badge: null,
    },
    {
      id: 5,
      name: "Hyaluronic Acid Toner",
      brand: "GLŌW Tone",
      price: "Rp 88.000",
      desc: "Toner hidrasi berlapis 3 jenis hyaluronic acid, meresap cepat tanpa lengket.",
      emoji: "",
      image: "/images/HyaluronicAcidToner.jpg",
      badge: null,
    },
    {
      id: 6,
      name: "Ceramide Barrier Cream",
      brand: "GLŌW Moisturize",
      price: "Rp 135.000",
      desc: "Pelembap rich ceramide, cholesterol, fatty acid untuk perkuat skin barrier.",
      emoji: "",
      image: "/images/Ceramide Barrier Cream.jpg",
      badge: "New",
    },
    {
      id: 7,
      name: "Airy Sunscreen SPF50+",
      brand: "GLŌW Protect",
      price: "Rp 115.000",
      desc: "Tabir surya ultra-ringan SPF50 PA++++, tanpa white cast, cocok berminyak.",
      emoji: "",
      image: "/images/Airy Sunscreen SPF50+.jpg",
      badge: "Bestseller",
    },
    {
      id: 8,
      name: "Aloe Vera Soothing Serum",
      brand: "GLŌW Serum",
      price: "Rp 92.000",
      desc: "Serum menenangkan 95% aloe vera untuk kulit kemerahan dan sensitif.",
      emoji: "",
      image: "/images/Aloe Vera Soothing Serum.jpg",
      badge: null,
    },
  ],
  alat: [
    {
      id: 1,
      name: "Pro Brush Set 12pcs",
      brand: "GLŌW Tools",
      price: "Rp 285.000",
      desc: "Set kuas profesional 12 buah untuk face, eye, dan lip. Bulu sintetis halus.",
      emoji: "",
      image: "/images/Pro Brush Set 12pcs.jpg",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Beauty Blender Pro",
      brand: "GLŌW Tools",
      price: "Rp 95.000",
      desc: "Spons beauty blender berbentuk telur material lembut untuk blending flawless.",
      emoji: "",
      image: "/images/Beauty Blender Pro.jpg",
      badge: null,
    },
    {
      id: 3,
      name: "Rose Quartz Facial Roller",
      brand: "GLŌW Tools",
      price: "Rp 178.000",
      desc: "Roller wajah rose quartz untuk lymphatic drainage dan kurangi puffiness.",
      emoji: "",
      image: "/images/Rose Quartz Facial Roller.jpg",
      badge: "Hot",
    },
    {
      id: 4,
      name: "Jade Gua Sha Stone",
      brand: "GLŌW Tools",
      price: "Rp 155.000",
      desc: "Gua sha batu jade asli berbentuk heart untuk sculpting dan relaksasi otot.",
      emoji: "",
      image: "/images/Jade Gua Sha Stone.jpg",
      badge: null,
    },
    {
      id: 5,
      name: "LED Face Mask 7-Color",
      brand: "GLŌW Tech",
      price: "Rp 650.000",
      desc: "Masker LED 7 warna terapi cahaya untuk jerawat, anti-aging, mencerahkan.",
      emoji: "",
      image: "/images/LED Face Mask 7-Color.jpg",
      badge: "New",
    },
    {
      id: 6,
      name: "EMS Microcurrent Lifter",
      brand: "GLŌW Tech",
      price: "Rp 475.000",
      desc: "Alat mikrocurrent EMS lifting wajah, mengencangkan otot dan sirkulasi.",
      emoji: "",
      image: "/images/EMS Microcurrent Lifter.jpg",
      badge: "Hot",
    },
    {
      id: 7,
      name: "Nano Mist Sprayer",
      brand: "GLŌW Tech",
      price: "Rp 245.000",
      desc: "Semprotan nano mist untuk hidrasi kulit instan selama skincare & makeup.",
      emoji: "",
      image: "/images/Nano Mist Sprayer.jpg",
      badge: null,
    },
    {
      id: 8,
      name: "Blackhead Suction Tool",
      brand: "GLŌW Tools",
      price: "Rp 185.000",
      desc: "Alat suction vakum 4 ujung berbeda untuk membersihkan pori dan komedo.",
      emoji: "",
      image: "/images/Blackhead Suction Tool.jpg",
      badge: null,
    },
  ],
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

        {/* PRODUCT SECTIONS */}
        {categories.map((cat, idx) => showCat(cat.key) && (
          <div key={cat.key}>
            <CategorySection
              label={cat.label}
              emoji={cat.emoji}
              products={PRODUCTS_DB[cat.key]}
              search={search}
            />
            {tab === "all" && idx < categories.length - 1 && (
              <hr style={{ borderColor: C.soft, marginBottom: "3rem" }} />
            )}
          </div>
        ))}

      </div>
    </div>
  );
}
