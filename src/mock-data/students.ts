import { StudentRecord } from "@/types";

const STAGE_TITLES: Record<number, string> = {
  1: "Tahap 1: Pemicu Kritis",
  2: "Tahap 2: Dialog dan Investigasi AI",
  3: "Tahap 3: Refleksi Antara",
  4: "Tahap 4: Tantangan Kasus Baru",
  5: "Tahap 5: Asesmen Mandiri Tanpa Gen-AI",
  6: "Tahap 6: Refleksi Akhir & Integrasi",
};

const INDONESIAN_STUDENT_SEEDS: {
  name: string;
  stage: number;
  progress: number;
  score: number;
  ctScore: number;
  pre: number;
  post: number;
  status: StudentRecord["status"];
  lastActivity: string;
  classCode: string;
}[] = [
  { name: "Raka Pratama Wijaya", stage: 4, progress: 65, score: 86, ctScore: 84, pre: 62, post: 86, status: "Excelling", lastActivity: "12 menit lalu", classCode: "ALT-2204-A" },
  { name: "Nadia Putri Maharani", stage: 6, progress: 100, score: 92, ctScore: 91, pre: 66, post: 92, status: "Excelling", lastActivity: "25 menit lalu", classCode: "ALT-2204-A" },
  { name: "Bagas Adi Nugroho", stage: 5, progress: 82, score: 84, ctScore: 82, pre: 58, post: 84, status: "On Track", lastActivity: "38 menit lalu", classCode: "ALT-2204-A" },
  { name: "Aulia Rahma Hidayat", stage: 5, progress: 80, score: 88, ctScore: 86, pre: 64, post: 88, status: "Excelling", lastActivity: "45 menit lalu", classCode: "ALT-2204-A" },
  { name: "Dimas Arya Saputra", stage: 4, progress: 62, score: 79, ctScore: 77, pre: 55, post: 79, status: "On Track", lastActivity: "1 jam lalu", classCode: "ALT-2204-A" },
  { name: "Salsabila Nur Azizah", stage: 6, progress: 100, score: 90, ctScore: 89, pre: 63, post: 90, status: "Excelling", lastActivity: "1 jam lalu", classCode: "ALT-2204-A" },
  { name: "Fajar Ramadhan Kusuma", stage: 3, progress: 50, score: 74, ctScore: 72, pre: 54, post: 74, status: "On Track", lastActivity: "2 jam lalu", classCode: "ALT-2204-A" },
  { name: "Intan Permata Sari", stage: 4, progress: 68, score: 83, ctScore: 81, pre: 60, post: 83, status: "On Track", lastActivity: "2 jam lalu", classCode: "ALT-2204-A" },
  { name: "Reza Maulana Hakim", stage: 2, progress: 34, score: 66, ctScore: 64, pre: 52, post: 66, status: "Needs Attention", lastActivity: "5 jam lalu", classCode: "ALT-2204-A" },
  { name: "Anisa Fitriani Susanto", stage: 5, progress: 85, score: 87, ctScore: 85, pre: 61, post: 87, status: "Excelling", lastActivity: "3 jam lalu", classCode: "ALT-2204-A" },
  { name: "Ilham Akbar Gunawan", stage: 4, progress: 64, score: 80, ctScore: 78, pre: 57, post: 80, status: "On Track", lastActivity: "3 jam lalu", classCode: "ALT-2204-A" },
  { name: "Larasati Dewi Kartika", stage: 6, progress: 100, score: 94, ctScore: 93, pre: 68, post: 94, status: "Excelling", lastActivity: "4 jam lalu", classCode: "ALT-2204-A" },
  { name: "Yusuf Habibie Santoso", stage: 3, progress: 48, score: 72, ctScore: 70, pre: 53, post: 72, status: "On Track", lastActivity: "4 jam lalu", classCode: "ALT-2204-A" },
  { name: "Tiara Ayu Wulandari", stage: 4, progress: 66, score: 81, ctScore: 80, pre: 59, post: 81, status: "On Track", lastActivity: "5 jam lalu", classCode: "ALT-2204-A" },
  { name: "Galih Prasetyo Utomo", stage: 1, progress: 18, score: 58, ctScore: 56, pre: 49, post: 58, status: "At Risk", lastActivity: "2 hari lalu", classCode: "ALT-2204-A" },
  { name: "Zahra Amalia Putri", stage: 5, progress: 84, score: 85, ctScore: 84, pre: 60, post: 85, status: "On Track", lastActivity: "6 jam lalu", classCode: "ALT-2204-A" },
  { name: "Hafiz Alfarizi Rahman", stage: 4, progress: 60, score: 78, ctScore: 76, pre: 56, post: 78, status: "On Track", lastActivity: "6 jam lalu", classCode: "ALT-2204-A" },
  { name: "Nabila Syifa Kusnadi", stage: 6, progress: 100, score: 91, ctScore: 90, pre: 65, post: 91, status: "Excelling", lastActivity: "7 jam lalu", classCode: "ALT-2204-A" },
  { name: "Bima Sakti Wardhana", stage: 2, progress: 32, score: 65, ctScore: 63, pre: 51, post: 65, status: "Needs Attention", lastActivity: "1 hari lalu", classCode: "ALT-2204-A" },
  { name: "Citra Kirana Pramesti", stage: 5, progress: 82, score: 84, ctScore: 83, pre: 59, post: 84, status: "On Track", lastActivity: "8 jam lalu", classCode: "ALT-2204-A" },
  { name: "Arif Budiman Setiawan", stage: 4, progress: 65, score: 79, ctScore: 78, pre: 57, post: 79, status: "On Track", lastActivity: "8 jam lalu", classCode: "ALT-2204-B" },
  { name: "Dinda Sekar Arum", stage: 5, progress: 83, score: 86, ctScore: 85, pre: 62, post: 86, status: "Excelling", lastActivity: "9 jam lalu", classCode: "ALT-2204-B" },
  { name: "Kevin Jonathan Halim", stage: 6, progress: 100, score: 93, ctScore: 92, pre: 67, post: 93, status: "Excelling", lastActivity: "10 jam lalu", classCode: "ALT-2204-B" },
  { name: "Putri Maharani Laksmi", stage: 3, progress: 50, score: 75, ctScore: 73, pre: 55, post: 75, status: "On Track", lastActivity: "11 jam lalu", classCode: "ALT-2204-B" },
  { name: "Rizky Aditya Firmansyah", stage: 4, progress: 64, score: 80, ctScore: 79, pre: 58, post: 80, status: "On Track", lastActivity: "12 jam lalu", classCode: "ALT-2204-B" },
  { name: "Shania Oktaviani Tan", stage: 5, progress: 84, score: 87, ctScore: 86, pre: 63, post: 87, status: "Excelling", lastActivity: "12 jam lalu", classCode: "ALT-2204-B" },
  { name: "Taufik Hidayatullah", stage: 2, progress: 30, score: 63, ctScore: 61, pre: 50, post: 63, status: "Needs Attention", lastActivity: "1 hari lalu", classCode: "ALT-2204-B" },
  { name: "Vania Clarissa Gunardi", stage: 6, progress: 100, score: 89, ctScore: 88, pre: 64, post: 89, status: "Excelling", lastActivity: "14 jam lalu", classCode: "ALT-2204-B" },
  { name: "Wahyu Eko Purnomo", stage: 4, progress: 62, score: 77, ctScore: 75, pre: 56, post: 77, status: "On Track", lastActivity: "15 jam lalu", classCode: "ALT-2204-B" },
  { name: "Yasmin Khairunnisa", stage: 5, progress: 80, score: 83, ctScore: 82, pre: 60, post: 83, status: "On Track", lastActivity: "16 jam lalu", classCode: "ALT-2204-B" },
  { name: "Zaki Muhammad Farhan", stage: 3, progress: 50, score: 74, ctScore: 72, pre: 54, post: 74, status: "On Track", lastActivity: "18 jam lalu", classCode: "ALT-2204-B" },
  { name: "Aldi Taheriansyah Putra", stage: 1, progress: 16, score: 55, ctScore: 54, pre: 48, post: 55, status: "At Risk", lastActivity: "3 hari lalu", classCode: "ALT-2204-B" },
  { name: "Bella Safira Handayani", stage: 4, progress: 67, score: 82, ctScore: 80, pre: 59, post: 82, status: "On Track", lastActivity: "19 jam lalu", classCode: "ALT-2204-B" },
  { name: "Cahyo Dwi Laksono", stage: 5, progress: 84, score: 85, ctScore: 83, pre: 61, post: 85, status: "On Track", lastActivity: "20 jam lalu", classCode: "ALT-2204-B" },
  { name: "Dewi Anggraini Puspita", stage: 6, progress: 100, score: 91, ctScore: 89, pre: 65, post: 91, status: "Excelling", lastActivity: "21 jam lalu", classCode: "ALT-2204-B" },
  { name: "Edo Pratama Sinaga", stage: 4, progress: 63, score: 78, ctScore: 77, pre: 57, post: 78, status: "On Track", lastActivity: "22 jam lalu", classCode: "ALT-2204-B" },
  { name: "Farah Nadhira Azzahra", stage: 5, progress: 82, score: 86, ctScore: 85, pre: 62, post: 86, status: "Excelling", lastActivity: "1 hari lalu", classCode: "ALT-2204-B" },
  { name: "Gilang Dirga Mahendra", stage: 3, progress: 48, score: 71, ctScore: 69, pre: 53, post: 71, status: "Needs Attention", lastActivity: "1 hari lalu", classCode: "ALT-2204-B" },
  { name: "Hana Pertiwi Kurniawan", stage: 4, progress: 66, score: 81, ctScore: 80, pre: 58, post: 81, status: "On Track", lastActivity: "1 hari lalu", classCode: "ALT-2204-B" },
  { name: "Irfan Syahputra Lubis", stage: 5, progress: 83, score: 84, ctScore: 82, pre: 60, post: 84, status: "On Track", lastActivity: "1 hari lalu", classCode: "ALT-2204-B" },
];

export const STUDENTS_LIST: StudentRecord[] = INDONESIAN_STUDENT_SEEDS.map(
  (s, idx) => {
    const num = (idx + 1).toString().padStart(3, "0");
    const nim = `2043251${num}`;
    const nGain = Number(
      ((s.post - s.pre) / (100 - s.pre)).toFixed(2)
    );
    const slug = s.name
      .toLowerCase()
      .replace(/[^a-z]+/g, ".")
      .slice(0, 18);

    return {
      id: `std-${idx + 1}`,
      nim,
      name: s.name,
      email: `${slug}@student.its.ac.id`,
      classCode: s.classCode,
      currentStage: s.stage,
      currentStageTitle: STAGE_TITLES[s.stage],
      learningProgress: s.progress,
      assessmentScore: s.score,
      criticalThinkingScore: s.ctScore,
      preTestScore: s.pre,
      postTestScore: s.post,
      nGain,
      lastActivity: s.lastActivity,
      status: s.status,
      facione: {
        interpretation: Math.min(98, s.ctScore + 3),
        analysis: Math.min(98, s.ctScore + 1),
        evaluation: s.ctScore,
        inference: Math.max(50, s.ctScore - 2),
        explanation: Math.min(98, s.ctScore + 2),
        selfRegulation: Math.max(50, s.ctScore - 1),
      },
      dialogueTurns: Math.max(3, s.stage * 3 + (idx % 4)),
      aiFallacyDetected: s.stage >= 2,
      tabSwitchesInAssessment: s.stage >= 5 ? idx % 2 : 0,
      initialResponseSummary:
        "Menyimpulkan model regresi valid hanya karena nilai R² = 0,914 dan p = 0,003 tanpa memeriksa multikolinearitas (VIF = 11,42) maupun titik impas biaya iklan.",
      intermediateReflectionSummary:
        s.stage >= 3
          ? "Menyadari setelah dialog Sokratik bahwa koefisien β₁ = 0,85 berarti tambahan penjualan di bawah biaya iklan Rp1 juta (rugi bersih), serta VIF > 10 membuat estimasi koefisien tidak stabil."
          : "Menunggu penyelesaian Tahap 3 (Refleksi Antara).",
      finalReflectionSummary:
        s.stage === 6
          ? "Merumuskan prinsip berpikir kritis: selalu periksa besaran dampak praktis dan selang kepercayaan terlebih dahulu, uji VIF serta Breusch-Pagan sebelum mempercayai uji-t, dan tidak menyamakan korelasi dengan kausalitas."
          : "Terbuka setelah menyelesaikan Tahap 5 (Asesmen Mandiri Tanpa Gen-AI).",
    };
  }
);
