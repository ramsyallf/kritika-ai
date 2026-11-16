import { MentorMessage, SocraticMoveType, FacioneScores } from "@/types";

export interface SocraticResponsePayload {
  replyText: string;
  socraticMove: SocraticMoveType;
  targetDimension: keyof FacioneScores;
  highlightedConcept: string;
  progressDelta: number;
}

export async function generateSocraticMentorReply(
  studentInput: string,
  conversationHistory: MentorMessage[]
): Promise<SocraticResponsePayload> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lower = studentInput.toLowerCase();

  if (lower.includes("vif") || lower.includes("multikolinear") || lower.includes("standard error")) {
    return {
      replyText:
        "Analisis yang tajam. Ketika VIF mencapai 11,42, lebih dari 91% variasi prediktor tersebut dijelaskan oleh prediktor lain di dalam model. Jika standard error membengkak, bagaimana dampaknya terhadap lebar selang kepercayaan β₁ = 0,85—dan apa risikonya jika manajemen mengubah Biaya Iklan tanpa mengubah Diskon Promosi?",
      socraticMove: "Clarifying Question",
      targetDimension: "analysis",
      highlightedConcept: "Variance Inflation Factor & Stabilitas Koefisien Parsial",
      progressDelta: 12,
    };
  }

  if (
    lower.includes("heteroskedastis") ||
    lower.includes("breusch") ||
    lower.includes("residual") ||
    lower.includes("varians")
  ) {
    return {
      replyText:
        "Anda berhasil mengidentifikasi pelanggaran asumsi IIDN. Dengan nilai p Breusch-Pagan = 0,008, varians galat membesar seiring skala hub distribusi. Mengapa kita tidak bisa lagi mempercayai nilai p-value = 0,003 dari OLS biasa? Langkah perbaikan apa—transformasi logaritma, WLS, atau robust standard error—yang paling tepat Anda rekomendasikan?",
      socraticMove: "Requesting Evidence",
      targetDimension: "evaluation",
      highlightedConcept: "Ketidakkonstanan Varians Galat (Heteroskedastisitas)",
      progressDelta: 12,
    };
  }

  if (
    lower.includes("kausal") ||
    lower.includes("sebab") ||
    lower.includes("perancu") ||
    lower.includes("confound") ||
    lower.includes("observasional")
  ) {
    return {
      replyText:
        "Pertanyaan kritis yang sangat tepat. Pada data logistik dan penjualan observasional, wilayah dengan permintaan dasar tinggi sering kali diberi anggaran iklan lebih besar. Bagaimana cara Anda menguji apakah permintaan regional menjadi variabel perancu, dan bagaimana rumusan kesimpulan yang etis agar manajemen tidak menyamakan korelasi dengan kausalitas?",
      socraticMove: "Challenging Assumptions",
      targetDimension: "inference",
      highlightedConcept: "Asosiasi Observasional vs. Inferensi Kausal",
      progressDelta: 12,
    };
  }

  if (
    lower.includes("perbaik") ||
    lower.includes("revisi") ||
    lower.includes("adjusted") ||
    lower.includes("robust")
  ) {
    return {
      replyText:
        "Sintesis yang sangat baik. Perhatikan bagaimana cara berpikir Anda berkembang dari sekadar melihat β₁ = 0,85 dan p = 0,003 menjadi mengevaluasi titik impas ekonomis, multikolinearitas (VIF), homoskedastisitas residual, dan pemilihan model parsimoni. Sebelum melanjutkan ke Tahap 3 (Refleksi Antara), apa satu perubahan pemahaman terbesar Anda dibanding jawaban awal di Tahap 1?",
      socraticMove: "Reflective Questioning",
      targetDimension: "selfRegulation",
      highlightedConcept: "Regulasi Diri & Transformasi Perspektif",
      progressDelta: 15,
    };
  }

  const turn = conversationHistory.length;
  if (turn % 2 === 0) {
    return {
      replyText:
        "Mari kita uji argumen tersebut lebih dalam. Seandainya seorang manajer berpendapat bahwa karena uji F simultan menghasilkan F = 155,84 (p < 0,001), maka persamaan regresi ini otomatis valid untuk peramalan anggaran kuartal depan. Bukti diagnostik mana yang akan Anda ajukan sebagai argumen tandingan?",
      socraticMove: "Counterargument",
      targetDimension: "evaluation",
      highlightedConcept: "Uji F Global vs. Validitas Asumsi & Parameter Lokal",
      progressDelta: 10,
    };
  }

  return {
    replyText:
      "Terima kasih atas penjelasan Anda. Agar argumen Anda memenuhi kriteria berpikir kritis KRITIKA AI, statistik uji spesifik mana (misalnya Adjusted R², VIF, Durbin-Watson, atau Selang Kepercayaan 95%) yang menjadi bukti terkuat bagi kesimpulan Anda—dan asumsi apa yang harus terpenuhi?",
    socraticMove: "Requesting Evidence",
    targetDimension: "explanation",
    highlightedConcept: "Argumentasi Statistik Berbasis Bukti",
    progressDelta: 10,
  };
}
