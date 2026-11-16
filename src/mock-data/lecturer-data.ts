import { ClassCohort, LearningTopic, LearningCase } from "@/types";

export const LECTURER_KPI_OVERVIEW = {
  totalStudents: 40,
  activeLearningSessions: 34,
  averageLearningProgress: 68.4,
  criticalThinkingScore: 80.6,
  averageNGain: 0.56,
  aiFallacyDetectionRate: 85.0,
};

export const PROGRESS_OVER_TIME_DATA = [
  { week: "Minggu 1 (Pre)", avgProgress: 18, criticalThinking: 58.4, dialogueQuality: 61 },
  { week: "Minggu 2 (P1 Trigger)", avgProgress: 34, criticalThinking: 64.2, dialogueQuality: 69 },
  { week: "Minggu 3 (P1 Refleksi)", avgProgress: 49, criticalThinking: 71.8, dialogueQuality: 77 },
  { week: "Minggu 4 (P2 Aksi)", avgProgress: 61, criticalThinking: 76.5, dialogueQuality: 82 },
  { week: "Minggu 5 (P3 Integrasi)", avgProgress: 68.4, criticalThinking: 80.6, dialogueQuality: 86 },
];

export const STAGE_COMPLETION_CHART_DATA = [
  { stage: "1. Pemicu Kritis", code: "K–R", completed: 40, inProgress: 0, rate: 100 },
  { stage: "2. Dialog & Investigasi AI", code: "I", completed: 38, inProgress: 2, rate: 95 },
  { stage: "3. Refleksi Antara", code: "T", completed: 35, inProgress: 3, rate: 87.5 },
  { stage: "4. Tantangan Kasus Baru", code: "I", completed: 24, inProgress: 11, rate: 60 },
  { stage: "5. Asesmen Mandiri", code: "K", completed: 16, inProgress: 8, rate: 40 },
  { stage: "6. Refleksi Akhir", code: "A", completed: 7, inProgress: 9, rate: 17.5 },
];

export const ASSESSMENT_TREND_DATA = [
  { metric: "Interpretasi", preTest: 61, postTest: 84 },
  { metric: "Analisis", preTest: 58, postTest: 82 },
  { metric: "Evaluasi", preTest: 55, postTest: 80 },
  { metric: "Inferensi", preTest: 54, postTest: 78 },
  { metric: "Eksplanasi", preTest: 60, postTest: 83 },
  { metric: "Regulasi Diri", preTest: 56, postTest: 79 },
];

export const INITIAL_CLASSES: ClassCohort[] = [
  {
    id: "cls-a",
    code: "ALT-2204-A",
    name: "Metode Regresi — Kelas A (Analitika Logistik Terapan)",
    courseName: "Metode Regresi (ALT-2204)",
    semester: "Semester Genap 2026/2027",
    schedule: "Selasa & Kamis, 08:00 – 10:30 WIB",
    room: "Lab Komputer Statistika 2, Departemen Statistika Bisnis ITS",
    studentCount: 20,
    activeTopic: "CPMK-3: Pengujian Asumsi Klasik (VIF & IIDN) & Interpretasi Praktis",
    averageProgress: 69.2,
    averageCriticalThinking: 81.4,
    stageCompletionRate: 71.0,
    status: "Active",
  },
  {
    id: "cls-b",
    code: "ALT-2204-B",
    name: "Metode Regresi — Kelas B (Analitika Logistik Terapan)",
    courseName: "Metode Regresi (ALT-2204)",
    semester: "Semester Genap 2026/2027",
    schedule: "Rabu & Jumat, 09:00 – 11:30 WIB",
    room: "Lab Rekayasa Kualitas dan Produktivitas (RKP) ITS",
    studentCount: 20,
    activeTopic: "CPMK-4: Pemilihan Model Terbaik (All Possible, Stepwise & Parsimoni)",
    averageProgress: 67.6,
    averageCriticalThinking: 79.8,
    stageCompletionRate: 68.5,
    status: "Active",
  },
  {
    id: "cls-c",
    code: "SB-2106-A",
    name: "Teknik Regresi — Kelas Statistika Bisnis",
    courseName: "Teknik Regresi (SB-2106)",
    semester: "Semester Genap 2026/2027",
    schedule: "Senin, 13:00 – 15:30 WIB",
    room: "Lab Komputer Statistika 1, Departemen Statistika Bisnis ITS",
    studentCount: 36,
    activeTopic: "CPMK-2: Estimasi Parameter Regresi Linear Berganda",
    averageProgress: 84.0,
    averageCriticalThinking: 83.2,
    stageCompletionRate: 85.0,
    status: "Active",
  },
];

export const INITIAL_TOPICS: LearningTopic[] = [
  {
    id: "top-1",
    code: "MOD-01",
    cpmk: "CPMK-1 & CPMK-2",
    title: "Konsep Korelasi vs. Regresi & Estimasi Parameter Linear Berganda",
    course: "Metode Regresi (ALT-2204)",
    sessions: 3,
    objectives: [
      "Membedakan korelasi simetris (r) dari pemodelan hubungan arah regresi.",
      "Mengestimasi dan menafsirkan koefisien regresi parsial (β) dengan kondisi ceteris paribus.",
      "Menghindari penyimpulan hubungan kausal langsung dari data observasional.",
    ],
    targetMisconceptions: [
      "Menyimpulkan hubungan sebab-akibat langsung dari kemiringan regresi observasional.",
      "Menafsirkan β₁ tanpa memperhatikan satuan ukur maupun ambang kelayakan bisnis.",
    ],
    activeCasesCount: 4,
    completionRate: 100,
    status: "Completed",
  },
  {
    id: "top-2",
    code: "MOD-02",
    cpmk: "CPMK-3",
    title: "Pengujian Asumsi Multikolinearitas & Residual IIDN",
    course: "Metode Regresi (ALT-2204)",
    sessions: 3,
    objectives: [
      "Menguji multikolinearitas melalui VIF dan menjelaskan dampaknya terhadap standard error.",
      "Mengevaluasi asumsi Normalitas, Homoskedastisitas, dan Non-Autokorelasi (IIDN).",
      "Merumuskan tindakan perbaikan ketika asumsi klasik OLS dilanggar.",
    ],
    targetMisconceptions: [
      "Memperlakukan uji asumsi hanya sebagai daftar pemeriksaan formal tanpa memahami konsekuensi terhadap inferensi.",
      "Menganggap nilai R² tinggi (> 0,90) menjamin model bebas dari masalah VIF atau heteroskedastisitas.",
    ],
    activeCasesCount: 6,
    completionRate: 68,
    status: "Active",
  },
  {
    id: "top-3",
    code: "MOD-03",
    cpmk: "CPMK-4",
    title: "Pemilihan Model Terbaik & Prinsip Parsimoni dalam Peramalan Logistik",
    course: "Metode Regresi (ALT-2204)",
    sessions: 3,
    objectives: [
      "Membandingkan metode All Possible Regression, Best Subset, Backward, Forward, dan Stepwise.",
      "Menyeimbangkan Adjusted R², Mallows' Cp, AIC/BIC, dan kemudahan interpretasi operasional.",
      "Mengkritisi pemilihan variabel otomatis (stepwise) ketika terdapat kolinearitas.",
    ],
    targetMisconceptions: [
      "Memilih model hanya berdasarkan nilai R² mentah tertinggi tanpa mempertimbangkan overfitting atau parsimoni.",
      "Menafsirkan p-value secara mekanis sebagai ukuran besarnya pengaruh.",
    ],
    activeCasesCount: 5,
    completionRate: 42,
    status: "Active",
  },
  {
    id: "top-4",
    code: "MOD-04",
    cpmk: "CPMK-5 & CPMK-7",
    title: "Prediktor Kategorik, Respon Diskrit & Komunikasi Keputusan Berbasis Data",
    course: "Metode Regresi (ALT-2204)",
    sessions: 3,
    objectives: [
      "Menyusun variabel dummy tanpa terjebak dummy variable trap serta menafsirkan interaksi.",
      "Memodelkan variabel respon diskrit/cacah pada kasus operasional logistik.",
      "Mengomunikasikan ketidakpastian statistik dan rekomendasi keputusan secara etis.",
    ],
    targetMisconceptions: [
      "Mengodekan variabel nominal multi-kategori sebagai satu prediktor numerik urut.",
      "Menyajikan prediksi titik tanpa selang prediksi kepada pengambil keputusan.",
    ],
    activeCasesCount: 3,
    completionRate: 0,
    status: "Draft",
  },
];

export const INITIAL_CASES: LearningCase[] = [
  {
    id: "case-101",
    code: "KR-CASE-101",
    title: "Dilema Iklan & Distribusi Hub Jawa–Bali (R² Tinggi namun VIF Berat)",
    topicId: "top-2",
    topicTitle: "Pengujian Asumsi Multikolinearitas & Residual IIDN",
    cpmk: "CPMK-3",
    complexity: "Advanced Dilemma",
    stageTarget: "Stage 1 Trigger",
    domain: "Distribusi Regional & Analitika Pemasaran",
    scenarioText:
      "Direktur distribusi regional mengusulkan peningkatan anggaran iklan di 48 hub Jawa–Bali berdasarkan model OLS dengan R² = 0,914 dan β₁ = 0,85 (p = 0,003). Namun program diskon promosi dijalankan bersamaan pada hub yang sama.",
    embeddedAiFallacy:
      "Argumen AI untuk Diinvestigasi: 'Karena nilai R² melebihi 0,90 dan p = 0,003 sangat signifikan, maka nilai VIF sebesar 11,42 dan uji Breusch-Pagan p = 0,008 dapat diabaikan dalam alokasi anggaran.'",
    guidingPrompt:
      "Evaluasi apakah koefisien regresi β₁ = 0,85 membenarkan penambahan biaya iklan, dan kritisi klaim AI terkait multikolinearitas serta heteroskedastisitas.",
    datasetMetadata: {
      rows: 48,
      variables: ["penjualan_bersih (Y)", "biaya_iklan (X₁)", "cakupan_armada (X₂)", "diskon_promosi (X₃)"],
      rSquared: 0.914,
      keyViolation: "VIF = 11,42 (Multikolinearitas) & Breusch–Pagan p = 0,008 (Heteroskedastisitas)",
    },
    validationStatus: "Validated",
    author: "Dr. Iis Dewi Ratih, S.Si., M.Si.",
    createdAt: "10 Nov 2026",
  },
  {
    id: "case-102",
    code: "KR-CASE-102",
    title: "Optimasi Biaya Operasional Armada Rantai Dingin Antarkota",
    topicId: "top-2",
    topicTitle: "Pengujian Asumsi Multikolinearitas & Residual IIDN",
    cpmk: "CPMK-3",
    complexity: "Intermediate",
    stageTarget: "Stage 4 Implementation",
    domain: "Operasional Armada Rantai Dingin",
    scenarioText:
      "Analisis 40 pengiriman rantai dingin antarkota (Surabaya, Semarang, Bandung, Denpasar) untuk mengevaluasi pengaruh jarak rute, tonase muatan, dan usia unit pendingin terhadap biaya operasional perjalanan.",
    embeddedAiFallacy:
      "Argumen AI untuk Diinvestigasi: 'Karena Jarak Rute memiliki koefisien terkecil (0,11) dibanding Tonase Muatan (1,85), maka jarak rute adalah faktor yang paling tidak penting.'",
    guidingPrompt:
      "Gunakan Workspace Statistik untuk memeriksa efek terstandarisasi vs. tidak terstandarisasi, memverifikasi asumsi IIDN, dan mengkritisi kekeliruan perbandingan satuan ukur.",
    datasetMetadata: {
      rows: 40,
      variables: ["biaya_operasional (Y)", "jarak_km (X₁)", "tonase_ton (X₂)", "usia_unit (X₃)"],
      rSquared: 0.876,
      keyViolation: "Kekeliruan Perbandingan Koefisien Tanpa Standarisasi Satuan (km vs. ton)",
    },
    validationStatus: "Validated",
    author: "Albertus Eka Putra Haryanto, S.Tr.Stat., M.Stat.",
    createdAt: "11 Nov 2026",
  },
  {
    id: "case-103",
    code: "KR-CASE-103",
    title: "Audit Overfitting Stepwise Waktu Tunggu Kontainer Pelabuhan Tanjung Perak",
    topicId: "top-3",
    topicTitle: "Pemilihan Model Terbaik & Prinsip Parsimoni dalam Peramalan Logistik",
    cpmk: "CPMK-4",
    complexity: "Advanced Dilemma",
    stageTarget: "Stage 5 Independent Assessment",
    domain: "Logistik Kepelabuhanan & Terminal Petikemas",
    scenarioText:
      "Algoritma stepwise otomatis memilih 9 prediktor untuk memodelkan waktu tunggu kontainer (dwell time) di Terminal Tanjung Perak, menaikkan R² dari 0,812 menjadi 0,831 namun menurunkan Adjusted R² dan menaikkan Mallows' Cp menjadi 14,8.",
    embeddedAiFallacy:
      "Argumen AI untuk Diinvestigasi: 'Model 9 variabel mutlak lebih unggul karena menghasilkan nilai R² tertinggi sebesar 0,831.'",
    guidingPrompt:
      "Tentukan model subset terbaik secara mandiri tanpa bantuan AI dan berikan justifikasi berdasarkan Adjusted R², Mallows' Cp, VIF, dan kelayakan operasional.",
    datasetMetadata: {
      rows: 60,
      variables: ["waktu_tunggu_jam (Y)", "gerakan_crane (X₁)", "durasi_bea_cukai (X₂)", "kepadatan_lapangan (X₃)", "+5 prediktor noise"],
      rSquared: 0.831,
      keyViolation: "Overfitting & Mallows' Cp = 14,8 (Model 3 prediktor optimal dengan Cp = 3,9)",
    },
    validationStatus: "Validated",
    author: "Noviyanti Santoso, S.Si., M.Si., Ph.D.",
    createdAt: "12 Nov 2026",
  },
  {
    id: "case-104",
    code: "KR-CASE-104",
    title: "Interaksi Curah Hujan & Kepadatan Lalu Lintas pada Keterlambatan Kurir Last-Mile",
    topicId: "top-3",
    topicTitle: "Pemilihan Model Terbaik & Prinsip Parsimoni dalam Peramalan Logistik",
    cpmk: "CPMK-4",
    complexity: "Intermediate",
    stageTarget: "Stage 1 Trigger",
    domain: "Pengiriman Paket Perkotaan Last-Mile",
    scenarioText:
      "Draft kasus hasil AI yang memodelkan persentase keterlambatan paket di 35 hub sortir perkotaan selama musim hujan, membandingkan model aditif dengan model interaksi.",
    embeddedAiFallacy:
      "Argumen AI untuk Diinvestigasi: 'Menghapus suku interaksi curah hujan × kemacetan tidak berpengaruh karena efek utama kemacetan sudah memiliki p < 0,01.'",
    guidingPrompt:
      "Evaluasi apakah pengaruh kemacetan terhadap keterlambatan bergantung pada intensitas curah hujan serta periksa pola residualnya.",
    datasetMetadata: {
      rows: 35,
      variables: ["persen_terlambat (Y)", "indeks_macet (X₁)", "curah_hujan_mm (X₂)", "kapasitas_sortir (X₃)"],
      rSquared: 0.842,
      keyViolation: "Bias Spesifikasi akibat Pengabaian Suku Interaksi",
    },
    validationStatus: "Pending Review",
    author: "Generator Kasus AI (Menunggu Validasi Dr. Iis Dewi Ratih)",
    createdAt: "16 Nov 2026",
  },
];
