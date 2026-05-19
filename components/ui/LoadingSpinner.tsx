export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/70 backdrop-blur-md transition-all duration-300">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-[3px] border-gray-100"></div>

          <div className="absolute h-16 w-16 animate-spin rounded-full border-[3px] border-transparent border-t-[#F27A1A] border-l-[#F27A1A]/30"></div>

          <span className="absolute text-[#F27A1A] font-black text-xl tracking-tighter">
            TW
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center gap-1">
          <p className="text-sm font-semibold text-gray-800 tracking-wide uppercase italic">
            TrendyWeb
          </p>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-[#F27A1A] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-[#F27A1A] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-[#F27A1A] rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
