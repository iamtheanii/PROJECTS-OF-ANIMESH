export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { getBookings, updateBookingStatus, recordPayment } from "@/lib/db";
import { syncBookingToGoogleSheet } from "@/lib/google-sheets";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    // 1. Signature Verification
    if (process.env.RAZORPAY_WEBHOOK_SECRET) {
      const isValid = verifyWebhookSignature(rawBody, signature);
      if (!isValid) {
        console.error("[Razorpay Webhook] Invalid signature rejected");
        return NextResponse.json({ success: false, error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const eventId = payload.event_id || `evt_${Date.now()}`;
    const paymentEntity = payload.payload?.payment?.entity;

    if (!paymentEntity) {
      return NextResponse.json({ success: true, message: "Ignored event without payment entity" });
    }

    const orderId = paymentEntity.order_id;
    const paymentId = paymentEntity.id;
    const amount = (paymentEntity.amount || 0) / 100;
    const method = paymentEntity.method;

    // Find the booking associated with this order_id
    const allBookings = await getBookings();
    const booking = allBookings.find(
      (b) => b.razorpay_order_id === orderId || (b.booking_id && paymentEntity.notes?.receipt === b.booking_id)
    );

    if (!booking) {
      console.warn(`[Razorpay Webhook] No matching booking found for order ${orderId}`);
      return NextResponse.json({ success: true, message: "No matching booking" });
    }

    // 2. Idempotency Check & Event handling
    if (event === "payment.captured" || event === "order.paid") {
      if (booking.payment_status !== "PAID") {
        const updated = await updateBookingStatus(booking.booking_id, {
          payment_status: "PAID",
          razorpay_payment_id: paymentId,
          payment_method: method || "RAZORPAY",
        });

        await recordPayment({
          booking_id: booking.booking_id,
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          amount,
          currency: paymentEntity.currency || "INR",
          status: "PAID",
          payment_method: method,
          webhook_event_id: eventId,
          metadata: payload,
        });

        if (updated) {
          await syncBookingToGoogleSheet(updated);
        }
      }
    } else if (event === "payment.failed") {
      const updated = await updateBookingStatus(booking.booking_id, {
        payment_status: "FAILED",
        razorpay_payment_id: paymentId,
      });

      await recordPayment({
        booking_id: booking.booking_id,
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        amount,
        currency: paymentEntity.currency || "INR",
        status: "FAILED",
        payment_method: method,
        webhook_event_id: eventId,
        metadata: payload,
      });

      if (updated) {
        await syncBookingToGoogleSheet(updated);
      }
    } else if (event === "refund.processed") {
      const updated = await updateBookingStatus(booking.booking_id, {
        payment_status: "REFUNDED",
        status: "CANCELLED",
      });

      await recordPayment({
        booking_id: booking.booking_id,
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        amount,
        currency: paymentEntity.currency || "INR",
        status: "REFUNDED",
        payment_method: method,
        webhook_event_id: eventId,
        metadata: payload,
      });

      if (updated) {
        await syncBookingToGoogleSheet(updated);
      }
    }

    return NextResponse.json({ success: true, message: "Webhook processed idempotently" });
  } catch (error: any) {
    console.error("[Razorpay Webhook Exception]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
