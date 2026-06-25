"use client";

import { useAuthMe } from "@/hooks/queries/auth/authMe";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, setCredentials } from "@/store/slices/authSlice";
import { clearCart } from "@/store/slices/cartSlice";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useAuthMe();

  useEffect(() => {
    if (data?.isAuthenticated && data?.user) {
      const { username, email, firstName, lastName, gender, image } =
        data?.user;

      const payload = {
        isAuthenticated: data?.isAuthenticated,
        user: {
          username,
          email,
          firstName,
          lastName,
          gender,
          image,
        },
      };

      dispatch(setCredentials(payload));
    }

    if (isError) {
      // 1. Redux state'ini temizle (Arayüz anında giriş yap sayfasına hazırlansın)
      dispatch(logout());

      // 2. Next.js BFF Proxy'sine POST isteği atarak HTTP-Only cookie'leri patlat
      fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => {
        
      });
    }
  }, [data, isError, dispatch]);

  useEffect(() => {
    if (!isLoading && !data) {
      dispatch(clearCart());
    }
  }, [data, isLoading, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F27A1A]"></div>
      </div>
    );
  }
  return <>{children}</>;
}
