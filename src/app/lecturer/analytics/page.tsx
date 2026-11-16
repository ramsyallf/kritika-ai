"use client";

import React from "react";
import {
  PROGRESS_OVER_TIME_DATA,
  STAGE_COMPLETION_CHART_DATA,
  ASSESSMENT_TREND_DATA,
  LECTURER_KPI_OVERVIEW,
} from "@/mock-data/lecturer-data";
import {
  Card,
  ProgressBar,
} from "@/components/ui/primitives";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

export default function LecturerAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[12.5px] font-medium text-[#718096]">
          Evaluasi Program SATRIA · Perbandingan Pre-Test vs. Post-Test &amp;
          N-Gain
        </p>
        <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
          Analitik Pembelajaran &amp; Berpikir Kritis
        </h1>
      </div>

      {/* 4 Indikator Keberhasilan Program */}
      <Card className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x divide-[#102A56]/[0.06] tabular-nums">
          <div className="lg:pr-4">
            <span className="text-[12px] text-[#718096]">
              Rata-rata Normalized Gain
            </span>
            <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#102A56] mt-1 leading-none">
              +{LECTURER_KPI_OVERVIEW.averageNGain}
            </p>
            <p className="text-[11.5px] text-[#16A36A] font-medium mt-2">
              Target ≥ 0,30 tercapai
            </p>
          </div>

          <div className="lg:px-6">
            <span className="text-[12px] text-[#718096]">
              Identifikasi Kekeliruan AI
            </span>
            <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#2563EB] mt-1 leading-none">
              {LECTURER_KPI_OVERVIEW.aiFallacyDetectionRate}%
            </p>
            <p className="text-[11.5px] text-[#718096] mt-2">
              Target ≥ 75% tercapai
            </p>
          </div>

          <div className="lg:px-6">
            <span className="text-[12px] text-[#718096]">
              Kemandirian Berpikir (Tahap 5)
            </span>
            <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#172033] mt-1 leading-none">
              82,5%
            </p>
            <p className="text-[11.5px] text-[#718096] mt-2">
              Skor ≥ 3,0 / 4,0 tanpa AI
            </p>
          </div>

          <div className="lg:pl-6">
            <span className="text-[12px] text-[#718096]">
              Refleksi Transformatif
            </span>
            <p className="text-[30px] font-semibold tracking-[-0.03em] text-[#16A36A] mt-1 leading-none">
              85,0%
            </p>
            <p className="text-[11.5px] text-[#718096] mt-2">
              Perubahan perspektif terverifikasi
            </p>
          </div>
        </div>
      </Card>

      {/* Grafik Perbandingan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-6 p-6">
          <div className="mb-4">
            <h3 className="text-[16px] font-semibold text-[#172033]">
              Perbandingan Pre-Test vs. Post-Test per Dimensi Berpikir Kritis
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Peningkatan skor kelas pada 6 dimensi Facione (n = 40 mahasiswa)
            </p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ASSESSMENT_TREND_DATA}
                margin={{ top: 10, right: 16, bottom: 5, left: -12 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(16,42,86,0.06)"
                />
                <XAxis
                  dataKey="metric"
                  tick={{ fontSize: 11, fill: "#718096" }}
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
                <Bar
                  name="Pre-Test (Awal)"
                  dataKey="preTest"
                  fill="#94A3B8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Post-Test (KRITIKA AI)"
                  dataKey="postTest"
                  fill="#102A56"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-6 p-6">
          <div className="mb-4">
            <h3 className="text-[16px] font-semibold text-[#172033]">
              Tren Perkembangan Berpikir Kritis &amp; Kualitas Dialog
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Perkembangan longitudinal selama 5 minggu siklus pembelajaran
            </p>
          </div>
          <div className="h-[300px] w-full">
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
                  tick={{ fontSize: 11, fill: "#718096" }}
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
                  dot={{ r: 3 }}
                />
                <Line
                  name="Kualitas Argumentasi Dialog"
                  type="monotone"
                  dataKey="dialogueQuality"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Ringkasan Penyelesaian 6 Sintaks */}
      <Card className="p-6 space-y-5">
        <div>
          <h3 className="text-[16px] font-semibold text-[#172033]">
            Rekapitulasi Penyelesaian Enam Sintaks KRITIKA AI
          </h3>
          <p className="text-[12.5px] text-[#718096]">
            Partisipasi mahasiswa pada fase Trigger, Reflection, Action, dan
            Integration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAGE_COMPLETION_CHART_DATA.map((st) => (
            <div
              key={st.stage}
              className="p-4 rounded-[12px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-2 tabular-nums"
            >
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-semibold text-[#172033]">{st.stage}</span>
                <span className="text-[#718096] text-[11.5px]">
                  Sintaks {st.code}
                </span>
              </div>
              <ProgressBar value={st.rate} variant="navy" size="sm" />
              <div className="flex justify-between text-[11.5px] text-[#718096]">
                <span>{st.completed}/40 mahasiswa selesai</span>
                <span>{st.rate}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
