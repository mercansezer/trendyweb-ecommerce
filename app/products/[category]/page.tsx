// app/category/[category]/page.tsx

import ProductList from "@/components/products/ProductList";
import ProductSekeleton from "@/components/products/ProductSkeleton";
import { categoryServices } from "@/services/category/categoryServices";
import { Suspense } from "react";

type Props = {
  params: Promise<{ category: string }>;
};

// build anında tüm kategorileri alıp statik rotaları belirleyen fonksiyon
export async function generateStaticParams() {
  const categories = await categoryServices.getCategories();

  // Next.js bizden [category] ismiyle eşleşen bir dizi obje bekler
  return categories.map((cat: string) => ({
    category: cat, // Buradaki isim klasör ismin olan [category] ile aynı olmalı
  }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const formattedTitle = category.split("-").join(" ");

  return {
    title: formattedTitle, // Template sayesinde: "Elektronik | Mağaza Adı" olur
    description: `${formattedTitle} kategorisindeki en yeni ürünleri keşfedin.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const category = resolvedParams.category;

  return (
    <div className="container mx-auto max-w-[1200px] px-4">
      <h1 className="text-2xl font-bold uppercase my-6 border-b pb-4 text-gray-800">
        {category.replaceAll("-", " ")} Kategorisi
      </h1>

      <Suspense fallback={<ProductSekeleton />}>
        <ProductList category={category} />
      </Suspense>
    </div>
  );
}
