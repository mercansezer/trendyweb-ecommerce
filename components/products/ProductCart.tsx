import { Product } from "@/types/product/productResponse";
import { createSlug } from "@/utils/slugify";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${createSlug(product.brand, product.title, product.id)}`}
      className="group border border-gray-100 rounded-lg p-3 hover:shadow-md transition-all"
    >
      <div className="relative aspect-square mb-3">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <h3 className="text-sm font-bold truncate">{product.brand}</h3>
      <p className="text-xs text-gray-500 truncate mb-2">{product.title}</p>
      <div className="text-[#F27A1A] font-bold">{product.price} TL</div>
    </Link>
  );
}
