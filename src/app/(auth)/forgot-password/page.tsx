"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input } from "@/components/ui/primitives";
import { KritikaLogoIcon } from "@/components/ui/kritika-logo";
import { ArrowLeft, Check } from "lucide-react";

const resetSchema = z.object({
  email: z.string().email("Masukkan alamat email akademik @its.ac.id yang valid"),
});

type ResetValues = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "raka.pratama@student.its.ac.id",
    },
  });

  const onSubmit = async (data: ResetValues) => {
    await new Promise((r) => setTimeout(r, 300));
    setSubmittedEmail(data.email);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col justify-center items-center p-6">
      <div className="max-w-[390px] w-full">
        <div className="text-center mb-7">
          <KritikaLogoIcon
            size={52}
            className="mx-auto mb-4 rounded-[15px] shadow-[0_8px_24px_-4px_rgba(16,42,86,0.28)]"
          />
          <h1 className="text-[22px] font-semibold tracking-[-0.025em] text-[#172033]">
            Atur Ulang Kata Sandi
          </h1>
          <p className="text-[13px] text-[#718096] mt-1">
            Masukkan email akademik ITS Anda untuk menerima tautan pemulihan.
          </p>
        </div>

        <Card className="p-6 sm:p-7">
          {!submittedEmail ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-[#172033] mb-1.5">
                  Email Akademik
                </label>
                <Input
                  type="email"
                  placeholder="nama@student.its.ac.id"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[11.5px] text-[#DC5353] mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="w-full"
              >
                Kirim Tautan Pemulihan
              </Button>
            </form>
          ) : (
            <div className="text-center py-3 space-y-2.5">
              <div className="w-9 h-9 rounded-full bg-[#16A36A]/10 text-[#16A36A] flex items-center justify-center mx-auto">
                <Check className="w-4 h-4" />
              </div>
              <h2 className="text-[15.5px] font-semibold text-[#172033]">
                Tautan pemulihan terkirim
              </h2>
              <p className="text-[12.5px] text-[#718096]">
                Instruksi pengaturan ulang telah dikirim ke{" "}
                <strong className="text-[#172033]">{submittedEmail}</strong>.
              </p>
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-[#102A56]/[0.06] flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#2563EB] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Halaman Masuk
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
