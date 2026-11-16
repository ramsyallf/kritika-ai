"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { StudentRecord } from "@/types";
import { StudentDetailModal } from "@/components/shared/student-detail-modal";
import {
  Card,
  Button,
  Input,
  Select,
  ProgressBar,
} from "@/components/ui/primitives";
import { Search } from "lucide-react";

const STATUS_LABELS_ID: Record<StudentRecord["status"], string> = {
  Excelling: "Sangat Baik",
  "On Track": "Sesuai Target",
  "Needs Attention": "Perlu Perhatian",
  "At Risk": "Perlu Pendampingan",
};

export default function LecturerStudentsPage() {
  const { students } = useAppStore();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord>(
    students[0]
  );
  const [modalStudent, setModalStudent] = useState<StudentRecord | null>(null);

  const filtered = students.filter((s) => {
    const matchName =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.nim.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "ALL" || s.classCode === classFilter;
    const matchStage =
      stageFilter === "ALL" || s.currentStage === Number(stageFilter);
    return matchName && matchClass && matchStage;
  });

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[12.5px] font-medium text-[#718096]">
          Progres Individu &amp; Linimasa Aktivitas · n = 40 Mahasiswa
        </p>
        <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
          Pemantauan Mahasiswa
        </h1>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="w-3.5 h-3.5 text-[#718096] absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Cari nama mahasiswa atau NIM…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="md:col-span-3">
            <Select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="ALL">Semua Kelas (40)</option>
              <option value="ALT-2204-A">Kelas ALT-2204-A (20)</option>
              <option value="ALT-2204-B">Kelas ALT-2204-B (20)</option>
            </Select>
          </div>
          <div className="md:col-span-3">
            <Select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
            >
              <option value="ALL">Semua Tahapan (1–6)</option>
              <option value="1">Tahap 1: Pemicu Kritis</option>
              <option value="2">Tahap 2: Dialog &amp; Investigasi AI</option>
              <option value="3">Tahap 3: Refleksi Antara</option>
              <option value="4">Tahap 4: Tantangan Kasus Baru</option>
              <option value="5">Tahap 5: Asesmen Mandiri</option>
              <option value="6">Tahap 6: Refleksi Akhir</option>
            </Select>
          </div>
        </div>
      </Card>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <Card className="lg:col-span-7 p-6">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="text-[16px] font-semibold text-[#172033]">
              Daftar Mahasiswa ({filtered.length})
            </h3>
            <span className="text-[12px] text-[#718096]">Data Sampel</span>
          </div>

          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full text-left text-[13px] tabular-nums">
              <thead className="text-[#718096] border-b border-[#102A56]/[0.07] sticky top-0 bg-white">
                <tr>
                  <th className="py-2.5 pr-3 font-medium">Mahasiswa</th>
                  <th className="py-2.5 px-3 font-medium">Tahap</th>
                  <th className="py-2.5 px-3 font-medium">Progres</th>
                  <th className="py-2.5 pl-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#102A56]/[0.05]">
                {filtered.map((s) => {
                  const active = selectedStudent.id === s.id;
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedStudent(s)}
                      className={`cursor-pointer transition-colors ${
                        active ? "bg-[#EAF2FF]/60" : "hover:bg-[#F7F9FC]"
                      }`}
                    >
                      <td className="py-3 pr-3">
                        <p className="font-medium text-[#172033]">{s.name}</p>
                        <p className="text-[11px] text-[#718096]">
                          NIM {s.nim} · {s.classCode}
                        </p>
                      </td>
                      <td className="py-3 px-3 text-[#718096]">
                        Tahap {s.currentStage}/6
                      </td>
                      <td className="py-3 px-3 w-28">
                        <ProgressBar
                          value={s.learningProgress}
                          variant="navy"
                          size="sm"
                        />
                      </td>
                      <td className="py-3 pl-3 text-[12px] text-[#172033]">
                        {STATUS_LABELS_ID[s.status]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Panel Kanan: Detail Mahasiswa */}
        <Card className="lg:col-span-5 p-6 space-y-6">
          <div className="border-b border-[#102A56]/[0.06] pb-4">
            <div className="flex items-center justify-between text-[11.5px] text-[#718096]">
              <span>Kelas {selectedStudent.classCode}</span>
              <span>Aktif {selectedStudent.lastActivity}</span>
            </div>
            <h3 className="text-[19px] font-semibold text-[#172033] mt-1">
              {selectedStudent.name}
            </h3>
            <p className="text-[12px] text-[#718096] mt-0.5">
              NIM {selectedStudent.nim} · {selectedStudent.email}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 tabular-nums">
            <div>
              <span className="text-[11px] text-[#718096]">Progres</span>
              <p className="text-[20px] font-semibold text-[#102A56]">
                {selectedStudent.learningProgress}%
              </p>
            </div>
            <div>
              <span className="text-[11px] text-[#718096]">Skor Kritis</span>
              <p className="text-[20px] font-semibold text-[#172033]">
                {selectedStudent.criticalThinkingScore}
              </p>
            </div>
            <div>
              <span className="text-[11px] text-[#718096]">N-Gain</span>
              <p className="text-[20px] font-semibold text-[#16A36A]">
                +{selectedStudent.nGain}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#102A56]/[0.06]">
            <h4 className="text-[13px] font-semibold text-[#172033]">
              Linimasa Aktivitas 6 Sintaks KRITIKA AI
            </h4>
            <div className="space-y-3 border-l border-[#102A56]/15 ml-1.5 pl-4">
              {[1, 2, 3, 4, 5, 6].map((stNum) => {
                const done =
                  stNum < selectedStudent.currentStage ||
                  selectedStudent.learningProgress === 100;
                const active =
                  stNum === selectedStudent.currentStage &&
                  selectedStudent.learningProgress < 100;
                const titles = [
                  "Tahap 1 (K–R): Menyusun Argumentasi Awal Mandiri",
                  `Tahap 2 (I): ${selectedStudent.dialogueTurns} Giliran Dialog AI Mentor`,
                  "Tahap 3 (T): Menyimpan Refleksi Antara",
                  "Tahap 4 (I): Analisis Kasus Baru di Workspace",
                  `Tahap 5 (K): Asesmen Mandiri (${selectedStudent.tabSwitchesInAssessment} pindah tab)`,
                  "Tahap 6 (A): Portofolio Refleksi Akhir",
                ];
                return (
                  <div key={stNum} className="relative">
                    <span
                      className={`w-2 h-2 rounded-full absolute -left-[20.5px] top-1.5 ${
                        done
                          ? "bg-[#102A56]"
                          : active
                          ? "bg-[#2563EB]"
                          : "bg-[#102A56]/15"
                      }`}
                    />
                    <p
                      className={`text-[12.5px] font-medium ${
                        done || active ? "text-[#172033]" : "text-[#718096]"
                      }`}
                    >
                      {titles[stNum - 1]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={() => setModalStudent(selectedStudent)}
          >
            Buka Profil Lengkap &amp; Refleksi
          </Button>
        </Card>
      </div>

      <StudentDetailModal
        student={modalStudent}
        onClose={() => setModalStudent(null)}
      />
    </div>
  );
}
