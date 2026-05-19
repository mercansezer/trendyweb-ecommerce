// app/product/[slug]/page.tsx
import { productService } from "@/services/product/productServices";
import ProductDetail from "@/components/products/ProductDetail";
import ProductNotFound from "@/components/ui/ProductNotFound";
import ErrorState from "@/components/ui/ErrorState";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const data = await productService.getProducts({ limit: 50 });

    return data.products.map((product) => ({
      slug: `${product.title.toLowerCase().replace(/ /g, "-")}-p-${product.id}`,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const productId = slug.split("-p-").pop();

  if (!productId) return { title: "Ürün Bulunamadı" };

  try {
    const product = await productService.getProductById(productId);
    return {
      title: `${product.title} - En Uygun Fiyatlarla`,
      description: product.description,
    };
  } catch {
    return { title: "Ürün Detayı" };
  }
}

// 3. Ana Sayfa Bileşeni
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const productId = slug.split("-p-").pop();

  if (!productId) return <ProductNotFound />;

  try {
    const product = await productService.getProductById(productId);

    if (!product) return <ProductNotFound />;

    return <ProductDetail product={product} />;
  } catch (error: any) {
    const statusCode = error.response?.status;

    if (statusCode === 404) return <ProductNotFound />;

    return (
      <ErrorState message="Ürün bilgileri getirilirken bir hata oluştu." />
    );
  }
}
