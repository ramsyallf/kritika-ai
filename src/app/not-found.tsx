import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/primitives";
import { KritikaLogoIcon } from "@/components/ui/kritika-logo";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-6 text-center">
      <KritikaLogoIcon
        size={52}
        className="mb-5 rounded-[15px] shadow-[0_8px_24px_-4px_rgba(16,42,86,0.25)]"
      />
      <p className="text-[12px] font-medium text-[#718096] tabular-nums">
        404 · Halaman Tidak Ditemukan
      </p>
      <h1 className="text-[24px] font-semibold tracking-[-0.025em] text-[#172033] mt-1">
        Halaman yang Anda cari tidak tersedia.
      </h1>
      <p className="text-[13.5px] text-[#718096] max-w-sm mt-1.5 mb-6">
        Kembali ke Beranda Pembelajaran KRITIKA AI atau Dashboard Dosen.
      </p>
      <Link href="/student/dashboard">
        <Button variant="primary">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Button>
      </Link>
    </div>
  );
}
