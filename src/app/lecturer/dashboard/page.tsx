"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import {
  LECTURER_KPI_OVERVIEW,
  PROGRESS_OVER_TIME_DATA,
  STAGE_COMPLETION_CHART_DATA,
} from "@/mock-data/lecturer-data";
import { StudentRecord } from "@/types";
import { StudentDetailModal } from "@/components/shared/student-detail-modal";
import {
  Card,
  Button,
  Input,
  Select,
  ProgressBar,
} from "@/components/ui/primitives";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import {
  Search,
  ChevronRight,
} from "lucide-react";

const STATUS_LABELS_ID: Record<StudentRecord["status"], string> = {
  Excelling: "Sangat Baik",
  "On Track": "Sesuai Target",
  "Needs Attention": "Perlu Perhatian",
  "At Risk": "Perlu Pendampingan",
};

function StatusDot({ status }: { status: StudentRecord["status"] }) {
  const color =
    status === "Excelling"
      ? "bg-[#16A36A]"
      : status === "On Track"
      ? "bg-[#2563EB]"
      : status === "Needs Attention"
      ? "bg-[#E9A23B]"
      : "bg-[#DC5353]";
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px] text-[#172033]">
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
      <span>{STATUS_LABELS_ID[status]}</span>
    </span>
  );
}

export default function LecturerDashboardPage() {
  const { students } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(
    null
  );

  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.nim.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || st.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header & Aksi Cepat */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-[12.5px] font-medium text-[#718096]">
            Dr. Iis Dewi Ratih, S.Si., M.Si. · Metode Regresi (ALT-2204) · ITS
          </p>
          <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
            Dashboard Dosen Pengampu
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/lecturer/classes">
            <Button variant="outline" size="sm">
              Kelola Kelas
            </Button>
          </Link>
          <Link href="/lecturer/cases">
            <Button variant="outline" size="sm">
              Buat Kasus AI
            </Button>
          </Link>
          <Link href="/lecturer/assessments">
            <Button variant="outline" size="sm">
              Tinjau Asesmen
            </Button>
          </Link>
          <Link href="/lecturer/students">
            <Button variant="primary" size="sm">
              Pantau Progres Mahasiswa
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. RINGKASAN 4 METRIK UTAMA */}
      <Card className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x divide-[#102A56]/[0.06]">
          <div className="lg:pr-4">
            <span className="text-[12px] text-[#718096]">Total Mahasiswa</span>
            <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#172033] tabular-nums mt-1 leading-none">
              {LECTURER_KPI_OVERVIEW.totalStudents}
            </p>
            <p className="text-[11.5px] text-[#718096] mt-2">
              Kelas ALT-2204 A &amp; B
            </p>
          </div>

          <div className="lg:px-6">
            <span className="text-[12px] text-[#718096]">
              Sesi Pembelajaran Aktif
            </span>
            <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#172033] tabular-nums mt-1 leading-none">
              {LECTURER_KPI_OVERVIEW.activeLearningSessions}
            </p>
            <p className="text-[11.5px] text-[#16A36A] font-medium mt-2">
              85% aktif pada Dialog &amp; Workspace
            </p>
          </div>

          <div className="lg:px-6">
            <span className="text-[12px] text-[#718096]">
              Rata-rata Progres Belajar
            </span>
            <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#2563EB] tabular-nums mt-1 leading-none">
              {LECTURER_KPI_OVERVIEW.averageLearningProgress}%
            </p>
            <ProgressBar
              value={LECTURER_KPI_OVERVIEW.averageLearningProgress}
              size="sm"
              className="mt-2.5"
            />
          </div>

          <div className="lg:pl-6">
            <span className="text-[12px] text-[#718096]">
              Skor Berpikir Kritis
            </span>
            <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#102A56] tabular-nums mt-1 leading-none">
              {LECTURER_KPI_OVERVIEW.criticalThinkingScore}
              <span className="text-[15px] font-normal text-[#718096] ml-1">
                / 100
              </span>
            </p>
            <p className="text-[11.5px] text-[#16A36A] font-medium mt-2">
              Rata-rata N-Gain +{LECTURER_KPI_OVERVIEW.averageNGain}
            </p>
          </div>
        </div>
      </Card>

      {/* 2. GRAFIK ANALITIK PEMBELAJARAN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7 p-6">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h3 className="text-[16px] font-semibold text-[#172033]">
                Perkembangan Berpikir Kritis &amp; Kualitas Dialog dari Waktu ke Waktu
              </h3>
              <p className="text-[12.5px] text-[#718096]">
                Tren mingguan melintasi fase Trigger, Reflection, Action, dan
                Integration
              </p>
            </div>
            <span className="text-[12px] text-[#718096] tabular-nums">
              n = 40
            </span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={PROGRESS_OVER_TIME_DATA}
                margin={{ top: 10, right: 16, bottom: 5, left: -12 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(16,42,86,0.06)"
                />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11.5, fill: "#718096" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11.5, fill: "#718096" }}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "10px",
                    borderColor: "rgba(16,42,86,0.08)",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  name="Skor Berpikir Kritis"
                  type="monotone"
                  dataKey="criticalThinking"
                  stroke="#102A56"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#102A56" }}
                />
                <Line
                  name="Kualitas Dialog Sokratik"
                  type="monotone"
                  dataKey="dialogueQuality"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#2563EB" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-5 p-6">
          <div className="mb-4">
            <h3 className="text-[16px] font-semibold text-[#172033]">
              Tingkat Penyelesaian 6 Sintaks KRITIKA AI
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Jumlah mahasiswa yang menyelesaikan setiap tahap (dari 40)
            </p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={STAGE_COMPLETION_CHART_DATA}
                layout="vertical"
                margin={{ top: 5, right: 16, bottom: 5, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(16,42,86,0.06)"
                />
                <XAxis
                  type="number"
                  domain={[0, 40]}
                  tick={{ fontSize: 11.5, fill: "#718096" }}
                />
                <YAxis
                  type="category"
                  dataKey="code"
                  tick={{ fontSize: 11.5, fill: "#102A56", fontWeight: 600 }}
                  width={40}
                />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "10px",
                    borderColor: "rgba(16,42,86,0.08)",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  name="Mahasiswa Selesai"
                  dataKey="completed"
                  fill="#102A56"
                  radius={[0, 5, 5, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 3. TABEL PEMANTAUAN 40 MAHASISWA */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-[17px] font-semibold text-[#172033]">
              Tabel Pemantauan Mahasiswa (40 Mahasiswa)
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Klik baris mahasiswa mana pun untuk melihat profil Facione dan
              riwayat refleksinya.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative w-60">
              <Search className="w-3.5 h-3.5 text-[#718096] absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Cari nama atau NIM…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-44"
            >
              <option value="ALL">Semua Status (40)</option>
              <option value="Excelling">Sangat Baik</option>
              <option value="On Track">Sesuai Target</option>
              <option value="Needs Attention">Perlu Perhatian</option>
              <option value="At Risk">Perlu Pendampingan</option>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] tabular-nums">
            <thead className="text-[#718096] border-b border-[#102A56]/[0.07]">
              <tr>
                <th className="py-2.5 pr-4 font-medium">Nama Mahasiswa</th>
                <th className="py-2.5 px-4 font-medium">NIM (Sampel)</th>
                <th className="py-2.5 px-4 font-medium">Tahap Saat Ini</th>
                <th className="py-2.5 px-4 font-medium">Progres Belajar</th>
                <th className="py-2.5 px-4 font-medium text-right">Nilai</th>
                <th className="py-2.5 px-4 font-medium">Aktivitas Terakhir</th>
                <th className="py-2.5 pl-4 font-medium">Status</th>
                <th className="py-2.5 pl-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#102A56]/[0.05]">
              {filteredStudents.map((st) => (
                <tr
                  key={st.id}
                  onClick={() => setSelectedStudent(st)}
                  className="hover:bg-[#F7F9FC] transition-colors cursor-pointer group"
                >
                  <td className="py-3 pr-4">
                    <span className="font-medium text-[#172033] group-hover:text-[#2563EB] transition-colors">
                      {st.name}
                    </span>
                    <span className="text-[11.5px] text-[#718096] ml-2">
                      {st.classCode}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#718096] font-mono text-[12px]">
                    {st.nim}
                  </td>
                  <td className="py-3 px-4 text-[#172033]">
                    {st.currentStageTitle}
                  </td>
                  <td className="py-3 px-4 w-40">
                    <div className="flex items-center gap-2.5">
                      <ProgressBar
                        value={st.learningProgress}
                        variant="navy"
                        size="sm"
                      />
                      <span className="text-[12px] text-[#718096] w-8 text-right">
                        {st.learningProgress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-[#102A56]">
                    {st.assessmentScore}
                  </td>
                  <td className="py-3 px-4 text-[#718096] text-[12.5px]">
                    {st.lastActivity}
                  </td>
                  <td className="py-3 pl-4">
                    <StatusDot status={st.status} />
                  </td>
                  <td className="py-3 pl-2 text-right">
                    <ChevronRight className="w-4 h-4 text-[#718096]/50 group-hover:text-[#172033] inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <StudentDetailModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
