"use client";

import React from "react";
import { StudentRecord } from "@/types";
import { Modal } from "@/components/ui/overlays";
import { ProgressBar, Button } from "@/components/ui/primitives";

const STATUS_LABELS_ID: Record<StudentRecord["status"], string> = {
  Excelling: "Sangat Baik",
  "On Track": "Sesuai Target",
  "Needs Attention": "Perlu Perhatian",
  "At Risk": "Perlu Pendampingan",
};

export function StudentDetailModal({
  student,
  onClose,
}: {
  student: StudentRecord | null;
  onClose: () => void;
}) {
  if (!student) return null;

  return (
    <Modal
      open={!!student}
      onClose={onClose}
      title={student.name}
      description={`NIM ${student.nim} · Kelas ${student.classCode} · ${
        STATUS_LABELS_ID[student.status]
      }`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* 4 Kolom Ringkasan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-5 border-b border-[#102A56]/[0.06] tabular-nums">
          <div>
            <span className="text-[11px] text-[#718096]">Tahap Saat Ini</span>
            <p className="text-[18px] font-semibold text-[#102A56] mt-0.5">
              Tahap {student.currentStage} / 6
            </p>
            <span className="text-[11px] text-[#718096]">
              {student.learningProgress}% selesai
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#718096]">
              Skor Berpikir Kritis
            </span>
            <p className="text-[18px] font-semibold text-[#172033] mt-0.5">
              {student.criticalThinkingScore} / 100
            </p>
            <span className="text-[11px] text-[#16A36A] font-medium">
              N-Gain +{student.nGain}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#718096]">Pre → Post Test</span>
            <p className="text-[18px] font-semibold text-[#172033] mt-0.5">
              {student.preTestScore} → {student.postTestScore}
            </p>
            <span className="text-[11px] text-[#718096]">
              +{student.postTestScore - student.preTestScore} poin
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#718096]">Dialog Sokratik</span>
            <p className="text-[18px] font-semibold text-[#172033] mt-0.5">
              {student.dialogueTurns} giliran
            </p>
            <span className="text-[11px] text-[#718096]">
              {student.tabSwitchesInAssessment} pindah tab
            </span>
          </div>
        </div>

        {/* Profil 6 Dimensi Facione */}
        <div className="space-y-3">
          <h4 className="text-[13px] font-semibold text-[#172033]">
            Profil Indikator Berpikir Kritis (Facione, 1990)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {(
              [
                ["Interpretasi", student.facione.interpretation],
                ["Analisis", student.facione.analysis],
                ["Evaluasi (Audit AI)", student.facione.evaluation],
                ["Inferensi", student.facione.inference],
                ["Eksplanasi", student.facione.explanation],
                ["Regulasi Diri", student.facione.selfRegulation],
              ] as const
            ).map(([label, val]) => (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-[12px] tabular-nums">
                  <span className="text-[#172033] font-medium">{label}</span>
                  <span className="text-[#718096]">{val}%</span>
                </div>
                <ProgressBar value={val} variant="navy" size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan Penalaran & Refleksi */}
        <div className="space-y-3 pt-2 border-t border-[#102A56]/[0.06] text-[12.5px]">
          <div>
            <span className="text-[11px] font-medium text-[#718096]">
              Tahap 1 · Argumentasi Awal Mandiri (Trigger)
            </span>
            <p className="text-[#172033] mt-0.5 leading-relaxed">
              {student.initialResponseSummary}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-medium text-[#2563EB]">
              Tahap 3 · Refleksi Antara (Reflection)
            </span>
            <p className="text-[#172033] mt-0.5 leading-relaxed">
              {student.intermediateReflectionSummary}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-medium text-[#16A36A]">
              Tahap 6 · Refleksi Akhir &amp; Integrasi (Integration)
            </span>
            <p className="text-[#172033] mt-0.5 leading-relaxed">
              {student.finalReflectionSummary}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" size="sm" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
}
