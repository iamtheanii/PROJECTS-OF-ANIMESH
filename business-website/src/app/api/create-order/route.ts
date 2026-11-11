export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createRazorpayOrder, isRazorpayConfigured } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt, notes } = body;

    if (!amount) {
      return NextResponse.json(
        { success: false, error: "Amount is required." },
        { status: 400 }
      );
    }

    const amountNum = Number(amount);
    // Minimum 100 paise (₹1.00)
    if (isNaN(amountNum) || amountNum < 100) {
      return NextResponse.json(
        { success: false, error: "Minimum amount is 100 paise (₹1.00)." },
        { status: 400 }
      );
    }

    const orderReceipt = receipt || `rcpt_${Date.now()}`;

    const order = await createRazorpayOrder({
      amount: amountNum,
      receipt: orderReceipt,
      notes: notes || {},
      isPaise: true,
    });

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
      receipt: order.receipt,
    });
  } catch (error: any) {
    console.error("[Create Order Error]", error);
    if (error?.statusCode === 401 || error?.error?.code === "BAD_REQUEST_ERROR") {
      return NextResponse.json(
        { success: false, error: error.message || "Razorpay Authentication Failed" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
