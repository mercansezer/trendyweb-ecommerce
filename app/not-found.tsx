import Link from "next/link";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* İkonik bir görsel veya büyük bir ikon */}
      <div className="bg-gray-100 p-8 rounded-full mb-6">
        <Search size={64} className="text-gray-400" />
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Aradığınız Sayfa Bulunamadı
      </h1>

      <p className="text-gray-600 max-w-md mb-8">
        Üzgünüz, aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici
        olarak kullanım dışı olabilir. Aramaya devam etmek isterseniz ana
        sayfaya göz atabilirsiniz.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-[#F27A1A] text-white px-8 py-3 rounded-md font-bold hover:bg-[#d66916] transition-all"
        >
          <Home size={20} /> Ana Sayfaya Dön
        </Link>

        <Link
          href="/products"
          className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-8 py-3 rounded-md font-bold hover:bg-gray-50 transition-all"
        >
          Tüm Ürünleri Gör
        </Link>
      </div>
    </div>
  );
}
