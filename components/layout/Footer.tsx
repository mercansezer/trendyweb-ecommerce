import Link from "next/link";

const footerLinks = {
  trendyClone: ["Biz Kimiz", "Kariyer", "İletişim", "Sürdürülebilirlik"],
  kampanyalar: [
    "Aktif Kampanyalar",
    "Elite Üyelik",
    "Hediye Fikirleri",
    "Trendyol Rehber",
  ],
  yardim: [
    "Sıkça Sorulan Sorular",
    "Canlı Yardım",
    "Nasıl İade Edilir",
    "İşlem Rehberi",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] border-t border-gray-200 pt-12 pb-8 mt-20">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Üst Kısım: Sütunlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="text-sm font-bold text-[#333] mb-5">TRENDYCLONE</h4>
            <ul className="space-y-2.5">
              {footerLinks.trendyClone.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[13px] text-gray-600 hover:text-[#F27A1A] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#333] mb-5">Kampanyalar</h4>
            <ul className="space-y-2.5">
              {footerLinks.kampanyalar.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[13px] text-gray-600 hover:text-[#F27A1A] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#333] mb-5">Yardım</h4>
            <ul className="space-y-2.5">
              {footerLinks.yardim.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[13px] text-gray-600 hover:text-[#F27A1A] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Uygulama İndirme Kısmı (İkonsuz Metin Odaklı) */}
          <div>
            <h4 className="text-sm font-bold text-[#333] mb-5">
              Mobil Uygulamalar
            </h4>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-lg text-[12px] font-bold hover:bg-[#333] transition-all cursor-pointer">
                App Store'dan İndir
              </button>
              <button className="flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-lg text-[12px] font-bold hover:bg-[#333] transition-all cursor-pointer">
                Google Play'den Al
              </button>
            </div>
          </div>
        </div>

        {/* Alt Bar: Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] text-gray-500 font-medium">
            ©{new Date().getFullYear()} TrendyClone. Tüm Hakları Saklıdır.
          </p>

          {/* Ödeme Logoları Yerine Minimal Kutular */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-7 bg-gray-200 rounded border border-gray-300 shadow-sm" />
            <div className="w-12 h-7 bg-gray-200 rounded border border-gray-300 shadow-sm" />
            <div className="w-12 h-7 bg-gray-200 rounded border border-gray-300 shadow-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}
