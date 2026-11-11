import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AN-${new Date().getFullYear()}-${timestamp}${random}`;
}

export function generateSecurityToken(bookingId: string, phone: string): string {
  return crypto.createHash("sha256").update(`${bookingId}-${phone}-secret-abdul-nai`).digest("hex").slice(0, 16);
}

/**
 * Validates standard 10-digit Indian mobile numbers (starts with 6, 7, 8, or 9)
 */
export function validateIndianMobile(phoneStr: string): { isValid: boolean; formatted: string; error?: string } {
  if (!phoneStr) {
    return { isValid: false, formatted: "", error: "Mobile number is required." };
  }

  // Remove non-digits
  let digits = phoneStr.replace(/\D/g, "");

  // If begins with 91 and has 12 digits, strip country code
  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.substring(2);
  }

  // Check 10 digits starting with 6-9
  if (digits.length !== 10) {
    return { isValid: false, formatted: digits, error: "Please enter a valid 10-digit mobile number." };
  }

  if (!/^[6-9]\d{9}$/.test(digits)) {
    return { isValid: false, formatted: digits, error: "Please enter a valid Indian mobile number starting with 6, 7, 8, or 9." };
  }

  return { isValid: true, formatted: digits };
}

// Generate slots between opening (09:00 AM) and closing (09:00 PM)
export function getStandardTimeSlots(): string[] {
  return [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];
}
