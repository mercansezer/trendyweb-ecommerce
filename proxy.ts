import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Kurumsal ölçeklenebilirlik için rotaları merkezi olarak ayırıyoruz
const PROTECTED_ROUTES = ["/checkout", "/cart", "/profile", "/orders"];
const AUTH_ROUTES = ["/auth/login", "/auth/register"];

export function proxy(request: NextRequest) {
  //  Cookie Katmanına Erişim
  const token = request.cookies.get("auth-token")?.value;

  // URL ve Path bilgilerini Next.js'in özel url motorundan güvenle alıyoruz
  const { pathname } = request.nextUrl;

  //  Giriş Yapmamış Kullanıcı Korumalı Sayfaya Erişmeye Çalışıyor
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && isProtectedRoute) {
    //  Kullanıcının girmek istediği sayfayı URL'e 'redirect' olarak gömüyoruz
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    // İstediği sayfayı blokla ve login sayfasına fırlat
    return NextResponse.redirect(loginUrl);
  }

  // Giriş Yapmış Kullanıcı Tekrar Login/Register Sayfasına Gidiyor

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (token && isAuthRoute) {
    // Zaten oturumu var, anlamsız istek yapmasın, ana sayfaya şutla
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Her şey yolunda, trafiğe izin ver
  return NextResponse.next();
}

// Matcher (Eşleştirici) Filtresi
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
