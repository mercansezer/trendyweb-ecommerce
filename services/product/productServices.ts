import axiosInstance from "@/lib/axiosInstance";
import {
  ProductDetailType,
  ProductResponse,
} from "@/types/product/productResponse";

export const productService = {
  // Kategori varsa kategoriye, yoksa genel listeye istek atar
  getProductsByCategory: async (
    category?: string,
  ): Promise<ProductResponse> => {
    const endpoint = category ? `/products/category/${category}` : "/products";

    const { data } = await axiosInstance.get<ProductResponse>(endpoint);
    return data;
  },

  getProductById: async (id: string): Promise<ProductDetailType> => {
    const endpoint = `/product/${id}`;
    const response = await axiosInstance.get<ProductDetailType>(endpoint);

    return response.data;
  },

  getProducts: async (params: {
    limit?: number;
    skip?: number;
  }): Promise<ProductResponse> => {
    const { limit = 10, skip = 0 } = params;

    const endpoint = `/products?limit=${limit}&skip=${skip}`;

    const { data } = await axiosInstance.get<ProductResponse>(endpoint);
    return data;
  },
};
