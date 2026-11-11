import { google } from "googleapis";
import { Booking, SyncLog } from "@/types";
import fs from "fs";
import path from "path";

const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "";
const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY || "";
const spreadsheetId = process.env.GOOGLE_SHEET_ID || "";

export const SPREADSHEET_NAME = "ABDUL NAI — LIVE BOOKING & PAYMENT TRACKER";

export const isGoogleSheetsConfigured = Boolean(
  clientEmail &&
  clientEmail !== "your-service-account@your-project.iam.gserviceaccount.com" &&
  privateKeyRaw &&
  privateKeyRaw.length > 50 &&
  spreadsheetId &&
  spreadsheetId !== "1_YourGoogleSheetIdHereSpreadsheet"
);

const SYNC_LOG_PATH = path.join(process.cwd(), "sync_logs.json");

function getSyncLogs(): SyncLog[] {
  try {
    if (!fs.existsSync(SYNC_LOG_PATH)) return [];
    return JSON.parse(fs.readFileSync(SYNC_LOG_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function recordSyncLog(log: SyncLog): void {
  try {
    const logs = getSyncLogs();
    logs.push(log);
    if (logs.length > 500) logs.splice(0, logs.length - 500);
    fs.writeFileSync(SYNC_LOG_PATH, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error("Failed to write sync log:", err);
  }
}

export function getAllSyncLogs(): SyncLog[] {
  return getSyncLogs();
}

function getPrivateKey(): string {
  if (!privateKeyRaw) return "";
  let key = privateKeyRaw.replace(/\\n/g, "\n");
  if (!key.includes("-----BEGIN PRIVATE KEY-----")) {
    try {
      key = Buffer.from(key, "base64").toString("utf-8");
    } catch {}
  }
  return key;
}

async function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: getPrivateKey(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export const SHEET_COLUMNS_18 = [
  "Booking ID",
  "Customer Name",
  "Phone Number",
  "Service",
  "Booking Date",
  "Appointment Date",
  "Appointment Time",
  "Total Amount",
  "Advance Amount",
  "Remaining Balance",
  "Payment Method",
  "Payment Status",
  "Transaction ID",
  "Booking Status",
  "Customer Payment Declaration",
  "Admin Verification",
  "Completion Time",
  "Last Updated",
];

/**
 * Format a Booking record into an 18-column Google Sheets row array
 */
function bookingTo18RowArray(booking: Booking): (string | number)[] {
  const bookingDate = new Date(booking.created_at).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const total = Number(booking.total_amount ?? booking.service_price);
  const advance = Number(booking.advance_amount ?? (booking.payment_status === "PAID" ? total : 0));
  const remaining = Number(booking.remaining_balance ?? (total - advance));

  return [
    booking.booking_id,                                           // 1. Booking ID
    booking.customer_name,                                        // 2. Customer Name
    booking.phone,                                                // 3. Phone Number
    booking.service_name,                                         // 4. Service
    bookingDate,                                                  // 5. Booking Date
    booking.appointment_date,                                     // 6. Appointment Date
    booking.appointment_time,                                     // 7. Appointment Time
    total,                                                        // 8. Total Amount
    advance,                                                      // 9. Advance Amount
    remaining,                                                    // 10. Remaining Balance
    booking.payment_method || "ONLINE_RAZORPAY",                  // 11. Payment Method
    booking.payment_status,                                       // 12. Payment Status
    booking.razorpay_payment_id || booking.razorpay_order_id || "N/A", // 13. Transaction ID
    booking.status,                                               // 14. Booking Status
    booking.customer_payment_declaration || "NONE",               // 15. Customer Payment Declaration
    booking.admin_verification || "PENDING",                      // 16. Admin Verification
    booking.completion_time || "N/A",                             // 17. Completion Time
    new Date().toISOString(),                                     // 18. Last Updated
  ];
}

/**
 * Syncs booking to Google Sheet with 18-column layout, retries, and row update
 */
export async function syncBookingToGoogleSheet(
  booking: Booking,
  maxRetries: number = 2
): Promise<{ success: boolean; message: string; rowIndex?: number }> {
  if (!isGoogleSheetsConfigured) {
    const log: SyncLog = {
      id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      booking_id: booking.booking_id,
      action: "SYNC_LOCAL_QUEUE",
      status: "SUCCESS",
      details: "Simulated locally. Configure GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID in .env",
      timestamp: new Date().toISOString(),
    };
    recordSyncLog(log);

    return {
      success: true,
      message: "Sync recorded in database and local queue (Google Sheets pending credentials)",
    };
  }

  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const sheets = await getSheetsClient();
      const sheetRange = "Sheet1!A:R";

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: sheetRange,
      });

      const rows = response.data.values || [];

      // If sheet empty, create 18-column header first
      if (rows.length === 0) {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: "Sheet1!A1",
          valueInputOption: "RAW",
          requestBody: {
            values: [SHEET_COLUMNS_18],
          },
        });
        rows.push(SHEET_COLUMNS_18);
      }

      // Check if Booking ID already exists in Column A
      const rowIndex = rows.findIndex((row) => row[0] === booking.booking_id);
      const rowValues = bookingTo18RowArray(booking);

      if (rowIndex !== -1) {
        // UPDATE existing row
        const targetRow = rowIndex + 1;
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!A${targetRow}:R${targetRow}`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [rowValues],
          },
        });

        recordSyncLog({
          id: `sync-${Date.now()}`,
          booking_id: booking.booking_id,
          action: "UPDATE_ROW",
          status: "SUCCESS",
          details: `Updated row ${targetRow} with status ${booking.status} / ${booking.payment_status}`,
          timestamp: new Date().toISOString(),
        });

        return {
          success: true,
          message: `Successfully updated row ${targetRow}`,
          rowIndex: targetRow,
        };
      } else {
        // APPEND new row
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: "Sheet1!A:R",
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          requestBody: {
            values: [rowValues],
          },
        });

        recordSyncLog({
          id: `sync-${Date.now()}`,
          booking_id: booking.booking_id,
          action: "APPEND_ROW",
          status: "SUCCESS",
          details: `Appended new row for ${booking.booking_id}`,
          timestamp: new Date().toISOString(),
        });

        return {
          success: true,
          message: "Successfully added new row to Google Sheets",
          rowIndex: rows.length + 1,
        };
      }
    } catch (error: any) {
      attempt++;
      console.error(`[Google Sheets Error] Attempt ${attempt} failed for ${booking.booking_id}:`, error.message);
      if (attempt > maxRetries) {
        recordSyncLog({
          id: `sync-${Date.now()}`,
          booking_id: booking.booking_id,
          action: "RETRY_QUEUED",
          status: "FAILED",
          details: `Failed after ${maxRetries} attempts: ${error.message}`,
          timestamp: new Date().toISOString(),
        });
        return {
          success: false,
          message: `Google Sheets sync failed after ${maxRetries} retries: ${error.message}`,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  return { success: false, message: "Exceeded max retries" };
}
