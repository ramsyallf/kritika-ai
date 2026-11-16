"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import {
  CURRENT_COURSE,
  EXPECTED_IMPACTS_DIMENSIONS,
  PLATFORM_ROLES_SUMMARY,
  INTEGRITY_FEATURES_SUMMARY,
} from "@/mock-data/courses";
import {
  Card,
  Button,
  ProgressBar,
} from "@/components/ui/primitives";
import { useToast } from "@/components/ui/overlays";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Lock,
} from "lucide-react";
import { StageStatus, TransformativePhase } from "@/types";

const PHASE_META: Record<
  TransformativePhase,
  { label: string; stepRange: string }
> = {
  Trigger: { label: "Fase 1 · Trigger (Pemicu)", stepRange: "Sintaks 01" },
  Reflection: {
    label: "Fase 2 · Reflection (Refleksi)",
    stepRange: "Sintaks 02–03",
  },
  Action: { label: "Fase 3 · Action (Aksi)", stepRange: "Sintaks 04–05" },
  Integration: {
    label: "Fase 4 · Integration (Integrasi)",
    stepRange: "Sintaks 06",
  },
};

function QuietStatus({ status }: { status: StageStatus }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#16A36A]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]" />
        Selesai
      </span>
    );
  }
  if (status === "In Progress") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#2563EB]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
        Aktif
      </span>
    );
  }
  if (status === "Available") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#102A56]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E9A23B]" />
        Tersedia
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[12px] text-[#718096]">
      <Lock className="w-3 h-3" />
      Terkunci
    </span>
  );
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const { stages } = useAppStore();
  const { notify } = useToast();

  const [phaseFilter, setPhaseFilter] = useState<string>("ALL");

  const completedCount = stages.filter((s) => s.status === "Completed").length;
  const activeStage =
    stages.find((s) => s.status === "In Progress") ||
    stages.find((s) => s.status === "Available") ||
    stages[3];

  const overallPct = Math.round(
    stages.reduce((acc, s) => acc + s.progress, 0) / stages.length
  );

  const handleStageNavigate = (stage: (typeof stages)[0]) => {
    if (stage.status === "Locked") {
      notify({
        title: `Tahap ${stage.stageNumber} masih terkunci`,
        description:
          "Selesaikan Tahap 5 (Asesmen Mandiri Tanpa Gen-AI) terlebih dahulu untuk membuka Refleksi Akhir.",
        variant: "warning",
      });
      return;
    }
    router.push(stage.route);
  };

  const visibleStages =
    phaseFilter === "ALL"
      ? stages
      : stages.filter((s) => s.transformativePhase === phaseFilter);

  return (
    <div className="space-y-12">
      {/* 1. APPLE EDITORIAL HERO */}
      <section className="pt-2 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-[13px] font-medium text-[#2563EB] tracking-[-0.01em]">
            {CURRENT_COURSE.code} · {CURRENT_COURSE.name} ·{" "}
            {CURRENT_COURSE.semester}
          </p>
          <h1 className="text-[34px] sm:text-[42px] font-semibold tracking-[-0.036em] text-[#0B1B36] leading-[1.08]">
            Berpikir kritis. Bukan sekadar menghitung.
          </h1>
          <p className="text-[15px] text-[#718096] leading-relaxed pt-1">
            {CURRENT_COURSE.topic} bersama{" "}
            <span className="text-[#172033] font-medium">
              {CURRENT_COURSE.leadLecturer}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/student/mentor">
            <Button variant="outline" size="lg">
              Dialog AI Mentor
            </Button>
          </Link>
          <Link href="/student/assessment">
            <Button variant="primary" size="lg">
              <span>Asesmen Mandiri</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. ASYMMETRIC APPLE BENTO SPOTLIGHT (7 COLS + 5 COLS) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Deep Navy Sculptural Card (Active Stage & Mastery) */}
        <div className="lg:col-span-7 rounded-[26px] bg-[#0B1B36] text-white p-8 sm:p-10 flex flex-col justify-between shadow-[0_20px_50px_-15px_rgba(11,27,54,0.35)]">
          <div className="space-y-6">
            <div className="flex items-center justify-between text-[12.5px] text-white/65">
              <span>
                Tahap Aktif · 0{activeStage.stageNumber} dari 06 (
                {activeStage.kritikaCode})
              </span>
              <span className="px-3 py-0.5 rounded-full bg-white/10 text-white font-medium">
                {PHASE_META[activeStage.transformativePhase].label}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.028em] text-white leading-tight">
                {activeStage.title}
              </h2>
              <p className="text-[14.5px] text-white/70 leading-relaxed max-w-xl">
                {activeStage.description}
              </p>
            </div>
          </div>

          <div className="mt-10 pt-7 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2 flex-1 max-w-xs">
              <div className="flex items-baseline justify-between tabular-nums">
                <span className="text-[12px] text-white/60">
                  Progres Siklus KRITIKA AI ({completedCount}/6 selesai)
                </span>
                <span className="text-[20px] font-semibold text-white">
                  {overallPct}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#4F8CFF] transition-all duration-700"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleStageNavigate(activeStage)}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white text-[#0B1B36] hover:bg-[#EAF2FF] text-[13.5px] font-semibold transition-all cursor-pointer active:scale-[0.98] shrink-0"
            >
              <span>{activeStage.actionLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Clean White Squircle (5 Dimensi Dampak yang Diharapkan) */}
        <Card className="lg:col-span-5 p-8 sm:p-9 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-[12px] font-medium text-[#718096]">
                  Dampak yang Diharapkan
                </p>
                <h3 className="text-[20px] font-semibold tracking-[-0.022em] text-[#172033] mt-0.5">
                  Indeks Berpikir Kritis
                </h3>
              </div>
              <span className="text-[32px] font-semibold tracking-[-0.035em] text-[#102A56] tabular-nums leading-none">
                82,4
              </span>
            </div>

            <div className="mt-7 space-y-4">
              {EXPECTED_IMPACTS_DIMENSIONS.map((dim) => (
                <div key={dim.key} className="space-y-1.5">
                  <div className="flex items-baseline justify-between text-[13px] tabular-nums">
                    <span className="font-medium text-[#172033]">
                      {dim.title}
                    </span>
                    <span className="text-[#718096]">{dim.score}%</span>
                  </div>
                  <ProgressBar value={dim.score} variant="navy" size="sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-[#102A56]/[0.06] flex items-center justify-between text-[12.5px]">
            <span className="text-[#718096]">Normalized Gain +0,58</span>
            <Link
              href="/student/portfolio"
              className="font-medium text-[#2563EB] hover:text-[#102A56] transition-colors inline-flex items-center gap-1"
            >
              <span>Portofolio Refleksi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>
      </section>

      {/* 3. ENAM SINTAKS DALAM EMPAT FASE PEMBELAJARAN TRANSFORMATIF */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[12.5px] font-medium text-[#718096]">
              Alur Metodologi KRITIKA AI
            </p>
            <h2 className="text-[24px] font-semibold tracking-[-0.026em] text-[#0B1B36] mt-0.5">
              Enam Sintaks dalam Empat Fase Transformatif
            </h2>
          </div>

          {/* Apple Segmented Phase Picker */}
          <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full bg-[#102A56]/[0.05]">
            {[
              ["ALL", "Semua Fase (6)"],
              ["Trigger", "1 · Trigger"],
              ["Reflection", "2 · Reflection"],
              ["Action", "3 · Action"],
              ["Integration", "4 · Integration"],
            ].map(([val, label]) => {
              const active = phaseFilter === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPhaseFilter(val)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                    active
                      ? "bg-white text-[#102A56] font-semibold shadow-[0_1px_3px_rgba(16,42,86,0.1)]"
                      : "text-[#718096] hover:text-[#172033]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spacious 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleStages.map((stage) => {
            const isLocked = stage.status === "Locked";
            const isCurrent = stage.status === "In Progress";

            return (
              <Card
                key={stage.stageNumber}
                onClick={() => handleStageNavigate(stage)}
                className={`p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isCurrent
                    ? "ring-2 ring-[#2563EB] shadow-[0_12px_36px_-8px_rgba(37,99,235,0.14)] cursor-pointer"
                    : isLocked
                    ? "opacity-60 bg-white/60 cursor-not-allowed"
                    : "hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(16,42,86,0.08)] cursor-pointer"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Numeral & Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#718096] tabular-nums">
                      0{stage.stageNumber} ·{" "}
                      {PHASE_META[stage.transformativePhase].label}
                    </span>
                    <QuietStatus status={stage.status} />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-[19px] font-semibold tracking-[-0.022em] text-[#172033]">
                      {stage.title}
                    </h3>
                    <p className="text-[13.5px] text-[#718096] mt-2 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Specific Guided Checklist for Stage 3 & Stage 6 from Gambar 2.1 */}
                  {stage.stageNumber === 3 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {[
                        "Asumsi awal?",
                        "Temuan baru?",
                        "Perubahan pemahaman?",
                      ].map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F6F9] text-[11.5px] font-medium text-[#172033]"
                        >
                          <Check className="w-3 h-3 text-[#16A36A]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {stage.stageNumber === 6 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {[
                        "Perubahan perspektif",
                        "Prinsip yang diperoleh",
                        "Strategi ke depan",
                        "Transfer pembelajaran",
                      ].map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F6F9] text-[11.5px] font-medium text-[#172033]"
                        >
                          <Check className="w-3 h-3 text-[#16A36A]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pin-Aligned Bottom Action */}
                <div className="mt-8 pt-5 border-t border-[#102A56]/[0.06] flex items-center justify-between">
                  <span
                    className={`text-[13px] font-semibold inline-flex items-center gap-1.5 ${
                      isCurrent
                        ? "text-[#2563EB]"
                        : isLocked
                        ? "text-[#718096]"
                        : "text-[#102A56]"
                    }`}
                  >
                    <span>{stage.actionLabel}</span>
                    {!isLocked && <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                  <span className="text-[12px] text-[#718096] tabular-nums">
                    {stage.progress}%
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 4. DUA KARTU BENTO BAWAH: PERAN PLATFORM & FITUR KEAMANAN INTEGRITAS ASESMEN */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-5 p-8 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <p className="text-[12px] font-medium text-[#718096]">
                Sistem Pendukung Pembelajaran
              </p>
              <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-[#172033] mt-0.5">
                Peran Platform KRITIKA AI
              </h3>
            </div>

            <div className="divide-y divide-[#102A56]/[0.06]">
              {PLATFORM_ROLES_SUMMARY.map((roleText, i) => (
                <div
                  key={i}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3 text-[13.5px] text-[#172033]"
                >
                  <Check className="w-4 h-4 text-[#16A36A] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{roleText}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-7 p-8 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium text-[#718096]">
                  Transparansi Akademik Tahap 5
                </p>
                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-[#172033] mt-0.5">
                  Fitur Keamanan dan Integritas Asesmen Mandiri
                </h3>
              </div>
              <Link
                href="/student/assessment"
                className="text-[13px] font-medium text-[#2563EB] hover:text-[#102A56] transition-colors shrink-0"
              >
                Buka Asesmen →
              </Link>
            </div>

            <div className="divide-y divide-[#102A56]/[0.06]">
              {INTEGRITY_FEATURES_SUMMARY.map((feat, idx) => (
                <div
                  key={feat.title}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <span className="text-[14px] font-semibold text-[#172033] sm:w-60 shrink-0">
                    0{idx + 1} · {feat.title}
                  </span>
                  <span className="text-[13px] text-[#718096] leading-relaxed flex-1">
                    {feat.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
