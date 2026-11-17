"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/overlays";
import { KritikaLogo, KritikaLogoIcon } from "@/components/ui/kritika-logo";
import {
  Button,
  Card,
  Input,
} from "@/components/ui/primitives";
import {
  ArrowRight,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Masukkan alamat email akademik yang valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  role: z.enum(["student", "lecturer"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useAppStore();
  const { notify } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "raka.pratama@student.its.ac.id",
      password: "kritika2026",
      role: "student",
    },
  });

  const selectedRole = useWatch({ control, name: "role" });

  const handleRolePreset = (role: "student" | "lecturer") => {
    setValue("role", role);
    setValue(
      "email",
      role === "student"
        ? "raka.pratama@student.its.ac.id"
        : "iis.dewi@statistika.its.ac.id"
    );
  };

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise((r) => setTimeout(r, 250));
    setRole(data.role);
    notify({
      title: `Masuk sebagai ${
        data.role === "student"
          ? "Raka Pratama Wijaya (Mahasiswa)"
          : "Dr. Iis Dewi Ratih (Dosen)"
      }`,
      variant: "success",
    });
    router.push(`/${data.role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col justify-between p-6">
      {/* Bilah Atas Minimalis */}
      <div className="max-w-[1120px] w-full mx-auto flex items-center justify-between">
        <KritikaLogo size={28} withText />

        <div className="flex items-center gap-2 text-[12.5px]">
          <Link
            href="/student/dashboard"
            className="px-3 py-1.5 rounded-[8px] text-[#718096] hover:text-[#172033] transition-colors"
          >
            Demo Mahasiswa
          </Link>
          <Link
            href="/lecturer/dashboard"
            className="px-3 py-1.5 rounded-[8px] text-[#718096] hover:text-[#172033] transition-colors"
          >
            Demo Dosen
          </Link>
        </div>
      </div>

      {/* Kartu Masuk */}
      <div className="max-w-[400px] w-full mx-auto my-12">
        <div className="text-center mb-7">
          <KritikaLogoIcon
            size={56}
            className="mx-auto mb-4 rounded-[16px] shadow-[0_10px_26px_-4px_rgba(16,42,86,0.3)]"
          />
          <h1 className="text-[24px] font-semibold tracking-[-0.025em] text-[#172033]">
            Masuk ke KRITIKA AI
          </h1>
          <p className="text-[13px] text-[#718096] mt-1">
            Platform Pembelajaran Transformatif · ITS Surabaya
          </p>
        </div>

        <Card className="p-6 sm:p-7">
          {/* Pemilih Peran */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-[10px] bg-[#ECEFF5] shadow-[inset_0_1px_2px_rgba(16,42,86,0.05)] mb-6">
            <button
              type="button"
              onClick={() => handleRolePreset("student")}
              className={`py-1.5 rounded-[7px] text-[12.5px] font-medium transition-all cursor-pointer ${
                selectedRole === "student"
                  ? "bg-white text-[#102A56] font-semibold shadow-[0_1px_2px_rgba(16,42,86,0.1)]"
                  : "text-[#718096] hover:text-[#172033]"
              }`}
            >
              Mahasiswa
            </button>
            <button
              type="button"
              onClick={() => handleRolePreset("lecturer")}
              className={`py-1.5 rounded-[7px] text-[12.5px] font-medium transition-all cursor-pointer ${
                selectedRole === "lecturer"
                  ? "bg-white text-[#102A56] font-semibold shadow-[0_1px_2px_rgba(16,42,86,0.1)]"
                  : "text-[#718096] hover:text-[#172033]"
              }`}
            >
              Dosen
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#172033] mb-1.5">
                Email Akademik ITS
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-medium text-[#172033]">
                  Kata Sandi
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11.5px] text-[#2563EB] hover:underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-[11.5px] text-[#DC5353] mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full mt-2"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </form>
        </Card>
      </div>

      <div className="text-center text-[11.5px] text-[#718096]">
        Departemen Statistika Bisnis · Institut Teknologi Sepuluh Nopember (ITS)
      </div>
    </div>
  );
}
