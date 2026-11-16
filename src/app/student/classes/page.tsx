"use client";

import React from "react";
import Link from "next/link";
import {
  CURRENT_COURSE,
  ENROLLED_CLASSES_STUDENT,
} from "@/mock-data/courses";
import { INITIAL_TOPICS } from "@/mock-data/lecturer-data";
import {
  Card,
  Button,
  ProgressBar,
} from "@/components/ui/primitives";
import {
  ArrowRight,
  Check,
} from "lucide-react";

const TOPIC_STATUS_ID: Record<string, string> = {
  Completed: "Selesai",
  Active: "Aktif",
  Draft: "Draf",
};

export default function StudentClassesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[12.5px] font-medium text-[#718096]">
            {CURRENT_COURSE.semester} · {CURRENT_COURSE.department}
          </p>
          <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
            Kelas Saya
          </h1>
        </div>
        <Link href="/student/learning">
          <Button variant="primary">
            <span>Lanjutkan Siklus Belajar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Daftar Kelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ENROLLED_CLASSES_STUDENT.map((cls) => (
          <Card key={cls.id} className="p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[12px] text-[#718096] mb-1.5">
                <span className="font-medium text-[#2563EB]">{cls.code}</span>
                <span>{cls.activeBadge}</span>
              </div>
              <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-[#172033]">
                {cls.name}
              </h2>
              <p className="text-[13px] text-[#718096] mt-1">
                {cls.lecturer} · {cls.coLecturers}
              </p>

              <div className="mt-5 pt-4 border-t border-[#102A56]/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
                <div>
                  <span className="text-[11px] text-[#718096] block">
                    Jadwal Perkuliahan
                  </span>
                  <span className="text-[#172033] font-medium">
                    {cls.schedule}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#718096] block">
                    Laboratorium
                  </span>
                  <span className="text-[#172033] font-medium truncate block">
                    {cls.lab}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#102A56]/[0.06] space-y-4">
              <div>
                <div className="flex justify-between text-[12px] mb-1.5 tabular-nums">
                  <span className="text-[#718096] truncate pr-3">
                    {cls.currentTopic}
                  </span>
                  <span className="font-semibold text-[#102A56]">
                    {cls.completedStages}/{cls.totalStages} tahap
                  </span>
                </div>
                <ProgressBar value={cls.progress} variant="navy" size="sm" />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[12px] text-[#718096]">
                  40 Mahasiswa Peserta
                </span>
                <div className="flex items-center gap-2">
                  <Link href="/student/workspace">
                    <Button variant="outline" size="sm">
                      Workspace
                    </Button>
                  </Link>
                  <Link href="/student/learning">
                    <Button variant="primary" size="sm">
                      <span>Buka Alur Belajar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Silabus & Modul CPMK */}
      <Card className="p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#102A56]/[0.06] pb-4">
          <div>
            <h3 className="text-[17px] font-semibold text-[#172033]">
              Silabus Mata Kuliah &amp; Modul CPMK
            </h3>
            <p className="text-[12.5px] text-[#718096] mt-0.5">
              Buku Referensi: {CURRENT_COURSE.textbookReference}
            </p>
          </div>
          <span className="text-[12px] text-[#718096] shrink-0">
            ISBN 978-623-318-243-0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INITIAL_TOPICS.map((mod) => (
            <div
              key={mod.id}
              className="p-5 rounded-[13px] bg-[#F7F9FC] border border-[#102A56]/[0.06] space-y-2.5"
            >
              <div className="flex items-center justify-between text-[11.5px] text-[#718096]">
                <span className="font-medium text-[#102A56]">
                  {mod.code} · {mod.cpmk}
                </span>
                <span>{TOPIC_STATUS_ID[mod.status] || mod.status}</span>
              </div>
              <h4 className="text-[15px] font-semibold text-[#172033]">
                {mod.title}
              </h4>
              <ul className="space-y-1.5 text-[12.5px] text-[#718096] pt-1">
                {mod.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
