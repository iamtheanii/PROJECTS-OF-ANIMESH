export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getBookingByBookingId, updateBookingStatus } from "@/lib/db";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { booking_id, amount_inr } = await req.json();

    if (!booking_id) {
      return NextResponse.json({ success: false, error: "Booking ID is required" }, { status: 400 });
    }

    const booking = await getBookingByBookingId(booking_id);
    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    // Determine amount to charge (full amount or remaining balance)
    let chargeAmount = Number(booking.service_price);
    if (amount_inr && Number(amount_inr) > 0) {
      chargeAmount = Number(amount_inr);
    } else if (booking.remaining_balance && Number(booking.remaining_balance) > 0) {
      chargeAmount = Number(booking.remaining_balance);
    }

    // Create order on Razorpay
    const order = await createRazorpayOrder({
      amount: chargeAmount,
      receipt: booking.booking_id,
      notes: {
        customer_name: booking.customer_name,
        phone: booking.phone,
        service: booking.service_name,
        appointment_date: booking.appointment_date,
        charged_for: amount_inr ? "outstanding_balance" : "initial_booking",
      },
    });

    // Save order ID to the booking record
    await updateBookingStatus(booking_id, {
      razorpay_order_id: order.id,
    });

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YourKeyIdHere",
      booking: {
        id: booking.booking_id,
        customer_name: booking.customer_name,
        phone: booking.phone,
        email: booking.email,
        service_name: booking.service_name,
        price: chargeAmount,
        remaining_balance: booking.remaining_balance,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
