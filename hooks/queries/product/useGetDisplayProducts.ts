// hooks/queries/product/useGetProductList.ts
import { productService } from "@/services/product/productServices";
import { useQuery } from "@tanstack/react-query";

export const useGetProductList = (limit?: number, skip?: number) => {
  const {
    data: displayData,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useQuery({
    queryKey: ["products", "list", { limit, skip }],
    queryFn: () => productService.getProducts({ limit, skip }),
    staleTime: 1000 * 60 * 5, // 5 dakika cache
  });

  return { displayData, isLoadingProduct, isErrorProduct };
};
