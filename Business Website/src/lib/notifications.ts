import { Booking, NotificationLog } from "@/types";
import fs from "fs";
import path from "path";

const whatsappToken = process.env.WHATSAPP_API_TOKEN || "";
const whatsappPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
export const OWNER_PHONE = process.env.SALON_OWNER_PHONE || "9437238055";

export const isWhatsAppConfigured = Boolean(
  whatsappToken && 
  whatsappPhoneId && 
  whatsappToken !== "your-whatsapp-token"
);

const NOTIFICATIONS_LOG_PATH = path.join(process.cwd(), "notifications_log.json");

function getNotificationLogs(): NotificationLog[] {
  try {
    if (!fs.existsSync(NOTIFICATIONS_LOG_PATH)) return [];
    return JSON.parse(fs.readFileSync(NOTIFICATIONS_LOG_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function saveNotificationLog(log: NotificationLog): void {
  try {
    const logs = getNotificationLogs();
    logs.push(log);
    // Keep last 500 logs
    if (logs.length > 500) logs.splice(0, logs.length - 500);
    fs.writeFileSync(NOTIFICATIONS_LOG_PATH, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error("Failed to write notification log:", err);
  }
}

export function getAllNotificationLogs(): NotificationLog[] {
  return getNotificationLogs();
}

/**
 * Sends a WhatsApp text message via Meta Cloud API
 */
async function sendRawWhatsAppMessage(toPhone: string, messageBody: string): Promise<{ success: boolean; data?: any; error?: string }> {
  // Format Indian mobile to international standard 91XXXXXXXXXX
  let cleanPhone = toPhone.replace(/\D/g, "");
  if (cleanPhone.length === 10) cleanPhone = `91${cleanPhone}`;

  if (!isWhatsAppConfigured) {
    console.log(`[WhatsApp API Notice] Config pending. Simulation logged for ${cleanPhone}:\n${messageBody}`);
    return { success: true, data: { simulated: true, cleanPhone } };
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${whatsappPhoneId}/messages`;
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: cleanPhone,
      type: "text",
      text: {
        preview_url: false,
        body: messageBody,
      },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${whatsappToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("[WhatsApp Cloud API Error]", data);
      return { success: false, error: JSON.stringify(data) };
    }
    return { success: true, data };
  } catch (err: any) {
    console.error("[WhatsApp Send Exception]", err);
    return { success: false, error: err.message };
  }
}

/**
 * Customer Booking Confirmation Message
 */
export async function sendCustomerWhatsAppConfirmation(booking: Booking): Promise<{ sent: boolean; log: NotificationLog }> {
  const isPaid = booking.payment_status === "PAID";
  const isAwaiting = booking.payment_status === "AWAITING_ADMIN_VERIFICATION";
  const statusLabel = isPaid 
    ? "PAID" 
    : isAwaiting 
    ? "AWAITING VERIFICATION" 
    : "UNPAID / PAY AT SALON";

  let message = "";
  if (isPaid) {
    message = `Hello ${booking.customer_name}!

Your appointment at ABDUL NAI SALON has been successfully booked.

Booking ID: ${booking.booking_id}
Service: ${booking.service_name}
Date: ${booking.appointment_date}
Time: ${booking.appointment_time}
Total Amount: ₹${booking.total_amount || booking.service_price}
Payment Status: PAID

Thank you for choosing Abdul Nai Salon.

We look forward to serving you!`;
  } else {
    message = `Hello ${booking.customer_name}!

Your appointment at ABDUL NAI SALON has been successfully booked.

Booking ID: ${booking.booking_id}
Service: ${booking.service_name}
Date: ${booking.appointment_date}
Time: ${booking.appointment_time}
Total Amount: ₹${booking.total_amount || booking.service_price}
Payment Status: ${statusLabel}

Please complete your payment at the salon.

Thank you for choosing Abdul Nai Salon!`;
  }

  // Deduplication check
  const eventKey = `CUSTOMER_BOOKING_${booking.booking_id}_${booking.payment_status}`;
  const logs = getNotificationLogs();
  const existing = logs.find((l) => l.event_type === eventKey);
  if (existing) {
    return { sent: true, log: existing };
  }

  const result = await sendRawWhatsAppMessage(booking.phone, message);
  const log: NotificationLog = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    booking_id: booking.booking_id,
    recipient_type: "CUSTOMER",
    recipient_phone: booking.phone,
    event_type: eventKey,
    message_content: message,
    status: result.success ? (isWhatsAppConfigured ? "SENT" : "LOGGED_SIMULATED") : "FAILED",
    timestamp: new Date().toISOString(),
    error: result.error,
  };

  saveNotificationLog(log);
  return { sent: result.success, log };
}

/**
 * Salon Owner WhatsApp Notification
 */
export async function sendOwnerWhatsAppNotification(
  event: 'NEW_BOOKING' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'OFFLINE_PAYMENT_DECLARED' | 'PAYMENT_PENDING' | 'BOOKING_CANCELLED' | 'SERVICE_COMPLETED',
  booking: Booking,
  extraNotes?: string
): Promise<{ sent: boolean; log: NotificationLog }> {
  const eventTitles = {
    NEW_BOOKING: "💈 NEW APPOINTMENT CREATED",
    PAYMENT_SUCCESS: "💰 ONLINE PAYMENT SUCCESSFUL",
    PAYMENT_FAILED: "⚠️ ONLINE PAYMENT FAILED",
    OFFLINE_PAYMENT_DECLARED: "🔔 OFFLINE PAYMENT DECLARED BY CLIENT",
    PAYMENT_PENDING: "⏳ PAYMENT REMAINS PENDING",
    BOOKING_CANCELLED: "❌ APPOINTMENT CANCELLED",
    SERVICE_COMPLETED: "✨ SERVICE MARKED COMPLETED",
  };

  const message = `${eventTitles[event]}

Customer: ${booking.customer_name}
Mobile: ${booking.phone}
Service: ${booking.service_name}
Date: ${booking.appointment_date}
Time: ${booking.appointment_time}
Booking ID: ${booking.booking_id}
Total Amount: ₹${booking.total_amount || booking.service_price}
Payment Method: ${booking.payment_method}
Payment Status: ${booking.payment_status}
${extraNotes ? `Note: ${extraNotes}` : ""}`;

  // Deduplication
  const eventKey = `OWNER_${event}_${booking.booking_id}_${booking.payment_status}_${booking.status}`;
  const logs = getNotificationLogs();
  const existing = logs.find((l) => l.event_type === eventKey);
  if (existing) {
    return { sent: true, log: existing };
  }

  const result = await sendRawWhatsAppMessage(OWNER_PHONE, message);
  const log: NotificationLog = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    booking_id: booking.booking_id,
    recipient_type: "OWNER",
    recipient_phone: OWNER_PHONE,
    event_type: eventKey,
    message_content: message,
    status: result.success ? (isWhatsAppConfigured ? "SENT" : "LOGGED_SIMULATED") : "FAILED",
    timestamp: new Date().toISOString(),
    error: result.error,
  };

  saveNotificationLog(log);
  return { sent: result.success, log };
}
