export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCustomers, getBookings } from "@/lib/db";

export async function GET() {
  try {
    const customers = await getCustomers();
    const bookings = await getBookings();

    // Attach past bookings to each customer
    const customersWithHistory = customers.map((c) => {
      const customerBookings = bookings.filter((b) => b.phone === c.phone);
      return {
        ...c,
        history: customerBookings,
      };
    });

    return NextResponse.json({ success: true, customers: customersWithHistory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
