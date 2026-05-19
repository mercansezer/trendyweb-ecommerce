"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/slices/cartSlice"; // Reducer'larımızı ekledik
import { ICartProduct } from "@/types/cart/cart";
import { ProductDetailType } from "@/types/product/productResponse";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetail({
  product,
}: {
  product: ProductDetailType;
}) {
  const [selectedImage, setSelectedImage] = useState<string>(
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : product.thumbnail || "",
  );

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  // Redux sepet state'ini dinliyoruz
  const { items } = useAppSelector((store) => store.cart);

  // Bu ürün sepette var mı diye kontrol ediyoruz ve varsa o satırı (item) çekiyoruz
  const cartItem = items.find((item) => item.product.id === product.id);
  const isCartAdded = !!cartItem; // Varsa true, yoksa false döner
  const currentQuantity = cartItem ? cartItem.quantity : 0; // Sepetteki güncel adet

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Sepete ürün eklemek için önce giriş yapmalısınız!", {
        duration: 3000,
      });

      // Kullanıcı login olduktan sonra bizzat BU ÜRÜNÜN sayfasına geri dönsün diye pathname'i gömüyoruz
      router.push(`/auth/login?redirect=${pathname}`);
      return; // Fonksiyonun aşağıya akmasını engelle (Early Return)
    }
    const { id, title, price, thumbnail, discountPercentage } = product;

    const payload: ICartProduct = {
      id,
      price,
      thumbnail,
      title,
      discountPercentage,
    };

    dispatch(addToCart(payload));
    toast.success("Ürün Sepete Eklendi");
  };

  return (
    <main className="container mx-auto max-w-[1200px] px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="lg:w-1/2">
          <div className="relative aspect-square border border-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain p-4"
              priority
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                onMouseEnter={() => setSelectedImage(img)}
                className={`relative aspect-square border-2 rounded-md cursor-pointer transition-all ${
                  selectedImage === img
                    ? "border-[#F27A1A]"
                    : "border-gray-100 hover:border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.title}-${index}`}
                  fill
                  className="object-cover p-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ KOLON: ÜRÜN BİLGİLERİ */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-800">
              <span className="text-[#F27A1A] mr-2 uppercase">
                {product.brand}
              </span>
              {product.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center bg-yellow-400 px-2 py-0.5 rounded text-white text-xs font-bold">
                {product.rating} ⭐
              </div>
              <span className="text-gray-400 text-sm">
                | {product.reviews.length} Değerlendirme
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="text-3xl font-bold text-[#F27A1A]">
              {product.price} TL
            </div>
            <p className="text-xs text-gray-500 mt-1">KDV Dahil</p>
          </div>

          <div className="border-t border-b border-gray-100 py-4 mb-6">
            <h3 className="font-bold text-sm mb-2 text-gray-700">
              Ürün Açıklaması
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <ul className="text-sm text-gray-600 space-y-2 mb-8">
            <li className="flex items-center gap-2">
              ✅ {product.warrantyInformation}
            </li>
            <li className="flex items-center gap-2">
              🚚 {product.shippingInformation}
            </li>
            <li className="flex items-center gap-2">
              📦 {product.availabilityStatus}
            </li>
          </ul>

          <div className="mt-auto h-[60px] flex items-center justify-end">
            {" "}
            {isLoaded && isCartAdded ? (
              <div className="flex items-center justify-between border border-[#F27A1A] rounded-md overflow-hidden h-[44px] w-full max-w-[180px] shadow-sm bg-white">
                <button
                  onClick={() => dispatch(decreaseQuantity(product.id))}
                  className="bg-white text-[#F27A1A] font-medium text-xl px-5 h-full hover:bg-orange-50 active:bg-orange-100 transition-colors cursor-pointer flex items-center justify-center select-none"
                >
                  -
                </button>

                <span className="font-semibold text-sm text-gray-800 select-none">
                  {currentQuantity} Adet
                </span>
                <button
                  onClick={() => dispatch(increaseQuantity(product.id))}
                  className="bg-white text-[#F27A1A] font-medium text-xl px-5 h-full hover:bg-orange-50 active:bg-orange-100 transition-colors cursor-pointer flex items-center justify-center select-none"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="w-full bg-[#F27A1A] text-white py-4 rounded-md font-bold text-base hover:bg-[#d46a16] transition-all shadow-md hover:shadow-orange-100 cursor-pointer h-[50px] flex items-center justify-center"
                onClick={handleAddToCart}
              >
                Sepete Ekle
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ALT KISIM: YORUMLAR */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-6 border-b pb-4">
          Ürün Değerlendirmeleri
        </h2>
        <div className="space-y-6">
          {product.reviews.map((review, i) => (
            <div key={i} className="border-b border-gray-50 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </span>
                <span className="text-sm font-bold text-gray-700">
                  {review.reviewerName}
                </span>
              </div>
              <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
              <span className="text-[10px] text-gray-400">
                {new Date(review.date).toLocaleDateString("tr-TR")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
