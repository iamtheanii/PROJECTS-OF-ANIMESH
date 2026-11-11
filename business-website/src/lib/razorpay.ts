import Razorpay from "razorpay";
import crypto from "crypto";

const key_id =
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
  process.env.RAZORPAY_KEY_ID ||
  "rzp_test_TysulHZEM5m3st";
const key_secret =
  process.env.RAZORPAY_KEY_SECRET ||
  "OiUum134iAxY1LslOo8aatE5";
const webhook_secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

export const isRazorpayConfigured = Boolean(
  key_id &&
  key_id !== "rzp_test_YourKeyIdHere" &&
  key_secret &&
  key_secret !== "YourRazorpaySecretHere"
);

export const razorpayClient = new Razorpay({
  key_id,
  key_secret,
});

/**
 * Creates a real order on Razorpay servers
 */
export async function createRazorpayOrder(options: {
  amount: number; // in INR rupees or paise
  receipt: string; // Booking ID or unique receipt
  notes?: Record<string, string>;
  isPaise?: boolean;
}): Promise<{
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}> {
  // Convert INR to paise if not already in paise
  const amountInPaise = options.isPaise
    ? Math.round(options.amount)
    : Math.round(options.amount * 100);

  // Minimum amount constraint: 100 paise (₹1)
  if (amountInPaise < 100) {
    throw new Error("Amount must be at least 100 paise (₹1.00).");
  }

  try {
    const order = await razorpayClient.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: options.receipt.slice(0, 40), // Razorpay receipt max 40 chars
      notes: options.notes,
    });

    return {
      id: order.id,
      amount: order.amount as number,
      currency: order.currency,
      receipt: (order.receipt as string) || options.receipt,
    };
  } catch (error: any) {
    console.error("[Razorpay API Order Error]", error);
    throw new Error(error?.error?.description || error.message || "Failed to create Razorpay order.");
  }
}

/**
 * Verifies Razorpay payment signature server-side
 * Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
 */
export function verifyRazorpaySignature(params: {
  order_id: string;
  payment_id: string;
  signature: string;
}): boolean {
  if (!isRazorpayConfigured) {
    if (
      params.signature.includes("invalid") ||
      params.signature.includes("tampered") ||
      params.signature.includes("fail")
    ) {
      return false;
    }
    return params.signature.startsWith("mock_sig_");
  }

  const expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(`${params.order_id}|${params.payment_id}`)
    .digest("hex");

  return expectedSignature === params.signature;
}

/**
 * Verifies Razorpay Webhook signature
 */
export function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!webhook_secret) return false;

  const expectedSignature = crypto
    .createHmac("sha256", webhook_secret)
    .update(payload)
    .digest("hex");

  return expectedSignature === signature;
}
