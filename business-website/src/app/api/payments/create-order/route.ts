export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getBookingByBookingId, updateBookingStatus, createBooking } from "@/lib/db";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const {
      booking_id,
      amount_inr,
      amount,
      service_name,
      customer_name,
      phone,
      email,
      appointment_date,
      appointment_time,
    } = await req.json();

    if (!booking_id && !amount && !amount_inr) {
      return NextResponse.json(
        { success: false, error: "Booking ID or amount is required" },
        { status: 400 }
      );
    }

    let booking = booking_id ? await getBookingByBookingId(booking_id) : null;

    // Determine amount to charge
    let chargeAmount = 1200;
    if (booking) {
      if (amount_inr && Number(amount_inr) > 0) {
        chargeAmount = Number(amount_inr);
      } else if (booking.remaining_balance && Number(booking.remaining_balance) > 0) {
        chargeAmount = Number(booking.remaining_balance);
      } else {
        chargeAmount = Number(booking.service_price || booking.total_amount || 1200);
      }
    } else {
      // Graceful fallback for cross-instance serverless deployments
      chargeAmount = Number(amount_inr || amount || 1200);
      if (booking_id) {
        try {
          booking = await createBooking({
            booking_id,
            customer_name: (customer_name || "Guest Customer").trim(),
            phone: (phone || "9876543210").replace(/\D/g, ""),
            email: email || undefined,
            service_id: "srv-selected",
            service_name: service_name || "Luxury Salon Service",
            service_price: chargeAmount,
            total_amount: chargeAmount,
            advance_amount: 0,
            remaining_balance: chargeAmount,
            appointment_date: appointment_date || new Date().toISOString().split("T")[0],
            appointment_time: appointment_time || "10:00 AM",
            status: "CONFIRMED",
            payment_status: "PENDING",
            payment_method: "ONLINE_RAZORPAY",
            customer_payment_declaration: "NONE",
            admin_verification: "PENDING",
            google_sheet_synced: false,
          });
        } catch (bErr) {
          console.error("Booking rehydration warning:", bErr);
        }
      }
    }

    // Create order on Razorpay servers
    const order = await createRazorpayOrder({
      amount: chargeAmount,
      receipt: (booking_id || `rcpt_${Date.now()}`).slice(0, 40),
      notes: {
        booking_id: booking_id || "",
        customer_name: booking?.customer_name || customer_name || "",
        phone: booking?.phone || phone || "",
        service: booking?.service_name || service_name || "Salon Service",
        charged_for: amount_inr ? "outstanding_balance" : "initial_booking",
      },
    });

    // Save order ID to the booking record if available
    if (booking_id) {
      try {
        await updateBookingStatus(booking_id, {
          razorpay_order_id: order.id,
        });
      } catch {}
    }

    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      "rzp_live_TyuQiKFbunEpjb";

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
      booking: booking
        ? {
            id: booking.booking_id,
            customer_name: booking.customer_name,
            phone: booking.phone,
            email: booking.email,
            service_name: booking.service_name,
            price: chargeAmount,
            remaining_balance: booking.remaining_balance,
          }
        : {
            id: booking_id,
            customer_name: customer_name || "Guest Customer",
            phone: phone || "",
            service_name: service_name || "Salon Service",
            price: chargeAmount,
            remaining_balance: chargeAmount,
          },
    });
  } catch (error: any) {
    console.error("[Create Order Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
