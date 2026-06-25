import { NextResponse } from "next/server";
import { authService } from "@/services/auth/authService";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newUser = await authService.register(body);

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
    
  } catch (error: any) {
   
    return NextResponse.json(
      {
        message:
          error.response?.data?.message || "Kayıt işlemi başarısız oldu.",
      },
      { status: error.response?.status || 500 },
    );
  }
}
