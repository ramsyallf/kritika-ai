"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { LearningCase } from "@/types";
import {
  Card,
  Button,
  Input,
  Textarea,
  Select,
} from "@/components/ui/primitives";
import { useToast } from "@/components/ui/overlays";
import { Sparkles } from "lucide-react";

const COMPLEXITY_ID: Record<string, string> = {
  Foundational: "Dasar",
  Intermediate: "Menengah",
  "Advanced Dilemma": "Dilema Lanjut",
};

const STAGE_TARGET_ID: Record<string, string> = {
  "Stage 1 Trigger": "Tahap 1: Pemicu Kritis",
  "Stage 4 Implementation": "Tahap 4: Tantangan Kasus Baru",
  "Stage 5 Independent Assessment": "Tahap 5: Asesmen Mandiri",
};

const VALIDATION_STATUS_ID: Record<string, string> = {
  Validated: "Tervalidasi",
  "Pending Review": "Menunggu Validasi",
  "Needs Revision": "Perlu Revisi",
};

export default function LecturerCasesPage() {
  const { topics, cases, addCase, updateCaseStatus } = useAppStore();
  const { notify } = useToast();

  const [selectedTopicId, setSelectedTopicId] = useState(
    topics[1]?.id || "top-2"
  );
  const [complexity, setComplexity] =
    useState<LearningCase["complexity"]>("Advanced Dilemma");
  const [stageTarget, setStageTarget] =
    useState<LearningCase["stageTarget"]>("Stage 1 Trigger");
  const [domainInput, setDomainInput] = useState(
    "Otomasi Gudang Distribusi & Kecepatan Sortir Jawa Timur"
  );
  const [sampleSizeOpt, setSampleSizeOpt] = useState(52);
  const [violationPreset, setViolationPreset] = useState(
    "R² Tinggi (0,895) dengan Prediktor Kolinear (VIF = 12,6) & Varians Residual Tidak Konstan"
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<LearningCase | null>(
    null
  );

  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [editedScenario, setEditedScenario] = useState("");

  const handleGenerateCase = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 600));

    const topicObj =
      topics.find((t) => t.id === selectedTopicId) || topics[0];

    const preview: LearningCase = {
      id: `case-${Date.now()}`,
      code: `KR-CASE-${Math.floor(105 + Math.random() * 90)}`,
      title: `Studi Kasus Dilema Statistik — ${domainInput}`,
      topicId: topicObj.id,
      topicTitle: topicObj.title,
      cpmk: topicObj.cpmk,
      complexity,
      stageTarget,
      domain: domainInput,
      scenarioText: `Tim analitika operasional memodelkan ${domainInput} pada ${sampleSizeOpt} fasilitas logistik. Hasil regresi OLS menunjukkan R² = 0,895 dan p = 0,002 untuk investasi otomasi, namun pemeriksaan diagnostik mengungkap adanya ${violationPreset}.`,
      embeddedAiFallacy: `Argumen AI untuk Diinvestigasi: 'Karena R² mencapai 0,895 dan p = 0,002 signifikan, model ini valid untuk langsung diterapkan tanpa perlu mengoreksi ${violationPreset}.'`,
      guidingPrompt:
        "Kritisi klaim AI tersebut, jelaskan dampak pelanggaran asumsi terhadap standard error, dan rumuskan spesifikasi model perbaikan yang tepat.",
      datasetMetadata: {
        rows: sampleSizeOpt,
        variables: [
          "indeks_throughput (Y)",
          "investasi_otomasi (X₁)",
          "jam_kerja_shift (X₂)",
          "kepadatan_sku (X₃)",
        ],
        rSquared: 0.895,
        keyViolation: violationPreset,
      },
      validationStatus: "Pending Review",
      author: "Generator Kasus AI",
      createdAt: "Baru saja",
    };

    setGeneratedPreview(preview);
    setIsGenerating(false);
    notify({
      title: "Draf studi kasus berhasil dibangkitkan",
      description:
        "Tinjau pratinjau kasus dan kirimkan ke antrean validasi dosen.",
      variant: "info",
    });
  };

  const handleSaveToValidationQueue = () => {
    if (!generatedPreview) return;
    addCase(generatedPreview);
    setGeneratedPreview(null);
    notify({
      title: "Kasus ditambahkan ke antrean validasi",
      variant: "success",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[12.5px] font-medium text-[#718096]">
          Pembangkit Studi Kasus Berbantuan AI &amp; Validasi Dosen Pengampu
        </p>
        <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
          Generator &amp; Validasi Studi Kasus AI
        </h1>
      </div>

      {/* BAGIAN 1: GENERATOR KASUS AI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <Card className="lg:col-span-6 p-6 space-y-4">
          <div>
            <h3 className="text-[16.5px] font-semibold text-[#172033]">
              Bangkitkan Studi Kasus &amp; Dataset Baru
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Tentukan topik CPMK, tingkat kompleksitas, dan skenario dilema
              asumsi regresi.
            </p>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#172033] mb-1">
              Topik Pembelajaran (CPMK)
            </label>
            <Select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code} ({t.cpmk}) — {t.title}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Tingkat Kompleksitas
              </label>
              <Select
                value={complexity}
                onChange={(e) =>
                  setComplexity(e.target.value as LearningCase["complexity"])
                }
              >
                <option value="Foundational">Dasar</option>
                <option value="Intermediate">Menengah</option>
                <option value="Advanced Dilemma">Dilema Lanjut</option>
              </Select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Peruntukan Tahap KRITIKA AI
              </label>
              <Select
                value={stageTarget}
                onChange={(e) =>
                  setStageTarget(e.target.value as LearningCase["stageTarget"])
                }
              >
                <option value="Stage 1 Trigger">Tahap 1: Pemicu Kritis</option>
                <option value="Stage 4 Implementation">
                  Tahap 4: Tantangan Kasus Baru
                </option>
                <option value="Stage 5 Independent Assessment">
                  Tahap 5: Asesmen Mandiri
                </option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#172033] mb-1">
              Konteks Bidang Logistik / Bisnis
            </label>
            <Input
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Ukuran Sampel Dataset (n)
              </label>
              <Input
                type="number"
                value={sampleSizeOpt}
                onChange={(e) =>
                  setSampleSizeOpt(Number(e.target.value) || 40)
                }
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Skenario Dilema Statistik
              </label>
              <Select
                value={violationPreset}
                onChange={(e) => setViolationPreset(e.target.value)}
              >
                <option value="R² Tinggi (0,895) dengan Prediktor Kolinear (VIF = 12,6) & Varians Residual Tidak Konstan">
                  R² Tinggi + Multikolinearitas Berat (VIF &gt; 10)
                </option>
                <option value="Nilai p-value Signifikan (0,002) namun Margin Keuntungan Ekonomi Negatif">
                  p-value Kecil + Dampak Ekonomis Merugi
                </option>
                <option value="Overfitting Stepwise (9 Variabel, Mallows Cp = 15,4)">
                  Overfitting Stepwise vs. Model Parsimoni
                </option>
              </Select>
            </div>
          </div>

          <Button
            variant="primary"
            isLoading={isGenerating}
            onClick={handleGenerateCase}
            className="w-full mt-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bangkitkan Studi Kasus &amp; Dataset</span>
          </Button>
        </Card>

        {/* Pratinjau Hasil Generator */}
        <Card className="lg:col-span-6 p-6 space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <h3 className="text-[16.5px] font-semibold text-[#172033]">
                Pratinjau Studi Kasus Hasil AI
              </h3>
              <p className="text-[12.5px] text-[#718096]">
                Periksa skenario dan metadata dataset sebelum divalidasi.
              </p>
            </div>
            {generatedPreview && (
              <span className="text-[12px] font-medium text-[#2563EB]">
                {generatedPreview.code}
              </span>
            )}
          </div>

          {generatedPreview ? (
            <div className="space-y-4">
              <div className="p-4 rounded-[12px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-1.5">
                <span className="text-[11px] font-medium text-[#718096]">
                  {generatedPreview.cpmk} ·{" "}
                  {COMPLEXITY_ID[generatedPreview.complexity]}
                </span>
                <h4 className="text-[15px] font-semibold text-[#172033]">
                  {generatedPreview.title}
                </h4>
                <p className="text-[12.5px] text-[#718096] leading-relaxed">
                  {generatedPreview.scenarioText}
                </p>
              </div>

              <div className="p-4 rounded-[12px] bg-[#F7F9FC] border border-[#102A56]/[0.06] text-[12.5px]">
                <span className="text-[11px] font-medium text-[#718096] block mb-1">
                  Kekeliruan Argumen AI untuk Diinvestigasi Mahasiswa
                </span>
                <p className="text-[#172033]">
                  {generatedPreview.embeddedAiFallacy}
                </p>
              </div>

              <div className="text-[12px] text-[#718096] tabular-nums">
                Dataset: n = {generatedPreview.datasetMetadata.rows} · R² ={" "}
                {generatedPreview.datasetMetadata.rSquared} · Variabel:{" "}
                {generatedPreview.datasetMetadata.variables.join(", ")}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGeneratedPreview(null)}
                >
                  Buang Draf
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveToValidationQueue}
                >
                  Kirim ke Antrean Validasi
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center bg-[#F7F9FC] rounded-[13px] border border-[#102A56]/[0.06]">
              <p className="text-[13.5px] font-medium text-[#172033]">
                Belum ada draf kasus aktif
              </p>
              <p className="text-[12px] text-[#718096] mt-1">
                Klik tombol &ldquo;Bangkitkan Studi Kasus &amp; Dataset&rdquo;
                di sebelah kiri untuk membuat draf baru.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* BAGIAN 2: ANTREAN VALIDASI DOSEN */}
      <Card className="p-6 space-y-5">
        <div className="flex items-baseline justify-between border-b border-[#102A56]/[0.06] pb-4">
          <div>
            <h3 className="text-[17px] font-semibold text-[#172033]">
              Validasi Substansi Studi Kasus oleh Dosen Pengampu
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Tinjau, sunting deskripsi kasus, periksa metadata dataset, dan
              setujui kasus untuk masuk ke Bank Soal Tervalidasi.
            </p>
          </div>
          <span className="text-[12px] text-[#718096] tabular-nums">
            {cases.filter((c) => c.validationStatus === "Pending Review").length}{" "}
            menunggu validasi
          </span>
        </div>

        <div className="divide-y divide-[#102A56]/[0.06]">
          {cases.map((c) => {
            const isEditing = editingCaseId === c.id;
            return (
              <div key={c.id} className="py-5 first:pt-1 last:pb-1 space-y-3">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-medium text-[#2563EB]">
                    {c.code} · {c.cpmk} ·{" "}
                    {STAGE_TARGET_ID[c.stageTarget] || c.stageTarget} ·{" "}
                    {COMPLEXITY_ID[c.complexity] || c.complexity}
                  </span>
                  <span
                    className={`font-medium ${
                      c.validationStatus === "Validated"
                        ? "text-[#16A36A]"
                        : c.validationStatus === "Pending Review"
                        ? "text-[#E9A23B]"
                        : "text-[#DC5353]"
                    }`}
                  >
                    {VALIDATION_STATUS_ID[c.validationStatus] ||
                      c.validationStatus}
                  </span>
                </div>

                <div>
                  <h4 className="text-[15.5px] font-semibold text-[#172033]">
                    {c.title}
                  </h4>
                  {isEditing ? (
                    <div className="mt-2 space-y-2">
                      <Textarea
                        rows={3}
                        value={editedScenario}
                        onChange={(e) => setEditedScenario(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingCaseId(null)}
                        >
                          Batal
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            updateCaseStatus(
                              c.id,
                              c.validationStatus,
                              editedScenario
                            );
                            setEditingCaseId(null);
                            notify({
                              title: "Deskripsi kasus diperbarui",
                              variant: "success",
                            });
                          }}
                        >
                          Simpan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[13px] text-[#718096] mt-1 leading-relaxed">
                      {c.scenarioText}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12.5px]">
                  <div className="p-3.5 rounded-[11px] bg-[#F7F9FC] border border-[#102A56]/[0.06]">
                    <span className="text-[11px] text-[#718096] block mb-0.5">
                      Argumen AI yang Diinvestigasi
                    </span>
                    <span className="text-[#172033]">{c.embeddedAiFallacy}</span>
                  </div>
                  <div className="p-3.5 rounded-[11px] bg-[#F7F9FC] border border-[#102A56]/[0.06] tabular-nums">
                    <span className="text-[11px] text-[#718096] block mb-0.5">
                      Metadata Dataset (n = {c.datasetMetadata.rows}, R² ={" "}
                      {c.datasetMetadata.rSquared})
                    </span>
                    <span className="text-[#172033]">
                      {c.datasetMetadata.keyViolation}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="text-[11.5px] text-[#718096]">
                    Penyusun: {c.author} · {c.createdAt}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingCaseId(c.id);
                        setEditedScenario(c.scenarioText);
                      }}
                    >
                      Sunting Deskripsi
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        updateCaseStatus(c.id, "Needs Revision");
                        notify({
                          title: `${c.code} ditandai perlu revisi`,
                          variant: "warning",
                        });
                      }}
                    >
                      Tolak / Revisi
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        updateCaseStatus(c.id, "Validated");
                        notify({
                          title: `${c.code} berhasil divalidasi`,
                          variant: "success",
                        });
                      }}
                    >
                      Setujui &amp; Validasi
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
