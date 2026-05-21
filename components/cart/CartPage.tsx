"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  decreaseQuantity,
  deleteItemFromCart,
  increaseQuantity,
} from "@/store/slices/cartSlice";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";
import Link from "next/link";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { totalQuantity, items, totalPrice } = useAppSelector(
    (state) => state.cart,
  );

  if (isMounted && totalQuantity == 0) {
    return <EmptyCart />;
  }
  return (
    <main className="container mx-auto max-w-[1200px] px-4 py-6 md:py-8">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="font-semibold text-lg">Sepetim</h1>
        <p className="text-sm text-gray-600 ml-1">
          ({isMounted && totalQuantity} Ürün)
        </p>
      </div>

      {/* ANA YAPI: Mobilde alt alta, desktopta (lg) yan yana (flex-col lg:flex-row) */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 w-full items-start">
        {/* PRODUCTS AREA */}
        <div className="w-full lg:flex-1">
          {isMounted &&
            items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border border-gray-200 p-3 mb-2 bg-white rounded w-full"
                >
                  {/* ÜRÜN İÇİ: Mobilde dikey, tablet/desktopta (sm) yatay yayılım */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
                    <div className="flex items-start sm:items-center gap-4 md:gap-12">
                      {/* IMAGE & PRICE LEFT AREA */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="relative w-16 h-20 border border-gray-100 rounded overflow-hidden bg-white">
                          <Image
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            width={64}
                            height={80}
                            unoptimized
                            className="object-contain p-1"
                          />
                        </div>
                        {/* TOTAL PRICE: Mobilde görselin altında, desktopta hizalı kalması sağlandı */}
                        <div className="mt-2 sm:mt-7">
                          <span className="text-[14px] sm:text-[15px] font-bold text-[#333] block min-w-[90px] text-left sm:text-right">
                            {(item.product.price * item.quantity).toFixed(2)} TL
                          </span>
                        </div>
                      </div>

                      {/* ABOUT PRODUCT */}
                      <div className="flex-1">
                        <p className="text-[13px] text-[#333] font-normal leading-tight break-words line-clamp-2">
                          <span className="font-bold text-[#333] mr-1.5">
                            TrendyWeb
                          </span>{" "}
                          {item.product.title}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1 font-medium">
                          {"TrendyWeb Mağazası"}
                        </p>
                        <p className="text-[11px] text-orange-500 font-semibold mt-1 flex items-center gap-1">
                          ⚡ Bugün Kargoda
                        </p>
                      </div>
                    </div>

                    {/* CONTROLS AREA: Adet Butonları ve Silme Butonu */}
                    <div className="flex gap-6 sm:gap-12 items-center justify-between sm:justify-end border-t border-gray-50 pt-3 sm:pt-0 sm:border-none">
                      {/* MINUS PLUS BUTTON*/}
                      <div>
                        <div className="border border-gray-200 rounded-lg h-[32px] bg-white text-gray-600 select-none flex items-center px-1 shrink-0">
                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity(item.product.id))
                            }
                            className="w-8 h-full hover:bg-gray-50 flex items-center justify-center cursor-pointer font-light text-gray-400 text-lg select-none"
                          >
                            -
                          </button>

                          <span className="w-8 font-normal text-[#333] text-center text-[14px] select-none">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              dispatch(increaseQuantity(item.product.id))
                            }
                            className="w-8 h-full hover:bg-gray-50 flex items-center justify-center cursor-pointer font-light text-gray-400 text-lg select-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* DELETE BUTTON*/}
                      <div>
                        <button
                          onClick={() =>
                            dispatch(deleteItemFromCart(item.product.id))
                          }
                          className="text-[#666] hover:text-red-500 underline text-[13px] font-normal cursor-pointer transition-colors"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* SUMMARY AREA: Mobilde tam genişlik (w-full), desktopta (lg) eski esnekliğine dönüyor */}
        <div className="w-full lg:flex-1 mt-4 lg:mt-0">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm w-full">
            <h2 className="text-[16px] font-bold text-[#333] mb-4">
              Sipariş Özeti
            </h2>

            <div className="space-y-3 text-[13px] text-[#666]">
              <div className="flex justify-between items-center w-full">
                <span>Ara Toplam</span>
                <span className="font-medium text-[#333]">
                  {isMounted ? totalPrice.toFixed(2) : "0.00"} TL
                </span>
              </div>

              <div className="flex justify-between items-center w-full mb-2">
                <span>Kargo Tutarı</span>
                <span className="font-medium text-[#333]">
                  {isMounted && totalPrice >= 500 ? "0.00 TL" : "43.00 TL"}
                </span>
              </div>

              <div className="h-[1px] bg-gray-100 my-3 w-full" />

              <div className="flex justify-between items-center text-[14px] pt-1 w-full mt-2">
                <span className="font-bold text-[#333]">Toplam</span>
                <span className="font-bold text-[#333] text-[15px]">
                  Total:{" "}
                  {isMounted
                    ? (totalPrice + (totalPrice >= 500 ? 0 : 43)).toFixed(2)
                    : "0.00"}{" "}
                  TL
                </span>
              </div>

              <div className="pt-3">
                <Link
                  href="/checkout"
                  className="py-2.5 px-5 bg-[#F27A1A] text-white rounded-lg font-bold text-[14px] hover:bg-[#d46a16] transition-colors shadow-sm cursor-pointer block text-center w-full sm:w-auto sm:inline-block"
                >
                  Sepeti Onayla
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
