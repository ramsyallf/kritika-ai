"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "@/lib/store";
import {
  Card,
  Button,
  Input,
  Textarea,
  Select,
  ProgressBar,
} from "@/components/ui/primitives";
import { useToast } from "@/components/ui/overlays";
import { Check, Plus } from "lucide-react";

const STATUS_ID: Record<string, string> = {
  Completed: "Selesai",
  Active: "Aktif",
  Draft: "Draf",
};

const topicSchema = z.object({
  code: z.string().min(3, "Kode modul wajib diisi"),
  cpmk: z.string().min(3, "Kode CPMK wajib diisi"),
  title: z.string().min(5, "Judul topik wajib diisi"),
  course: z.string().min(3, "Mata kuliah wajib diisi"),
  objective1: z.string().min(10, "Tujuan pembelajaran utama wajib diisi"),
  objective2: z.string().min(10, "Tujuan pembelajaran pendukung wajib diisi"),
  misconception: z.string().min(10, "Target miskonsepsi wajib diisi"),
});

type TopicFormValues = z.infer<typeof topicSchema>;

export default function LecturerTopicsPage() {
  const { topics, addTopic } = useAppStore();
  const { notify } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      code: "MOD-05",
      cpmk: "CPMK-5",
      title: "Regresi Poisson & Binomial Negatif untuk Data Cacah Insiden Logistik",
      course: "Metode Regresi (ALT-2204)",
      objective1:
        "Mengevaluasi asumsi ekuidispersi (rata-rata = varians) pada data cacah operasional logistik.",
      objective2:
        "Menyusun justifikasi pemilihan Regresi Binomial Negatif ketika terjadi overdispersi.",
      misconception:
        "Menerapkan regresi linear OLS biasa pada variabel respon diskrit cacah yang menceng.",
    },
  });

  const onSubmit = (data: TopicFormValues) => {
    addTopic({
      id: `top-${Date.now()}`,
      code: data.code,
      cpmk: data.cpmk,
      title: data.title,
      course: data.course,
      sessions: 3,
      objectives: [data.objective1, data.objective2],
      targetMisconceptions: [data.misconception],
      activeCasesCount: 1,
      completionRate: 0,
      status: "Active",
    });
    notify({
      title: `Topik ${data.code} berhasil ditambahkan`,
      variant: "success",
    });
    reset();
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[12.5px] font-medium text-[#718096]">
          Pemetaan RPS &amp; Capaian Pembelajaran Mata Kuliah (CPMK)
        </p>
        <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
          Manajemen Topik &amp; Tujuan Pembelajaran
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          {topics.map((top) => (
            <Card key={top.id} className="p-6 space-y-4">
              <div className="flex items-center justify-between text-[12px] text-[#718096]">
                <span className="font-medium text-[#2563EB]">
                  {top.code} · {top.cpmk}
                </span>
                <span>{STATUS_ID[top.status] || top.status}</span>
              </div>

              <div>
                <h3 className="text-[17px] font-semibold text-[#172033]">
                  {top.title}
                </h3>
                <p className="text-[12.5px] text-[#718096] mt-0.5">
                  {top.course} · {top.sessions} pertemuan (P1–P3)
                </p>
              </div>

              <div className="space-y-1.5 text-[13px] text-[#172033]">
                {top.objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#16A36A] shrink-0 mt-1" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-[12px] bg-[#F7F9FC] border border-[#102A56]/[0.06] text-[12.5px]">
                <span className="text-[11px] font-medium text-[#718096] block mb-1">
                  Target Miskonsepsi Mahasiswa yang Diuji
                </span>
                <ul className="space-y-1 text-[#172033]">
                  {top.targetMisconceptions.map((m, i) => (
                    <li key={i}>· {m}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#102A56]/[0.06] text-[12px] text-[#718096] tabular-nums">
                <span>{top.activeCasesCount} studi kasus tervalidasi</span>
                <div className="w-36">
                  <ProgressBar
                    value={top.completionRate}
                    variant="navy"
                    size="sm"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Form Tambah Topik */}
        <Card className="lg:col-span-5 p-6 space-y-5">
          <div>
            <h3 className="text-[16.5px] font-semibold text-[#172033]">
              Tambah Topik Pembelajaran
            </h3>
            <p className="text-[12.5px] text-[#718096]">
              Petakan modul materi regresi baru ke indikator CPMK dan RPS.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-medium text-[#172033] mb-1">
                  Kode Modul
                </label>
                <Input {...register("code")} />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#172033] mb-1">
                  Kode CPMK
                </label>
                <Select {...register("cpmk")}>
                  <option value="CPMK-1">CPMK-1</option>
                  <option value="CPMK-2">CPMK-2</option>
                  <option value="CPMK-3">CPMK-3</option>
                  <option value="CPMK-4">CPMK-4</option>
                  <option value="CPMK-5">CPMK-5</option>
                  <option value="CPMK-7">CPMK-7</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Judul Topik Bahasan
              </label>
              <Input {...register("title")} />
              {errors.title && (
                <p className="text-[11px] text-[#DC5353] mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Mata Kuliah
              </label>
              <Input {...register("course")} />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Tujuan Pembelajaran Utama
              </label>
              <Textarea rows={2} {...register("objective1")} />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Tujuan Pembelajaran Pendukung
              </label>
              <Textarea rows={2} {...register("objective2")} />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Target Miskonsepsi Statistik
              </label>
              <Textarea rows={2} {...register("misconception")} />
            </div>

            <Button type="submit" variant="primary" className="w-full">
              <Plus className="w-3.5 h-3.5" />
              <span>Simpan Topik</span>
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
