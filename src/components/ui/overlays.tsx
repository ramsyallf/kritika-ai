"use client";

import React, { useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle2, AlertTriangle, Info, AlertCircle } from "lucide-react";

// ─── TABS (macOS / iPadOS Segmented Control) ──────────────────────────────────
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (val: string) => void;
}
const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({
  defaultValue = "",
  value,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [internal, setInternal] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internal;
  const setActiveTab = (val: string) => {
    setInternal(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 p-1 rounded-[11px] bg-[#ECEFF5] shadow-[inset_0_1px_2px_rgba(16,42,86,0.05)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;
  const isActive = ctx.activeTab === value;

  return (
    <button
      type="button"
      onClick={() => ctx.setActiveTab(value)}
      className={cn(
        "px-3.5 py-1.5 rounded-[8px] text-[12.5px] font-medium tracking-[-0.01em] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer flex items-center gap-1.5",
        isActive
          ? "bg-white text-[#102A56] font-semibold shadow-[0_1px_3px_rgba(16,42,86,0.1),0_1px_1px_rgba(16,42,86,0.04)]"
          : "text-[#718096] hover:text-[#172033]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(TabsContext);
  if (!ctx || ctx.activeTab !== value) return null;
  return <div className={cn("mt-5", className)}>{children}</div>;
}

// ─── MODAL DIALOG (macOS Sheet / Dialog) ──────────────────────────────────────
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  maxWidth = "max-w-xl",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1B36]/25 backdrop-blur-md">
      <div
        className={cn(
          "w-full bg-white/95 backdrop-blur-xl rounded-[18px] border border-[#102A56]/[0.08] shadow-[0_24px_60px_-12px_rgba(11,27,54,0.22)] overflow-hidden max-h-[88vh] flex flex-col",
          maxWidth
        )}
      >
        <div className="px-6 py-4 border-b border-[#102A56]/[0.06] flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[16px] font-semibold tracking-[-0.015em] text-[#172033]">
              {title}
            </h3>
            {description && (
              <p className="text-[12.5px] text-[#718096] mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#102A56]/[0.06] text-[#718096] hover:text-[#172033] hover:bg-[#102A56]/[0.1] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span className="relative group inline-flex items-center">
      {children}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-[7px] bg-[#172033]/95 backdrop-blur-md text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-40 shadow-sm">
        {label}
      </span>
    </span>
  );
}

// ─── TOAST SYSTEM (macOS Notification Banner) ─────────────────────────────────
export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "info" | "warning" | "error";
}

interface ToastContextValue {
  notify: (toast: Omit<ToastItem, "id">) => void;
}

const ToastContext = createContext<ToastContextValue>({
  notify: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const notify = (t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3600);
  };

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#16A36A] shrink-0 mt-0.5" />,
    info: <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#E9A23B] shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-4 h-4 text-[#DC5353] shrink-0 mt-0.5" />,
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-white/90 backdrop-blur-xl rounded-[14px] border border-[#102A56]/[0.08] shadow-[0_12px_32px_-4px_rgba(16,42,86,0.12)] p-3.5 flex items-start gap-3 transition-all"
          >
            {icons[t.variant || "info"]}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#172033] tracking-[-0.01em]">
                {t.title}
              </p>
              {t.description && (
                <p className="text-[12px] text-[#718096] mt-0.5 leading-snug">
                  {t.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() =>
                setToasts((prev) => prev.filter((item) => item.id !== t.id))
              }
              className="text-[#718096] hover:text-[#172033] p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
