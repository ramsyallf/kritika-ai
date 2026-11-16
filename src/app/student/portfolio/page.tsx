"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { EXPECTED_IMPACTS_DIMENSIONS } from "@/mock-data/courses";
import {
  Card,
  Button,
  Textarea,
  ProgressBar,
} from "@/components/ui/primitives";
import { useToast } from "@/components/ui/overlays";
import { Check } from "lucide-react";

export default function StudentPortfolioPage() {
  const { submissions, updateSubmission, completeStage } = useAppStore();
  const { notify } = useToast();

  const f6 = submissions.stage6FinalItems;

  const handleSaveFinalReflection = () => {
    completeStage(6);
    notify({
      title: "Portofolio Refleksi Akhir berhasil disimpan",
      description:
        "Seluruh 6 tahapan pembelajaran transformatif KRITIKA-AI telah selesai.",
      variant: "success",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[12.5px] font-medium text-[#718096]">
            Tahap 6 dari 6 · Fase Integration · Portofolio Digital
          </p>
          <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
            Refleksi Akhir dan Integrasi Pembelajaran
          </h1>
        </div>

        <Button variant="primary" onClick={handleSaveFinalReflection}>
          Simpan Portofolio Refleksi
        </Button>
      </div>

      {/* Ringkasan Perkembangan Pre-Test ke Post-Test */}
      <Card className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x divide-[#102A56]/[0.06] tabular-nums">
          <div className="lg:pr-4">
            <span className="text-[12px] text-[#718096]">Skor Awal (Pre-Test)</span>
            <p className="text-[28px] font-semibold tracking-[-0.025em] text-[#172033] mt-1">
              62,0
            </p>
            <span className="text-[11.5px] text-[#718096]">
              Orientasi prosedural awal
            </span>
          </div>

          <div className="lg:px-6">
            <span className="text-[12px] text-[#718096]">Skor Akhir (Post-Test)</span>
            <p className="text-[28px] font-semibold tracking-[-0.025em] text-[#102A56] mt-1">
              86,0
            </p>
            <span className="text-[11.5px] text-[#16A36A] font-medium">
              +24,0 poin peningkatan
            </span>
          </div>

          <div className="lg:px-6">
            <span className="text-[12px] text-[#718096]">
              Normalized Gain (N-Gain)
            </span>
            <p className="text-[28px] font-semibold tracking-[-0.025em] text-[#2563EB] mt-1">
              0,63
            </p>
            <span className="text-[11.5px] text-[#718096]">
              Melampaui target ≥ 0,30
            </span>
          </div>

          <div className="lg:pl-6">
            <span className="text-[12px] text-[#718096]">
              Skor Evaluasi Argumen AI
            </span>
            <p className="text-[28px] font-semibold tracking-[-0.025em] text-[#172033] mt-1">
              3,8{" "}
              <span className="text-[15px] text-[#718096] font-normal">
                / 4,0
              </span>
            </p>
            <span className="text-[11.5px] text-[#16A36A] font-medium">
              Target ≥ 3,0 tercapai
            </span>
          </div>
        </div>
      </Card>

      {/* Rekam Jejak Transformasi Penalaran (Tahap 1 -> Tahap 3 -> Tahap 5) */}
      <Card className="p-6 sm:p-7 space-y-5">
        <div>
          <h2 className="text-[17px] font-semibold text-[#172033]">
            Dokumentasi Proses Belajar &amp; Perubahan Penalaran
          </h2>
          <p className="text-[12.5px] text-[#718096]">
            Perbandingan antara argumentasi awal (Trigger), hasil refleksi
            dialog AI (Reflection), dan keputusan asesmen mandiri (Action).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-[13px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-2">
            <span className="text-[11px] font-medium text-[#718096]">
              Tahap 1 · Pemicu Kritis (Trigger)
            </span>
            <h4 className="text-[14px] font-semibold text-[#172033]">
              Argumentasi Awal Mandiri
            </h4>
            <p className="text-[12.5px] text-[#718096] leading-relaxed">
              {submissions.stage1InitialResponse}
            </p>
          </div>

          <div className="p-5 rounded-[13px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-2">
            <span className="text-[11px] font-medium text-[#2563EB]">
              Tahap 3 · Refleksi Antara (Reflection)
            </span>
            <h4 className="text-[14px] font-semibold text-[#172033]">
              Revisi Pemahaman Pasca-Dialog AI
            </h4>
            <p className="text-[12.5px] text-[#718096] leading-relaxed">
              {submissions.stage3ReflectionItems.understandingShift}
            </p>
          </div>

          <div className="p-5 rounded-[13px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-2">
            <span className="text-[11px] font-medium text-[#16A36A]">
              Tahap 5 · Asesmen Mandiri Tanpa Gen-AI (Action)
            </span>
            <h4 className="text-[14px] font-semibold text-[#172033]">
              Keputusan &amp; Justifikasi Mandiri
            </h4>
            <p className="text-[12.5px] text-[#718096] leading-relaxed">
              {submissions.stage5IndependentAssessment.argumentText}
            </p>
          </div>
        </div>
      </Card>

      {/* 4 Komponen Refleksi Akhir Sesuai Gambar 2.1 + 5 Dimensi Dampak */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <Card className="lg:col-span-7 p-6 sm:p-7 space-y-5">
          <div>
            <h3 className="text-[17px] font-semibold text-[#172033]">
              Empat Komponen Refleksi Akhir dan Integrasi Pembelajaran
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Rumuskan refleksi akhir Anda sesuai empat indikator fase
              Integration KRITIKA AI.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-[13px] font-semibold text-[#172033] mb-1.5">
                <Check className="w-4 h-4 text-[#16A36A]" />
                <span>1. Perubahan perspektif</span>
              </label>
              <Textarea
                rows={2}
                value={f6.perspectiveChange}
                onChange={(e) =>
                  updateSubmission("stage6FinalItems", {
                    ...f6,
                    perspectiveChange: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[13px] font-semibold text-[#172033] mb-1.5">
                <Check className="w-4 h-4 text-[#16A36A]" />
                <span>2. Prinsip yang diperoleh</span>
              </label>
              <Textarea
                rows={2}
                value={f6.principlesGained}
                onChange={(e) =>
                  updateSubmission("stage6FinalItems", {
                    ...f6,
                    principlesGained: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[13px] font-semibold text-[#172033] mb-1.5">
                <Check className="w-4 h-4 text-[#16A36A]" />
                <span>3. Strategi ke depan</span>
              </label>
              <Textarea
                rows={2}
                value={f6.futureStrategy}
                onChange={(e) =>
                  updateSubmission("stage6FinalItems", {
                    ...f6,
                    futureStrategy: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-[13px] font-semibold text-[#172033] mb-1.5">
                <Check className="w-4 h-4 text-[#16A36A]" />
                <span>4. Penerapan pada kasus lain (Transfer pembelajaran)</span>
              </label>
              <Textarea
                rows={2}
                value={f6.transferApplication}
                onChange={(e) =>
                  updateSubmission("stage6FinalItems", {
                    ...f6,
                    transferApplication: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" onClick={handleSaveFinalReflection}>
              Simpan Refleksi Akhir
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-5 p-6 sm:p-7 space-y-4">
          <div>
            <h3 className="text-[17px] font-semibold text-[#172033]">
              Capaian Dimensi Berpikir Kritis
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Lima indikator dampak pembelajaran KRITIKA-AI
            </p>
          </div>

          <div className="space-y-4 pt-1">
            {EXPECTED_IMPACTS_DIMENSIONS.map((dim) => (
              <div key={dim.key} className="space-y-1.5">
                <div className="flex justify-between text-[13px] tabular-nums">
                  <span className="font-semibold text-[#172033]">
                    {dim.title}
                  </span>
                  <span className="font-medium text-[#102A56]">
                    {dim.score}%
                  </span>
                </div>
                <p className="text-[11.5px] text-[#718096]">
                  {dim.description}
                </p>
                <ProgressBar value={dim.score} variant="navy" size="sm" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
