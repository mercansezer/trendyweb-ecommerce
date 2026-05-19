"use client";

import { categoryServices } from "@/services/category/categoryServices";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: categoryServices.getCategories,
    staleTime: 1000 * 60 * 5,
  });

  return { categories, isLoading, isError };
};
