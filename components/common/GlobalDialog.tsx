"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeDialog } from "@/store/slices/uiSlice";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

export default function GlobalDialog() {
  const dispatch = useAppDispatch();
  const { isOpen, title, message, type } = useAppSelector((state) => state.ui);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center">
          {/* İkon Belirleme */}
          <div className="flex justify-center mb-4">
            {type === "success" ? (
              <CheckCircle2 className="text-green-500" size={48} />
            ) : (
              <AlertCircle className="text-red-500" size={48} />
            )}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-6">{message}</p>

          <button
            onClick={() => dispatch(closeDialog())}
            className="w-full py-3 bg-[#F27A1A] hover:bg-[#d66a16] text-white font-bold rounded-lg transition-colors cursor-pointer"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
}
