import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { LoginCredentials, LoginResponse } from "@/types/auth/login";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export const useLogin = (router: AppRouterInstance) => {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";



  return useMutation<LoginResponse, any, LoginCredentials>({
    
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await axios.post<LoginResponse>(
        "/api/auth/login",
        credentials,
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.user) {
        dispatch(setCredentials(data.user));
      }

      toast.success(`Hoş geldin, ${data.user?.firstName}!`, {
        style: {
          borderBottom: "3px solid #F27A1A",
        },
      });
      router.push(redirectTo);

      router.refresh();
      
    },
    onError: (error) => {
      const message = "Kullanıcı adı ve şifreinizi kontrol ediniz";
      toast.error(message);
    },
  });
};
