export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServices, createService } from "@/lib/db";

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, description, duration_minutes, price, image_url, is_active } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { success: false, error: "Name, category, and price are required." },
        { status: 400 }
      );
    }

    const created = await createService({
      name,
      category,
      description: description || "",
      duration_minutes: Number(duration_minutes) || 45,
      price: Number(price),
      image_url: image_url || "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      is_active: is_active !== false,
    });

    return NextResponse.json({ success: true, service: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
