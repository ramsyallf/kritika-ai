"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { generateSocraticMentorReply } from "@/lib/ai-mentor-service";
import { createId, getNowTimeString } from "@/lib/utils";
import {
  SOCRATIC_PROMPT_STARTERS,
  MENTOR_CONTEXT_PANEL_DATA,
} from "@/mock-data/mentor-conversations";
import {
  Card,
  Button,
  Textarea,
  ProgressBar,
} from "@/components/ui/primitives";
import { KritikaLogoIcon } from "@/components/ui/kritika-logo";
import {
  ArrowUp,
  RotateCcw,
  LineChart,
  Check,
} from "lucide-react";

const MOVE_LABELS_ID: Record<string, string> = {
  "Clarifying Question": "Pertanyaan Klarifikasi",
  "Challenging Assumptions": "Menguji Asumsi",
  "Requesting Evidence": "Meminta Bukti Statistik",
  Counterargument: "Argumen Tandingan",
  "Reflective Questioning": "Pertanyaan Reflektif",
};

const DIMENSION_LABELS_ID: Record<string, string> = {
  interpretation: "Interpretasi",
  analysis: "Analisis",
  evaluation: "Evaluasi",
  inference: "Inferensi",
  explanation: "Eksplanasi",
  selfRegulation: "Regulasi Diri",
};

export default function StudentMentorPage() {
  const {
    mentorMessages,
    addMentorMessage,
    resetMentorConversation,
    completeStage,
  } = useAppStore();

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mentorMessages, isThinking]);

  const handleSendMessage = async (textOverride?: string) => {
    const content = (textOverride ?? input).trim();
    if (!content || isThinking) return;

    const studentMsg = {
      id: createId("std"),
      sender: "student" as const,
      content,
      timestamp: `${getNowTimeString()} WIB`,
    };

    const updatedHistory = [...mentorMessages, studentMsg];
    addMentorMessage(studentMsg);
    if (!textOverride) setInput("");
    setIsThinking(true);

    try {
      const response = await generateSocraticMentorReply(
        content,
        updatedHistory
      );
      const replyTime = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
      addMentorMessage({
        id: `mnt-${Date.now() + 1}`,
        sender: "mentor",
        content: response.replyText,
        timestamp: `${replyTime} WIB`,
        socraticMove: response.socraticMove,
        targetDimension: response.targetDimension,
        highlightedConcept: response.highlightedConcept,
      });
      completeStage(2);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const studentTurns = mentorMessages.filter(
    (m) => m.sender === "student"
  ).length;
  const dialogueProgress = Math.min(100, Math.round((studentTurns / 4) * 100));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[12.5px] font-medium text-[#718096]">
            Tahap 2 dari 6 · Fase Reflection · Guardrail Pedagogis Aktif
          </p>
          <h1 className="text-[28px] sm:text-[30px] font-semibold tracking-[-0.025em] text-[#102A56] mt-0.5">
            Dialog dan Investigasi AI Mentor
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetMentorConversation}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Atur Ulang Dialog</span>
          </Button>
          <Link href="/student/learning?stage=3">
            <Button variant="primary" size="sm">
              <span>Lanjut ke Refleksi Antara</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* KIRI: AREA PERCAKAPAN UTAMA (8 kolom) */}
        <Card className="lg:col-span-8 flex flex-col h-[700px] overflow-hidden">
          {/* Header AI Mentor */}
          <div className="px-6 py-3.5 bg-white/90 backdrop-blur-md border-b border-[#102A56]/[0.06] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <KritikaLogoIcon
                size={32}
                className="rounded-[9px] shadow-[0_2px_8px_rgba(16,42,86,0.18)]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[14px] font-semibold text-[#172033]">
                    AI Mentor Sokratik KRITIKA AI
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#16A36A] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]" />
                    Mitra Berpikir Kritis
                  </span>
                </div>
                <p className="text-[11.5px] text-[#718096]">
                  Kasus: Regresi Penjualan &amp; Iklan Hub Distribusi (R² =
                  0,914 · β₁ = 0,85 · p = 0,003 · VIF = 11,42)
                </p>
              </div>
            </div>

            <span className="hidden sm:inline text-[11.5px] text-[#718096]">
              Tidak memberikan jawaban akhir
            </span>
          </div>

          {/* Aliran Pesan */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-[#F7F9FC]/45">
            {mentorMessages.map((msg) => {
              const isMentor = msg.sender === "mentor";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isMentor ? "items-start" : "items-end"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5 px-1 text-[11.5px] text-[#718096]">
                    <span className="font-medium text-[#172033]">
                      {isMentor ? "AI Mentor" : "Anda (Mahasiswa)"}
                    </span>
                    <span className="tabular-nums">{msg.timestamp}</span>
                    {isMentor && msg.socraticMove && (
                      <>
                        <span>·</span>
                        <span className="text-[#2563EB] font-medium">
                          {MOVE_LABELS_ID[msg.socraticMove] || msg.socraticMove}
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    className={`max-w-[82%] px-5 py-3.5 text-[13.5px] leading-[1.6] ${
                      isMentor
                        ? "bg-white text-[#172033] rounded-[16px] rounded-tl-[5px] border border-[#102A56]/[0.075] shadow-[0_1px_2px_rgba(16,42,86,0.03)]"
                        : "bg-[#102A56] text-white rounded-[16px] rounded-tr-[5px] shadow-[0_2px_8px_rgba(16,42,86,0.12)]"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    {isMentor && msg.highlightedConcept && (
                      <div className="mt-3 pt-2.5 border-t border-[#102A56]/[0.06] flex items-center justify-between text-[11.5px] text-[#718096]">
                        <span>Fokus: {msg.highlightedConcept}</span>
                        {msg.targetDimension && (
                          <span>
                            Dimensi:{" "}
                            {DIMENSION_LABELS_ID[msg.targetDimension] ||
                              msg.targetDimension}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="flex flex-col items-start">
                <span className="text-[11.5px] text-[#718096] mb-1.5 px-1">
                  AI Mentor sedang menyusun pertanyaan Sokratik…
                </span>
                <div className="bg-white border border-[#102A56]/[0.075] rounded-[16px] rounded-tl-[5px] px-4 py-3 flex items-center gap-2 text-[12.5px] text-[#718096]">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#102A56]/50 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#102A56]/50 animate-pulse [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#102A56]/50 animate-pulse [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Pilihan Respon Cepat */}
          <div className="px-5 py-2.5 bg-white border-t border-[#102A56]/[0.06] flex items-center gap-2 overflow-x-auto">
            {SOCRATIC_PROMPT_STARTERS.map((starter) => (
              <button
                key={starter.label}
                type="button"
                disabled={isThinking}
                onClick={() => handleSendMessage(starter.promptText)}
                className="px-3 py-1 rounded-full bg-[#F7F9FC] hover:bg-[#EAF2FF] text-[12px] font-medium text-[#172033] hover:text-[#102A56] border border-[#102A56]/[0.07] transition-colors whitespace-nowrap cursor-pointer"
              >
                {starter.label}
              </button>
            ))}
          </div>

          {/* Kolom Input Pesan */}
          <div className="p-4 bg-white border-t border-[#102A56]/[0.06]">
            <div className="relative flex items-end gap-2">
              <Textarea
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Sampaikan argumen statistik, uji asumsi, atau kritisi kesimpulan AI di sini…"
                className="resize-none pr-12 text-[13.5px] rounded-[13px]"
              />
              <button
                type="button"
                disabled={!input.trim() || isThinking}
                onClick={() => handleSendMessage()}
                aria-label="Kirim pesan"
                className="absolute right-2.5 bottom-2.5 w-8 h-8 rounded-full bg-[#102A56] hover:bg-[#0B1B36] disabled:opacity-30 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#718096] mt-2 px-1">
              <span>Tekan Enter untuk mengirim · Shift + Enter untuk baris baru</span>
              <span>Abstraksi Layanan AI Sokratik Lokal</span>
            </div>
          </div>
        </Card>

        {/* KANAN: PANEL KONTEKSTUAL (4 kolom) */}
        <Card className="lg:col-span-4 p-6 divide-y divide-[#102A56]/[0.06]">
          <div className="pb-5">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[12px] font-semibold text-[#172033]">
                Progres Dialog Kritis
              </span>
              <span className="text-[12.5px] font-semibold text-[#102A56] tabular-nums">
                {dialogueProgress}%
              </span>
            </div>
            <ProgressBar value={dialogueProgress} variant="blue" size="sm" />
            <div className="flex justify-between text-[11.5px] text-[#718096] mt-2.5 tabular-nums">
              <span>{mentorMessages.length} pesan percakapan</span>
              <span>2 miskonsepsi diuji</span>
            </div>
          </div>

          <div className="py-5 space-y-1.5">
            <span className="text-[11px] font-medium text-[#718096]">
              Topik Pembelajaran Saat Ini
            </span>
            <h3 className="text-[14.5px] font-semibold text-[#172033]">
              {MENTOR_CONTEXT_PANEL_DATA.topic}
            </h3>
            <p className="text-[12px] text-[#718096]">
              {MENTOR_CONTEXT_PANEL_DATA.courseCode}
            </p>
          </div>

          <div className="py-5 space-y-2.5">
            <span className="text-[11px] font-medium text-[#718096] block">
              Tujuan Pembelajaran
            </span>
            <ul className="space-y-2 text-[12.5px] text-[#172033]">
              {MENTOR_CONTEXT_PANEL_DATA.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                  <span className="leading-snug">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-5 space-y-3">
            <span className="text-[11px] font-medium text-[#718096] block">
              Panduan Berpikir Kritis Sokratik
            </span>
            <div className="space-y-2.5">
              {MENTOR_CONTEXT_PANEL_DATA.criticalThinkingGuidelines.map(
                (item) => (
                  <div key={item.type} className="text-[12px]">
                    <p className="font-semibold text-[#172033]">{item.type}</p>
                    <p className="text-[#718096] leading-snug mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
