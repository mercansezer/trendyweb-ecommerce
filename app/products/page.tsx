export default function ProductsPage() {
  return (
    <main className="container mx-auto max-w-[1200px] px-4 py-8 bg-white">
      {/* Title & Filter Summary */}
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <h1 className="text-lg font-bold text-[#333]">
          "Elektronik" için sonuçlar
        </h1>
        <div className="flex gap-2">
          <select className="border rounded px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-[#F27A1A]">
            <option>Önerilen Sıralama</option>
            <option>En Düşük Fiyat</option>
            <option>En Yüksek Fiyat</option>
          </select>
        </div>
      </div>

      {/* Grid: 4 columns on desktop, 2 on mobile */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="group relative flex flex-col border border-transparent p-2 transition-all hover:border-[#F27A1A] hover:shadow-lg rounded-md cursor-pointer"
          >
            <div className="relative mb-2 aspect-[3/4] overflow-hidden rounded-sm bg-[#f3f3f3]">
              {/* Placeholder Image */}
              <div className="h-full w-full bg-gray-200 animate-pulse" />
              {/* Badge */}
              <div className="absolute top-2 left-0 bg-[#F27A1A] px-2 py-1 text-[10px] font-bold text-white">
                Kargo Bedava
              </div>
            </div>

            <div className="flex flex-col gap-1 px-1">
              <h3 className="text-[13px]">
                <span className="font-bold text-[#333]">Apple</span>
                <span className="ml-1 text-gray-600 italic">
                  iPhone 15 Pro Max 256GB Naturel Titanyum
                </span>
              </h3>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-[#ffbe00]">
                  4.8
                </span>
                <span className="text-[10px] text-gray-400">(1243)</span>
              </div>
              <div className="mt-1 text-[15px] font-bold text-[#F27A1A]">
                84.999 TL
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
