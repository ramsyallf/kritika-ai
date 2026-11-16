"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import {
  Card,
  Button,
  Textarea,
} from "@/components/ui/primitives";
import { useToast } from "@/components/ui/overlays";
import {
  ArrowRight,
  Check,
  Maximize2,
} from "lucide-react";

const ASSESSMENT_DATASET_ROWS = [
  { id: 1, x1: "12,4", x2: "3,1", y: "45,2" },
  { id: 2, x1: "10,8", x2: "2,9", y: "41,7" },
  { id: 3, x1: "15,2", x2: "4,0", y: "53,8" },
  { id: 4, x1: "9,6", x2: "2,4", y: "36,4" },
  { id: 5, x1: "14,0", x2: "3,7", y: "49,9" },
  { id: 6, x1: "11,5", x2: "3,0", y: "43,5" },
  { id: 7, x1: "16,8", x2: "4,5", y: "58,6" },
  { id: 8, x1: "8,9", x2: "2,1", y: "33,8" },
  { id: 9, x1: "13,1", x2: "3,4", y: "47,1" },
  { id: 10, x1: "17,4", x2: "4,8", y: "61,2" },
];

export default function StudentIndependentAssessmentPage() {
  const { submissions, updateSubmission, completeStage } = useAppStore();
  const { notify } = useToast();

  const form = submissions.stage5IndependentAssessment;

  const [tabSwitches, setTabSwitches] = useState(form.tabSwitchCount || 0);
  const [pasteBlockedCount, setPasteBlockedCount] = useState(0);
  const [fullscreenExits, setFullscreenExits] = useState(
    form.fullscreenExitCount || 0
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [checkedRegression, setCheckedRegression] = useState(
    form.selectedAnalyses?.regressionModeling ?? true
  );
  const [checkedAssumptions, setCheckedAssumptions] = useState(
    form.selectedAnalyses?.assumptionTesting ?? true
  );
  const [checkedModelSelection, setCheckedModelSelection] = useState(
    form.selectedAnalyses?.modelSelection ?? true
  );

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitches((c) => c + 1);
      }
    };
    const handleFullscreenChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      if (!fs) {
        setFullscreenExits((c) => c + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore browser restriction
    }
  };

  const handleBlockClipboard = (
    e: React.ClipboardEvent,
    actionName: string
  ) => {
    e.preventDefault();
    setPasteBlockedCount((c) => c + 1);
    notify({
      title: `Fitur ${actionName} Dinonaktifkan`,
      description:
        "Mahasiswa tidak dapat menyalin (copy) maupun menempel (paste) teks pada seluruh kolom jawaban di platform.",
      variant: "warning",
    });
  };

  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    updateSubmission("stage5IndependentAssessment", {
      ...form,
      submitted: true,
      selectedAnalyses: {
        regressionModeling: checkedRegression,
        assumptionTesting: checkedAssumptions,
        modelSelection: checkedModelSelection,
      },
      submittedAt: new Date().toLocaleString("id-ID"),
      tabSwitchCount: tabSwitches,
      fullscreenExitCount: fullscreenExits,
    });
    completeStage(5);
    notify({
      title: "Jawaban Asesmen Mandiri disimpan",
      description:
        "Tahap 6 (Refleksi Akhir dan Integrasi Pembelajaran) kini telah terbuka.",
      variant: "success",
    });
  };

  const charCount = (form.argumentText || "").length;
  const suspiciousFlag = tabSwitches >= 2 || pasteBlockedCount >= 2;

  return (
    <div className="space-y-10">
      {/* 1. APPLE EDITORIAL HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1.5">
          <p className="text-[13px] font-medium text-[#2563EB]">
            Tahap 05 dari 06 · Fase Action · Tanpa Bantuan Gen-AI
          </p>
          <h1 className="text-[32px] sm:text-[36px] font-semibold tracking-[-0.032em] text-[#0B1B36] leading-tight">
            Asesmen Mandiri – Analisis Regresi
          </h1>
          <p className="text-[14.5px] text-[#718096]">
            Kerjakan analisis secara mandiri. Fitur copy-paste dinonaktifkan dan
            aktivitas Anda dipantau selama asesmen.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="px-4 py-2 rounded-full bg-white border border-[#102A56]/[0.08] text-[12.5px] font-medium text-[#172033] tabular-nums">
            Pindah Tab: {tabSwitches} · Blokir Tempel: {pasteBlockedCount}
          </span>
          <Button
            variant="outline"
            size="md"
            onClick={handleToggleFullscreen}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}</span>
          </Button>
        </div>
      </div>

      {/* 2. APPLE DOUBLE-BEZEL 3-COLUMN STUDIO WORKBENCH (DATASET | ANALISIS STATISTIK | JAWABAN/ARGUMENTASI) */}
      <form onSubmit={handleSaveAssessment}>
        <div className="p-2 rounded-[28px] bg-[#102A56]/[0.04] ring-1 ring-[#102A56]/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-stretch">
            {/* KOLOM 1: DATASET */}
            <div className="lg:col-span-3 rounded-[22px] bg-white p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(16,42,86,0.03)]">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-medium text-[#718096] uppercase tracking-wider">
                    01 · Data Observasi
                  </span>
                  <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#172033] mt-0.5">
                    Dataset
                  </h2>
                </div>

                <table className="w-full text-left text-[13px] tabular-nums">
                  <thead className="text-[#718096] border-b border-[#102A56]/[0.08]">
                    <tr>
                      <th className="py-2 font-medium">X1</th>
                      <th className="py-2 font-medium">X2</th>
                      <th className="py-2 font-medium text-right">Y</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#102A56]/[0.05]">
                    {ASSESSMENT_DATASET_ROWS.map((row) => (
                      <tr key={row.id}>
                        <td className="py-2 text-[#172033]">{row.x1}</td>
                        <td className="py-2 text-[#172033]">{row.x2}</td>
                        <td className="py-2 text-right font-semibold text-[#102A56]">
                          {row.y}
                        </td>
                      </tr>
                    ))}
                    <tr className="text-[#718096]">
                      <td className="py-1.5">...</td>
                      <td className="py-1.5">...</td>
                      <td className="py-1.5 text-right">...</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-4 mt-4 border-t border-[#102A56]/[0.06] text-[12px] text-[#718096] space-y-1">
                <p>X1: Gerakan Crane · X2: Durasi Bea Cukai</p>
                <p>Y: Waktu Tunggu Kontainer (n = 60)</p>
              </div>
            </div>

            {/* KOLOM 2: ANALISIS STATISTIK */}
            <div className="lg:col-span-4 rounded-[22px] bg-white p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(16,42,86,0.03)]">
              <div className="space-y-5">
                <div>
                  <span className="text-[11px] font-medium text-[#718096] uppercase tracking-wider">
                    02 · Fasilitas Internal
                  </span>
                  <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#172033] mt-0.5">
                    Analisis Statistik
                  </h2>
                </div>

                {/* 3 Pilihan Analisis Persis Gambar 2.1 */}
                <div className="space-y-2">
                  {[
                    [
                      "Pemodelan Regresi",
                      checkedRegression,
                      setCheckedRegression,
                    ],
                    ["Uji Asumsi", checkedAssumptions, setCheckedAssumptions],
                    [
                      "Pemilihan Model",
                      checkedModelSelection,
                      setCheckedModelSelection,
                    ],
                  ].map(([label, checked, setter]) => (
                    <label
                      key={label as string}
                      className="flex items-center justify-between px-4 py-2.5 rounded-[12px] bg-[#F5F6F9] hover:bg-[#ECEFF5] transition-colors cursor-pointer"
                    >
                      <span className="text-[13.5px] font-medium text-[#172033]">
                        {label as string}
                      </span>
                      <input
                        type="checkbox"
                        checked={checked as boolean}
                        onChange={(e) =>
                          (setter as (v: boolean) => void)(e.target.checked)
                        }
                        className="w-4 h-4 accent-[#102A56]"
                      />
                    </label>
                  ))}
                </div>

                {/* Hasil Ringkas */}
                <div className="divide-y divide-[#102A56]/[0.06] text-[12.5px] tabular-nums pt-1">
                  {checkedRegression && (
                    <div className="py-3 first:pt-0">
                      <p className="font-semibold text-[#172033]">
                        Pemodelan Regresi
                      </p>
                      <p className="font-mono text-[12px] text-[#102A56] mt-0.5">
                        Ŷ = 6,40 + 1,82 X1 + 2,45 X2 + 0,19 X3
                      </p>
                      <p className="text-[#718096] mt-0.5">
                        F = 91,4 (p &lt; 0,001) · p(X1) = 0,001 · p(X2) = 0,0002
                      </p>
                    </div>
                  )}

                  {checkedAssumptions && (
                    <div className="py-3">
                      <p className="font-semibold text-[#172033]">
                        Uji Asumsi Klasik (IIDN &amp; VIF)
                      </p>
                      <p className="text-[#718096] mt-0.5">
                        VIF Maks = 1,62 · Shapiro–Wilk p = 0,54 · Breusch–Pagan
                        p = 0,39 (Terpenuhi)
                      </p>
                    </div>
                  )}

                  {checkedModelSelection && (
                    <div className="py-3 last:pb-0">
                      <p className="font-semibold text-[#172033]">
                        Pemilihan Model Terbaik
                      </p>
                      <p className="text-[#718096] mt-0.5">
                        Model B (3 Var): Adj R² = 0,820 · Cp = 3,9 (Optimal)
                      </p>
                      <p className="text-[#718096]">
                        Model C (9 Var Stepwise): Adj R² = 0,804 · Cp = 14,8
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* KOLOM 3: JAWABAN / ARGUMENTASI */}
            <div className="lg:col-span-5 rounded-[22px] bg-white p-6 sm:p-7 flex flex-col justify-between shadow-[0_1px_3px_rgba(16,42,86,0.03)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-[#718096] uppercase tracking-wider">
                      03 · Keputusan Mandiri
                    </span>
                    <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#172033] mt-0.5">
                      Jawaban / Argumentasi
                    </h2>
                  </div>
                  {form.submitted && (
                    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#16A36A]">
                      <Check className="w-3.5 h-3.5" />
                      Tersimpan
                    </span>
                  )}
                </div>

                <Textarea
                  rows={12}
                  maxLength={2000}
                  onCopy={(e) => handleBlockClipboard(e, "Salin (Copy)")}
                  onCut={(e) => handleBlockClipboard(e, "Potong (Cut)")}
                  onPaste={(e) => handleBlockClipboard(e, "Tempel (Paste)")}
                  value={form.argumentText}
                  onChange={(e) =>
                    updateSubmission("stage5IndependentAssessment", {
                      ...form,
                      argumentText: e.target.value,
                      statisticalJustification: e.target.value,
                    })
                  }
                  placeholder="Tuliskan analisis, interpretasi, dan keputusan Anda di sini ..."
                  className="text-[13.5px] leading-relaxed"
                />
              </div>

              <div className="pt-4 mt-4 border-t border-[#102A56]/[0.06] flex items-center justify-between gap-3">
                <span className="text-[12px] text-[#718096] tabular-nums">
                  {charCount}/2000
                </span>

                <div className="flex items-center gap-2.5">
                  <Button type="submit" variant="primary" size="md">
                    Simpan
                  </Button>
                  {form.submitted && (
                    <Link href="/student/portfolio">
                      <Button variant="outline" size="md" type="button">
                        <span>Portofolio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* 3. FITUR KEAMANAN DAN INTEGRITAS ASESMEN (CLEAN APPLE 3-COLUMN BAR) */}
      <Card className="p-7 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-[#102A56]/[0.06]">
          <div className="md:pr-4 space-y-1.5">
            <span className="text-[11.5px] font-medium text-[#718096]">
              01 · Proteksi Input
            </span>
            <h3 className="text-[15.5px] font-semibold text-[#172033]">
              Kolom Copy–Paste Dinonaktifkan
            </h3>
            <p className="text-[13px] text-[#718096] leading-relaxed">
              Mahasiswa tidak dapat menyalin maupun menempel teks pada seluruh
              kolom jawaban di platform.
            </p>
          </div>

          <div className="md:px-8 space-y-1.5">
            <span className="text-[11.5px] font-medium text-[#718096]">
              02 · Pemantauan Layar
            </span>
            <h3 className="text-[15.5px] font-semibold text-[#172033]">
              Pelacakan Aktivitas Tab
            </h3>
            <p className="text-[13px] text-[#718096] leading-relaxed">
              Sistem mendeteksi jika mahasiswa membuka tab atau aplikasi lain
              selama asesmen ({tabSwitches} perpindahan tercatat).
            </p>
          </div>

          <div className="md:pl-4 space-y-1.5">
            <span className="text-[11.5px] font-medium text-[#718096]">
              03 · Pelaporan Dosen
            </span>
            <h3 className="text-[15.5px] font-semibold text-[#172033]">
              Indikasi Kecurangan
            </h3>
            <p className="text-[13px] text-[#718096] leading-relaxed">
              Status integritas saat ini:{" "}
              <strong
                className={
                  suspiciousFlag ? "text-[#DC5353]" : "text-[#16A36A]"
                }
              >
                {suspiciousFlag
                  ? "Ditandai untuk peninjauan dosen"
                  : "Normal (Integritas terjaga)"}
              </strong>
              .
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
