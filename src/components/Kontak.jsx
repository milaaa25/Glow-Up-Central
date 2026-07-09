import { useState, useEffect } from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
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

async function submitContactAPI(formData) {
  try {
    const res = await api.post('/contact', formData);
    return res.data;
  } catch (err) {
    const backendMsg = err.response?.data?.message;
    throw new Error(backendMsg || 'Gagal mengirim pesan. Coba lagi.');
  }
}

// Fallback statis kalau backend/tabel faq belum bisa diakses
const FAQ_FALLBACK = [
  { id: 1, q: "Apakah produk GLŌW aman untuk kulit sensitif?",   a: "Ya! Semua produk yang kami rekomendasikan telah melalui seleksi ketat dengan mempertimbangkan kandungan yang aman untuk kulit sensitif. Namun kami tetap menyarankan patch test sebelum pemakaian penuh." },
  { id: 2, q: "Berapa lama pengiriman produk?",                   a: "Pengiriman dalam kota 1-2 hari kerja, luar kota 3-5 hari kerja, dan luar pulau 5-7 hari kerja menggunakan layanan pengiriman terpercaya kami." },
  { id: 3, q: "Apakah ada garansi untuk alat kecantikan?",        a: "Ya, semua alat kecantikan kategori Tech memiliki garansi resmi 1 tahun untuk kerusakan pabrik. Garansi tidak berlaku untuk kerusakan karena kesalahan pengguna." },
];

function useFAQAPI() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get('/faq')
      .then((res) => {
        const rows = res.data?.data || [];
        setFaqs(
          rows.length > 0
            ? rows.map((r) => ({ id: r.id, q: r.questions, a: r.answer }))
            : FAQ_FALLBACK
        );
      })
      .catch((err) => {
        console.error('FAQ API error:', err);
        setFaqs(FAQ_FALLBACK);
      })
      .finally(() => setLoading(false));
  }, []);
  return { faqs, loading };
}

export default function Kontak() {
  const [form, setForm] = useState({ nama: "", email: "", subjek: "", pesan: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);
  const { faqs, loading: faqLoading } = useFAQAPI();

  const validate = () => {
    const e = {};
    if (!form.nama.trim())  e.nama  = "Nama wajib diisi";
    if (!form.email.trim()) e.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Format email tidak valid";
    if (!form.subjek)       e.subjek = "Pilih subjek terlebih dahulu";
    if (!form.pesan.trim()) e.pesan = "Pesan wajib diisi";
    else if (form.pesan.trim().length < 20) e.pesan = "Pesan minimal 20 karakter";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({}); setSubmitting(true); setApiError("");
    try {
      await submitContactAPI(form);
      setSubmitted(true);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "10px 14px",
    border: `1.5px solid ${errors[field] ? "#e05c5c" : C.rose}`,
    borderRadius: 4, fontFamily: font.sans, fontSize: "0.9rem",
    color: C.text, background: C.cream, outline: "none",
    transition: "border-color 0.2s", boxSizing: "border-box",
  });

  const labelStyle = {
    display: "block", fontSize: "0.75rem",
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: C.muted, marginBottom: "0.4rem",
  };

  // 3 info saja (tanpa jam operasional)
  const contactInfos = [
    { icon: "📧", label: "Email",    val: "hello@glow-beauty.id",  sub: "Balasan dalam 1x24 jam" },
    { icon: "📱", label: "WhatsApp", val: "+62 812-3456-7890",      sub: "Senin–Sabtu, 09.00–21.00 WIB" },
    { icon: "📍", label: "Lokasi",   val: "Yogyakarta, Indonesia",  sub: "Kunjungan hanya dengan janji" },
  ];

  // 3 sosmed saja (tanpa WhatsApp), pakai react-icons
  const socialMedia = [
    {
      icon: <FaInstagram size={22} color="#d6249f" />,
      platform: "Instagram", handle: "@glow.beauty.id",
      tag: "12.4K", color: "#d6249f",
    },
    {
      icon: <FaTiktok size={22} color="#010101" />,
      platform: "TikTok", handle: "@glowbeautyid",
      tag: "8.2K", color: "#010101",
    },
    {
      icon: <FaYoutube size={22} color="#FF0000" />,
      platform: "YouTube", handle: "GLŌW Beauty",
      tag: "3.1K", color: "#FF0000",
    },
  ];

  return (
    <div style={{ fontFamily: font.sans, background: C.cream, minHeight: "100vh" }}>

      {/* PAGE SECTION BAR */}
      <div style={{
        background: C.soft, borderBottom: `1px solid ${C.rose}`,
        padding: "8px 2rem", display: "flex", alignItems: "center", gap: "1.5rem",
      }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted }}>
        </span>
        <span style={{ fontSize: "0.75rem", color: C.brown, fontWeight: 500 }}>
        </span>
      </div>

      {/* HERO */}
      <div style={{
        background: `linear-gradient(135deg, ${C.brown}, ${C.accent})`,
        color: C.white, padding: "6rem 2rem", textAlign: "center",
      }}>
        <p style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.8rem" }}>
        </p>
        <h1 style={{ fontFamily: font.serif, fontSize: "clamp(2.5rem,6vw,3.5rem)", fontWeight: 300, marginBottom: "1rem" }}>
          Hubungi <em style={{ fontStyle: "italic" }}>Kami</em>
        </h1>
        <p style={{ opacity: 0.8, fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
          Ada pertanyaan, saran, atau ingin berkolaborasi? Tim GLŌW siap membantu kamu.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 2rem 6rem" }}>

        {/* INFO CARDS — 3 kolom */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem", marginBottom: "4rem",
        }}>
          {contactInfos.map((info, i) => (
            <div key={i} style={{
              background: C.white, border: `1px solid ${C.rose}`,
              borderRadius: 4, padding: "2rem 1.5rem", textAlign: "center",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(107,62,46,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{info.icon}</div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: C.accent, marginBottom: "0.4rem", fontWeight: 500 }}>{info.label}</p>
              <p style={{ fontWeight: 500, color: C.brown, fontSize: "0.9rem" }}>{info.val}</p>
              <p style={{ fontSize: "0.75rem", color: C.muted, marginTop: "0.3rem" }}>{info.sub}</p>
            </div>
          ))}
        </div>

        {/* FORM + SIDEBAR */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3rem" }}>

          {/* FORM */}
          <div style={{ background: C.white, border: `1px solid ${C.rose}`, borderRadius: 4, padding: "2.5rem" }}>
            <h2 style={{ fontFamily: font.serif, fontSize: "2rem", fontWeight: 300, color: C.brown, marginBottom: "2rem" }}>
              Kirim <em style={{ fontStyle: "italic" }}>Pesan</em>
            </h2>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: font.serif, fontSize: "1.5rem", color: C.brown, marginBottom: "0.5rem" }}>Pesan Terkirim!</h3>
                <p style={{ color: C.muted, marginBottom: "1.5rem", fontSize: "0.9rem" }}>Tim kami akan menghubungimu dalam 1x24 jam.</p>
                <button onClick={() => { setSubmitted(false); setForm({ nama: "", email: "", subjek: "", pesan: "" }); }} style={{
                  background: C.brown, color: C.white, border: "none",
                  padding: "12px 28px", cursor: "pointer",
                  fontFamily: font.sans, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>Kirim Lagi</button>
              </div>
            ) : (
              <>
                {apiError && (
                  <div style={{ padding: "1rem", background: "#fde8e0", border: `1px solid ${C.roseDark}`, borderRadius: 4, color: C.brown, marginBottom: "1.2rem", fontSize: "0.85rem" }}>
                    ⚠️ {apiError}
                  </div>
                )}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Nama *</label>
                  <input type="text" placeholder="Nama lengkapmu" value={form.nama}
                    onChange={e => handleChange("nama", e.target.value)} style={inputStyle("nama")}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = errors.nama ? "#e05c5c" : C.rose} />
                  {errors.nama && <p style={{ color: "#e05c5c", fontSize: "0.7rem", marginTop: 3 }}>{errors.nama}</p>}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" placeholder="email@kamu.com" value={form.email}
                    onChange={e => handleChange("email", e.target.value)} style={inputStyle("email")}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = errors.email ? "#e05c5c" : C.rose} />
                  {errors.email && <p style={{ color: "#e05c5c", fontSize: "0.7rem", marginTop: 3 }}>{errors.email}</p>}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Subjek *</label>
                  <select value={form.subjek} onChange={e => handleChange("subjek", e.target.value)}
                    style={{ ...inputStyle("subjek"), cursor: "pointer" }}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = errors.subjek ? "#e05c5c" : C.rose}>
                    <option value="">Pilih subjek...</option>
                    {["Pertanyaan Produk", "Pemesanan", "Keluhan", "Kerja Sama", "Lainnya"].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.subjek && <p style={{ color: "#e05c5c", fontSize: "0.7rem", marginTop: 3 }}>{errors.subjek}</p>}
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Pesan *</label>
                  <textarea placeholder="Tuliskan pesanmu di sini (min. 20 karakter)..."
                    value={form.pesan} rows={5}
                    onChange={e => handleChange("pesan", e.target.value)}
                    style={{ ...inputStyle("pesan"), resize: "vertical", minHeight: 110 }}
                    onFocus={e => e.target.style.borderColor = C.accent}
                    onBlur={e => e.target.style.borderColor = errors.pesan ? "#e05c5c" : C.rose} />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    {errors.pesan ? <p style={{ color: "#e05c5c", fontSize: "0.7rem", marginTop: 3 }}>{errors.pesan}</p> : <span />}
                    <span style={{ fontSize: "0.7rem", color: C.muted, marginTop: 3 }}>{form.pesan.length} karakter</span>
                  </div>
                </div>
                <button onClick={handleSubmit} disabled={submitting} style={{
                  width: "100%", padding: "13px",
                  background: submitting ? C.muted : C.brown,
                  color: C.white, border: "none",
                  cursor: submitting ? "wait" : "pointer",
                  fontFamily: font.sans, fontSize: "0.85rem",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = C.accent; }}
                  onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = C.brown; }}>
                  {submitting ? "⏳ Mengirim..." : "📩 Kirim Pesan"}
                </button>
                <p style={{ fontSize: "0.7rem", color: C.muted, textAlign: "center", marginTop: "0.7rem" }}>
                  Dengan mengirim form ini kamu menyetujui kebijakan privasi GLŌW.
                </p>
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Social Media — react-icons */}
            <div style={{ background: C.white, border: `1px solid ${C.rose}`, borderRadius: 4, padding: "2rem" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, marginBottom: "0.4rem", fontWeight: 500 }}>Media Sosial</p>
              <h3 style={{ fontFamily: font.serif, fontSize: "1.6rem", fontWeight: 300, color: C.brown, marginBottom: "1.2rem" }}>
                Ikuti <em style={{ fontStyle: "italic" }}>Kami</em>
              </h3>
              {socialMedia.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "0.8rem",
                  padding: "0.8rem 1rem", border: `1px solid ${C.soft}`,
                  borderRadius: 4, marginBottom: "0.5rem",
                  background: C.cream, cursor: "pointer", transition: "all 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.rose; e.currentTarget.style.background = C.soft; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.soft; e.currentTarget.style.background = C.cream; }}>
                  <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: C.brown }}>{s.platform}</div>
                    <div style={{ fontSize: "0.72rem", color: C.muted }}>{s.handle}</div>
                  </div>
                  <span style={{ background: s.color, color: C.white, fontSize: "0.65rem", padding: "3px 8px", borderRadius: 10, fontWeight: 500, whiteSpace: "nowrap" }}>{s.tag}</span>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div style={{ background: C.white, border: `1px solid ${C.rose}`, borderRadius: 4, padding: "2rem" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, marginBottom: "0.4rem", fontWeight: 500 }}>FAQ</p>
              <h3 style={{ fontFamily: font.serif, fontSize: "1.6rem", fontWeight: 300, color: C.brown, marginBottom: "1.2rem" }}>
                Pertanyaan <em style={{ fontStyle: "italic" }}>Umum</em>
              </h3>
              {faqLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} style={{ height: 14, background: C.soft, borderRadius: 4, marginBottom: 12, animation: "sk 1.3s ease-in-out infinite" }} />
                ))
              ) : (
                faqs.map((faq, i) => (
                  <div key={faq.id} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${C.soft}` : "none" }}>
                    <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} style={{
                      width: "100%", textAlign: "left", background: "none", border: "none",
                      padding: "0.9rem 0", display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", gap: 8, cursor: "pointer", fontFamily: font.sans,
                    }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 500, color: C.text, lineHeight: 1.5, flex: 1 }}>{faq.q}</span>
                      <span style={{ color: C.roseDark, fontSize: "1rem", transition: "transform 0.2s", transform: openFAQ === i ? "rotate(180deg)" : "rotate(0)", flexShrink: 0 }}>▾</span>
                    </button>
                    {openFAQ === i && (
                      <div style={{ padding: "0 0 0.9rem", fontSize: "0.82rem", color: C.muted, lineHeight: 1.75 }}>{faq.a}</div>
                    )}
                  </div>
                ))
              )}
              <style>{`@keyframes sk{0%,100%{opacity:.4}50%{opacity:.9}}`}</style>
            </div>
          </div>
        </div>

        {/* MAP EMBED */}
        <div style={{ marginTop: "4rem" }}>
          <div style={{ marginBottom: "1.2rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, fontWeight: 500, marginBottom: "0.3rem" }}>Lokasi</p>
            <h3 style={{ fontFamily: font.serif, fontSize: "1.8rem", fontWeight: 300, color: C.brown, marginBottom: "0.3rem" }}>
              Temukan <em style={{ fontStyle: "italic" }}>Kami</em>
            </h3>
            <p style={{ color: C.muted, fontSize: "0.9rem" }}>Yogyakarta, Indonesia</p>
          </div>
          <div style={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${C.rose}`, boxShadow: "0 4px 20px rgba(107,62,46,0.1)" }}>
            <iframe
              title="Yogyakarta"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.96569420552!2d110.26492!3d-7.7971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57b42edb0cd1%3A0x1427f8e5b1dd3752!2sYogyakarta%2C+Special+Region+of+Yogyakarta!5e0!3m2!1sid!2sid!4v1716000000000!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div style={{ marginTop: "0.8rem", display: "flex", justifyContent: "flex-end" }}>
            <a
              href="https://maps.google.com/?q=Yogyakarta,+Indonesia"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.78rem", color: C.accent, textDecoration: "none", fontWeight: 500 }}
            >
              Buka di Google Maps →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
