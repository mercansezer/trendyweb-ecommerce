"use client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Her render'da yeni bir client oluşmaması için useState ile sarmalıyoruz

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Veri 1 dakika boyunca "taze" sayılır
            retry: 1, // Hata durumunda 1 kez tekrar dene
            refetchOnWindowFocus: false, // Sekme değiştirip dönünce otomatik çekme (opsiyonel)
          },
        },
      }),
  );

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* Geliştirme aşamasında verileri izlemek için mükemmel bir araç (Sadece dev modda görünür) */}
        <Toaster
          position="top-center" // Bildirimi üst-ortaya aldık
          reverseOrder={false}
          gutter={12}
          containerStyle={{
            top: 50, // Navbar'ın hemen altına denk gelmesi için
          }}
          toastOptions={{
            duration: 4000,
            style: {
              minWidth: "400px", // Biraz daha genişlettik, daha tok durması için
              background: "#fff",
              color: "#333",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "600",
              padding: "18px 24px",
              border: "1px solid #eee",
            },
            success: {
              // Tik ikonunu Trendyol turuncusu yaptık
              iconTheme: {
                primary: "#F27A1A",
                secondary: "#fff",
              },
              // Eğer varsayılan ikonu sevmezsen buraya özel bir SVG veya emoji de koyabilirsin
              // icon: <CheckCircle className="text-[#F27A1A]" size={24} />,
            },
            error: {
              iconTheme: {
                primary: "#ff4b4b",
                secondary: "#fff",
              },
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
