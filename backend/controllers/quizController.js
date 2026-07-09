// controllers/quizController.js
const { pool } = require('../config/db');

// =============================================
// GET /quiz
// Mengambil pertanyaan kuis jenis kulit beserta opsi jawabannya
// (join ke quiz_options, opsi tidak lagi hardcode di frontend)
// Response: [{ id, text, order, opts: [{ id, label, val }] }]
// =============================================
async function getQuizQuestions(req, res) {
  try {
    const [questions] = await pool.query('SELECT * FROM quiz_question ORDER BY `order` ASC');
    const [options] = await pool.query('SELECT * FROM quiz_options ORDER BY id ASC');

    const result = questions.map((q) => ({
      id: q.id,
      text: q.text,
      order: q.order,
      opts: options
        .filter((o) => o.question_id === q.id)
        .map((o) => ({
          id: o.id,
          label: o.label,
          val: o.skin_type_val,
        })),
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching quiz questions:', err);
    res.status(500).json({ error: 'Gagal mengambil data kuis' });
  }
}

// =============================================
// POST /quiz/submit
// Body: { jawaban: ['kering', 'kering', 'berminyak', ...] }
// Response flat (tanpa nesting) berisi hasil jenis kulit
// =============================================
async function submitQuiz(req, res) {
  const jawabanUser = req.body.jawaban; // array jawaban dari React

  if (!jawabanUser || jawabanUser.length === 0) {
    return res.status(400).json({ error: 'Tidak ada jawaban yang dikirim' });
  }

  // Hitung jumlah masing-masing tipe kulit dari jawaban
  const hitung = {};
  jawabanUser.forEach((jawaban) => {
    hitung[jawaban] = (hitung[jawaban] || 0) + 1;
  });

  // Cari jenis kulit dengan poin tertinggi
  let jenisKulitTerbanyak = '';
  let nilaiTertinggi = 0;
  for (const jenis in hitung) {
    if (hitung[jenis] > nilaiTertinggi) {
      nilaiTertinggi = hitung[jenis];
      jenisKulitTerbanyak = jenis;
    }
  }

  res.json({
    message: 'Kuis selesai dihitung!',
    jenis_kulit_hasil: jenisKulitTerbanyak,
    detail_poin: hitung,
  });
}

module.exports = { getQuizQuestions, submitQuiz };
