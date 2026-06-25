import { NextResponse } from "next/server";
import { authService } from "@/services/auth/authService";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Servis üzerinden login işlemini yapıyoruz

    const user = await authService.login(body);

    if (!user || !user.accessToken) {
      throw new Error("Token bulunamadı");
    }

    const token = user.accessToken;

    // 2. Client'a dönecek veriyi hazırlıyoruz (Hassas verileri, örn. token'ı buradan silebilirsin)
    const { accessToken, ...safeUser } = user;

    const res = NextResponse.json({ success: true, user: safeUser });

    // 3. Cookie set ediyoruz
    res.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 gün
    });

    return res;
  } catch (error: any) {
    

    return NextResponse.json(
      { message: error.response?.data?.message || "Giriş başarısız" },
      { status: error.response?.status || 500 },
    );
  }
}
