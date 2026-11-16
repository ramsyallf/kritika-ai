"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { KritikaLogoIcon } from "@/components/ui/kritika-logo";
import {
  Home,
  FileText,
  MessageSquareCode,
  LineChart,
  ShieldCheck,
  FolderKanban,
  BookOpen,
  LayoutDashboard,
  Users,
  Layers,
  Sparkles,
  Database,
  ClipboardCheck,
  BarChart3,
  PanelLeft,
  Bell,
  ChevronRight,
  LogOut,
  ArrowLeftRight,
  Command,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STUDENT_NAV: NavItem[] = [
  { label: "Beranda", href: "/student/dashboard", icon: Home },
  { label: "Studi Kasus & Refleksi", href: "/student/learning", icon: FileText },
  { label: "Dialog AI Mentor", href: "/student/mentor", icon: MessageSquareCode },
  { label: "Tantangan Kasus Baru", href: "/student/workspace", icon: LineChart },
  { label: "Asesmen Mandiri", href: "/student/assessment", icon: ShieldCheck },
  { label: "Portofolio", href: "/student/portfolio", icon: FolderKanban },
  { label: "Kelas Saya", href: "/student/classes", icon: BookOpen },
];

const LECTURER_NAV: NavItem[] = [
  { label: "Ringkasan", href: "/lecturer/dashboard", icon: LayoutDashboard },
  { label: "Mahasiswa", href: "/lecturer/students", icon: Users },
  { label: "Kelas", href: "/lecturer/classes", icon: BookOpen },
  { label: "Topik & CPMK", href: "/lecturer/topics", icon: Layers },
  { label: "Generator Kasus AI", href: "/lecturer/cases", icon: Sparkles },
  { label: "Bank Soal", href: "/lecturer/question-bank", icon: Database },
  { label: "Hasil Asesmen", href: "/lecturer/assessments", icon: ClipboardCheck },
  { label: "Analitik", href: "/lecturer/analytics", icon: BarChart3 },
];

const ROUTE_LABELS: Record<string, string> = {
  student: "Mahasiswa",
  lecturer: "Dosen",
  dashboard: "Beranda",
  classes: "Kelas Saya",
  learning: "Studi Kasus & Refleksi",
  mentor: "Dialog AI Mentor",
  workspace: "Tantangan Kasus Baru",
  assessment: "Asesmen Mandiri",
  portfolio: "Portofolio",
  topics: "Topik & CPMK",
  cases: "Generator Kasus AI",
  "question-bank": "Bank Soal",
  students: "Mahasiswa",
  assessments: "Hasil Asesmen",
  analytics: "Analitik",
};

export function AppShell({
  role,
  children,
}: {
  role: "student" | "lecturer";
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setRole } = useAppStore();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = role === "student" ? STUDENT_NAV : LECTURER_NAV;
  const segments = pathname.split("/").filter(Boolean);

  const notifications =
    role === "student"
      ? [
          {
            id: "n1",
            title: "Tahap 4: Dataset Kasus Baru Tersedia",
            detail: "Studi kasus & dataset regresi tervalidasi siap dianalisis.",
            time: "15m",
          },
          {
            id: "n2",
            title: "Tahap 3: Refleksi Antara Tersimpan",
            detail: "Perubahan pemahaman dari asumsi awal telah direkam.",
            time: "2j",
          },
          {
            id: "n3",
            title: "Tahap 5: Asesmen Mandiri Terbuka",
            detail: "Mode tanpa Gen-AI (Copy-Paste nonaktif & lacak tab).",
            time: "1h",
          },
        ]
      : [
          {
            id: "l1",
            title: "Draf Kasus AI Menunggu Validasi",
            detail: "KR-CASE-104 siap ditinjau sebelum masuk Bank Soal.",
            time: "20m",
          },
          {
            id: "l2",
            title: "16 Mahasiswa Menyelesaikan Asesmen Mandiri",
            detail: "Rata-rata N-Gain kelas mencapai 0,56 (Target ≥ 0,30).",
            time: "1j",
          },
        ];

  const handleSwitchRole = () => {
    const target = role === "student" ? "lecturer" : "student";
    setRole(target);
    setProfileOpen(false);
    router.push(`/${target}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F9] text-[#172033] flex">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0B1B36]/20 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* APPLE FLOATING VIBRANCY SIDEBAR */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen bg-white/75 backdrop-blur-2xl flex flex-col border-r border-[#102A56]/[0.05] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none shrink-0",
          collapsed ? "w-[72px]" : "w-[248px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div
          className={cn(
            "h-16 px-5 flex items-center justify-between",
            collapsed && "justify-center px-0"
          )}
        >
          <Link
            href={`/${role}/dashboard`}
            className="flex items-center gap-2.5 min-w-0"
          >
            <KritikaLogoIcon
              size={30}
              className="rounded-[9px] shadow-[0_2px_8px_rgba(11,27,54,0.22)]"
            />
            {!collapsed && (
              <span className="font-semibold text-[15px] tracking-[-0.03em] text-[#0B1B36]">
                KRITIKA AI
              </span>
            )}
          </Link>

          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="hidden lg:flex p-1.5 rounded-full text-[#718096] hover:text-[#172033] hover:bg-[#102A56]/[0.05] transition-colors cursor-pointer"
              title="Ciutkan Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-[#718096] hover:text-[#172033]"
            aria-label="Tutup menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3.5 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-[13.5px] tracking-[-0.01em] transition-all duration-200",
                  isActive
                    ? "bg-[#102A56] text-white font-medium shadow-[0_4px_12px_-2px_rgba(16,42,86,0.22)]"
                    : "text-[#718096] font-normal hover:text-[#172033] hover:bg-[#102A56]/[0.04]",
                  collapsed && "justify-center px-0"
                )}
              >
                <Icon
                  className={cn(
                    "w-[16px] h-[16px] shrink-0 transition-colors",
                    isActive ? "text-white" : "text-[#718096]"
                  )}
                />
                {!collapsed && <span className=" truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Collapse Toggle (When Collapsed) */}
        {collapsed && (
          <div className="p-3 flex justify-center">
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              className="p-2 rounded-full text-[#718096] hover:text-[#172033] hover:bg-[#102A56]/[0.05] transition-colors cursor-pointer"
              title="Perluas Sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TRANSLUCENT APPLE TOP BAR */}
        <header className="sticky top-0 z-30 h-16 bg-[#F5F6F9]/80 backdrop-blur-xl px-6 lg:px-12 flex items-center justify-between gap-4">
          {/* Left: Mobile Menu + Minimal Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-full text-[#172033] hover:bg-[#102A56]/[0.05]"
              aria-label="Buka menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[13px] truncate"
            >
              <Link
                href={`/${role}/dashboard`}
                className="text-[#718096] hover:text-[#172033] transition-colors"
              >
                {ROUTE_LABELS[role]}
              </Link>
              {segments.slice(1).map((seg, idx) => (
                <React.Fragment key={seg + idx}>
                  <ChevronRight className="w-3.5 h-3.5 text-[#718096]/40 shrink-0" />
                  <span className="font-medium text-[#172033] truncate">
                    {ROUTE_LABELS[seg] || seg}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Right: Pill Role Switcher + Notifications + User Pill */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center p-1 rounded-full bg-[#102A56]/[0.06]">
              <Link
                href="/student/dashboard"
                onClick={() => setRole("student")}
                className={cn(
                  "px-3.5 py-1 rounded-full text-[12px] font-medium transition-all duration-200",
                  role === "student"
                    ? "bg-white text-[#102A56] shadow-[0_1px_3px_rgba(16,42,86,0.1)]"
                    : "text-[#718096] hover:text-[#172033]"
                )}
              >
                Mahasiswa
              </Link>
              <Link
                href="/lecturer/dashboard"
                onClick={() => setRole("lecturer")}
                className={cn(
                  "px-3.5 py-1 rounded-full text-[12px] font-medium transition-all duration-200",
                  role === "lecturer"
                    ? "bg-white text-[#102A56] shadow-[0_1px_3px_rgba(16,42,86,0.1)]"
                    : "text-[#718096] hover:text-[#172033]"
                )}
              >
                Dosen
              </Link>
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((o) => !o);
                  setProfileOpen(false);
                }}
                className="relative w-9 h-9 rounded-full bg-white border border-[#102A56]/[0.06] text-[#718096] hover:text-[#172033] flex items-center justify-center transition-colors cursor-pointer shadow-[0_1px_2px_rgba(16,42,86,0.03)]"
                aria-label="Notifikasi"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-[20px] border border-[#102A56]/[0.08] shadow-[0_20px_50px_-12px_rgba(16,42,86,0.16)] p-3 z-50">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-[#102A56]/[0.06]">
                    <span className="text-[13px] font-semibold text-[#172033]">
                      Notifikasi
                    </span>
                    <span className="text-[11px] text-[#718096]">
                      {notifications.length} baru
                    </span>
                  </div>
                  <div className="divide-y divide-[#102A56]/[0.05] mt-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="py-3 px-3 hover:bg-[#F7F9FC] rounded-[12px]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[12.5px] font-medium text-[#172033]">
                            {n.title}
                          </p>
                          <span className="text-[11px] text-[#718096] tabular-nums shrink-0">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#718096] mt-0.5 leading-snug">
                          {n.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((o) => !o);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-white border border-[#102A56]/[0.06] shadow-[0_1px_2px_rgba(16,42,86,0.03)] hover:bg-[#F7F9FC] transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#102A56] text-white text-[11px] font-medium flex items-center justify-center">
                  {role === "student" ? "RP" : "IR"}
                </div>
                <span className="hidden sm:inline text-[12.5px] font-medium text-[#172033]">
                  {role === "student" ? "Raka Pratama" : "Dr. Iis Dewi Ratih"}
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-[20px] border border-[#102A56]/[0.08] shadow-[0_20px_50px_-12px_rgba(16,42,86,0.16)] p-2 z-50">
                  <div className="px-3.5 py-2.5 border-b border-[#102A56]/[0.06]">
                    <p className="text-[13px] font-semibold text-[#172033]">
                      {role === "student"
                        ? "Raka Pratama Wijaya"
                        : "Dr. Iis Dewi Ratih, S.Si., M.Si."}
                    </p>
                    <p className="text-[11.5px] text-[#718096]">
                      {role === "student"
                        ? "D4 Analitika Logistik Terapan"
                        : "Departemen Statistika Bisnis, ITS"}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={handleSwitchRole}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-[10px] text-[12.5px] text-[#172033] hover:bg-[#F7F9FC] cursor-pointer"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>
                        Beralih ke{" "}
                        {role === "student" ? "Konsol Dosen" : "Mode Mahasiswa"}
                      </span>
                    </button>
                    <Link
                      href="/login"
                      onClick={() => setProfileOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-[10px] text-[12.5px] text-[#DC5353] hover:bg-[#DC5353]/[0.06]"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN PAGE CANVAS (Generous Apple Macro-Whitespace) */}
        <main className="flex-1 w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
