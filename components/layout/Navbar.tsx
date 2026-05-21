"use client";
import Link from "next/link";
import { ShoppingCart, User, Search, Heart, LogOut } from "lucide-react";
import { NAV_CATEGORIES } from "@/constants/categories";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { authService } from "@/services/auth/authService";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { clearCart } from "@/store/slices/cartSlice";

export default function Navbar() {
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const { totalQuantity } = useAppSelector((state) => state.cart);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Sadece ve sadece sayfa tarayıcıya inip tamamen yüklendikten SONRA tetiklenir
  }, []);

  const handleLogout = async () => {
    try {
      // 1. Önce sunucuya çerezi diyoruz
      await authService.logout();
    } catch (error) {
      console.error("Çerez silinirken hata oluştu:", error);
    } finally {
      // 2. Her durumda (hata olsa bile) kullanıcıyı yerelde logout yapıyoruz
      dispatch(logout());
      toast.success(`Çıkış İşlemi Başarılı`, {
        style: {
          borderBottom: "3px solid #F27A1A",
        },
      });

      dispatch(clearCart());
    }
  };
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-[100]">
      {/* Top Bar - Mobilde gizlendi (hidden md:block) */}
      <div className="hidden md:block bg-[#f3f3f3] py-1.5 text-center text-[11px] text-gray-600">
        İndirim Kuponlarım | Yardım & Destek | Ücretsiz Kargo
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 py-3 md:py-4">
        {/* Ana Satır: Logo, Arama Çubuğu (Desktop) ve İkonlar */}
        <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-[#F27A1A]">
              TRENDY<span className="text-black">WEB</span>
            </span>
          </Link>

          {/* Search Bar - Desktop Yapısı Aynen Korundu, Mobilde Aşağı Alındı (hidden md:block) */}
          <div className="relative flex-1 group hidden md:block">
            <input
              type="text"
              placeholder="Aradığınız ürün, kategori veya markayı yazınız"
              className="w-full rounded-md border border-transparent bg-[#f3f3f3] py-2.5 pl-4 pr-12 text-sm outline-none transition-all focus:border-[#F27A1A] focus:bg-white text-gray-600 group-focus-within:bg-white"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F27A1A] cursor-pointer"
              size={20}
            />
          </div>

          {/* User Actions - Gap mobilde daraltıldı (gap-4 md:gap-6) */}
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            {/* 1. GİRİŞ / PROFİL ALANI */}
            {isAuthenticated ? (
              <div className="group relative flex flex-col items-center gap-1 cursor-pointer mt-[4px] md:mt-[8px]">
                {/* Ana Buton Alanı */}
                <div className="flex flex-col items-center gap-1 pb-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={
                        user?.image ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Yazı mobilde gizlendi, desktopta açılıyor (hidden md:block) */}
                  <span className="hidden md:block text-[11px] font-bold text-gray-700 group-hover:text-[#F27A1A]">
                    Hesabım
                  </span>
                </div>

                {/* Dropdown Menü - Desktop yapısıyla birebir aynı */}
                <div className="absolute top-[35px] md:top-[45px] -right-10 hidden group-hover:block w-52 bg-white border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-md py-2 z-[110]">
                  <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-[12px] font-bold text-gray-800 truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <button className="px-4 py-2 text-[12px] text-gray-600 hover:text-[#F27A1A] hover:bg-orange-50 text-left transition-colors cursor-pointer">
                      Siparişlerim
                    </button>
                    <button className="px-4 py-2 text-[12px] text-gray-600 hover:text-[#F27A1A] hover:bg-orange-50 text-left transition-colors cursor-pointer">
                      Kullanıcı Bilgilerim
                    </button>
                    <button className="px-4 py-2 text-[12px] text-gray-600 hover:text-[#F27A1A] hover:bg-orange-50 text-left transition-colors cursor-pointer">
                      Şifre Değiştir
                    </button>
                    <div className="h-[1px] bg-gray-50 my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut size={14} /> Çıkış Yap
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                className="group flex flex-col items-center gap-1 cursor-pointer"
                href="/auth/login"
              >
                <User
                  size={20}
                  className="text-gray-700 group-hover:text-[#F27A1A]"
                />
                {/* Yazı mobilde gizlendi (hidden md:block) */}
                <span className="hidden md:block text-[11px] font-bold text-gray-700 group-hover:text-[#F27A1A]">
                  Giriş Yap
                </span>
              </Link>
            )}

            {/* 2. FAVORİLERİM */}
            <button className="group flex flex-col items-center gap-1 cursor-pointer">
              <Heart
                size={20}
                className="text-gray-700 group-hover:text-[#F27A1A]"
              />
              {/* Yazı mobilde gizlendi (hidden md:block) */}
              <span className="hidden md:block text-[11px] font-bold text-gray-700 group-hover:text-[#F27A1A]">
                Favorilerim
              </span>
            </button>

            {/* 3. SEPETİM */}
            <Link
              href="/cart"
              className="group flex flex-col items-center gap-1 relative cursor-pointer"
            >
              <ShoppingCart
                size={20}
                className="text-gray-700 group-hover:text-[#F27A1A]"
              />
              {/* Yazı mobilde gizlendi (hidden md:block) */}
              <span className="hidden md:block text-[11px] font-bold text-gray-700 group-hover:text-[#F27A1A]">
                Sepetim
              </span>

              {isMounted && totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F27A1A] text-[9px] font-bold text-white">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobil Search Bar - Sadece mobilde görünür (block md:hidden) */}
        <div className="relative group block md:hidden mt-3">
          <input
            type="text"
            placeholder="Aradığınız ürün, kategori veya markayı yazınız"
            className="w-full rounded-md border border-transparent bg-[#f3f3f3] py-2 pl-4 pr-10 text-sm outline-none transition-all focus:border-[#F27A1A] focus:bg-white text-gray-600 group-focus-within:bg-white"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F27A1A] cursor-pointer"
            size={18}
          />
        </div>

        {/* Categories Menu - Mobilde yatay kaydırılabilir jilet gibi bir şerit haline getirildi */}
        <div className="mt-3 md:mt-4 flex gap-6 md:gap-8 border-t border-gray-50 pt-2 md:pt-3 overflow-x-auto no-scrollbar whitespace-nowrap justify-start md:justify-center">
          {NAV_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={`text-[12px] md:text-[13px] font-bold text-[#333] hover:text-[#F27A1A] transition-colors inline-block ${pathName === category.href ? "text-[#F27A1A]" : ""}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
