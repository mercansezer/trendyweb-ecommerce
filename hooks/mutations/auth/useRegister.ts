import { Register, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { RegisterPayload, RegisterResponse } from "@/types/auth/register";

export const useRegister = () => {
  const router = useRouter();

  return useMutation<RegisterResponse, any, RegisterPayload>({
    mutationFn: async (registerData: RegisterPayload) => {
      const { data } = await axios.post<RegisterResponse>(
        "/api/auth/register",
        registerData,
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(
        `Üyeliğiniz başarıyla oluşturuldu, ${data.user.firstName}!`,
        {
          style: {
            borderBottom: "3px solid #F27A1A",
          },
        },
      );

      router.push("/auth/login");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Kayıt olurken bir hata oluştu.";
      toast.error(errorMessage);
    },
  });
};
