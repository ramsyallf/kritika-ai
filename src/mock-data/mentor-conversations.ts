import { MentorMessage, SocraticMoveType } from "@/types";

export const INITIAL_MENTOR_MESSAGES: MentorMessage[] = [
  {
    id: "msg-1",
    sender: "mentor",
    content:
      "Selamat datang di Tahap 2 (Dialog dan Investigasi AI). Pada Tahap 1 (Pemicu Kritis), Anda menyimpulkan bahwa pengeluaran iklan meningkatkan kinerja penjualan cabang distribusi dan model siap langsung diterapkan. Sebelum kita memeriksa uji asumsi klasik, mari kita uji argumen awal Anda: Bukti statistik apa yang mendukung klaim bahwa pengeluaran iklan berpengaruh terhadap penjualan?",
    timestamp: "10:12 WIB",
    socraticMove: "Requesting Evidence",
    targetDimension: "interpretation",
    highlightedConcept: "Bukti Empiris vs. Klaim Tanpa Verifikasi",
  },
  {
    id: "msg-2",
    sender: "student",
    content: "Koefisien regresinya adalah 0,85 dan nilai p-value sebesar 0,003.",
    timestamp: "10:14 WIB",
  },
  {
    id: "msg-3",
    sender: "mentor",
    content:
      "Menarik. Bagaimana Anda menafsirkan koefisien 0,85 tersebut dalam konteks praktis bisnis distribusi? Apakah signifikansi statistik (p = 0,003) secara otomatis berarti dampak bisnis yang menguntungkan?",
    timestamp: "10:14 WIB",
    socraticMove: "Challenging Assumptions",
    targetDimension: "evaluation",
    highlightedConcept: "Pernyataan ASA tentang p-Value (Wasserstein & Lazar, 2016)",
  },
  {
    id: "msg-4",
    sender: "student",
    content:
      "Secara praktis, setiap kenaikan Rp1 juta biaya iklan berasosiasi dengan rata-rata kenaikan penjualan bersih Rp0,85 juta dengan asumsi variabel lain konstan. Tunggu—jika tambahan penjualannya hanya Rp0,85 juta untuk setiap Rp1 juta biaya iklan, berarti margin bersihnya justru rugi meskipun p = 0,003!",
    timestamp: "10:17 WIB",
  },
  {
    id: "msg-5",
    sender: "mentor",
    content:
      "Tepat sekali penalaran Anda. Anda baru saja menemukan perbedaan mendasar antara signifikansi statistik (p = 0,003) dan kelayakan ekonomis (β₁ = 0,85 < 1,0 titik impas). Sekarang, mari kita investigasi argumen AI berikut yang sengaja memuat kekeliruan: 'Karena model mencapai R² = 0,914, maka nilai Variance Inflation Factor (VIF = 11,42) antara Biaya Iklan dan Diskon Promosi dapat diabaikan.' Di mana letak kesalahan penalaran statistik pada klaim AI tersebut?",
    timestamp: "10:18 WIB",
    socraticMove: "Counterargument",
    targetDimension: "analysis",
    highlightedConcept: "Multikolinearitas & Pembengkakan Standard Error",
  },
];

export const SOCRATIC_PROMPT_STARTERS: {
  label: string;
  move: SocraticMoveType;
  promptText: string;
}[] = [
  {
    label: "Kritisi kekeliruan VIF = 11,42",
    move: "Challenging Assumptions",
    promptText:
      "Nilai R² tinggi hanya mengukur kecocokan global, tetapi VIF = 11,42 memperbesar standard error koefisien regresi parsial sehingga estimasi β₁ = 0,85 menjadi tidak stabil.",
  },
  {
    label: "Uji pelanggaran heteroskedastisitas",
    move: "Requesting Evidence",
    promptText:
      "Uji Breusch-Pagan menghasilkan p = 0,008. Bukankah varians residual yang tidak konstan membuat uji-t dan selang kepercayaan OLS biasa menjadi bias?",
  },
  {
    label: "Pertanyakan klaim kausalitas",
    move: "Clarifying Question",
    promptText:
      "Apakah kita boleh menyimpulkan hubungan sebab-akibat dari data observasional ini, atau mungkinkah permintaan musiman wilayah menjadi variabel perancu (confounding)?",
  },
  {
    label: "Rumuskan perbaikan model",
    move: "Reflective Questioning",
    promptText:
      "Untuk memperbaiki model, saya perlu mengatasi multikolinearitas antara Biaya Iklan dan Diskon, menggunakan robust standard error, serta mengevaluasi Adjusted R² dan Cp.",
  },
];

export const MENTOR_CONTEXT_PANEL_DATA = {
  topic: "Regresi Linear Berganda & Diagnostik Asumsi Klasik",
  courseCode: "ALT-2204 · Metode Regresi",
  stageBadge: "Tahap 2 dari 6 · Dialog dan Investigasi AI",
  learningObjectives: [
    "Membedakan signifikansi statistik (p-value) dari besaran dampak ekonomis praktis (koefisien β & selang kepercayaan).",
    "Mendiagnosis mengapa R² tinggi tidak melindungi model dari multikolinearitas berat (VIF > 10) atau heteroskedastisitas.",
    "Mengkritisi dan membantah argumen AI yang tampak meyakinkan namun keliru secara statistik.",
    "Merumuskan kesimpulan berbasis bukti yang sesuai dengan capaian CPMK-3 & CPMK-4.",
  ],
  criticalThinkingGuidelines: [
    {
      type: "Pertanyaan Klarifikasi",
      detail: "Nyatakan satuan ukur dan kondisi ceteris paribus pada setiap parameter kemiringan regresi.",
    },
    {
      type: "Menguji Asumsi",
      detail: "Jangan pernah menganggap p < 0,05 atau R² tinggi sebagai bukti model valid tanpa memeriksa residual IIDN.",
    },
    {
      type: "Meminta Bukti Statistik",
      detail: "Dukung setiap klaim diagnostik dengan statistik uji spesifik (VIF, Breusch-Pagan, Shapiro-Wilk, Durbin-Watson).",
    },
    {
      type: "Argumen Tandingan",
      detail: "Pertimbangkan spesifikasi model alternatif, variabel yang terlewat, dan potensi korelasi semu.",
    },
    {
      type: "Pertanyaan Reflektif",
      detail: "Bandingkan penalaran Anda saat ini dengan asumsi awal Tahap 1 untuk mengenali perubahan pemahaman.",
    },
  ],
};
