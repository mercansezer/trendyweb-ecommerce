import Link from "next/link";

interface CategoryBarProps {
  categories: string[];
}

export default function CategoryBar({ categories }: CategoryBarProps) {
  return (
    <div className="w-full bg-white py-6 rounded-xl shadow-sm border border-gray-100">
      {/* Yatayda kaydırılabilir alan */}
      <div className="flex items-center gap-4 md:gap-8 overflow-x-auto px-6 no-scrollbar scroll-smooth">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/products/${category}`}
            className="flex flex-col items-center gap-3 min-w-[70px] md:min-w-[90px] group transition-transform hover:-translate-y-1"
          >
            {/* Dairesel İkon Alanı */}
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-[#F27A1A] group-hover:shadow-lg group-hover:shadow-orange-200 transition-all">
              <span className="text-[#F27A1A] font-bold text-lg group-hover:text-white uppercase">
                {category.charAt(0)}
              </span>
            </div>

            {/* Kategori İsmi */}
            <span className="text-[11px] md:text-[13px] font-medium text-gray-600 group-hover:text-[#F27A1A] text-center whitespace-nowrap capitalize tracking-tight">
              {category.replace("-", " ")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
