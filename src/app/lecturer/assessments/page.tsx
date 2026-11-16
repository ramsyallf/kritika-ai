"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { StudentRecord } from "@/types";
import {
  Card,
  Button,
  Input,
  ProgressBar,
} from "@/components/ui/primitives";
import { useToast } from "@/components/ui/overlays";

export default function LecturerAssessmentsPage() {
  const { students, updateStudentScore } = useAppStore();
  const { notify } = useToast();

  const [selectedStudent, setSelectedStudent] = useState<StudentRecord>(
    students[0]
  );
  const [scoreInput, setScoreInput] = useState<number>(
    students[0].assessmentScore
  );
  const [ctInput, setCtInput] = useState<number>(
    students[0].criticalThinkingScore
  );

  const handleSelectStudent = (s: StudentRecord) => {
    setSelectedStudent(s);
    setScoreInput(s.assessmentScore);
    setCtInput(s.criticalThinkingScore);
  };

  const handleSaveEvaluation = () => {
    updateStudentScore(selectedStudent.id, scoreInput, ctInput);
    notify({
      title: `Penilaian untuk ${selectedStudent.name} berhasil disimpan`,
      variant: "success",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[12.5px] font-medium text-[#718096]">
          Penilaian Rubrik &amp; Tinjauan Refleksi · Bobot 20% / 20% / 20% / 40%
        </p>
        <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
          Hasil Asesmen &amp; Rubrik Berpikir Kritis
        </h1>
      </div>

      {/* Ringkasan 4 Komponen Penilaian Proposal */}
      <Card className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x divide-[#102A56]/[0.06] tabular-nums">
          <div className="lg:pr-4">
            <span className="text-[11.5px] text-[#718096]">
              Tahap 1–2 · Bobot 20%
            </span>
            <p className="text-[24px] font-semibold text-[#172033] mt-1">
              82,4
            </p>
            <span className="text-[12px] text-[#718096]">
              Argumentasi Awal &amp; Dialog AI
            </span>
          </div>

          <div className="lg:px-6">
            <span className="text-[11.5px] text-[#718096]">
              Tahap 3 &amp; 6 · Bobot 20%
            </span>
            <p className="text-[24px] font-semibold text-[#172033] mt-1">
              81,0
            </p>
            <span className="text-[12px] text-[#718096]">
              Refleksi Antara &amp; Akhir
            </span>
          </div>

          <div className="lg:px-6">
            <span className="text-[11.5px] text-[#718096]">
              Tahap 4 · Bobot 20%
            </span>
            <p className="text-[24px] font-semibold text-[#172033] mt-1">
              83,5
            </p>
            <span className="text-[12px] text-[#718096]">
              Implementasi Kasus Baru
            </span>
          </div>

          <div className="lg:pl-6">
            <span className="text-[11.5px] text-[#2563EB] font-medium">
              Tahap 5 (Tanpa AI) · Bobot 40%
            </span>
            <p className="text-[24px] font-semibold text-[#102A56] mt-1">
              79,8
            </p>
            <span className="text-[12px] text-[#718096]">
              Asesmen Mandiri Sumatif
            </span>
          </div>
        </div>
      </Card>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <Card className="lg:col-span-6 p-6">
          <h3 className="text-[16px] font-semibold text-[#172033] mb-4">
            Daftar Nilai Mahasiswa (n = 40)
          </h3>
          <div className="overflow-x-auto max-h-[560px]">
            <table className="w-full text-left text-[13px] tabular-nums">
              <thead className="text-[#718096] border-b border-[#102A56]/[0.07] sticky top-0 bg-white">
                <tr>
                  <th className="py-2.5 pr-3 font-medium">Mahasiswa</th>
                  <th className="py-2.5 px-3 font-medium text-right">
                    Pre → Post
                  </th>
                  <th className="py-2.5 px-3 font-medium text-right">N-Gain</th>
                  <th className="py-2.5 pl-3 font-medium text-right">Nilai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#102A56]/[0.05]">
                {students.map((s) => {
                  const active = selectedStudent.id === s.id;
                  return (
                    <tr
                      key={s.id}
                      onClick={() => handleSelectStudent(s)}
                      className={`cursor-pointer transition-colors ${
                        active ? "bg-[#EAF2FF]/60" : "hover:bg-[#F7F9FC]"
                      }`}
                    >
                      <td className="py-2.5 pr-3">
                        <p className="font-medium text-[#172033]">{s.name}</p>
                        <p className="text-[11px] text-[#718096]">NIM {s.nim}</p>
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#718096]">
                        {s.preTestScore} →{" "}
                        <span className="text-[#172033] font-medium">
                          {s.postTestScore}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#16A36A] font-medium">
                        +{s.nGain}
                      </td>
                      <td className="py-2.5 pl-3 text-right font-semibold text-[#102A56]">
                        {s.assessmentScore}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Tinjauan Rubrik & Refleksi */}
        <Card className="lg:col-span-6 p-6 space-y-6">
          <div className="border-b border-[#102A56]/[0.06] pb-4 flex items-baseline justify-between">
            <div>
              <h3 className="text-[18px] font-semibold text-[#172033]">
                {selectedStudent.name}
              </h3>
              <p className="text-[12px] text-[#718096]">
                NIM {selectedStudent.nim} · Perpindahan Tab Asesmen:{" "}
                {selectedStudent.tabSwitchesInAssessment} kali
              </p>
            </div>
            <span className="text-[12px] font-medium text-[#2563EB]">
              Tahap {selectedStudent.currentStage}/6
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-[12.5px] font-semibold text-[#172033]">
              Rubrik Berpikir Kritis (Enam Dimensi Facione)
            </h4>
            {(
              [
                ["Interpretasi", selectedStudent.facione.interpretation],
                ["Analisis", selectedStudent.facione.analysis],
                ["Evaluasi (Audit Argumen AI)", selectedStudent.facione.evaluation],
                ["Inferensi", selectedStudent.facione.inference],
                ["Eksplanasi", selectedStudent.facione.explanation],
                ["Regulasi Diri", selectedStudent.facione.selfRegulation],
              ] as const
            ).map(([dim, val]) => (
              <div key={dim} className="space-y-1">
                <div className="flex justify-between text-[12px] tabular-nums">
                  <span className="text-[#172033]">{dim}</span>
                  <span className="text-[#718096]">{val}%</span>
                </div>
                <ProgressBar value={val} variant="navy" size="sm" />
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2 border-t border-[#102A56]/[0.06] text-[12.5px]">
            <div>
              <span className="text-[11px] font-medium text-[#718096]">
                Refleksi Antara (Tahap 3)
              </span>
              <p className="text-[#172033] mt-0.5 leading-relaxed">
                {selectedStudent.intermediateReflectionSummary}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-medium text-[#718096]">
                Refleksi Akhir &amp; Integrasi (Tahap 6)
              </span>
              <p className="text-[#172033] mt-0.5 leading-relaxed">
                {selectedStudent.finalReflectionSummary}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#102A56]/[0.06] space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11.5px] font-medium text-[#172033] mb-1">
                  Nilai Asesmen Akhir
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={scoreInput}
                  onChange={(e) => setScoreInput(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-[11.5px] font-medium text-[#172033] mb-1">
                  Skor Berpikir Kritis
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={ctInput}
                  onChange={(e) => setCtInput(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveEvaluation}
              >
                Simpan Penilaian Rubrik
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
