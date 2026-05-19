import AuthProvider from "@/providers/AuthProvder";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import NextTopLoader from "nextjs-toploader";
import StateProvider from "@/providers/StateProvider";
import GlobalDialog from "@/components/common/GlobalDialog";

// Metadata Tanımı
export const metadata: Metadata = {
  title: {
    default: "TRENDYWEB | Güvenli Alışverişin Adresi", // Sayfada başlık yoksa bu görünür
    template: "%s | TRENDYWEB", // Sayfada "iPhone" yazarsan "iPhone | Mağaza Adı" olur
  },
  description: "En kaliteli ürünler, en uygun fiyatlarla burada.",
  icons: {
    icon: "/favicon.ico", // Logonun tarayıcı sekmesinde görünmesi için
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="flex flex-col min-h-screen">
        <StateProvider>
          <AuthProvider>
            <NextTopLoader color="#F27A1A" showSpinner={false} />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <GlobalDialog />
            <Footer />
          </AuthProvider>
        </StateProvider>
      </body>
    </html>
  );
}
