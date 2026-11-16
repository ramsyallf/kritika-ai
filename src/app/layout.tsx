import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppStoreProvider } from "@/lib/store";
import { ToastProvider } from "@/components/ui/overlays";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "KRITIKA AI — Platform Berpikir Kritis & Pembelajaran Statistika",
  description:
    "Platform Pembelajaran Transformatif Socratic untuk Analisis Regresi & Berpikir Kritis Statistika — Departemen Statistika Bisnis, ITS Surabaya.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="antialiased bg-[#F7F9FC] text-[#172033] selection:bg-[#2563EB]/15 selection:text-[#102A56]"
      >
        <AppStoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </AppStoreProvider>
      </body>
    </html>
  );
}
