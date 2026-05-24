import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tips.css';

const Tips = ({ goTo }) => {
  const navigate = useNavigate();

  return (
    <div className="page active" id="page-tips">
      <span className="back-btn tips-back" onClick={() => navigate(-1)}>← Kembali ke Panduan</span>

      <div className="tips-header">
        <div className="tips-tag">Tips &amp; Trik</div>
        <h1 className="tips-title">Rahasia Kulit<br /><em>Glowing</em></h1>
        <p className="tips-sub">Bocoran tips praktis dari para beauty guru yang bisa langsung kamu praktekin hari ini juga. Auto cantik maksimal!</p>
      </div>
      <div className="tips-divider"></div>

      <div className="featured">
        <div className="feat-img">
          <img src="images/minum.jpeg" alt="Tips Featured" />
        </div>
        <div>
          <div className="feat-n">✦ Tips 01 — Paling Krusial</div>
          <h2 className="feat-title">Minum Air yang Cukup</h2>
          <p className="feat-desc">Skincare mahal sekalipun bakal kurang nampol kalau dari dalam tubuhnya dehidrasi! Minum 8 gelas air per hari itu beneran ngebantu kulit tetap kenyal, plumpy, dan bercahaya dari dalam lho. Boleh juga tambahin irisan lemon biar dapat asupan Vitamin C ekstra!</p>
        </div>
      </div>

      <div className="tips-masonry">
        <div className="tc wide">
          <div className="tc-img">
            <img src="images/tidur2.jpeg" alt="Tips 02" />
          </div>
          <div>
            <span className="tc-n">Tips 02</span>
            <div className="tc-title">Haram Hukumnya Tidur Pakai Makeup</div>
            <p className="tc-desc">Secapek apapun kamu, jangan pernah bawa makeup tidur! Sisa makeup itu nyampur sama kotoran dan sebum, sukses banget bikin pori-pori tersumbat dan panen jerawat besok paginya.</p>
          </div>
        </div>
        <div className="tc">
          <div className="tc-img">
            <img src="images/bantal.jpeg" alt="Tips 03" />
          </div>
          <span className="tc-n">Tips 03</span>
          <div className="tc-title">Ganti Sarung Bantal Rutin</div>
          <p className="tc-desc">Bayangin kuman, debu, dan sisa skincare nempel di bantal berhari-hari lalu kena wajah kamu. Hii! Pastikan ganti sarung bantal 2-3 hari sekali biar kulit bebas iritasi.</p>
        </div>
        <div className="tc tall">
          <div className="tc-img tall-img">
            <img src="images/tidur.jpeg" alt="Tips 04" />
          </div>
          <span className="tc-n">Tips 04</span>
          <div className="tc-title">Tidur Cukup 7–8 Jam</div>
          <p className="tc-desc">Jam tidur itu waktunya kulit buat "kerja keras" memperbaiki sel-sel yang rusak lho. Sering begadang? Siap-siap aja ketemu mata panda dan kulit kusam.</p>
          <br />
          <p className="tc-desc highlight">✦ Ingat, Beauty Sleep itu nyata, Bestie!</p>
        </div>
        <div className="tc">
          <div className="tc-img">
            <img src="images/Kuas.jpeg" alt="Tips 05" />
          </div>
          <span className="tc-n">Tips 05</span>
          <div className="tc-title">Mandiin Kuas Makeup Kamu</div>
          <p className="tc-desc">Jangan malas cuci aplikator & kuas makeup kamu minimal seminggu sekali. Kuas yang kotor itu ibarat sarang bakteri berpesta sebelum pindah ke wajahmu.</p>
        </div>
        <div className="tc">
          <div className="tc-img">
            <img src="images/WajibPatch.jpeg" alt="Tips 06" />
          </div>
          <span className="tc-n">Tips 06</span>
          <div className="tc-title">Wajib Patch Test Dulu!</div>
          <p className="tc-desc">Baru beli serum viral? Eits, jangan langsung dioles ke seluruh muka! Oles dulu sedikit di bahu atau badan buat ngecek ada reaksi alergi atau nggak.</p>
        </div>
      </div>

      <div className="tips-quote-bar">
        <p>
          "Glow up itu nggak instan, butuh proses dan kebiasaan kecil yang konsisten setiap harinya."
        </p>
        <button className="go-quiz-btn" onClick={() => navigate('/quiz')}>Cek Jenis Kulitmu Yuk! →</button>
      </div>
    </div>
  );
};

export default Tips;