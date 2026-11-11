export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getBookings, getCustomers, getPayments } from "@/lib/db";
import { isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { isRazorpayConfigured } from "@/lib/razorpay";
import { isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  try {
    const bookings = await getBookings();
    const customers = await getCustomers();
    const payments = await getPayments();

    const todayStr = new Date().toISOString().split("T")[0];
    const todayAppointments = bookings.filter((b) => b.appointment_date === todayStr);

    const paidBookings = bookings.filter((b) => b.payment_status === "PAID");
    const pendingBookings = bookings.filter((b) => b.payment_status === "PENDING");

    const totalRevenue = paidBookings.reduce((sum, b) => sum + Number(b.service_price), 0);
    const pendingRevenue = pendingBookings.reduce((sum, b) => sum + Number(b.service_price), 0);

    return NextResponse.json({
      success: true,
      stats: {
        totalBookings: bookings.length,
        todayAppointmentsCount: todayAppointments.length,
        totalCustomers: customers.length,
        totalRevenue,
        pendingPaymentsCount: pendingBookings.length,
        completedPaymentsCount: paidBookings.length,
        pendingRevenue,
      },
      integrations: {
        supabase: isSupabaseConfigured,
        razorpay: isRazorpayConfigured,
        googleSheets: isGoogleSheetsConfigured,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
