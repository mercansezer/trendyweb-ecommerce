import { authService } from "@/services/auth/authService";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({
      isAthenticated: false,
      user: null,
    });
  }

  try {
    const { data } = await authService.authMe(token);

    const userData = data;

    if (!userData) throw new Error("Token geçersiz");

    return NextResponse.json({ isAuthenticated: true, user: userData });
  } catch (error) {
    return NextResponse.json(
      { isAthenticated: false, user: null },
      { status: 401 },
    );
  }
}
