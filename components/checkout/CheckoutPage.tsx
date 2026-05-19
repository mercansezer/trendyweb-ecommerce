"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { clearCart } from "@/store/slices/cartSlice";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const [isLoaded, setIsLoaded] = useState(false);

  const [isProcess, setIsProcess] = useState(false);

  const dispatch = useAppDispatch();

  console.log(isProcess);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Kart Bilgileri State'i
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  // Kart numarasına otomatik boşluk bırakma fonksiyonu
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardInfo({ ...cardInfo, number: parts.join(" ") });
    } else {
      setCardInfo({ ...cardInfo, number: value });
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !cardInfo.name ||
      cardInfo.number.length < 19 ||
      !cardInfo.expiry ||
      cardInfo.cvv.length < 3
    ) {
      toast.error("Lütfen kart bilgilerini eksiksiz ve doğru doldurun!");
      return;
    }

    const loadingToast = toast.loading(
      "Ödeme doğrulanıyor, lütfen bekleyin...",
    );

    setIsProcess(true);
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success("Ödeme başarıyla alındı! Siparişiniz hazırlanıyor.", {
        duration: 4000,
        style: { borderBottom: "3px solid #F27A1A" },
      });
      setIsProcess(false);
      localStorage.removeItem("guest_cart");
      dispatch(clearCart());

      router.push("/");
    }, 2500);
  };

  return (
    <main className="container mx-auto max-w-[1200px] px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Ödeme Adımı</h1>

      {/* PARENT DIV: FLEX YAPILDI, MOBİLDE DOĞAL ALT ALTA, MD EKRANDAN İTİBAREN YAN YANA */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* SOL CHILD DIV (flex-1): KART BİLGİLERİ VE ÖDE BUTONU */}
        <div className="flex-1 w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">
            Kart Bilgileri
          </h2>

          {/* CANLI KART GÖRSELİ */}
          <div className="w-full max-w-[360px] h-[200px] bg-gradient-to-tr from-gray-900 via-slate-800 to-gray-900 rounded-2xl p-6 text-white mb-6 shadow-lg flex flex-col justify-between mx-auto">
            <div className="flex justify-between items-center">
              <div className="w-12 h-9 bg-amber-400/80 rounded-md opacity-80" />
              <span className="text-xs font-bold tracking-widest opacity-60">
                CREDIT CARD
              </span>
            </div>

            <div className="text-xl font-mono tracking-widest my-4">
              {cardInfo.number || "•••• •••• •••• ••••"}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex-1 pr-2 truncate">
                <p className="text-[10px] uppercase opacity-50">Kart Sahibi</p>
                <p className="text-sm font-medium tracking-wide truncate">
                  {cardInfo.name.toUpperCase() || "AD SOYAD"}
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <div>
                  <p className="text-[10px] uppercase opacity-50">SKT</p>
                  <p className="text-sm font-mono">
                    {cardInfo.expiry || "AA/YY"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase opacity-50">CVV</p>
                  <p className="text-sm font-mono">{cardInfo.cvv || "•••"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM INPUTLARI VE ÖDE BUTONU */}
          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Kart Üzerindeki İsim
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#F27A1A] transition-colors text-sm"
                value={cardInfo.name}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Kart Numarası
              </label>
              <input
                type="text"
                maxLength={19}
                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg font-mono focus:outline-none focus:border-[#F27A1A] transition-colors text-sm"
                value={cardInfo.number}
                onChange={handleNumberChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Son Kullanma (AA/YY)
                </label>
                <input
                  type="text"
                  maxLength={5}
                  placeholder="12/29"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg font-mono focus:outline-none focus:border-[#F27A1A] transition-colors text-sm"
                  value={cardInfo.expiry}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, expiry: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  CVV / Güvenlik Kodu
                </label>
                <input
                  type="password"
                  maxLength={3}
                  placeholder="***"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg font-mono focus:outline-none focus:border-[#F27A1A] transition-colors text-sm"
                  value={cardInfo.cvv}
                  onChange={(e) =>
                    setCardInfo({
                      ...cardInfo,
                      cvv: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
              </div>
            </div>

            {/* ÖDE VE BİTİR BUTONU TAM BURADA */}
            <button
              type="submit"
              disabled={isProcess}
              className="w-full mt-6 bg-[#F27A1A] text-white py-3 rounded-xl font-bold text-base hover:bg-[#d46a16] transition-colors shadow-sm cursor-pointer"
            >
              {isLoaded &&
                totalPrice.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}{" "}
              {isProcess ? "Tutarındaki ödeme alınıyor..." : "Öde ve Bitir"}
            </button>
          </form>
        </div>

        {/* SAĞ CHILD DIV (flex-1): SİPARİŞ ÖZETİ (SUMMARY) */}
        <div className="flex-1 w-full bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Sipariş Özeti
          </h2>

          <div className="divide-y divide-gray-200 max-h-[340px] overflow-y-auto mb-4 pr-2">
            {isLoaded &&
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center py-3 text-sm"
                >
                  <div className="flex-1 pr-4">
                    <p className="font-medium text-gray-800 truncate max-w-[220px]">
                      {item.product.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      Adet: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-700 text-sm shrink-0">
                    {(item.product.price * item.quantity).toLocaleString(
                      "tr-TR",
                      { style: "currency", currency: "TRY" },
                    )}
                  </span>
                </div>
              ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Kargo</span>
              <span className="text-green-600 font-medium">Bedava</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-800 pt-2 border-t border-dashed border-gray-200">
              <span>Toplam Tutar</span>
              <span className="text-[#F27A1A]">
                {isLoaded &&
                  totalPrice.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                    minimumFractionDigits: 2,
                  })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
