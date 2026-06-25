import HeroSlider from "@/components/home/HeroSlider";
import CategoryBar from "@/components/home/CategoryBar";
import ProductCard from "@/components/products/ProductCart";
import { productService } from "@/services/product/productServices";
import { categoryServices } from "@/services/category/categoryServices";
import ErrorState from "@/components/ui/ErrorState";

const getHomeData = async () => {
  try {
    const [categories, displayData] = await Promise.all([
      categoryServices.getCategories(),
      productService.getProducts({ limit: 12, skip: 0 }),
    ]);

    return { categories, displayData, error: false };
  } catch (error) {
   
    // Hata durumunda boş yapılar dönüyoruz ki sayfa beyaz ekran vermesin
    return {
      categories: [],
      displayData: { products: [] },
      error: true,
    };
  }
};

export default async function HomePage() {
  const { categories, displayData, error } = await getHomeData();

  if (error) {
    return (
      <ErrorState message="Şu an verileri yüklerken kısa süreli bir aksaklık yaşıyoruz. Lütfen sayfayı yenileyerek tekrar deneyin." />
    );
  }
  return (
    <main className="bg-[#f5f5f5] min-h-screen pb-20">
      <div className="container mx-auto max-w-[1200px] px-4 py-6 space-y-8">
        <HeroSlider />

        <CategoryBar categories={categories.slice(0, 12)} />

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              GÜNÜN FIRSATLARI
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {displayData?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
