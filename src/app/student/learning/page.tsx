"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { CURRENT_COURSE } from "@/mock-data/courses";
import {
  Card,
  Button,
  Textarea,
  ProgressBar,
} from "@/components/ui/primitives";
import { useToast } from "@/components/ui/overlays";
import {
  Check,
  Lock,
  ArrowRight,
  MessageSquareCode,
  LineChart,
  ShieldCheck,
  FolderKanban,
} from "lucide-react";

const PHASE_LABELS: Record<string, string> = {
  Trigger: "Fase 1 · Trigger (Pemicu)",
  Reflection: "Fase 2 · Reflection (Refleksi)",
  Action: "Fase 3 · Action (Aksi)",
  Integration: "Fase 4 · Integration (Integrasi)",
};

const STATUS_LABELS: Record<string, string> = {
  Completed: "Selesai",
  "In Progress": "Sedang Berjalan",
  Available: "Tersedia",
  Locked: "Terkunci",
};

export default function StudentLearningJourneyPage() {
  const { stages, submissions, updateSubmission, completeStage } =
    useAppStore();
  const { notify } = useToast();
  const [selectedStageNum, setSelectedStageNum] = useState<number>(3);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const st = Number(params.get("stage"));
    if (st >= 1 && st <= 6) {
      setSelectedStageNum(st);
    }
  }, []);

  const selectedStage =
    stages.find((s) => s.stageNumber === selectedStageNum) || stages[0];

  const handleSaveInitialResponse = () => {
    completeStage(1);
    notify({
      title: "Argumentasi awal Tahap 1 disimpan",
      description:
        "Jawaban mandiri Anda telah direkam sebagai baseline sebelum berdialog dengan AI Mentor.",
      variant: "success",
    });
  };

  const handleSaveIntermediateReflection = () => {
    completeStage(3);
    notify({
      title: "Refleksi Antara (Tahap 3) disimpan",
      description:
        "Asumsi awal, temuan baru, dan perubahan pemahaman Anda berhasil diperbarui.",
      variant: "success",
    });
  };

  const r3 = submissions.stage3ReflectionItems;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[12.5px] font-medium text-[#718096]">
            {CURRENT_COURSE.code} · {CURRENT_COURSE.name} · Enam Sintaks
            KRITIKA AI
          </p>
          <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
            Alur Pembelajaran &amp; Refleksi Antara
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/student/mentor">
            <Button variant="outline" size="md">
              <MessageSquareCode className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Dialog AI Mentor</span>
            </Button>
          </Link>
          <Link href="/student/assessment">
            <Button variant="primary" size="md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Asesmen Mandiri</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Pemilih 6 Tahap Sintaks */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {stages.map((st) => {
          const isSelected = st.stageNumber === selectedStageNum;
          const isDone = st.status === "Completed";
          const isLocked = st.status === "Locked";

          return (
            <button
              key={st.stageNumber}
              type="button"
              onClick={() => setSelectedStageNum(st.stageNumber)}
              className={`p-3.5 rounded-[14px] border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-[#102A56] text-white border-[#102A56] shadow-[0_6px_20px_-4px_rgba(16,42,86,0.22)]"
                  : "bg-white text-[#172033] border-[#102A56]/[0.08] hover:border-[#102A56]/20"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span
                  className={`text-[11px] font-medium tabular-nums ${
                    isSelected ? "text-white/75" : "text-[#718096]"
                  }`}
                >
                  Tahap {st.stageNumber} · {st.kritikaCode}
                </span>
                {isDone ? (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      isSelected ? "text-white" : "text-[#16A36A]"
                    }`}
                  />
                ) : isLocked ? (
                  <Lock
                    className={`w-3 h-3 ${
                      isSelected ? "text-white/60" : "text-[#718096]"
                    }`}
                  />
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-[#4F8CFF]" : "bg-[#2563EB]"
                    }`}
                  />
                )}
              </div>
              <div>
                <p
                  className={`text-[13px] font-semibold tracking-[-0.01em] leading-snug ${
                    isSelected ? "text-white" : "text-[#172033]"
                  }`}
                >
                  {st.title}
                </p>
                <p
                  className={`text-[11px] mt-1 ${
                    isSelected ? "text-white/70" : "text-[#718096]"
                  }`}
                >
                  {STATUS_LABELS[st.status]}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Area Kerja Tahap Terpilih */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <Card className="lg:col-span-8 p-7 space-y-6">
          <div className="border-b border-[#102A56]/[0.06] pb-5">
            <div className="flex items-center justify-between text-[12px] text-[#718096] mb-1.5">
              <span className="font-medium text-[#2563EB]">
                Tahap {selectedStage.stageNumber} ({selectedStage.kritikaCode}) ·{" "}
                {PHASE_LABELS[selectedStage.transformativePhase]}
              </span>
              <span className="font-medium text-[#172033]">
                {STATUS_LABELS[selectedStage.status]}
              </span>
            </div>
            <h2 className="text-[21px] font-semibold tracking-[-0.02em] text-[#172033]">
              {selectedStage.title} — {selectedStage.subtitle}
            </h2>
            <p className="text-[13.5px] text-[#718096] mt-1 leading-relaxed">
              {selectedStage.description}
            </p>
          </div>

          {/* TAHAP 1: PEMICU KRITIS */}
          {selectedStage.stageNumber === 1 && (
            <div className="space-y-5">
              <div className="p-5 rounded-[13px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-2">
                <div className="flex items-center justify-between text-[11.5px] text-[#718096]">
                  <span className="font-semibold text-[#102A56]">
                    Studi Kasus Regresi · KR-CASE-101
                  </span>
                  <span>Tanpa Bantuan AI</span>
                </div>
                <h4 className="text-[14.5px] font-semibold text-[#172033]">
                  Dilema Pengeluaran Iklan &amp; Penjualan Hub Distribusi
                  Jawa–Bali
                </h4>
                <p className="text-[13px] text-[#718096] leading-relaxed">
                  Model regresi OLS pada 48 hub distribusi menghasilkan{" "}
                  <strong className="text-[#172033]">R² = 0,914</strong>,
                  koefisien{" "}
                  <strong className="text-[#172033]">
                    Biaya Iklan β₁ = 0,85 (p = 0,003)
                  </strong>
                  , <strong className="text-[#172033]">VIF = 11,42</strong>, dan{" "}
                  <strong className="text-[#172033]">
                    uji Breusch–Pagan p = 0,008
                  </strong>
                  . Manajemen menyimpulkan bahwa model ini sudah siap digunakan
                  untuk menaikkan anggaran iklan secara masif. Tuliskan analisis
                  dan argumentasi awal Anda secara mandiri tanpa bantuan AI.
                </p>
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-[#172033] mb-2">
                  Argumentasi Awal Mahasiswa (Disimpan sebagai Baseline Mandiri)
                </label>
                <Textarea
                  rows={5}
                  value={submissions.stage1InitialResponse}
                  onChange={(e) =>
                    updateSubmission("stage1InitialResponse", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[12px] text-[#718096]">
                  Tersimpan pada 12 Nov 2026, 09:40 WIB
                </span>
                <div className="flex items-center gap-2.5">
                  <Button variant="outline" onClick={handleSaveInitialResponse}>
                    Simpan Argumentasi Awal
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setSelectedStageNum(2)}
                  >
                    <span>Lanjut ke Tahap 2</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAHAP 2: DIALOG DAN INVESTIGASI AI */}
          {selectedStage.stageNumber === 2 && (
            <div className="space-y-5">
              <div className="p-5 rounded-[13px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-3">
                <h4 className="text-[14.5px] font-semibold text-[#172033]">
                  Dialog Kritis dengan AI Mentor &amp; Investigasi Argumen AI
                </h4>
                <p className="text-[13px] text-[#718096] leading-relaxed">
                  Pada tahap ini, mahasiswa berdialog kritis dengan AI Mentor,
                  menguji asumsi awal, dan mengkritisi kesimpulan/argumentasi AI
                  yang sengaja mengandung kekeliruan penalaran statistik.
                </p>
                <div className="p-3.5 rounded-[10px] bg-white border border-[#102A56]/[0.07] text-[12.5px] text-[#172033]">
                  <span className="text-[#718096] block text-[11.5px] mb-0.5">
                    Klaim AI yang Diinvestigasi Mahasiswa:
                  </span>
                  &ldquo;Karena nilai R² = 0,914 dan p = 0,003 sangat
                  signifikan, maka nilai VIF = 11,42 serta pelanggaran
                  homoskedastisitas dapat diabaikan.&rdquo;
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[12.5px] text-[#718096]">
                  5 giliran dialog Sokratik telah terekam
                </span>
                <Link href="/student/mentor">
                  <Button variant="primary">
                    <MessageSquareCode className="w-3.5 h-3.5" />
                    <span>Buka Dialog AI Mentor</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* TAHAP 3: REFLEKSI ANTARA (SESUAI GAMBAR 2.1: ASUMSI AWAL, TEMUAN BARU, PERUBAHAN PEMAHAMAN) */}
          {selectedStage.stageNumber === 3 && (
            <div className="space-y-5">
              <div className="p-4 rounded-[12px] bg-[#F7F9FC] border border-[#102A56]/[0.06]">
                <span className="text-[11px] font-medium text-[#718096]">
                  Rekaman Argumentasi Awal Anda (Tahap 1 — Pemicu Kritis)
                </span>
                <p className="text-[12.5px] text-[#172033] mt-1.5 leading-relaxed">
                  {submissions.stage1InitialResponse}
                </p>
              </div>

              {/* 3 Pertanyaan Terstruktur sesuai Gambar 2.1 */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-semibold text-[#172033] mb-1.5">
                    <Check className="w-4 h-4 text-[#16A36A]" />
                    <span>1. Asumsi awal?</span>
                  </label>
                  <p className="text-[12px] text-[#718096] mb-2">
                    Apa asumsi dan keyakinan awal Anda terhadap model regresi
                    sebelum berdialog dengan AI Mentor?
                  </p>
                  <Textarea
                    rows={3}
                    value={r3.initialAssumption}
                    onChange={(e) =>
                      updateSubmission("stage3ReflectionItems", {
                        ...r3,
                        initialAssumption: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[13px] font-semibold text-[#172033] mb-1.5">
                    <Check className="w-4 h-4 text-[#16A36A]" />
                    <span>2. Temuan baru?</span>
                  </label>
                  <p className="text-[12px] text-[#718096] mb-2">
                    Bukti statistik atau kekeliruan argumen AI apa yang Anda
                    temukan selama dialog kritis di Tahap 2?
                  </p>
                  <Textarea
                    rows={3}
                    value={r3.newFindings}
                    onChange={(e) =>
                      updateSubmission("stage3ReflectionItems", {
                        ...r3,
                        newFindings: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[13px] font-semibold text-[#172033] mb-1.5">
                    <Check className="w-4 h-4 text-[#16A36A]" />
                    <span>3. Perubahan pemahaman?</span>
                  </label>
                  <p className="text-[12px] text-[#718096] mb-2">
                    Bagaimana Anda meninjau kembali argumentasi awal dan
                    merevisi pemahaman Anda tentang R², p-value, dan uji asumsi?
                  </p>
                  <Textarea
                    rows={3}
                    value={r3.understandingShift}
                    onChange={(e) =>
                      updateSubmission("stage3ReflectionItems", {
                        ...r3,
                        understandingShift: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  variant="outline"
                  onClick={handleSaveIntermediateReflection}
                >
                  Simpan Refleksi Antara
                </Button>
                <Link href="/student/workspace">
                  <Button variant="primary">
                    <span>Lanjut ke Tahap 4 (Tantangan Kasus Baru)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* TAHAP 4: TANTANGAN KASUS BARU */}
          {selectedStage.stageNumber === 4 && (
            <div className="space-y-5">
              <div className="p-5 rounded-[13px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-2">
                <h4 className="text-[14.5px] font-semibold text-[#172033]">
                  Tantangan Kasus Baru &amp; Dataset Tervalidasi
                </h4>
                <p className="text-[13px] text-[#718096] leading-relaxed">
                  Platform menghasilkan studi kasus dan dataset baru yang telah
                  divalidasi untuk menguji penerapan konsep pemodelan regresi
                  serta pemeriksaan asumsi klasik.
                </p>
              </div>
              <div className="flex justify-end">
                <Link href="/student/workspace">
                  <Button variant="primary">
                    <LineChart className="w-3.5 h-3.5" />
                    <span>Buka Tantangan Kasus Baru (Workspace)</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* TAHAP 5: ASESMEN MANDIRI TANPA GEN-AI */}
          {selectedStage.stageNumber === 5 && (
            <div className="space-y-5">
              <div className="p-5 rounded-[13px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-2">
                <h4 className="text-[14.5px] font-semibold text-[#172033]">
                  Asesmen Mandiri Tanpa Gen-AI
                </h4>
                <p className="text-[13px] text-[#718096] leading-relaxed">
                  Mahasiswa menganalisis dataset, melakukan pemodelan regresi,
                  menguji asumsi, dan menentukan model terbaik secara mandiri
                  tanpa bantuan AI. Fitur copy-paste dinonaktifkan dan aktivitas
                  tab dipantau.
                </p>
              </div>
              <div className="flex justify-end">
                <Link href="/student/assessment">
                  <Button variant="primary">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Mulai Asesmen Mandiri</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* TAHAP 6: REFLEKSI AKHIR DAN INTEGRASI PEMBELAJARAN */}
          {selectedStage.stageNumber === 6 && (
            <div className="space-y-5">
              <div className="p-5 rounded-[13px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-2">
                <h4 className="text-[14.5px] font-semibold text-[#172033]">
                  Refleksi Akhir dan Integrasi Pembelajaran
                </h4>
                <p className="text-[13px] text-[#718096] leading-relaxed">
                  Mahasiswa merefleksikan perubahan perspektif, merumuskan
                  prinsip berpikir kritis, menyusun strategi ke depan, dan
                  menerapkannya pada kasus lanjutan (transfer pembelajaran).
                </p>
              </div>
              <div className="flex justify-end">
                <Link href="/student/portfolio">
                  <Button variant="primary">
                    <FolderKanban className="w-3.5 h-3.5" />
                    <span>Buka Portofolio Refleksi Akhir</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>

        {/* Kolom Kanan: Panduan Pedagogis */}
        <Card className="lg:col-span-4 p-6 space-y-5">
          <div>
            <span className="text-[11.5px] font-medium text-[#718096]">
              Spesifikasi Tahapan
            </span>
            <h3 className="text-[16px] font-semibold text-[#172033] mt-0.5">
              Desain Pedagogis KRITIKA AI
            </h3>
          </div>

          <div className="space-y-4 text-[13px] divide-y divide-[#102A56]/[0.06]">
            <div className="pb-4">
              <p className="text-[11.5px] text-[#718096]">Tujuan Pedagogis</p>
              <p className="text-[#172033] mt-1 leading-relaxed">
                {selectedStage.pedagogicalGoal}
              </p>
            </div>

            <div className="py-4">
              <p className="text-[11.5px] text-[#718096]">
                Peran Platform &amp; Guardrail AI
              </p>
              <p className="text-[#102A56] font-medium mt-1">
                {selectedStage.aiRoleSummary}
              </p>
            </div>

            <div className="py-4">
              <div className="flex justify-between text-[12px] mb-2 tabular-nums">
                <span className="text-[#718096]">Penyelesaian Tahap</span>
                <span className="font-medium text-[#172033]">
                  {selectedStage.progress}%
                </span>
              </div>
              <ProgressBar value={selectedStage.progress} variant="navy" />
            </div>

            <div className="pt-4 text-[12px] text-[#718096]">
              <p className="font-medium text-[#172033]">Buku Rujukan Utama</p>
              <p className="mt-1 leading-relaxed">
                {CURRENT_COURSE.textbookReference}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
