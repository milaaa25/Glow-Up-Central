import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Rutinitas.css';

const Rutinitas = ({ goTo }) => {
  const navigate = useNavigate();

  return (
    <div className="page active" id="page-rutinitas">
      <span className="back-btn" onClick={() => navigate(-1)}>← Kembali ke Panduan</span>

      <div className="rut-banner">
        <img src="images/banner.jpeg" alt="Rutinitas Skincare" className="rut-banner-img" />
        <div className="rut-banner-text">
          <div className="rut-banner-tag">Daily Routine</div>
          <h1 className="rut-banner-title">Rutinitas <em>Skincare</em><br />Pagi &amp; Malam</h1>
          <p className="rut-banner-sub">Kunci dari kulit glowing adalah konsistensi. Yuk, mulai biasakan step-step ini tiap pagi dan malam biar kulitmu makin sehat!</p>
        </div>
      </div>

      <div className="split-panels">
        {/* PAGI */}
        <div className="panel pagi">
          <div className="panel-head"><span className="icon">🌤️</span><h2>Rutinitas Pagi</h2></div>
          <div className="steps">
            <div className="step">
              <div className="step-img s-p1">
                <img src="images/cucimuka.jpeg" alt="Cuci Muka" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 01</div>
                <div className="step-name">Cuci Muka</div>
                <div className="step-desc">Bangun tidur wajib banget basuh muka pakai sabun yang super gentle biar sisa skincare semalaman dan sebum bersih total.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-img s-p2">
                <img src="images/toner.jpeg" alt="Toner" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 02</div>
                <div className="step-name">Toner / Essence</div>
                <div className="step-desc">Kembalikan pH kulitmu dan kasih hidrasi pertama. Tap-tap lembut pakai tangan aja udah cukup kok!</div>
              </div>
            </div>
            <div className="step">
              <div className="step-img s-p3">
                <img src="images/serum2.jpeg" alt="Serum Vitamin C" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 03</div>
                <div className="step-name">Serum Vitamin C</div>
                <div className="step-desc">Senjata utama buat nangkis polusi seharian dan bikin wajah auto-cerah! Cukup 3-4 tetes aja udah cukup buat semuka.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-img s-p4">
                <img src="images/pelembab.jpeg" alt="pelembap" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 04</div>
                <div className="step-name">Pelembap (Moisturizer)</div>
                <div className="step-desc">Kunci semua hidrasinya biar nggak menguap. Pilih yang teksturnya ringan kalau kulitmu minyakan, atau yang rich kalau kulit kering.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-img s-p5">
                <img src="images/ss30.jpeg" alt="Sunscreen" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 05</div>
                <div className="step-name">Sunscreen SPF 30+</div>
                <div className="step-desc">Haram hukumnya di-skip! Ini tameng utamamu dari sinar UV yang bikin flek hitam dan penuaan dini. Pakai sebanyak dua jari ya!</div>
              </div>
            </div>
          </div>
        </div>

        {/* MALAM */}
        <div className="panel malam">
          <div className="panel-head"><span className="icon">🌙</span><h2>Rutinitas Malam</h2></div>
          <div className="steps">
            <div className="step">
              <div className="step-img s-m1">
                <img src="images/cleansing.jpeg" alt="doublecleansing" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 01</div>
                <div className="step-name">Double Cleansing</div>
                <div className="step-desc">Satu sabun aja nggak cukup buat lunturin makeup dan polusi. Awali pakai cleansing balm/oil, baru lanjut cuci pakai facial wash.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-img s-m2">
                <img src="images/toner.jpeg" alt="essence" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 02</div>
                <div className="step-name">Hydrating Toner</div>
                <div className="step-desc">Siapkan 'jalan' buat skincare selanjutnya dengan hidrasi ekstra setelah double cleansing yang cukup menguras minyak alami wajah.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-img s-m3">
                <img src="images/serum1.jpeg" alt="treatmentserum" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 03</div>
                <div className="step-name">Treatment Serum</div>
                <div className="step-desc">Waktunya masukin bahan aktif! Bisa pakai Retinol (buat anti-aging), Salicylic Acid (jerawat), atau Niacinamide (kusam) sesuai masalah kulitmu.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-img s-m4">
                <img src="images/moistMalem.jpeg" alt="moisturizer" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 04</div>
                <div className="step-name">Night Moisturizer</div>
                <div className="step-desc">Tutup step skincare kamu pakai pelembap malam yang agak thick buat nutrisi maksimal saat sel kulit lagi beregenerasi.</div>
              </div>
            </div>
            <div className="step">
              <div className="step-img s-m5">
                <img src="images/sleepingMask.jpeg" alt="Sleepingmask" />
              </div>
              <div className="step-body">
                <div className="step-n">Step 05</div>
                <div className="step-name">Sleeping Mask (Opsional)</div>
                <div className="step-desc">Ngerasa kulit lagi kering banget? Tambahin sleeping mask sebagai garda terakhir, biarin semalaman, dan besok paginya bilas deh!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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