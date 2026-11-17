import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}

export function formatPValue(p: number): string {
  if (p < 0.001) return "< 0.001 ***";
  if (p < 0.01) return `${p.toFixed(3)} **`;
  if (p < 0.05) return `${p.toFixed(3)} *`;
  return p.toFixed(3);
}

export function createId(prefix = "id"): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function getNowTimeString(): string {
  return new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

