import { WifiOff, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Ürünleri şu an yükleyemiyoruz.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
      <div className="text-gray-400 mb-4">
        <WifiOff size={40} />
      </div>

      <h3 className="text-lg font-bold text-gray-900">Bağlantı Sorunu</h3>

      <p className="text-gray-500 text-sm mt-1 max-w-[250px]">
        {message} Lütfen bağlantınızı kontrol edip tekrar deneyin.
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 text-[#F27A1A] font-bold text-sm hover:underline"
        >
          <RotateCcw size={16} /> Yeniden Dene
        </button>
      )}
    </div>
  );
}
