import { productService } from "@/services/product/productServices";
import ProductNotFound from "../ui/ProductNotFound";
import ProductCard from "./ProductCart";
import ErrorState from "../ui/ErrorState";

export default async function ProductList({ category }: { category: string }) {
  try {
    const data = await productService.getProductsByCategory(category);

    if (data.products.length === 0) {
      return <ProductNotFound />;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    return <ErrorState message="Ürünleri yüklerken bir sorun oluştu." />;
  }
}
