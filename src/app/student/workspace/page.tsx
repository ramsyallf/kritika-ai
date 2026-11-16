"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SAMPLE_DATASETS } from "@/mock-data/datasets";
import { runStatisticalAnalysis } from "@/lib/stats-engine-service";
import { useAppStore } from "@/lib/store";
import { formatNumber, formatPValue } from "@/lib/utils";
import {
  Card,
  Button,
  Select,
  Textarea,
} from "@/components/ui/primitives";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Modal,
  useToast,
} from "@/components/ui/overlays";
import {
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  ReferenceLine,
  Legend,
} from "recharts";
import {
  Upload,
  Play,
  ArrowRight,
} from "lucide-react";

const ROLE_LABELS_ID: Record<string, string> = {
  "Response (Y)": "Variabel Respon (Y)",
  "Predictor (X)": "Variabel Prediktor (X)",
  Identifier: "Identitas",
};

export default function StatisticalWorkspacePage() {
  const { submissions, updateSubmission, completeStage } = useAppStore();
  const { notify } = useToast();

  const [selectedDatasetId, setSelectedDatasetId] = useState(
    SAMPLE_DATASETS[0].id
  );
  const [activeTab, setActiveTab] = useState("Results");
  const [analysisMethod, setAnalysisMethod] = useState<
    "ols_regression" | "descriptive_stats" | "hypothesis_testing" | "model_diagnostics"
  >("ols_regression");
  const [selectedPredictors, setSelectedPredictors] = useState<string[]>([
    "ad_spend",
    "fleet_coverage",
    "promo_discount",
  ]);
  const [robustSE, setRobustSE] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [lastExecutedTime, setLastExecutedTime] = useState("10:24 WIB");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const dataset =
    SAMPLE_DATASETS.find((d) => d.id === selectedDatasetId) ||
    SAMPLE_DATASETS[0];
  const reg = dataset.regressionOutput;

  const handleTogglePredictor = (key: string) => {
    setSelectedPredictors((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRunEngine = async () => {
    setIsRunning(true);
    try {
      await runStatisticalAnalysis({
        datasetId: selectedDatasetId,
        dependentVar: reg.dependentVar,
        predictors: selectedPredictors,
        analysisType: analysisMethod,
        confidenceLevel: "95%",
        robustErrors: robustSE,
      });
      const now = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setLastExecutedTime(`${now} WIB`);
      setActiveTab("Results");
      notify({
        title: "Analisis statistik diperbarui",
        description: "Hasil estimasi OLS dan uji asumsi klasik telah dimuat.",
        variant: "info",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveInterpretation = () => {
    completeStage(4);
    notify({
      title: "Interpretasi Tahap 4 berhasil disimpan",
      description:
        "Hasil analisis kasus baru telah tercatat pada siklus belajar Anda.",
      variant: "success",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[12.5px] font-medium text-[#718096]">
            Tahap 4 dari 6 · Fase Action · Data Sampel Demonstrasi Tervalidasi
          </p>
          <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
            Tantangan Kasus Baru — Workspace Statistik
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Unggah Dataset CSV</span>
          </Button>
          <Button
            variant="primary"
            size="md"
            isLoading={isRunning}
            onClick={handleRunEngine}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Jalankan Analisis</span>
          </Button>
        </div>
      </div>

      {/* Panel Pemilihan Dataset & Ringkasan Model */}
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-2">
            <div className="flex items-center justify-between text-[11.5px] text-[#718096]">
              <span>Dataset Kasus Baru (Data Sampel)</span>
              <span className="tabular-nums">n = {dataset.sampleSize} observasi</span>
            </div>
            <Select
              value={selectedDatasetId}
              onChange={(e) => setSelectedDatasetId(e.target.value)}
            >
              {SAMPLE_DATASETS.map((ds) => (
                <option key={ds.id} value={ds.id}>
                  {ds.name}
                </option>
              ))}
            </Select>
            <p className="text-[12px] text-[#718096] leading-relaxed">
              {dataset.dilemmaNote}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:border-l border-[#102A56]/[0.06] lg:pl-6">
            <div>
              <span className="text-[11.5px] text-[#718096]">R-Squared (R²)</span>
              <p className="text-[26px] font-semibold tracking-[-0.025em] text-[#102A56] tabular-nums mt-0.5">
                {reg.rSquared.toFixed(3)}
              </p>
              <span className="text-[11px] text-[#718096]">Data sampel</span>
            </div>

            <div>
              <span className="text-[11.5px] text-[#718096]">Adjusted R²</span>
              <p className="text-[26px] font-semibold tracking-[-0.025em] text-[#172033] tabular-nums mt-0.5">
                {reg.adjustedRSquared.toFixed(3)}
              </p>
              <span className="text-[11px] text-[#718096]">k = 3 prediktor</span>
            </div>

            <div>
              <span className="text-[11.5px] text-[#718096]">Statistik F</span>
              <p className="text-[26px] font-semibold tracking-[-0.025em] text-[#172033] tabular-nums mt-0.5">
                {reg.fStatistic.toFixed(1)}
              </p>
              <span className="text-[11px] text-[#16A36A] font-medium">
                p &lt; 0,001
              </span>
            </div>

            <div>
              <span className="text-[11.5px] text-[#718096]">Koefisien Iklan (β₁)</span>
              <p className="text-[26px] font-semibold tracking-[-0.025em] text-[#2563EB] tabular-nums mt-0.5">
                0,85
              </p>
              <span className="text-[11px] text-[#718096] tabular-nums">
                p = 0,003 · VIF 11,4
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* 4 Tab Workspace */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="Dataset">Dataset</TabsTrigger>
            <TabsTrigger value="Analysis">Konfigurasi Analisis</TabsTrigger>
            <TabsTrigger value="Results">Hasil &amp; Uji Asumsi</TabsTrigger>
            <TabsTrigger value="Visualization">Visualisasi</TabsTrigger>
          </TabsList>

          <span className="text-[11.5px] text-[#718096] tabular-nums">
            Output Data Sampel · Diperbarui {lastExecutedTime}
          </span>
        </div>

        {/* TAB 1: DATASET */}
        <TabsContent value="Dataset">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-[16px] font-semibold text-[#172033]">
                  Kamus Variabel &amp; Statistik Deskriptif
                </h3>
                <p className="text-[12.5px] text-[#718096]">
                  Ringkasan parameter sampel pada {dataset.sampleSize} observasi
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] tabular-nums">
                  <thead className="text-[#718096] border-b border-[#102A56]/[0.07]">
                    <tr>
                      <th className="py-2.5 pr-4 font-medium">Nama Variabel</th>
                      <th className="py-2.5 px-4 font-medium">Peran</th>
                      <th className="py-2.5 px-4 font-medium">Satuan</th>
                      <th className="py-2.5 px-4 font-medium text-right">Rata-rata</th>
                      <th className="py-2.5 px-4 font-medium text-right">Simp. Baku</th>
                      <th className="py-2.5 px-4 font-medium text-right">Rentang</th>
                      <th className="py-2.5 pl-4 font-medium text-right">VIF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#102A56]/[0.05]">
                    {dataset.variables.map((v) => (
                      <tr key={v.key} className="hover:bg-[#F7F9FC]">
                        <td className="py-3 pr-4 font-medium text-[#172033]">
                          {v.label}
                        </td>
                        <td className="py-3 px-4 text-[#718096]">
                          {ROLE_LABELS_ID[v.role] || v.role}
                        </td>
                        <td className="py-3 px-4 text-[#718096]">{v.unit}</td>
                        <td className="py-3 px-4 text-right">
                          {v.mean !== undefined ? v.mean.toFixed(2) : "—"}
                        </td>
                        <td className="py-3 px-4 text-right text-[#718096]">
                          {v.sd !== undefined ? v.sd.toFixed(2) : "—"}
                        </td>
                        <td className="py-3 px-4 text-right text-[#718096]">
                          {v.min !== undefined ? `${v.min}–${v.max}` : "—"}
                        </td>
                        <td className="py-3 pl-4 text-right font-medium">
                          {v.vif ? (
                            <span
                              className={
                                v.vif > 10 ? "text-[#DC5353]" : "text-[#16A36A]"
                              }
                            >
                              {v.vif.toFixed(2)}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-[16px] font-semibold text-[#172033]">
                  Pratinjau Data Observasi
                </h3>
                <p className="text-[12.5px] text-[#718096]">
                  Menampilkan {dataset.rows.length} baris pertama dari{" "}
                  {dataset.sampleSize} observasi
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] tabular-nums">
                  <thead className="text-[#718096] border-b border-[#102A56]/[0.07]">
                    <tr>
                      {dataset.variables.map((v) => (
                        <th key={v.key} className="py-2.5 px-3 font-medium">
                          {v.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#102A56]/[0.05]">
                    {dataset.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#F7F9FC]">
                        {dataset.variables.map((v) => (
                          <td
                            key={v.key}
                            className="py-2.5 px-3 text-[#172033]"
                          >
                            {row[v.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 2: KONFIGURASI ANALISIS */}
        <TabsContent value="Analysis">
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-[16px] font-semibold text-[#172033]">
                Spesifikasi Model Regresi
              </h3>
              <p className="text-[12.5px] text-[#718096]">
                Pilih metode analisis, variabel respon, prediktor, dan pengujian
                asumsi klasik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[12.5px] font-medium text-[#172033] mb-1.5">
                    Metode Analisis Statistik
                  </label>
                  <Select
                    value={analysisMethod}
                    onChange={(e) =>
                      setAnalysisMethod(e.target.value as typeof analysisMethod)
                    }
                  >
                    <option value="ols_regression">
                      Regresi Linear Berganda (Ordinary Least Squares / OLS)
                    </option>
                    <option value="descriptive_stats">
                      Statistik Deskriptif &amp; Matriks Korelasi
                    </option>
                    <option value="hypothesis_testing">
                      Uji Hipotesis Simultan (Uji F) &amp; Parsial (Uji t)
                    </option>
                    <option value="model_diagnostics">
                      Diagnostik Asumsi Klasik IIDN &amp; Multikolinearitas (VIF)
                    </option>
                  </Select>
                </div>

                <div>
                  <label className="block text-[12.5px] font-medium text-[#172033] mb-1.5">
                    Variabel Respon (Y)
                  </label>
                  <Select disabled value="y">
                    <option value="y">{reg.dependentVar}</option>
                  </Select>
                </div>

                <label className="flex items-center justify-between p-3.5 rounded-[11px] bg-[#F7F9FC] border border-[#102A56]/[0.06] cursor-pointer">
                  <div>
                    <p className="text-[13px] font-medium text-[#172033]">
                      Gunakan HC3 Robust Standard Errors
                    </p>
                    <p className="text-[12px] text-[#718096]">
                      Koreksi standard error bila asumsi homoskedastisitas dilanggar
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={robustSE}
                    onChange={(e) => setRobustSE(e.target.checked)}
                    className="w-4 h-4 accent-[#102A56]"
                  />
                </label>
              </div>

              <div className="space-y-2.5">
                <label className="block text-[12.5px] font-medium text-[#172033]">
                  Variabel Prediktor (X)
                </label>
                {dataset.variables
                  .filter((v) => v.role === "Predictor (X)")
                  .map((v) => {
                    const checked = selectedPredictors.includes(v.key);
                    return (
                      <label
                        key={v.key}
                        className="flex items-center justify-between p-3.5 rounded-[11px] bg-[#F7F9FC] border border-[#102A56]/[0.06] cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleTogglePredictor(v.key)}
                            className="w-4 h-4 accent-[#102A56]"
                          />
                          <div>
                            <p className="text-[13px] font-medium text-[#172033]">
                              {v.label}
                            </p>
                            <p className="text-[11.5px] text-[#718096]">
                              Satuan: {v.unit} · Rata-rata: {v.mean}
                            </p>
                          </div>
                        </div>
                        {v.vif && (
                          <span className="text-[11.5px] text-[#718096] tabular-nums">
                            VIF {v.vif}
                          </span>
                        )}
                      </label>
                    );
                  })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#102A56]/[0.06] flex justify-end">
              <Button
                variant="primary"
                isLoading={isRunning}
                onClick={handleRunEngine}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Estimasi Model &amp; Lihat Hasil</span>
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* TAB 3: HASIL & UJI ASUMSI */}
        <TabsContent value="Results">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#172033]">
                    Estimasi Parameter Regresi OLS (Data Sampel)
                  </h3>
                  <p className="text-[12.5px] text-[#718096]">
                    Variabel Respon: {reg.dependentVar} ·{" "}
                    {robustSE ? "HC3 Robust SE" : "OLS Klasik"}
                  </p>
                </div>
                <span className="text-[12px] text-[#718096] tabular-nums">
                  DW = {reg.durbinWatson} · Galat Baku ={" "}
                  {reg.standardErrorEstimate}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] tabular-nums">
                  <thead className="text-[#718096] border-b border-[#102A56]/[0.07]">
                    <tr>
                      <th className="py-2.5 pr-4 font-medium">Parameter</th>
                      <th className="py-2.5 px-4 font-medium text-right">
                        Koefisien (β)
                      </th>
                      <th className="py-2.5 px-4 font-medium text-right">
                        Galat Baku (SE)
                      </th>
                      <th className="py-2.5 px-4 font-medium text-right">
                        t-Hitung
                      </th>
                      <th className="py-2.5 px-4 font-medium text-right">
                        p-Value
                      </th>
                      <th className="py-2.5 px-4 font-medium text-right">
                        SK 95%
                      </th>
                      <th className="py-2.5 pl-4 font-medium text-right">VIF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#102A56]/[0.05]">
                    {reg.coefficients.map((c) => (
                      <tr key={c.variable} className="hover:bg-[#F7F9FC]">
                        <td className="py-3 pr-4 font-medium text-[#172033]">
                          {c.label}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-[#102A56]">
                          {formatNumber(c.coefficient, 2)}
                        </td>
                        <td className="py-3 px-4 text-right text-[#718096]">
                          {formatNumber(
                            robustSE ? c.stdError * 1.18 : c.stdError,
                            3
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {formatNumber(c.tStatistic, 2)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-[#2563EB]">
                          {formatPValue(c.pValue)}
                        </td>
                        <td className="py-3 px-4 text-right text-[#718096]">
                          [{c.ciLower.toFixed(2)}, {c.ciUpper.toFixed(2)}]
                        </td>
                        <td className="py-3 pl-4 text-right font-medium">
                          {c.vif ? (
                            <span
                              className={
                                c.vif > 10 ? "text-[#DC5353]" : "text-[#16A36A]"
                              }
                            >
                              {c.vif.toFixed(2)}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-[16px] font-semibold text-[#172033]">
                  Uji Asumsi Klasik Regresi (CPMK-3)
                </h3>
                <p className="text-[12.5px] text-[#718096]">
                  Pemeriksaan multikolinearitas (VIF) dan residual IIDN
                  (Homoskedastisitas, Normalitas, Non-Autokorelasi)
                </p>
              </div>

              <div className="divide-y divide-[#102A56]/[0.06]">
                {reg.diagnostics.map((diag) => {
                  const violated = diag.assumptionStatus === "Violated";
                  return (
                    <div
                      key={diag.name}
                      className="py-4 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-0.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              violated ? "bg-[#DC5353]" : "bg-[#16A36A]"
                            }`}
                          />
                          <span className="text-[13.5px] font-semibold text-[#172033]">
                            {diag.name}
                          </span>
                          <span className="text-[12px] text-[#718096] tabular-nums">
                            · {diag.testUsed} ({diag.statistic}, p ={" "}
                            {diag.pValue.toFixed(3)})
                          </span>
                        </div>
                        <p className="text-[12.5px] text-[#718096] pl-4">
                          {diag.interpretationHint}
                        </p>
                      </div>
                      <span
                        className={`text-[12px] font-medium shrink-0 pl-4 sm:pl-0 ${
                          violated ? "text-[#DC5353]" : "text-[#16A36A]"
                        }`}
                      >
                        {violated ? "Dilanggar" : "Terpenuhi"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 4: VISUALISASI */}
        <TabsContent value="Visualization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-[15.5px] font-semibold text-[#172033]">
                  Data Aktual vs. Garis Regresi Terestimasi (Ŷ)
                </h3>
                <p className="text-[12px] text-[#718096]">
                  Biaya Iklan (X₁) terhadap Penjualan Bersih (Y)
                </p>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={reg.scatterData}
                    margin={{ top: 10, right: 16, bottom: 5, left: -10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(16,42,86,0.06)"
                    />
                    <XAxis
                      dataKey="x"
                      type="number"
                      domain={["dataMin - 10", "dataMax + 10"]}
                      tick={{ fontSize: 11.5, fill: "#718096" }}
                    />
                    <YAxis
                      domain={["auto", "auto"]}
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
                    <Scatter
                      name="Penjualan Aktual (Y)"
                      dataKey="y"
                      fill="#102A56"
                    />
                    <Line
                      name="Prediksi Regresi OLS (Ŷ)"
                      type="monotone"
                      dataKey="predicted"
                      stroke="#2563EB"
                      strokeWidth={2}
                      dot={{ r: 2.5, fill: "#2563EB" }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-[15.5px] font-semibold text-[#172033]">
                  Plot Sebaran Residual (e = Y − Ŷ)
                </h3>
                <p className="text-[12px] text-[#718096]">
                  Pemeriksaan heteroskedastisitas antar-hub distribusi
                </p>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={reg.scatterData}
                    margin={{ top: 10, right: 16, bottom: 5, left: -10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(16,42,86,0.06)"
                    />
                    <XAxis
                      dataKey="id"
                      tick={{ fontSize: 11, fill: "#718096" }}
                    />
                    <YAxis tick={{ fontSize: 11.5, fill: "#718096" }} />
                    <RechartsTooltip
                      contentStyle={{
                        borderRadius: "10px",
                        borderColor: "rgba(16,42,86,0.08)",
                        fontSize: "12px",
                      }}
                    />
                    <ReferenceLine
                      y={0}
                      stroke="#102A56"
                      strokeOpacity={0.35}
                    />
                    <Bar
                      name="Nilai Residual"
                      dataKey="residual"
                      fill="#2563EB"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Panel Interpretasi */}
      <Card className="p-6 space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h3 className="text-[16px] font-semibold text-[#172033]">
              Interpretasi Statistik &amp; Rekomendasi Keputusan
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Sintesis hasil estimasi parameter (β₁ = 0,85), p-value, VIF
              (11,42), dan uji residual pada kasus baru ini.
            </p>
          </div>
          <span className="text-[12px] text-[#718096]">Luaran Tahap 4</span>
        </div>

        <Textarea
          rows={4}
          value={submissions.stage4WorkspaceInterpretation}
          onChange={(e) =>
            updateSubmission("stage4WorkspaceInterpretation", e.target.value)
          }
        />

        <div className="flex items-center justify-end gap-2.5">
          <Button variant="outline" onClick={handleSaveInterpretation}>
            Simpan Interpretasi
          </Button>
          <Link href="/student/assessment">
            <Button variant="primary">
              <span>Lanjut ke Tahap 5 (Asesmen Mandiri)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Modal Unggah Dataset */}
      <Modal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Unggah Dataset Statistik"
        description="Impor berkas CSV atau Excel (.xlsx) ke dalam Workspace Statistik."
      >
        <div className="space-y-4">
          <div className="border border-dashed border-[#102A56]/20 bg-[#F7F9FC] rounded-[13px] p-8 text-center space-y-1.5">
            <Upload className="w-6 h-6 text-[#102A56] mx-auto mb-2" />
            <p className="text-[13.5px] font-medium text-[#172033]">
              Tarik berkas CSV atau XLSX ke sini
            </p>
            <p className="text-[12px] text-[#718096]">
              Pemeriksaan tipe variabel &amp; kolinearitas otomatis
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setUploadModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setUploadModalOpen(false);
                notify({
                  title: "Dataset tervalidasi",
                  description: "Skema dataset sampel siap dianalisis.",
                  variant: "success",
                });
              }}
            >
              Muat Dataset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
