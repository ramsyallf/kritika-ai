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
  EmptyState,
} from "@/components/ui/primitives";
import { Modal, useToast } from "@/components/ui/overlays";
import { Search, Plus } from "lucide-react";

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

export default function LecturerQuestionBankPage() {
  const { cases, topics, addCase, updateCaseItem } = useAppStore();
  const { notify } = useToast();

  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");
  const [cpmkFilter, setCpmkFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<LearningCase | null>(null);

  const [title, setTitle] = useState("");
  const [cpmk, setCpmk] = useState("CPMK-3");
  const [complexity, setComplexity] =
    useState<LearningCase["complexity"]>("Intermediate");
  const [stageTarget, setStageTarget] =
    useState<LearningCase["stageTarget"]>("Stage 1 Trigger");
  const [scenarioText, setScenarioText] = useState("");
  const [embeddedAiFallacy, setEmbeddedAiFallacy] = useState("");
  const [guidingPrompt, setGuidingPrompt] = useState("");

  const openCreateModal = () => {
    setEditingCase(null);
    setTitle("Konsumsi Energi Gudang Berpendingin Pelabuhan Surabaya");
    setCpmk("CPMK-3");
    setComplexity("Intermediate");
    setStageTarget("Stage 5 Independent Assessment");
    setScenarioText(
      "Evaluasi konsumsi listrik bulanan pada 36 ruang gudang berpendingin berdasarkan suhu lingkungan, frekuensi buka-tutup pintu, dan usia kompresor."
    );
    setEmbeddedAiFallacy(
      "Argumen AI: 'Hapus variabel usia kompresor karena p-value = 0,064, meskipun penghapusannya menyebabkan bias variabel terlewat.'"
    );
    setGuidingPrompt(
      "Berikan justifikasi pemilihan prediktor menggunakan relevansi teoretis, Adjusted R², dan diagnostik residual."
    );
    setModalOpen(true);
  };

  const openEditModal = (c: LearningCase) => {
    setEditingCase(c);
    setTitle(c.title);
    setCpmk(c.cpmk);
    setComplexity(c.complexity);
    setStageTarget(c.stageTarget);
    setScenarioText(c.scenarioText);
    setEmbeddedAiFallacy(c.embeddedAiFallacy);
    setGuidingPrompt(c.guidingPrompt);
    setModalOpen(true);
  };

  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCase) {
      updateCaseItem({
        ...editingCase,
        title,
        cpmk,
        complexity,
        stageTarget,
        scenarioText,
        embeddedAiFallacy,
        guidingPrompt,
      });
      notify({
        title: `${editingCase.code} berhasil diperbarui`,
        variant: "success",
      });
    } else {
      const matchedTopic =
        topics.find((t) => t.cpmk.includes(cpmk)) || topics[0];
      addCase({
        id: `case-${Date.now()}`,
        code: `KR-CASE-${Math.floor(110 + Math.random() * 80)}`,
        title,
        topicId: matchedTopic.id,
        topicTitle: matchedTopic.title,
        cpmk,
        complexity,
        stageTarget,
        domain: "Analitika Logistik & Pemodelan Statistik",
        scenarioText,
        embeddedAiFallacy,
        guidingPrompt,
        datasetMetadata: {
          rows: 45,
          variables: ["y_respon", "x1_utama", "x2_pendukung", "x3_kontrol"],
          rSquared: 0.864,
          keyViolation: "Tervalidasi Diagnostik Klasik",
        },
        validationStatus: "Validated",
        author: "Dr. Iis Dewi Ratih, S.Si., M.Si.",
        createdAt: "Hari ini",
      });
      notify({
        title: "Kasus baru ditambahkan ke Bank Soal",
        variant: "success",
      });
    }
    setModalOpen(false);
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.domain.toLowerCase().includes(search.toLowerCase());
    const matchesDiff =
      difficultyFilter === "ALL" || c.complexity === difficultyFilter;
    const matchesCpmk = cpmkFilter === "ALL" || c.cpmk === cpmkFilter;
    return matchesSearch && matchesDiff && matchesCpmk;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[12.5px] font-medium text-[#718096]">
            Repositori Studi Kasus Tervalidasi · Metode Regresi
          </p>
          <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
            Bank Soal &amp; Studi Kasus Tervalidasi
          </h1>
        </div>

        <Button variant="primary" onClick={openCreateModal}>
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Kasus Baru</span>
        </Button>
      </div>

      {/* Baris Filter */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6 relative">
            <Search className="w-3.5 h-3.5 text-[#718096] absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Cari berdasarkan kode, judul, atau bidang logistik…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="md:col-span-3">
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="ALL">Semua Tingkat Kesulitan</option>
              <option value="Foundational">Dasar</option>
              <option value="Intermediate">Menengah</option>
              <option value="Advanced Dilemma">Dilema Lanjut</option>
            </Select>
          </div>
          <div className="md:col-span-3">
            <Select
              value={cpmkFilter}
              onChange={(e) => setCpmkFilter(e.target.value)}
            >
              <option value="ALL">Semua Topik CPMK</option>
              <option value="CPMK-2">CPMK-2 (Pemodelan OLS)</option>
              <option value="CPMK-3">CPMK-3 (Uji Asumsi IIDN &amp; VIF)</option>
              <option value="CPMK-4">CPMK-4 (Pemilihan Model Terbaik)</option>
            </Select>
          </div>
        </div>
      </Card>

      {/* Daftar Kasus */}
      {filteredCases.length > 0 ? (
        <div className="space-y-4">
          {filteredCases.map((c) => (
            <Card key={c.id} className="p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 text-[12px]">
                <span className="font-medium text-[#2563EB]">
                  {c.code} · {c.cpmk} · {COMPLEXITY_ID[c.complexity] || c.complexity} ·{" "}
                  {STAGE_TARGET_ID[c.stageTarget] || c.stageTarget}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[#16A36A] font-medium">
                    {VALIDATION_STATUS_ID[c.validationStatus] ||
                      c.validationStatus}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(c)}
                  >
                    Sunting
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-[16.5px] font-semibold text-[#172033]">
                  {c.title}
                </h3>
                <p className="text-[12px] text-[#718096] mt-0.5">
                  {c.topicTitle} · {c.domain}
                </p>
                <p className="text-[13px] text-[#718096] mt-2 leading-relaxed">
                  {c.scenarioText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[12.5px]">
                <div className="p-3.5 rounded-[11px] bg-[#F7F9FC] border border-[#102A56]/[0.06]">
                  <span className="text-[11px] text-[#718096] block mb-0.5">
                    Instruksi Tugas Mahasiswa
                  </span>
                  <span className="text-[#172033]">{c.guidingPrompt}</span>
                </div>
                <div className="p-3.5 rounded-[11px] bg-[#F7F9FC] border border-[#102A56]/[0.06]">
                  <span className="text-[11px] text-[#718096] block mb-0.5">
                    Argumen AI yang Diinvestigasi
                  </span>
                  <span className="text-[#172033]">{c.embeddedAiFallacy}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Tidak ada studi kasus yang sesuai"
          description="Coba atur ulang kata kunci pencarian atau filter tingkat kesulitan."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setDifficultyFilter("ALL");
                setCpmkFilter("ALL");
              }}
            >
              Atur Ulang Filter
            </Button>
          }
        />
      )}

      {/* Modal Tambah / Sunting Kasus */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          editingCase
            ? `Sunting Kasus ${editingCase.code}`
            : "Tambah Kasus Tervalidasi"
        }
        description="Konfigurasikan skenario kasus, tingkat kesulitan, dan instruksi tugas mahasiswa."
      >
        <form onSubmit={handleSaveCase} className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-[#172033] mb-1">
              Judul Studi Kasus
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                CPMK
              </label>
              <Select value={cpmk} onChange={(e) => setCpmk(e.target.value)}>
                <option value="CPMK-2">CPMK-2</option>
                <option value="CPMK-3">CPMK-3</option>
                <option value="CPMK-4">CPMK-4</option>
              </Select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Tingkat Kesulitan
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
                Tahap Sasaran
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
              Deskripsi Skenario Kasus
            </label>
            <Textarea
              rows={3}
              value={scenarioText}
              onChange={(e) => setScenarioText(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#172033] mb-1">
              Argumen AI yang Mengandung Kekeliruan
            </label>
            <Textarea
              rows={2}
              value={embeddedAiFallacy}
              onChange={(e) => setEmbeddedAiFallacy(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#172033] mb-1">
              Instruksi Tugas Mahasiswa
            </label>
            <Textarea
              rows={2}
              value={guidingPrompt}
              onChange={(e) => setGuidingPrompt(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#102A56]/[0.06]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan Kasus
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
