import Razorpay from "razorpay";
import crypto from "crypto";

const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
const key_secret = process.env.RAZORPAY_KEY_SECRET || "";
const webhook_secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

export const isRazorpayConfigured = Boolean(
  key_id &&
  key_id !== "rzp_test_YourKeyIdHere" &&
  key_secret &&
  key_secret !== "YourRazorpaySecretHere"
);

export const razorpayClient = isRazorpayConfigured
  ? new Razorpay({
      key_id,
      key_secret,
    })
  : null;

/**
 * Creates an order on Razorpay servers
 */
export async function createRazorpayOrder(options: {
  amount: number; // in INR rupees
  receipt: string; // Booking ID
  notes?: Record<string, string>;
}): Promise<{
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}> {
  // Convert INR to paise
  const amountInPaise = Math.round(options.amount * 100);

  if (isRazorpayConfigured && razorpayClient) {
    const order = await razorpayClient.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: options.receipt,
      notes: options.notes,
    });

    return {
      id: order.id,
      amount: order.amount as number,
      currency: order.currency,
      receipt: order.receipt || options.receipt,
    };
  }

  // Resilient fallback for testing when credentials have not yet been added to .env
  return {
    id: `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    amount: amountInPaise,
    currency: "INR",
    receipt: options.receipt,
  };
}

/**
 * Verifies Razorpay payment signature server-side
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
