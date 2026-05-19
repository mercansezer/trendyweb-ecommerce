import axiosInstance from "@/lib/axiosInstance";

export const categoryServices = {
  getCategories: async () => {
    const { data } = await axiosInstance.get("/products/category-list");

    return data;
  },
};
