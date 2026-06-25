"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-red-50 p-6 rounded-full mb-6">
        <AlertCircle size={48} className="text-red-500" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Bir şeyler ters gitti!
      </h1>

      <p className="text-gray-600 max-w-md mb-8">
        Uygulama beklenmedik bir hata ile karşılaştı. Teknik ekibimiz
        bilgilendirildi. Lütfen sayfayı yenilemeyi deneyin.
      </p>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-[#F27A1A] text-white px-8 py-3 rounded-md font-bold hover:bg-[#d66916] transition-all cursor-pointer"
      >
        <RefreshCcw size={20} /> Tekrar Dene
      </button>
    </div>
  );
}
