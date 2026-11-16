"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "@/lib/store";
import { ClassCohort } from "@/types";
import {
  Card,
  Button,
  Input,
  ProgressBar,
} from "@/components/ui/primitives";
import { Modal, useToast } from "@/components/ui/overlays";
import { Plus } from "lucide-react";

const STATUS_LABELS_ID: Record<string, string> = {
  Excelling: "Sangat Baik",
  "On Track": "Sesuai Target",
  "Needs Attention": "Perlu Perhatian",
  "At Risk": "Perlu Pendampingan",
};

const createClassSchema = z.object({
  code: z.string().min(3, "Kode kelas wajib diisi"),
  name: z.string().min(5, "Nama kelas wajib diisi"),
  courseName: z.string().min(3, "Nama mata kuliah wajib diisi"),
  schedule: z.string().min(5, "Jadwal wajib diisi"),
  room: z.string().min(3, "Laboratorium / ruangan wajib diisi"),
  studentCount: z.number().min(5).max(100),
  activeTopic: z.string().min(5, "Topik aktif wajib diisi"),
});

type CreateClassForm = z.infer<typeof createClassSchema>;

export default function LecturerClassesPage() {
  const { classes, addClass, students } = useAppStore();
  const { notify } = useToast();

  const [createOpen, setCreateOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassCohort>(classes[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClassForm>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      code: "ALT-2204-C",
      name: "Metode Regresi — Kelas C (Analitika Logistik Terapan)",
      courseName: "Metode Regresi (ALT-2204)",
      schedule: "Kamis, 13:00 – 15:30 WIB",
      room: "Lab Komputer Statistika 3, ITS",
      studentCount: 32,
      activeTopic: "CPMK-3: Pengujian Asumsi Klasik (VIF & IIDN)",
    },
  });

  const onSubmit = (data: CreateClassForm) => {
    const newCls: ClassCohort = {
      id: `cls-${Date.now()}`,
      ...data,
      semester: "Semester Genap 2026/2027",
      averageProgress: 15,
      averageCriticalThinking: 64,
      stageCompletionRate: 16,
      status: "Active",
    };
    addClass(newCls);
    setSelectedClass(newCls);
    setCreateOpen(false);
    reset();
    notify({
      title: `Kelas ${data.code} berhasil dibuat`,
      variant: "success",
    });
  };

  const classStudents = students.filter(
    (s) => s.classCode === selectedClass?.code
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[12.5px] font-medium text-[#718096]">
            Semester Genap 2026/2027 · Departemen Statistika Bisnis ITS
          </p>
          <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
            Manajemen Kelas
          </h1>
        </div>

        <Button variant="primary" onClick={() => setCreateOpen(true)}>
          <Plus className="w-3.5 h-3.5" />
          <span>Buat Kelas Baru</span>
        </Button>
      </div>

      {/* Daftar Kelas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {classes.map((cls) => {
          const isSelected = selectedClass?.id === cls.id;
          return (
            <Card
              key={cls.id}
              onClick={() => setSelectedClass(cls)}
              className={`p-6 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? "ring-1.5 ring-[#2563EB] shadow-[0_8px_28px_-6px_rgba(37,99,235,0.12)]"
                  : "hover:border-[#102A56]/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11.5px] text-[#718096] mb-1.5">
                  <span className="font-medium text-[#2563EB]">{cls.code}</span>
                  <span>{cls.studentCount} mahasiswa</span>
                </div>
                <h3 className="text-[16.5px] font-semibold text-[#172033]">
                  {cls.name}
                </h3>
                <p className="text-[12.5px] text-[#718096] mt-1">
                  {cls.schedule} · {cls.room}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#102A56]/[0.06] space-y-2.5">
                <div className="flex justify-between text-[12px] tabular-nums">
                  <span className="text-[#718096]">Progres Pembelajaran</span>
                  <span className="font-semibold text-[#102A56]">
                    {cls.averageProgress}%
                  </span>
                </div>
                <ProgressBar
                  value={cls.averageProgress}
                  variant="navy"
                  size="sm"
                />
                <div className="flex justify-between text-[11.5px] text-[#718096] pt-1 tabular-nums">
                  <span>Rata-rata Berpikir Kritis</span>
                  <span className="font-medium text-[#172033]">
                    {cls.averageCriticalThinking} / 100
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detail Kelas Terpilih */}
      {selectedClass && (
        <Card className="p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#102A56]/[0.06] pb-4">
            <div>
              <span className="text-[12px] font-medium text-[#2563EB]">
                {selectedClass.code} · {selectedClass.semester}
              </span>
              <h3 className="text-[19px] font-semibold text-[#172033] mt-0.5">
                {selectedClass.name}
              </h3>
              <p className="text-[12.5px] text-[#718096] mt-0.5">
                Topik Aktif: {selectedClass.activeTopic}
              </p>
            </div>
            <div className="flex items-center gap-6 tabular-nums">
              <div>
                <span className="text-[11px] text-[#718096] block">
                  Penyelesaian Tahap
                </span>
                <span className="text-[17px] font-semibold text-[#172033]">
                  {selectedClass.stageCompletionRate}%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#718096] block">
                  Rata-rata Skor Kritis
                </span>
                <span className="text-[17px] font-semibold text-[#102A56]">
                  {selectedClass.averageCriticalThinking}
                </span>
              </div>
            </div>
          </div>

          {classStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] tabular-nums">
                <thead className="text-[#718096] border-b border-[#102A56]/[0.07]">
                  <tr>
                    <th className="py-2.5 pr-4 font-medium">Nama Mahasiswa</th>
                    <th className="py-2.5 px-4 font-medium">NIM (Sampel)</th>
                    <th className="py-2.5 px-4 font-medium">Tahap Saat Ini</th>
                    <th className="py-2.5 px-4 font-medium text-right">
                      Progres
                    </th>
                    <th className="py-2.5 px-4 font-medium text-right">
                      Skor Kritis
                    </th>
                    <th className="py-2.5 pl-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#102A56]/[0.05]">
                  {classStudents.slice(0, 10).map((s) => (
                    <tr key={s.id} className="hover:bg-[#F7F9FC]">
                      <td className="py-2.5 pr-4 font-medium text-[#172033]">
                        {s.name}
                      </td>
                      <td className="py-2.5 px-4 text-[#718096] font-mono text-[12px]">
                        {s.nim}
                      </td>
                      <td className="py-2.5 px-4 text-[#718096]">
                        {s.currentStageTitle}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        {s.learningProgress}%
                      </td>
                      <td className="py-2.5 px-4 text-right font-semibold text-[#102A56]">
                        {s.criticalThinkingScore}
                      </td>
                      <td className="py-2.5 pl-4 text-[#718096]">
                        {STATUS_LABELS_ID[s.status] || s.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[13px] text-[#718096]">
              Kelas baru telah dibuat dan siap untuk impor daftar peserta
              mahasiswa.
            </p>
          )}
        </Card>
      )}

      {/* Modal Buat Kelas Baru */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Buat Kelas Baru"
        description="Konfigurasikan kelas baru untuk pembelajaran Metode Regresi berbasis KRITIKA AI."
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Kode Kelas
              </label>
              <Input {...register("code")} />
              {errors.code && (
                <p className="text-[11px] text-[#DC5353] mt-1">
                  {errors.code.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Jumlah Mahasiswa
              </label>
              <Input
                type="number"
                {...register("studentCount", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#172033] mb-1">
              Nama Kelas
            </label>
            <Input {...register("name")} />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#172033] mb-1">
              Mata Kuliah
            </label>
            <Input {...register("courseName")} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Jadwal Perkuliahan
              </label>
              <Input {...register("schedule")} />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1">
                Laboratorium / Ruangan
              </label>
              <Input {...register("room")} />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#172033] mb-1">
              Topik CPMK Aktif
            </label>
            <Input {...register("activeTopic")} />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#102A56]/[0.06]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCreateOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan Kelas
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
