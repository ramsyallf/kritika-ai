import { CourseInfo, LearningStage, ActivityLog, FacioneScores } from "@/types";

export const CURRENT_COURSE: CourseInfo = {
  id: "crs-reg-2026",
  code: "ALT-2204",
  name: "Metode Regresi",
  topic: "Pemodelan Regresi Linear Berganda & Uji Asumsi Klasik",
  subtopic:
    "Pembelajaran berbantuan AI yang mendorong dialog kritis, refleksi, aksi mandiri, dan integrasi perspektif dalam pemodelan regresi.",
  semester: "Semester Genap 2026/2027",
  program: "D4 Analitika Logistik Terapan",
  department: "Departemen Statistika Bisnis",
  institution: "Institut Teknologi Sepuluh Nopember (ITS) Surabaya",
  leadLecturer: "Dr. Iis Dewi Ratih, S.Si., M.Si.",
  teachingTeam: [
    "Dr. Iis Dewi Ratih, S.Si., M.Si.",
    "Noviyanti Santoso, S.Si., M.Si., Ph.D.",
    "Albertus Eka Putra Haryanto, S.Tr.Stat., M.Stat.",
  ],
  textbookReference:
    "Ratih, I. D., Haryanto, A. E. P., Wulandari, S. P., & Santoso, N. (2025). Metode Regresi: Teori dan Aplikasi Menggunakan SPSS. Surabaya: ITS Press. ISBN: 978-623-318-243-0.",
  cpmkCode: "CPMK-3 & CPMK-4",
  cpmkDescription:
    "Mengevaluasi asumsi multikolinearitas (VIF) dan residual IIDN, mengkritisi keluaran AI, serta menentukan model regresi terbaik secara mandiri.",
  completedStages: 3,
  totalStages: 6,
  overallProgress: 58,
  criticalThinkingIndex: 82.4,
};

export const INITIAL_LEARNING_STAGES: LearningStage[] = [
  {
    stageNumber: 1,
    kritikaCode: "K–R",
    title: "Pemicu Kritis",
    subtitle: "Studi Kasus Regresi & Argumentasi Awal",
    transformativePhase: "Trigger",
    sessionCode: "P1",
    description:
      "Mahasiswa menganalisis studi kasus regresi dan menyusun argumentasi awal secara mandiri tanpa bantuan AI.",
    pedagogicalGoal:
      "Mengungkap asumsi awal mahasiswa terhadap model regresi ber-R² tinggi namun melanggar asumsi klasik sebelum berinteraksi dengan AI.",
    status: "Completed",
    progress: 100,
    route: "/student/learning?stage=1",
    actionLabel: "Tinjau Argumentasi Awal",
    aiRoleSummary: "Tanpa Bantuan AI · Baseline Mandiri",
    completedAt: "12 Nov 2026, 09:40 WIB",
    score: 84,
  },
  {
    stageNumber: 2,
    kritikaCode: "I",
    title: "Dialog dan Investigasi AI",
    subtitle: "Dialog Kritis bersama AI Mentor",
    transformativePhase: "Reflection",
    sessionCode: "P1",
    description:
      "Mahasiswa berdialog kritis dengan AI Mentor, menguji asumsi, dan mengkritisi kesimpulan/argumentasi AI yang mengandung kekeliruan.",
    pedagogicalGoal:
      "Menguji klaim statistik melalui pertanyaan Sokratik dan mengidentifikasi miskonsepsi pada interpretasi p-value serta multikolinearitas.",
    status: "Completed",
    progress: 100,
    route: "/student/mentor",
    actionLabel: "Buka Dialog AI Mentor",
    aiRoleSummary: "AI Mentor Sokratik · Guardrails Aktif",
    completedAt: "13 Nov 2026, 14:15 WIB",
    score: 88,
  },
  {
    stageNumber: 3,
    kritikaCode: "T",
    title: "Refleksi Antara",
    subtitle: "Asumsi Awal · Temuan Baru · Perubahan Pemahaman",
    transformativePhase: "Reflection",
    sessionCode: "P2",
    description:
      "Mahasiswa merefleksikan hasil dialog, meninjau kembali argumentasi awal, dan merevisi pemahamannya.",
    pedagogicalGoal:
      "Memetakan secara eksplisit: (1) Asumsi awal, (2) Temuan baru dari dialog AI, dan (3) Perubahan pemahaman konsep regresi.",
    status: "Completed",
    progress: 100,
    route: "/student/learning?stage=3",
    actionLabel: "Buka Refleksi Antara",
    aiRoleSummary: "Checklist: Asumsi awal · Temuan baru · Perubahan",
    completedAt: "14 Nov 2026, 11:20 WIB",
    score: 86,
  },
  {
    stageNumber: 4,
    kritikaCode: "I",
    title: "Tantangan Kasus Baru",
    subtitle: "Studi Kasus & Dataset Baru Tervalidasi",
    transformativePhase: "Action",
    sessionCode: "P2",
    description:
      "Platform menghasilkan studi kasus dan dataset baru yang telah divalidasi untuk dianalisis lebih lanjut.",
    pedagogicalGoal:
      "Menerapkan pemahaman yang telah direvisi pada dataset baru menggunakan fasilitas pemodelan regresi dan uji asumsi klasik.",
    status: "In Progress",
    progress: 65,
    route: "/student/workspace",
    actionLabel: "Analisis Kasus Baru",
    aiRoleSummary: "Kasus Baru & Dataset Tervalidasi",
  },
  {
    stageNumber: 5,
    kritikaCode: "K",
    title: "Asesmen Mandiri Tanpa Gen-AI",
    subtitle: "Pemodelan, Uji Asumsi & Keputusan Mandiri",
    transformativePhase: "Action",
    sessionCode: "P3",
    description:
      "Mahasiswa menganalisis dataset, melakukan pemodelan regresi, menguji asumsi, dan menentukan model terbaik secara mandiri tanpa AI.",
    pedagogicalGoal:
      "Membuktikan internalisasi kemampuan berpikir kritis tanpa ketergantungan AI dengan fitur keamanan Copy-Paste Nonaktif & Pelacakan Tab.",
    status: "Available",
    progress: 0,
    route: "/student/assessment",
    actionLabel: "Mulai Asesmen Mandiri",
    aiRoleSummary: "AI Nonaktif · Copy-Paste Terkunci · Lacak Tab",
  },
  {
    stageNumber: 6,
    kritikaCode: "A",
    title: "Refleksi Akhir dan Integrasi Pembelajaran",
    subtitle: "Portofolio Digital & Transfer Pembelajaran",
    transformativePhase: "Integration",
    sessionCode: "P3",
    description:
      "Mahasiswa merefleksikan perubahan perspektif, merumuskan prinsip berpikir kritis, dan menerapkannya pada kasus lanjutan (transfer pembelajaran).",
    pedagogicalGoal:
      "Mendokumentasikan: (1) Perubahan perspektif, (2) Prinsip yang diperoleh, (3) Strategi ke depan, dan (4) Penerapan pada kasus lain.",
    status: "Locked",
    progress: 0,
    route: "/student/portfolio",
    actionLabel: "Buka Portofolio Refleksi",
    aiRoleSummary: "Portofolio Digital & Transfer Pembelajaran",
  },
];

export const EXPECTED_IMPACTS_DIMENSIONS = [
  {
    key: "interpretation",
    title: "Interpretasi",
    description: "Memahami informasi dan konteks masalah pada studi kasus regresi.",
    score: 86,
  },
  {
    key: "analysis",
    title: "Analisis",
    description: "Mengidentifikasi hubungan antarvariabel dan asumsi pada model regresi.",
    score: 84,
  },
  {
    key: "evaluation",
    title: "Evaluasi",
    description: "Menilai ketepatan metode, hasil, dan argumentasi (termasuk keluaran AI).",
    score: 82,
  },
  {
    key: "inference",
    title: "Inferensi",
    description: "Menarik kesimpulan dan mengambil keputusan statistik berbasis bukti.",
    score: 79,
  },
  {
    key: "selfRegulation",
    title: "Regulasi Diri",
    description: "Merefleksikan proses berpikir, mengevaluasi strategi, dan memperbaiki pemahaman.",
    score: 81,
  },
];

export const PLATFORM_ROLES_SUMMARY = [
  "Menghasilkan studi kasus dan dataset berbasis Gen-AI yang tervalidasi.",
  "Memfasilitasi dialog kritis dengan AI Mentor.",
  "Menyediakan lingkungan asesmen mandiri terintegrasi dengan analisis statistik.",
  "Mendokumentasikan proses belajar dan refleksi dalam portofolio digital.",
];

export const INTEGRITY_FEATURES_SUMMARY = [
  {
    title: "Kolom Copy–Paste Dinonaktifkan",
    description:
      "Mahasiswa tidak dapat menyalin (copy) maupun menempel (paste) teks pada seluruh kolom jawaban di platform.",
  },
  {
    title: "Pelacakan Aktivitas Tab",
    description:
      "Sistem mendeteksi jika mahasiswa membuka tab atau aplikasi lain selama asesmen (tercatat pada log aktivitas).",
  },
  {
    title: "Indikasi Kecurangan",
    description:
      "Aktivitas mencurigakan (misalnya berpindah tab berulang, keluar dari layar penuh) ditandai oleh sistem dan dilaporkan kepada dosen untuk ditinjau.",
  },
];

export const RECENT_ACTIVITIES: ActivityLog[] = [
  {
    id: "act-1",
    title: "Tantangan Kasus Baru (Tahap 4 — Action)",
    description:
      "Menganalisis dataset baru Regional Distribution & Marketing: mengevaluasi VIF = 11,42 dan uji Breusch-Pagan.",
    stageNumber: 4,
    timestamp: "2 jam lalu",
    type: "workspace",
    status: "In Progress",
  },
  {
    id: "act-2",
    title: "Refleksi Antara (Tahap 3 — Reflection)",
    description:
      "Merevisi asumsi awal: p = 0,003 tidak otomatis bermakna secara bisnis bila β₁ = 0,85 berada di bawah ambang impas.",
    stageNumber: 3,
    timestamp: "Kemarin, 11:20",
    type: "reflection",
    status: "Completed",
  },
  {
    id: "act-3",
    title: "Dialog dan Investigasi AI (Tahap 2 — Reflection)",
    description:
      "Mengkritisi kesimpulan AI Mentor yang mengabaikan multikolinearitas (VIF = 11,42) karena terpaku pada R² = 0,914.",
    stageNumber: 2,
    timestamp: "13 Nov 2026",
    type: "dialogue",
    status: "Completed",
  },
  {
    id: "act-4",
    title: "Pemicu Kritis (Tahap 1 — Trigger)",
    description:
      "Menyusun argumentasi awal secara mandiri tanpa bantuan AI pada Studi Kasus Regresi Distribusi Jawa–Bali.",
    stageNumber: 1,
    timestamp: "12 Nov 2026",
    type: "response",
    status: "Completed",
  },
];

export const STUDENT_FACIONE_PROFILE: FacioneScores = {
  interpretation: 86,
  analysis: 84,
  evaluation: 82,
  inference: 79,
  explanation: 85,
  selfRegulation: 81,
};

export const ENROLLED_CLASSES_STUDENT = [
  {
    id: "cls-1",
    code: "ALT-2204-A",
    name: "Metode Regresi — Kelas A (Analitika Logistik Terapan)",
    lecturer: "Dr. Iis Dewi Ratih, S.Si., M.Si.",
    coLecturers: "Noviyanti Santoso, Ph.D. · Albertus Eka Putra H., M.Stat.",
    schedule: "Selasa & Kamis · 08:00 – 10:30 WIB",
    lab: "Lab Komputer Statistika 2, Departemen Statistika Bisnis ITS",
    currentTopic: "Pemodelan Regresi Berganda, Uji Asumsi Klasik & Pemilihan Model",
    progress: 58,
    completedStages: 3,
    totalStages: 6,
    activeBadge: "Siklus Aktif",
  },
  {
    id: "cls-2",
    code: "ALT-2208-B",
    name: "Analitika Rantai Pasok & Distribusi Logistik",
    lecturer: "Noviyanti Santoso, S.Si., M.Si., Ph.D.",
    coLecturers: "Albertus Eka Putra H., M.Stat.",
    schedule: "Rabu · 13:00 – 15:30 WIB",
    lab: "Lab Rekayasa Kualitas dan Produktivitas (RKP) ITS",
    currentTopic: "Pemodelan Lead-Time & Kapasitas Gudang",
    progress: 100,
    completedStages: 6,
    totalStages: 6,
    activeBadge: "Siklus Selesai",
  },
];
