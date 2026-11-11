export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  createBooking,
  getBookings,
  checkSlotAvailability,
  checkCustomerDuplicateBooking,
} from "@/lib/db";
import { generateBookingId, validateIndianMobile } from "@/lib/utils";
import { syncBookingToGoogleSheet } from "@/lib/google-sheets";
import {
  sendCustomerWhatsAppConfirmation,
  sendOwnerWhatsAppNotification,
} from "@/lib/notifications";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const payment_status = searchParams.get("payment_status") || undefined;
    const date = searchParams.get("date") || undefined;
    const search = searchParams.get("search") || undefined;
    const phone = searchParams.get("phone") || undefined;

    const bookings = await getBookings({ status, payment_status, date, search, phone });
    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_name,
      phone,
      email,
      service_id,
      service_name,
      service_price,
      appointment_date,
      appointment_time,
      instructions,
      payment_method, // 'ONLINE_RAZORPAY' | 'PAY_AT_SALON'
      customer_payment_declaration, // 'NONE' | 'PAYMENT_DONE' | 'PAYMENT_PENDING'
    } = body;

    // 1. Mandatory Input Validation
    if (!customer_name || !phone || !service_id || !appointment_date || !appointment_time) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required booking details." },
        { status: 400 }
      );
    }

    // 2. Validate Indian Mobile Number
    const phoneValidation = validateIndianMobile(phone);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { success: false, error: phoneValidation.error || "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }
    const cleanPhone = phoneValidation.formatted;

    // 3. Rule: "Remember same booked customer cant book twice with same details."
    const existingActiveBooking = await checkCustomerDuplicateBooking(cleanPhone, appointment_date);
    if (existingActiveBooking) {
      return NextResponse.json(
        {
          success: false,
          error: `You already have an active appointment (Booking ID: ${existingActiveBooking.booking_id}) scheduled on ${appointment_date} at ${existingActiveBooking.appointment_time}. A customer cannot book twice for the same date with active details. Please complete or reschedule your existing booking.`,
          existingBookingId: existingActiveBooking.booking_id,
        },
        { status: 409 }
      );
    }

    // 4. Prevent Double Booking for the Slot
    const isSlotAvailable = await checkSlotAvailability(appointment_date, appointment_time);
    if (!isSlotAvailable) {
      return NextResponse.json(
        {
          success: false,
          error: `The slot ${appointment_time} on ${appointment_date} has already been reserved. Please select another time slot.`,
        },
        { status: 409 }
      );
    }

    // 5. Determine Payment Status & Method
    const method = payment_method || "ONLINE_RAZORPAY";
    let initialPaymentStatus: any = "PENDING";
    let declaration: any = customer_payment_declaration || "NONE";
    let initialBookingStatus: any = "PENDING";

    if (method === "PAY_AT_SALON") {
      initialBookingStatus = "CONFIRMED";
      if (declaration === "PAYMENT_DONE") {
        initialPaymentStatus = "AWAITING_ADMIN_VERIFICATION";
      } else {
        initialPaymentStatus = "UNPAID";
        declaration = "PAYMENT_PENDING";
      }
    } else {
      // For ONLINE_RAZORPAY: Must remain PENDING until Razorpay signature is verified
      initialBookingStatus = "PENDING";
      initialPaymentStatus = "PENDING";
    }

    const totalAmount = Number(service_price);
    const advanceAmount = 0;
    const remainingBalance = totalAmount;

    // 6. Generate Unique Booking ID
    const booking_id = generateBookingId();

    // 7. Save to Database
    const newBooking = await createBooking({
      booking_id,
      customer_name: customer_name.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : undefined,
      service_id,
      service_name,
      service_price: totalAmount,
      total_amount: totalAmount,
      advance_amount: advanceAmount,
      remaining_balance: remainingBalance,
      appointment_date,
      appointment_time,
      instructions: instructions ? instructions.trim() : undefined,
      status: initialBookingStatus,
      payment_status: initialPaymentStatus,
      payment_method: method,
      customer_payment_declaration: declaration,
      admin_verification: "PENDING",
      google_sheet_synced: false,
    });

    // 8. Google Sheets Synchronization & WhatsApp Notifications
    // Only send immediate confirmation for PAY_AT_SALON.
    // For ONLINE_RAZORPAY, notifications and confirmed sheet rows are triggered when payment is verified!
    let sheetResult = { success: false, message: "" };
    if (method === "PAY_AT_SALON") {
      try {
        sheetResult = await syncBookingToGoogleSheet(newBooking);
      } catch (e: any) {
        console.error("Non-blocking Google Sheets sync error:", e.message);
      }

      try {
        await sendCustomerWhatsAppConfirmation(newBooking);
        const ownerEvent =
          declaration === "PAYMENT_DONE" ? "OFFLINE_PAYMENT_DECLARED" : "NEW_BOOKING";
        await sendOwnerWhatsAppNotification(ownerEvent, newBooking, `Customer booked via ${method}`);
      } catch (e: any) {
        console.error("Non-blocking WhatsApp alert error:", e.message);
      }
    }

    return NextResponse.json(
      {
        success: true,
        booking: newBooking,
        google_sheet_synced: sheetResult.success,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
