import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAuthMe = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await axios.get("/api/auth/me");

      return data;
    },
    staleTime: Infinity, // Kullanıcı çıkış yapana kadar bu veri hep taze kalsın, boşa istek atılmasın
    retry: false,
  });

  return { data, isLoading, isError, error };
};
