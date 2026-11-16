"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserRole,
  LearningStage,
  MentorMessage,
  ClassCohort,
  LearningTopic,
  LearningCase,
  StudentRecord,
} from "@/types";
import { INITIAL_LEARNING_STAGES } from "@/mock-data/courses";
import { INITIAL_MENTOR_MESSAGES } from "@/mock-data/mentor-conversations";
import {
  INITIAL_CLASSES,
  INITIAL_TOPICS,
  INITIAL_CASES,
} from "@/mock-data/lecturer-data";
import { STUDENTS_LIST } from "@/mock-data/students";

interface StudentSubmissions {
  stage1InitialResponse: string;
  stage3ReflectionItems: {
    initialAssumption: string;
    newFindings: string;
    understandingShift: string;
  };
  stage3IntermediateReflection: string;
  stage4WorkspaceInterpretation: string;
  stage5IndependentAssessment: {
    submitted: boolean;
    selectedAnalyses: {
      regressionModeling: boolean;
      assumptionTesting: boolean;
      modelSelection: boolean;
    };
    modelChoice: string;
    argumentText: string;
    statisticalJustification: string;
    assumptionRemediation: string;
    practicalRecommendation: string;
    submittedAt?: string;
    tabSwitchCount: number;
    fullscreenExitCount: number;
  };
  stage6FinalItems: {
    perspectiveChange: string;
    principlesGained: string;
    futureStrategy: string;
    transferApplication: string;
  };
  stage6FinalReflection: string;
}

const DEFAULT_SUBMISSIONS: StudentSubmissions = {
  stage1InitialResponse:
    "Berdasarkan hasil regresi OLS pada 48 hub distribusi Jawa–Bali, variabel Biaya Iklan memiliki koefisien positif β₁ = 0,85 dengan p-value = 0,003 serta nilai R² sebesar 0,914 (F = 155,84; p < 0,001). Karena p < 0,05 dan R² di atas 90%, saya menyimpulkan bahwa pengeluaran iklan sangat efektif mendorong penjualan dan manajemen sebaiknya segera menaikkan anggaran iklan di seluruh hub.",
  stage3ReflectionItems: {
    initialAssumption:
      "Pada awalnya saya berasumsi bahwa nilai R² = 0,914 dan p-value = 0,003 sudah cukup membuktikan bahwa model regresi valid dan biaya iklan menguntungkan secara bisnis.",
    newFindings:
      "Melalui dialog kritis bersama AI Mentor, saya menemukan bahwa: (1) β₁ = 0,85 berarti setiap tambahan Rp1 juta iklan hanya menghasilkan Rp0,85 juta penjualan (rugi bersih), dan (2) klaim AI yang mengabaikan VIF = 11,42 serta uji Breusch-Pagan p = 0,008 adalah keliru karena multikolinearitas dan heteroskedastisitas merusak validitas uji-t.",
    understandingShift:
      "Pemahaman saya berubah dari sekadar melihat angka p < 0,05 dan R² tinggi menjadi mengevaluasi besaran dampak praktis bisnis, memeriksa multikolinearitas (VIF), serta memastikan asumsi residual IIDN terpenuhi sebelum mengambil keputusan.",
  },
  stage3IntermediateReflection:
    "Melalui dialog Sokratik dengan AI Mentor, saya menyadari dua kekeliruan utama pada argumentasi awal Tahap 1 saya: (1) Signifikansi statistik (p = 0,003) tidak otomatis berarti menguntungkan secara bisnis—koefisien β₁ = 0,85 menunjukkan tambahan penjualan Rp0,85 juta per Rp1 juta biaya iklan (di bawah titik impas). (2) Nilai R² tinggi (0,914) menyembunyikan multikolinearitas berat (VIF = 11,42) antara Biaya Iklan dan Diskon Promosi serta pelanggaran homoskedastisitas (Breusch-Pagan p = 0,008).",
  stage4WorkspaceInterpretation:
    "Berdasarkan pemeriksaan diagnostik pada dataset baru di Workspace Statistik (VIF X₁ = 11,42; X₃ = 10,86; Breusch-Pagan p = 0,008), saya merekomendasikan penggabungan atau eliminasi variabel diskon yang kolinear, penggunaan HC3 robust standard errors, serta memprioritaskan penambahan Cakupan Rute Armada (β₂ = 4,18; p < 0,001; VIF = 1,84) yang terbukti stabil secara statistik dan menguntungkan secara operasional.",
  stage5IndependentAssessment: {
    submitted: false,
    selectedAnalyses: {
      regressionModeling: true,
      assumptionTesting: true,
      modelSelection: true,
    },
    modelChoice:
      "Model B — Subset Terbaik 3 Prediktor (X₁, X₂, X₃ · R² = 0,829 · Adj R² = 0,820 · Cp = 3,9 · VIF Maks = 1,62)",
    argumentText:
      "Berdasarkan pemodelan regresi, uji asumsi klasik, dan pemilihan model yang saya lakukan secara mandiri: saya menolak klaim yang memilih Model C (9 variabel stepwise) hanya karena R² mentahnya 0,834. Pada Model C, Adjusted R² justru turun menjadi 0,804, Mallows' Cp melonjak ke 14,8 (indikasi overfitting berat), dan VIF mencapai 13,70. Sebaliknya, Model B (X₁: Gerakan Crane, X₂: Durasi Bea Cukai, X₃: Kepadatan Lapangan) menghasilkan Adjusted R² tertinggi (0,820), nilai Cp = 3,9 yang mendekati p+1 (4), serta memenuhi seluruh asumsi klasik IIDN (Shapiro-Wilk p = 0,54; Breusch-Pagan p = 0,39; VIF < 2,0). Secara operasional, manajemen Pelabuhan Tanjung Perak harus memprioritaskan percepatan Durasi Bea Cukai (β₂ = 2,45 jam/unit).",
    statisticalJustification:
      "Meskipun model stepwise 9 variabel memiliki R² mentah sedikit lebih tinggi (0,834 vs 0,829), nilai Adjusted R²-nya menurun dan Mallows' Cp = 14,8 membuktikan adanya overfitting. Model B mencapai Cp = 3,9 ≈ p+1 (4) dengan seluruh VIF < 2,0.",
    assumptionRemediation:
      "Uji normalitas Shapiro-Wilk (W = 0,981; p = 0,54) dan homoskedastisitas Breusch-Pagan (p = 0,39) pada Model B telah terpenuhi tanpa pelanggaran asumsi IIDN.",
    practicalRecommendation:
      "Manajemen operasional Terminal Tanjung Perak sebaiknya memfokuskan intervensi pada pengurangan Durasi Pemeriksaan Bea Cukai (β₂ = 2,45 jam) daripada memasukkan variabel administratif yang redundan.",
    tabSwitchCount: 0,
    fullscreenExitCount: 0,
  },
  stage6FinalItems: {
    perspectiveChange:
      "Cara pandang saya bertransformasi dari orientasi prosedural (sekadar mencari R² tertinggi dan p < 0,05) menjadi penalaran statistik kritis yang selalu memverifikasi asumsi dan konteks permasalahan nyata.",
    principlesGained:
      "1) Nilai R² tinggi tidak menjamin model bebas multikolinearitas atau overfitting; 2) Signifikansi statistik (p-value kecil) berbeda dengan signifikansi praktis bisnis; 3) Keluaran AI harus selalu diaudit dengan bukti uji diagnostik.",
    futureStrategy:
      "Setiap kali membangun model regresi, saya akan memeriksa matriks kolinearitas (VIF), memplot residual (uji IIDN), membandingkan Adjusted R² serta Mallows' Cp, dan mengecek selang kepercayaan parameter sebelum menyusun kesimpulan.",
    transferApplication:
      "Prinsip ini dapat langsung diterapkan pada peramalan permintaan rantai pasok, estimasi waktu pengiriman (lead-time) logistik, dan evaluasi kinerja gudang agar keputusan operasional tidak didasarkan pada korelasi semu.",
  },
  stage6FinalReflection:
    "Kerangka berpikir analitis saya telah bergeser dari pemeriksaan prosedural mekanis menjadi penalaran statistik kritis: (1) Selalu memverifikasi besaran dampak praktis dalam satuan nyata sebelum menyimpulkan dari p-value; (2) Mengaudit keluaran AI terhadap risiko multikolinearitas (VIF) dan pelanggaran residual IIDN; (3) Menggunakan prinsip parsimoni (Adjusted R² & Mallows' Cp) dalam memilih model terbaik untuk pengambilan keputusan logistik.",
};

interface AppStoreContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
  stages: LearningStage[];
  completeStage: (stageNumber: number) => void;
  submissions: StudentSubmissions;
  updateSubmission: <K extends keyof StudentSubmissions>(
    key: K,
    value: StudentSubmissions[K]
  ) => void;
  mentorMessages: MentorMessage[];
  addMentorMessage: (msg: MentorMessage) => void;
  resetMentorConversation: () => void;
  classes: ClassCohort[];
  addClass: (cls: ClassCohort) => void;
  topics: LearningTopic[];
  addTopic: (topic: LearningTopic) => void;
  cases: LearningCase[];
  addCase: (c: LearningCase) => void;
  updateCaseStatus: (
    id: string,
    status: LearningCase["validationStatus"],
    updatedScenario?: string
  ) => void;
  updateCaseItem: (updated: LearningCase) => void;
  students: StudentRecord[];
  updateStudentScore: (
    studentId: string,
    assessmentScore: number,
    ctScore: number
  ) => void;
}

const AppStoreContext = createContext<AppStoreContextValue | null>(null);

const STORAGE_KEY = "kritika_ai_state_id_v2";

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("student");
  const [stages, setStages] = useState<LearningStage[]>(INITIAL_LEARNING_STAGES);
  const [submissions, setSubmissions] =
    useState<StudentSubmissions>(DEFAULT_SUBMISSIONS);
  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>(
    INITIAL_MENTOR_MESSAGES
  );
  const [classes, setClasses] = useState<ClassCohort[]>(INITIAL_CLASSES);
  const [topics, setTopics] = useState<LearningTopic[]>(INITIAL_TOPICS);
  const [cases, setCases] = useState<LearningCase[]>(INITIAL_CASES);
  const [students, setStudents] = useState<StudentRecord[]>(STUDENTS_LIST);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.role) setRoleState(parsed.role);
        if (parsed.stages) setStages(parsed.stages);
        if (parsed.submissions) {
          setSubmissions({
            ...DEFAULT_SUBMISSIONS,
            ...parsed.submissions,
          });
        }
        if (parsed.mentorMessages) setMentorMessages(parsed.mentorMessages);
        if (parsed.classes) setClasses(parsed.classes);
        if (parsed.topics) setTopics(parsed.topics);
        if (parsed.cases) setCases(parsed.cases);
        if (parsed.students) setStudents(parsed.students);
      }
    } catch {
      // Ignore storage errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          role,
          stages,
          submissions,
          mentorMessages,
          classes,
          topics,
          cases,
          students,
        })
      );
    } catch {
      // Ignore quota errors
    }
  }, [
    hydrated,
    role,
    stages,
    submissions,
    mentorMessages,
    classes,
    topics,
    cases,
    students,
  ]);

  const setRole = (newRole: UserRole) => setRoleState(newRole);

  const completeStage = (stageNumber: number) => {
    setStages((prev) =>
      prev.map((st) => {
        if (st.stageNumber === stageNumber) {
          return {
            ...st,
            status: "Completed",
            progress: 100,
            completedAt: "Baru saja",
            score: st.score || 89,
          };
        }
        if (st.stageNumber === stageNumber + 1 && st.status === "Locked") {
          return {
            ...st,
            status: "Available",
            actionLabel:
              st.stageNumber === 6
                ? "Buka Portofolio Refleksi"
                : st.actionLabel,
          };
        }
        return st;
      })
    );
  };

  const updateSubmission = <K extends keyof StudentSubmissions>(
    key: K,
    value: StudentSubmissions[K]
  ) => {
    setSubmissions((prev) => ({ ...prev, [key]: value }));
  };

  const addMentorMessage = (msg: MentorMessage) => {
    setMentorMessages((prev) => [...prev, msg]);
  };

  const resetMentorConversation = () => {
    setMentorMessages(INITIAL_MENTOR_MESSAGES);
  };

  const addClass = (cls: ClassCohort) => {
    setClasses((prev) => [cls, ...prev]);
  };

  const addTopic = (topic: LearningTopic) => {
    setTopics((prev) => [topic, ...prev]);
  };

  const addCase = (c: LearningCase) => {
    setCases((prev) => [c, ...prev]);
  };

  const updateCaseStatus = (
    id: string,
    status: LearningCase["validationStatus"],
    updatedScenario?: string
  ) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              validationStatus: status,
              scenarioText: updatedScenario ?? c.scenarioText,
            }
          : c
      )
    );
  };

  const updateCaseItem = (updated: LearningCase) => {
    setCases((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const updateStudentScore = (
    studentId: string,
    assessmentScore: number,
    ctScore: number
  ) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              assessmentScore,
              criticalThinkingScore: ctScore,
              postTestScore: ctScore,
              nGain: Number(
                ((ctScore - s.preTestScore) / (100 - s.preTestScore)).toFixed(2)
              ),
            }
          : s
      )
    );
  };

  return (
    <AppStoreContext.Provider
      value={{
        role,
        setRole,
        stages,
        completeStage,
        submissions,
        updateSubmission,
        mentorMessages,
        addMentorMessage,
        resetMentorConversation,
        classes,
        addClass,
        topics,
        addTopic,
        cases,
        addCase,
        updateCaseStatus,
        updateCaseItem,
        students,
        updateStudentScore,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) {
    throw new Error("useAppStore must be used within AppStoreProvider");
  }
  return ctx;
}
