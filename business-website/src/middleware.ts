import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // If Razorpay webhook is posted to root "/" or "/api/webhook", route to the webhook handler
  if (
    request.method === "POST" &&
    (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/api/webhook")
  ) {
    return NextResponse.rewrite(new URL("/api/payments/webhook", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/api/webhook"],
};
