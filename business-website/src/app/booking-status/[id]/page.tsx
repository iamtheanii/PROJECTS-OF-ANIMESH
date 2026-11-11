"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Booking } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  Scissors,
  Calendar,
  Clock,
  User,
  Phone,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Loader2,
  RefreshCw,
  Home,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookingStatusPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = params.id as string;
  const token = searchParams.get("token") || "";

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [phonePrompt, setPhonePrompt] = useState<boolean>(false);
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [submittingAction, setSubmittingAction] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string>("");

  const loadBooking = async (verifyPhone?: string) => {
    setLoading(true);
    setError("");
    try {
      let url = `/api/bookings/${bookingId}?`;
      if (token) url += `token=${token}&`;
      if (verifyPhone) url += `phone=${verifyPhone}&`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.status === 403) {
        setPhonePrompt(true);
        setError("Please enter the registered mobile number associated with this booking to verify your identity.");
        setLoading(false);
        return;
      }

      if (!res.ok || !data.success) {
        setError(data.error || "Booking record not found.");
        setLoading(false);
        return;
      }

      setBooking(data.booking);
      setPhonePrompt(false);
    } catch {
      setError("Failed to communicate with the salon server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId) {
      loadBooking();
    }
  }, [bookingId]);

  // Handle Declaration: PAYMENT DONE vs PAYMENT STILL PENDING
  const handleDeclarePayment = async (declaration: "PAYMENT_DONE" | "PAYMENT_PENDING") => {
    if (!booking) return;
    setSubmittingAction(true);
    setActionMessage("");

    try {
      const res = await fetch(`/api/bookings/${booking.booking_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_payment_declaration: declaration,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBooking(data.booking);
        if (declaration === "PAYMENT_DONE") {
          setActionMessage("Payment declared! Salon owner and staff have been alerted to verify your transfer.");
        } else {
          setActionMessage("Status recorded as pending. You may pay at the salon or settle online below.");
        }
      } else {
        setError(data.error || "Failed to update payment declaration.");
      }
    } catch {
      setError("An unexpected error occurred while declaring payment.");
    } finally {
      setSubmittingAction(false);
    }
  };

  // Handle Paying Remaining Balance via Razorpay
  const handlePayBalanceOnline = async () => {
    if (!booking) return;
    setSubmittingAction(true);
    setError("");

    try {
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: booking.booking_id,
          amount_inr: booking.remaining_balance,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize payment gateway.");
      }

      // Ensure Razorpay script is loaded
      let razorpayAvailable = typeof window !== "undefined" && !!window.Razorpay;
      if (!razorpayAvailable && typeof window !== "undefined") {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => {
            razorpayAvailable = true;
            resolve();
          };
          script.onerror = () => resolve();
          document.body.appendChild(script);
        });
      }

      const activeKey =
        orderData.key_id ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        "rzp_test_TysulHZEM5m3st";

      if (typeof window !== "undefined" && window.Razorpay && activeKey && !activeKey.includes("YourKeyIdHere")) {
        const options = {
          key: activeKey,
          amount: orderData.amount,
          currency: orderData.currency || "INR",
          name: "ABDUL NAI LUXURY UNISEX SALON",
          description: `Settlement for ${booking.service_name} (ID: ${booking.booking_id})`,
          order_id: orderData.order_id,
          prefill: {
            name: booking.customer_name,
            contact: booking.phone,
            email: booking.email || "client@abdulnai.com",
          },
          theme: { color: "#c7992a" },
          modal: {
            ondismiss: function () {
              setSubmittingAction(false);
              setActionMessage("Payment dismissed. You can retry settling your balance anytime.");
            },
          },
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                booking_id: booking.booking_id,
                amount_paid: booking.remaining_balance,
                method: "RAZORPAY_SETTLEMENT",
              }),
            });
            const vData = await verifyRes.json();
            if (verifyRes.ok && vData.success) {
              setBooking(vData.booking);
              setActionMessage("Outstanding balance paid successfully! Receipt updated.");
            } else {
              setError(vData.error || "Payment verification failed.");
            }
            setSubmittingAction(false);
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (resp: any) {
          setSubmittingAction(false);
          setError(resp.error?.description || "Payment failed. Please retry.");
        });
        rzp.open();
      } else {
        // Test mode simulator
        const verifyRes = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: orderData.order_id,
            payment_id: `pay_settle_${Date.now()}`,
            signature: `mock_sig_${Date.now()}_verified`,
            booking_id: booking.booking_id,
            amount_paid: booking.remaining_balance,
            method: "UPI_SETTLEMENT_SIMULATED",
          }),
        });
        const vData = await verifyRes.json();
        if (vData.success) {
          setBooking(vData.booking);
          setActionMessage("Outstanding balance paid successfully! Live Google Sheets updated.");
        }
        setSubmittingAction(false);
      }
    } catch (err: any) {
      setError(err.message || "Failed to process online settlement.");
      setSubmittingAction(false);
    }
  };

  return (
    <div className="min-h-screen bg-salon-dark text-salon-ivory flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-gold-500 selection:text-black">
      {/* Brand Header */}
      <div className="mb-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full border border-gold-400/50 flex items-center justify-center bg-salon-card group-hover:border-gold-400 transition-colors">
            <Scissors className="w-5 h-5 text-gold-400 transform -rotate-45" />
          </div>
          <div className="text-left">
            <span className="font-editorial text-xl tracking-widest font-bold uppercase text-salon-ivory block">
              ABDUL <span className="gold-gradient-text">NAI</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400/80 -mt-1 block font-medium">
              Luxury Unisex Salon
            </span>
          </div>
        </Link>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-xl bg-salon-card border border-gold-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        
        {loading && (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-widest text-neutral-400">
              Retrieving Appointment Verification...
            </p>
          </div>
        )}

        {/* Security Phone Verification Gate */}
        {!loading && phonePrompt && (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-editorial text-xl font-bold uppercase text-salon-ivory">
              Client Authentication
            </h2>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              To protect customer confidentiality, please enter your registered 10-digit mobile number to view this booking.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                loadBooking(phoneInput);
              }}
              className="space-y-3 pt-2"
            >
              <input
                type="tel"
                required
                placeholder="Enter 10-digit registered mobile"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full bg-salon-elevated border border-neutral-800 focus:border-gold-400 rounded-lg p-3 text-sm text-center text-salon-ivory focus:outline-none"
              />
              <button
                type="submit"
                className="w-full gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest py-3 rounded shadow"
              >
                Verify & Access Appointment
              </button>
            </form>
          </div>
        )}

        {/* Error Notification */}
        {error && !phonePrompt && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-800/50 text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Success Notification */}
        {actionMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Booking Details View */}
        {!loading && booking && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mb-0.5">
                  Official Reservation ID
                </span>
                <span className="font-mono text-base font-bold text-gold-400">
                  {booking.booking_id}
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    booking.status === "COMPLETED"
                      ? "bg-blue-950/80 text-blue-300 border border-blue-800/40"
                      : booking.status === "CANCELLED"
                      ? "bg-neutral-800 text-neutral-400 line-through"
                      : "bg-gold-950/80 text-gold-300 border border-gold-800/40"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>

            {/* Service & Client summary */}
            <div className="p-4 rounded-xl bg-salon-elevated/60 border border-neutral-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-salon-ivory">
                    {booking.service_name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                    <span className="flex items-center gap-1 text-salon-ivory">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      {booking.appointment_date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-gold-400">
                      <Clock className="w-3.5 h-3.5" />
                      {booking.appointment_time}
                    </span>
                  </div>
                </div>

                <span className="font-editorial text-xl font-bold text-gold-400">
                  {formatCurrency(booking.total_amount || booking.service_price)}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-neutral-400 block">Guest Name:</span>
                  <span className="text-salon-ivory font-medium">{booking.customer_name}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Mobile:</span>
                  <span className="text-salon-ivory font-medium">{booking.phone}</span>
                </div>
              </div>
            </div>

            {/* Financial Ledger (Total, Advance, Remaining) */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-salon-dark border border-neutral-800 text-center">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">
                  Total Bill
                </span>
                <span className="font-editorial text-base font-bold text-salon-ivory">
                  {formatCurrency(booking.total_amount || booking.service_price)}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">
                  Amount Paid
                </span>
                <span className="font-editorial text-base font-bold text-emerald-400">
                  {formatCurrency(booking.advance_amount || (booking.payment_status === "PAID" ? booking.service_price : 0))}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-0.5">
                  Remaining
                </span>
                <span className="font-editorial text-base font-bold text-amber-400">
                  {formatCurrency(booking.remaining_balance ?? (booking.payment_status === "PAID" ? 0 : booking.service_price))}
                </span>
              </div>
            </div>

            {/* Current Payment Status Banner */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-salon-elevated/40 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Payment Status:</span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                    booking.payment_status === "PAID"
                      ? "bg-emerald-950/70 text-emerald-400 border border-emerald-800/40"
                      : booking.payment_status === "AWAITING_ADMIN_VERIFICATION"
                      ? "bg-purple-950/70 text-purple-300 border border-purple-800/40"
                      : booking.payment_status === "FAILED"
                      ? "bg-red-950/70 text-red-400 border border-red-800/40"
                      : "bg-amber-950/70 text-amber-400 border border-amber-800/40"
                  }`}
                >
                  {booking.payment_status.replace(/_/g, " ")}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Selected Method:</span>
                <span className="text-salon-ivory uppercase font-medium">{booking.payment_method}</span>
              </div>

              {booking.customer_payment_declaration && booking.customer_payment_declaration !== "NONE" && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Client Declaration:</span>
                  <span className="text-gold-400 font-semibold">{booking.customer_payment_declaration}</span>
                </div>
              )}
            </div>

            {/* SECTION 3 & 6 REQUIREMENT: Customer Declaration Buttons */}
            {booking.payment_status !== "PAID" && (
              <div className="space-y-4 pt-2">
                <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold text-center">
                  How Would You Like To Handle Your Payment?
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleDeclarePayment("PAYMENT_DONE")}
                    disabled={submittingAction}
                    className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>PAYMENT DONE</span>
                  </button>

                  <button
                    onClick={() => handleDeclarePayment("PAYMENT_PENDING")}
                    disabled={submittingAction}
                    className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>PAYMENT STILL PENDING</span>
                  </button>
                </div>

                {/* Direct Razorpay Settlement Button */}
                {Number(booking.remaining_balance) > 0 && (
                  <div className="pt-2">
                    <button
                      onClick={handlePayBalanceOnline}
                      disabled={submittingAction}
                      className="w-full gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg hover:shadow-gold-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay Remaining Balance ({formatCurrency(booking.remaining_balance)}) Online</span>
                    </button>
                  </div>
                )}

                {/* Owner's PhonePe QR for Offline / At-Salon Payments */}
                <div className="p-4 rounded-xl bg-salon-dark border border-neutral-800 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400">
                    <QrCode className="w-4 h-4" />
                    <span>Scan Owner&apos;s PhonePe QR Code At Salon</span>
                  </div>
                  <div className="w-48 h-48 mx-auto relative rounded-lg overflow-hidden border border-gold-500/40 bg-white p-2">
                    <Image
                      src="/owner-qr.jpg"
                      alt="Abdul Nai Owner PhonePe QR"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    Owner: <strong>Abdul Nai</strong> (Phone: <strong>9437238055</strong>)<br />
                    After scanning and transferring, click <strong>[PAYMENT DONE]</strong> above.
                  </p>
                </div>
              </div>
            )}

            {/* Home / Return button */}
            <div className="pt-4 border-t border-neutral-800 flex justify-between items-center text-xs">
              <Link
                href="/"
                className="text-neutral-400 hover:text-gold-400 flex items-center gap-1 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Salon Homepage</span>
              </Link>

              <button
                onClick={() => loadBooking()}
                className="text-gold-400 hover:text-gold-300 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Status</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
