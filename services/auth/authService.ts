import axiosInstance from "@/lib/axiosInstance";
import { AuthState } from "@/types/auth/auth";
import axios from "axios";

export const authService = {
  login: async (credentials: any) => {
    // Bu fonksiyon hem sunucuda hem istemcide çalışabilir
    const { data } = await axiosInstance.post(`/auth/login`, credentials);

    return data;
  },

  logout: async () => {
    // Bu fonksiyon hem sunucuda hem istemcide çalışabilir
    const { data } = await axios.post(`/api/auth/logout`);

    return data;
  },

  register: async (registerData: any) => {
    const { data } = await axiosInstance.post(`/users/add`, registerData);

    return data;
  },

  authMe: async (token: string) => {
    const { data } = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data };
  },
};
