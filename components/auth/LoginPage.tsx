"use client";

import { useLogin } from "@/hooks/mutations/auth/useLogin";
import { LoginCredentials } from "@/types/auth/login";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const {
    mutate: login,
    isPending,
    isError,
    error,
    reset: resetMutation,
  } = useLogin(router);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = (data: LoginCredentials) => {
    login(data);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Giriş Yap
        </h2>
        <p>Kullanıcı adı : emilys</p>
        <p className="mb-2">Şifre : emilyspass</p>

        {/* Global API Hata Yönetimi */}
        {isError && (
          <div className="mb-6 p-3 rounded-md bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={18} className="shrink-0" />
            <div className="flex-1">
              {/* API Route'dan dönen hata mesajını yakalıyoruz */}
              {(error as any)?.response?.data?.message ||
                "Giriş başarısız. Lütfen bilgilerinizi kontrol edin."}
            </div>
            <button
              onClick={() => resetMutation()}
              className="text-xs underline hover:text-red-800 font-medium cursor-pointer"
            >
              Temizle
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Kullanıcı Adı */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kullanıcı Adı
            </label>
            <input
              {...register("username", { required: "Kullanıcı adı gerekli" })}
              onFocus={() => isError && resetMutation()}
              className={`w-full p-3 border rounded-md outline-none transition-all ${
                errors.username || isError
                  ? "border-red-500"
                  : "focus:border-[#F27A1A]"
              }`}
              placeholder="kullanıcı adınız..."
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message as string}
              </p>
            )}
          </div>

          {/* Şifre */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Şifre</label>
              <Link
                href="/auth/change-password"
                className="text-[14px] text-[#F27A1A] hover:underline font-medium"
              >
                Şifremi unuttum
              </Link>
            </div>
            <input
              type="password"
              {...register("password", { required: "Şifre gerekli" })}
              onFocus={() => isError && resetMutation()}
              className={`w-full p-3 border rounded-md outline-none transition-all ${
                errors.password || isError
                  ? "border-red-500"
                  : "focus:border-[#F27A1A]"
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* Giriş Butonu */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full flex items-center justify-center gap-2 text-white font-bold py-3 rounded-md transition-all shadow-md 
              ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#F27A1A] hover:bg-[#ef6c00] active:scale-[0.98] cursor-pointer"
              }`}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Giriş Yapılıyor...</span>
              </>
            ) : (
              "Giriş Yap"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-gray-600">
            Hesabın yok mu?{" "}
            <Link
              href="/auth/register"
              className="text-[#F27A1A] font-bold hover:underline"
            >
              Üye Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
