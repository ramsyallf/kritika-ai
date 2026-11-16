"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, Inbox } from "lucide-react";

// ─── BUTTON (Apple HIG Pill & Squircle Push Button) ──────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "navy"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "soft";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary:
        "bg-[#102A56] text-white hover:bg-[#0B1B36] shadow-[0_2px_8px_-2px_rgba(16,42,86,0.28),inset_0_1px_0_rgba(255,255,255,0.16)] border border-transparent",
      navy: "bg-[#0B1B36] text-white hover:bg-[#102A56] shadow-[0_2px_8px_-2px_rgba(11,27,54,0.3),inset_0_1px_0_rgba(255,255,255,0.14)] border border-transparent",
      secondary:
        "bg-[#102A56]/[0.06] text-[#172033] hover:bg-[#102A56]/[0.1] border border-transparent",
      outline:
        "bg-white text-[#172033] hover:bg-[#F7F9FC] border border-[#102A56]/[0.1] shadow-[0_1px_2px_rgba(16,42,86,0.03)]",
      ghost:
        "bg-transparent text-[#718096] hover:text-[#172033] hover:bg-[#102A56]/[0.05] border border-transparent",
      soft: "bg-[#EAF2FF] text-[#102A56] hover:bg-[#DCE8FF] border border-transparent",
      danger:
        "bg-[#DC5353] text-white hover:bg-[#C53E3E] shadow-[0_1px_2px_rgba(220,83,83,0.2)] border border-transparent",
    };

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "h-8 px-3.5 text-[12.5px] rounded-full gap-1.5",
      md: "h-9.5 px-4.5 text-[13px] rounded-full gap-2",
      lg: "h-11 px-6 text-[14px] rounded-full gap-2",
      icon: "h-9 w-9 rounded-full justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium tracking-[-0.01em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30 disabled:opacity-45 disabled:pointer-events-none active:scale-[0.97]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// ─── CARD (Apple Continuous Squircle Surface) ─────────────────────────────────
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white rounded-[22px] border border-[#102A56]/[0.06] shadow-[0_2px_16px_-4px_rgba(16,42,86,0.04),0_1px_2px_rgba(16,42,86,0.02)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-7 pt-7 pb-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-[18px] font-semibold tracking-[-0.022em] text-[#172033] leading-snug",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[13.5px] text-[#718096] mt-1 leading-relaxed tracking-[-0.005em]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-7 pb-7 pt-2", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-7 py-4 bg-[#F7F9FC]/70 border-t border-[#102A56]/[0.05] rounded-b-[22px] flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── BADGE (Apple Minimal Capsule) ────────────────────────────────────────────
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "navy"
    | "blue"
    | "soft"
    | "success"
    | "warning"
    | "error"
    | "neutral"
    | "outline";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
    navy: "bg-[#102A56]/[0.08] text-[#102A56] border-transparent",
    blue: "bg-[#2563EB]/[0.1] text-[#2563EB] border-transparent",
    soft: "bg-[#EAF2FF] text-[#102A56] border-transparent",
    success: "bg-[#16A36A]/[0.1] text-[#138554] border-transparent",
    warning: "bg-[#E9A23B]/[0.12] text-[#A86B10] border-transparent",
    error: "bg-[#DC5353]/[0.1] text-[#C43C3C] border-transparent",
    neutral: "bg-[#102A56]/[0.05] text-[#718096] border-transparent",
    outline: "bg-white text-[#172033] border-[#102A56]/[0.09]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-medium tracking-[-0.005em] border leading-5 whitespace-nowrap",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ─── INPUT, TEXTAREA & SELECT (Apple Rounded Controls) ───────────────────────
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full h-10 px-3.5 rounded-[12px] bg-[#F7F9FC] hover:bg-[#F2F5FA] focus:bg-white border border-[#102A56]/[0.09] text-[13.5px] text-[#172033] placeholder:text-[#718096]/65 transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 disabled:opacity-60",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full p-4 rounded-[14px] bg-[#F7F9FC] hover:bg-[#F2F5FA] focus:bg-white border border-[#102A56]/[0.09] text-[13.5px] text-[#172033] leading-relaxed placeholder:text-[#718096]/65 transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 disabled:opacity-60",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "w-full h-10 px-3.5 rounded-[12px] bg-[#F7F9FC] hover:bg-[#F2F5FA] focus:bg-white border border-[#102A56]/[0.09] text-[13.5px] text-[#172033] transition-all duration-200 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 cursor-pointer",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

// ─── PROGRESS BAR (Apple Ultra-Thin Smooth Track) ────────────────────────────
export function ProgressBar({
  value,
  max = 100,
  variant = "blue",
  size = "md",
  showLabel = false,
  className,
}: {
  value: number;
  max?: number;
  variant?: "blue" | "navy" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const fillColors = {
    blue: "bg-[#2563EB]",
    navy: "bg-[#102A56]",
    success: "bg-[#16A36A]",
    warning: "bg-[#E9A23B]",
  };
  const heights = {
    sm: "h-[3px]",
    md: "h-1.5",
    lg: "h-2",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-[11.5px] text-[#718096] mb-1.5 tabular-nums">
          <span>Progres</span>
          <span className="font-medium text-[#172033]">{pct}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-[#102A56]/[0.06] rounded-full overflow-hidden",
          heights[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            fillColors[variant]
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-[22px] border border-[#102A56]/[0.06]",
        className
      )}
    >
      <div className="w-11 h-11 rounded-full bg-[#102A56]/[0.05] text-[#102A56] flex items-center justify-center mb-3.5">
        {icon || <Inbox className="w-4 h-4" />}
      </div>
      <h4 className="text-[15px] font-semibold text-[#172033]">{title}</h4>
      <p className="text-[13px] text-[#718096] max-w-sm mt-1 mb-5 leading-relaxed">
        {description}
      </p>
      {action}
    </div>
  );
}

// ─── LOADING SKELETON ─────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[12px] bg-[#102A56]/[0.05]",
        className
      )}
    />
  );
}
