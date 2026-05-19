import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-lg border border-gray-200 shadow-sm max-w-[600px] mx-auto mt-12">
      <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-[#F27A1A] mb-4">
        <ShoppingCart size={32} />
      </div>
      <h2 className="text-xl font-semibold text-[#333] mb-2">
        Sepetinizde ürün bulunmamaktadır.
      </h2>
      <p className="text-sm text-gray-500 mb-6 max-w-[360px]">
        Sepetiniz boş görünüyor. Hemen alışverişe başlayıp TrendyWeb
        fırsatlarını yakalayabilirsiniz!
      </p>
      <Link
        href="/"
        className="bg-[#F27A1A] text-white px-8 py-2.5 rounded-lg font-bold text-[14px] hover:bg-[#d46a16] transition-colors shadow-sm cursor-pointer"
      >
        Alışverişe Başla
      </Link>
    </div>
  );
}
