import { productService } from "@/services/product/productServices";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetProducts = (category?: string) => {
  return useSuspenseQuery({
    // Category değiştikçe React Query otomatik "Refetch" (Yeniden çekme) yapar
    queryKey: ["products", category],
    queryFn: () => productService.getProductsByCategory(category),
    staleTime: 1000 * 60 * 5, // 5 dakika cache
  });
};
