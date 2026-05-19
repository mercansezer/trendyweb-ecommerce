"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRegister } from "@/hooks/mutations/auth/useRegister";
import { RegisterCredentials, RegisterPayload } from "@/types/auth/register";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterCredentials>();

  const { mutate: registerFunc, error: serverError, isPending } = useRegister();

  // Şifre eşleşmesini kontrol etmek için password inputunu izliyoruz
  const password = watch("password");

  const onSubmit = (data: RegisterCredentials) => {
    const [firstName, ...lastNameArr] = data.fullName.trim().split(" ");

    const lastName = lastNameArr.join("");

    const payload: RegisterPayload = {
      firstName,
      lastName: lastName || "",
      email: data.email,
      password: data.password,
      username: data.email.split("@")[0], // DummyJSON username de bekleyebiliyor
    };

    registerFunc(payload);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Yeni Hesap Oluştur
        </h2>

        {/* Global Sunucu Hatası Gösterimi */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium">
            {
              ((serverError as any).response?.data?.message ||
                "Kayıt işlemi başarısız oldu. Lütfen bilgilerinizi kontrol edin.") as string
            }
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Ad Soyad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Soyad
            </label>
            <input
              {...register("fullName", { required: "Ad soyad gerekli" })}
              disabled={isPending}
              className="w-full p-3 border rounded-md focus:border-[#F27A1A] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message as string}
              </p>
            )}
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta
            </label>
            <input
              type="email"
              {...register("email", { required: "Email gerekli" })}
              disabled={isPending}
              className="w-full p-3 border rounded-md focus:border-[#F27A1A] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Şifre gerekli",
                minLength: { value: 6, message: "En az 6 karakter olmalı" },
              })}
              disabled={isPending}
              className="w-full p-3 border rounded-md focus:border-[#F27A1A] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* Şifre Tekrarı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre Tekrarı
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Şifre tekrarı gerekli",
                validate: (value) =>
                  value === password || "Şifreler birbiriyle eşleşmiyor!",
              })}
              disabled={isPending}
              className="w-full p-3 border rounded-md focus:border-[#F27A1A] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>

          {/* Kayıt Butonu */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#F27A1A] text-white font-bold py-3 rounded-md hover:bg-[#ef6c00] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Kayıt Yapılıyor...
              </>
            ) : (
              "Üye Ol"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Zaten üye misiniz?{" "}
          <Link
            href="/auth/login"
            className="text-[#F27A1A] font-bold hover:underline"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
