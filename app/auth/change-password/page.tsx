"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Şifrelerin eşleşmesini kontrol etmek için "password" alanını izliyoruz
  const password = watch("password");

  const onSubmit = (data: any) => {
    console.log("Şifre Değiştirme Verileri:", data);
    // Buraya şifre güncelleme API isteği gelecek
    alert("Şifre sıfırlama talebi gönderildi (Simülasyon)");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border p-8">
        {/* Geri Dön Linki */}
        <Link
          href="/auth/login"
          className="flex items-center text-sm text-gray-500 hover:text-[#F27A1A] mb-6 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Giriş Sayfasına Dön</span>
        </Link>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Şifre Yenileme
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Güvenliğiniz için lütfen yeni ve güçlü bir şifre belirleyin.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* E-posta Adresi (Doğrulama için) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta Adresi
            </label>
            <input
              type="email"
              {...register("email", { required: "E-posta adresi gerekli" })}
              className={`w-full p-3 border rounded-md outline-none transition-all ${
                errors.email ? "border-red-500" : "focus:border-[#F27A1A]"
              }`}
              placeholder="kayıtlı e-posta adresiniz..."
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Yeni Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yeni Şifre
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Yeni şifre gerekli",
                minLength: {
                  value: 6,
                  message: "Şifre en az 6 karakter olmalı",
                },
              })}
              className={`w-full p-3 border rounded-md outline-none transition-all ${
                errors.password ? "border-red-500" : "focus:border-[#F27A1A]"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* Şifre Tekrar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yeni Şifre (Tekrar)
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Şifre tekrarı gerekli",
                validate: (value) =>
                  value === password || "Şifreler birbiriyle eşleşmiyor",
              })}
              className={`w-full p-3 border rounded-md outline-none transition-all ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "focus:border-[#F27A1A]"
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#F27A1A] text-white font-bold py-3 rounded-md hover:bg-[#ef6c00] transition-colors shadow-md mt-4"
          >
            Şifreyi Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}
