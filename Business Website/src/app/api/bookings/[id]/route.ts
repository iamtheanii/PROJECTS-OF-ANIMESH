export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getBookingByBookingId, updateBookingStatus, recordPayment } from "@/lib/db";
import { syncBookingToGoogleSheet } from "@/lib/google-sheets";
import {
  sendCustomerWhatsAppConfirmation,
  sendOwnerWhatsAppNotification,
} from "@/lib/notifications";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");
    const token = searchParams.get("token");

    const booking = await getBookingByBookingId(params.id);
    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    // Security check for customer access if phone or token provided
    if (phone) {
      const cleanInput = phone.replace(/\D/g, "");
      const cleanBookingPhone = booking.phone.replace(/\D/g, "");
      if (cleanInput !== cleanBookingPhone) {
        return NextResponse.json(
          { success: false, error: "Authentication failed. Mobile number does not match this booking." },
          { status: 403 }
        );
      }
    } else if (token && booking.security_token && token !== booking.security_token) {
      return NextResponse.json(
        { success: false, error: "Invalid security access token." },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const existing = await getBookingByBookingId(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    const updates: any = { ...body };

    // 1. If Admin Marks Service Completed
    if (updates.status === "COMPLETED" && existing.status !== "COMPLETED") {
      updates.completion_time = new Date().toISOString();
    }

    // 2. If Admin Verifies Offline Payment
    if (updates.admin_verification === "VERIFIED") {
      updates.payment_status = "PAID";
      const total = Number(existing.total_amount || existing.service_price);
      updates.advance_amount = total;
      updates.remaining_balance = 0;

      await recordPayment({
        booking_id: existing.booking_id,
        amount: total,
        currency: "INR",
        status: "PAID",
        payment_method: updates.payment_method || "CASH_VERIFIED",
        collected_by: "ADMIN",
        notes: updates.admin_verification_notes || "Offline payment verified by salon owner",
      });
    }

    // 3. If Customer Declares Offline Payment Done
    if (updates.customer_payment_declaration === "PAYMENT_DONE") {
      updates.payment_status = "AWAITING_ADMIN_VERIFICATION";
      updates.admin_verification = "PENDING";
    } else if (updates.customer_payment_declaration === "PAYMENT_PENDING") {
      updates.payment_status = "UNPAID";
    }

    const updatedBooking = await updateBookingStatus(id, updates);
    if (!updatedBooking) {
      return NextResponse.json({ success: false, error: "Failed to update booking." }, { status: 500 });
    }

    // Automatically synchronize status change to Google Sheets (18-column contract)
    try {
      await syncBookingToGoogleSheet(updatedBooking);
    } catch (e: any) {
      console.error("Non-fatal sheets sync error:", e.message);
    }

    // Automated WhatsApp Notifications
    try {
      if (updates.status === "COMPLETED") {
        await sendOwnerWhatsAppNotification("SERVICE_COMPLETED", updatedBooking, "Slot released automatically");
      } else if (updates.status === "CANCELLED") {
        await sendOwnerWhatsAppNotification("BOOKING_CANCELLED", updatedBooking, "Slot released automatically");
        await sendCustomerWhatsAppConfirmation(updatedBooking);
      } else if (updates.customer_payment_declaration === "PAYMENT_DONE") {
        await sendOwnerWhatsAppNotification("OFFLINE_PAYMENT_DECLARED", updatedBooking, "Client declares payment transferred/cash");
      } else if (updates.admin_verification === "VERIFIED") {
        await sendCustomerWhatsAppConfirmation(updatedBooking);
      }
    } catch (e: any) {
      console.error("Non-fatal notification error:", e.message);
    }

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
