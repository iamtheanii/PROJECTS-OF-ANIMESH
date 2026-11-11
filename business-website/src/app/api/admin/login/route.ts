import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@abdulnai.com";
    const expectedPassword = process.env.ADMIN_PASSWORD || "AbdulNaiLuxe2025!";

    if (email === expectedEmail && password === expectedPassword) {
      // Set secure auth cookie
      const response = NextResponse.json({
        success: true,
        user: { email, role: "admin", name: "Abdul Nai Concierge" },
      });

      response.cookies.set("admin_session", "authenticated_token_abdul_nai_luxe", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials. Please verify email and password." },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
