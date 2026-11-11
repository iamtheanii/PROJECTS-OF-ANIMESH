export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { getBookingByBookingId, updateBookingStatus, recordPayment } from "@/lib/db";
import { syncBookingToGoogleSheet } from "@/lib/google-sheets";
import {
  sendCustomerWhatsAppConfirmation,
  sendOwnerWhatsAppNotification,
} from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      // also allow alternative naming from different clients
      order_id = razorpay_order_id,
      payment_id = razorpay_payment_id,
      signature = razorpay_signature,
      booking_id,
      method,
    } = body;

    if (!order_id || !payment_id || !signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters: order_id, payment_id, and signature are required.",
        },
        { status: 400 }
      );
    }

    // Server-side HMAC-SHA256 signature verification
    const isValid = verifyRazorpaySignature({
      order_id,
      payment_id,
      signature,
    });

    if (!isValid) {
      if (booking_id) {
        const updated = await updateBookingStatus(booking_id, {
          payment_status: "FAILED",
          razorpay_payment_id: payment_id,
        });
        if (updated) {
          await syncBookingToGoogleSheet(updated);
        }
      }
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: "Invalid Razorpay payment signature verification failed.",
        },
        { status: 400 }
      );
    }

    // If associated with a booking, update status and sync
    let updatedBooking = null;
    if (booking_id) {
      const booking = await getBookingByBookingId(booking_id);
      if (booking) {
        const totalAmount = Number(booking.total_amount || booking.service_price);
        const newAdvance = totalAmount;
        const newRemaining = 0;

        updatedBooking = await updateBookingStatus(booking_id, {
          payment_status: "PAID",
          advance_amount: newAdvance,
          remaining_balance: newRemaining,
          razorpay_order_id: order_id,
          razorpay_payment_id: payment_id,
          razorpay_signature: signature,
          payment_method: method || "ONLINE_RAZORPAY",
          admin_verification: "VERIFIED",
        });

        await recordPayment({
          booking_id,
          razorpay_order_id: order_id,
          razorpay_payment_id: payment_id,
          amount: totalAmount,
          currency: "INR",
          status: "PAID",
          payment_method: method || "ONLINE_RAZORPAY",
        });

        if (updatedBooking) {
          await syncBookingToGoogleSheet(updatedBooking);
          await sendCustomerWhatsAppConfirmation(updatedBooking);
          await sendOwnerWhatsAppNotification(
            "PAYMENT_SUCCESS",
            updatedBooking,
            `Payment verified via ${method || "Razorpay"}`
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      message: "Payment signature verified successfully.",
      order_id,
      payment_id,
      booking: updatedBooking,
    });
  } catch (error: any) {
    console.error("[Verify Payment Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal verification error" },
      { status: 500 }
    );
  }
}
