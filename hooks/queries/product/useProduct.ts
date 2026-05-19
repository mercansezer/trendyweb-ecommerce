import { productService } from "@/services/product/productServices";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (productId: string) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId!),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });
  return { product, isLoading, isError };
};
