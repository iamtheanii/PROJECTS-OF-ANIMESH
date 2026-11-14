"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Service, Booking, PaymentMethod, CustomerPaymentDeclaration } from "@/types";
import { formatCurrency, getStandardTimeSlots, validateIndianMobile } from "@/lib/utils";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Scissors,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Check,
  Building2,
  QrCode,
  ExternalLink,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  initialSelectedService?: Service | null;
}

type Step = 1 | 2 | 3 | 4 | 5; 
// 1: Service
// 2: Date & Slot
// 3: Customer Details
// 4: Payment Method Selection (Option A: Online, Option B: Pay At Salon)
// 5: Confirmation Receipt

export default function BookingModal({
  isOpen,
  onClose,
  services,
  initialSelectedService,
}: BookingModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Form State
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("ONLINE_RAZORPAY");
  const [offlineDeclaration, setOfflineDeclaration] = useState<CustomerPaymentDeclaration>("PAYMENT_PENDING");

  // Processing state
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Restore confirmed booking from localStorage if client refreshed after booking
  useEffect(() => {
    try {
      const saved = localStorage.getItem("abdul_recent_booking");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.booking_id) {
          setConfirmedBooking(parsed);
          if (!initialSelectedService) {
            setStep(5);
          }
        }
      }
    } catch (e) {
      console.error("Error reading saved booking from localStorage", e);
    }
  }, [isOpen, initialSelectedService]);

  useEffect(() => {
    if (initialSelectedService) {
      setSelectedService(initialSelectedService);
      setStep(2);
    } else if (services.length > 0 && !selectedService) {
      setSelectedService(services[0]);
    }
  }, [initialSelectedService, services]);

  const markBookingConfirmed = (booking: Booking) => {
    setConfirmedBooking(booking);
    setStep(5);
    try {
      localStorage.setItem("abdul_recent_booking", JSON.stringify(booking));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("abdul_booking_submitted", { detail: booking }));
      }
    } catch (e) {
      console.error("Failed to cache booking in localStorage", e);
    }
    triggerConfetti();
  };

  const handleBookAgain = () => {
    try {
      localStorage.removeItem("abdul_recent_booking");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("abdul_booking_cleared"));
      }
    } catch {}
    setConfirmedBooking(null);
    setSelectedSlot("");
    setInstructions("");
    setErrorMessage("");
    setStep(1);
  };

  // Fetch booked slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;

    let isMounted = true;
    async function fetchAvailability() {
      setLoadingSlots(true);
      try {
        const res = await fetch(`/api/availability?date=${selectedDate}`);
        const data = await res.json();
        if (isMounted && data.success) {
          setBookedSlots(data.bookedSlots || []);
          if (data.bookedSlots.includes(selectedSlot)) {
            setSelectedSlot("");
          }
        }
      } catch (err) {
        console.error("Availability fetch error:", err);
      } finally {
        if (isMounted) setLoadingSlots(false);
      }
    }

    fetchAvailability();
    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    setErrorMessage("");
    if (step === 1) {
      if (!selectedService) {
        setErrorMessage("Please choose a unisex salon service to proceed.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate) {
        setErrorMessage("Please choose your preferred appointment date.");
        return;
      }
      if (!selectedSlot) {
        setErrorMessage("Please select an available time slot.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!customerName.trim()) {
        setErrorMessage("Please enter your full name.");
        return;
      }
      // Indian Phone validation
      const validation = validateIndianMobile(phone);
      if (!validation.isValid) {
        setErrorMessage(validation.error || "Please enter a valid 10-digit Indian mobile number.");
        return;
      }
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    if (step > 1 && step < 5) {
      setStep((step - 1) as Step);
    }
  };

  // Complete Booking (Handles both Online Razorpay & Offline Pay at Salon)
  const handleCompleteBooking = async () => {
    if (!selectedService || !selectedDate || !selectedSlot) return;

    setSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Create Booking in database
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName,
          phone,
          email,
          service_id: selectedService.id,
          service_name: selectedService.name,
          service_price: selectedService.price,
          appointment_date: selectedDate,
          appointment_time: selectedSlot,
          instructions,
          payment_method: paymentMethod,
          customer_payment_declaration: paymentMethod === "PAY_AT_SALON" ? offlineDeclaration : "NONE",
        }),
      });

      const bookingData = await bookingRes.json();
      if (!bookingRes.ok || !bookingData.success) {
        throw new Error(bookingData.error || "Failed to initialize appointment booking.");
      }

      const createdBooking: Booking = bookingData.booking;

      // OPTION B: PAY AT SALON (OFFLINE)
      if (paymentMethod === "PAY_AT_SALON") {
        markBookingConfirmed(createdBooking);
        setSubmitting(false);
        return;
      }

      // OPTION A: ONLINE PAYMENT — RAZORPAY INTEGRATION
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: createdBooking.booking_id,
          amount_inr: createdBooking.service_price || selectedService.price,
          customer_name: customerName,
          phone: phone,
          email: email,
          service_name: selectedService.name,
          appointment_date: selectedDate,
          appointment_time: selectedSlot,
        }),
      });

      let orderData: any;
      if (orderRes.ok) {
        orderData = await orderRes.json();
      }
      if (!orderData || !orderData.success) {
        // Fallback to standard /api/create-order endpoint
        const stdRes = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round((selectedService.price || 1200) * 100),
            currency: "INR",
            receipt: createdBooking.booking_id,
            notes: {
              booking_id: createdBooking.booking_id,
              service: selectedService.name,
              customer: customerName,
              phone: phone,
            },
          }),
        });
        orderData = await stdRes.json();
      }

      if (!orderData || !orderData.success) {
        throw new Error(orderData?.error || "Failed to initialize Razorpay payment order.");
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
        "rzp_live_TyuQiKFbunEpjb";

      // Check if official Razorpay checkout script is available
      if (typeof window !== "undefined" && window.Razorpay && activeKey && !activeKey.includes("YourKeyIdHere")) {
        const options = {
          key: activeKey,
          amount: orderData.amount,
          currency: orderData.currency || "INR",
          name: "ABDUL NAI LUXURY UNISEX SALON",
          description: `Appointment for ${selectedService.name}`,
          order_id: orderData.order_id,
          prefill: {
            name: customerName,
            contact: phone,
            email: email || "client@abdulnai.com",
          },
          theme: { color: "#c7992a" },
          modal: {
            ondismiss: function () {
              setSubmitting(false);
              setErrorMessage("Payment was dismissed. You can retry payment or view status.");
            },
          },
          handler: async function (response: any) {
            try {
              const verifyRes = await fetch("/api/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  booking_id: createdBooking.booking_id,
                  method: "RAZORPAY",
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                markBookingConfirmed(verifyData.booking);
              } else {
                throw new Error(verifyData.error || "Payment signature verification failed.");
              }
            } catch (vErr: any) {
              setErrorMessage(vErr.message);
            } finally {
              setSubmitting(false);
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async function (resp: any) {
          setSubmitting(false);
          setErrorMessage(resp.error?.description || "Payment failed. Please retry.");
        });
        rzp.open();
      } else {
        // Test Mode Simulator
        const mockPaymentId = `pay_test_${Date.now()}`;
        const mockSig = `mock_sig_${Date.now()}_verified`;

        const verifyRes = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: orderData.order_id,
            payment_id: mockPaymentId,
            signature: mockSig,
            booking_id: createdBooking.booking_id,
            method: "UPI_SIMULATED",
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          markBookingConfirmed(verifyData.booking);
        } else {
          throw new Error(verifyData.error || "Payment verification failed.");
        }
        setSubmitting(false);
      }
    } catch (err: any) {
      console.error("Booking exception:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#dfbf68", "#c59223", "#ffffff", "#000000"],
      });
    } catch {}
  };

  const allSlots = getStandardTimeSlots();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-salon-card border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-salon-dark/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-gold-400/50 flex items-center justify-center bg-salon-elevated">
              <Scissors className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold uppercase tracking-wider text-salon-ivory">
                RESERVE YOUR APPOINTMENT
              </h3>
              <p className="text-[11px] text-gold-400/90 tracking-widest uppercase">
                ABDUL NAI LUXURY UNISEX SALON
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        {step < 5 && (
          <div className="px-6 pt-4 pb-2 bg-salon-elevated/40 border-b border-neutral-800/60">
            <div className="flex items-center justify-between text-xs font-medium text-neutral-400 mb-2">
              <span className={step >= 1 ? "text-gold-400 font-semibold" : ""}>1. Service</span>
              <span className={step >= 2 ? "text-gold-400 font-semibold" : ""}>2. Date & Slot</span>
              <span className={step >= 3 ? "text-gold-400 font-semibold" : ""}>3. Details</span>
              <span className={step >= 4 ? "text-gold-400 font-semibold" : ""}>4. Payment Method</span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="gold-gradient-bg h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 max-h-[68vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-lg bg-red-950/60 border border-red-800/50 flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">
                Step 1: Choose Your Desired Unisex Service
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedService?.id === srv.id
                        ? "bg-gold-500/10 border-gold-400 shadow-md"
                        : "bg-salon-elevated/50 border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedService?.id === srv.id
                            ? "border-gold-400 bg-gold-400 text-black"
                            : "border-neutral-600"
                        }`}
                      >
                        {selectedService?.id === srv.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="font-editorial font-bold text-sm text-salon-ivory block">
                          {srv.name}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-neutral-400 mt-0.5">
                          <span>{srv.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-gold-400/90">
                            <Clock className="w-3 h-3" />
                            {srv.duration_minutes} mins
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="font-editorial text-lg font-bold text-gold-400">
                      {formatCurrency(srv.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DATE & TIME SLOT */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                  Select Appointment Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={todayStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-salon-elevated border border-neutral-800 focus:border-gold-400 rounded-lg p-3 text-sm text-salon-ivory focus:outline-none"
                  />
                  <Calendar className="w-4 h-4 text-gold-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                    Select Available Time Slot
                  </label>
                  {loadingSlots && (
                    <span className="text-[11px] text-gold-400 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Checking real-time schedule...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {allSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedSlot === slot;

                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center border ${
                          isBooked
                            ? "bg-neutral-900/60 border-neutral-900 text-neutral-600 cursor-not-allowed line-through"
                            : isSelected
                            ? "gold-gradient-bg text-black border-gold-400 font-bold shadow-md"
                            : "bg-salon-elevated border-neutral-800 text-neutral-300 hover:border-gold-500/50"
                        }`}
                      >
                        <span>{slot}</span>
                        {isBooked ? (
                          <span className="text-[9px] text-red-500/80 font-normal no-underline">Booked</span>
                        ) : (
                          <span className="text-[9px] text-emerald-400/80 font-normal">Available</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER DETAILS */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">
                Step 3: Enter Guest Information
              </h4>

              <div>
                <label className="text-xs text-neutral-300 font-medium block mb-1.5">
                  Full Name <span className="text-gold-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Animesh Ghosh"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-salon-elevated border border-neutral-800 focus:border-gold-400 rounded-lg pl-10 pr-4 py-3 text-sm text-salon-ivory focus:outline-none"
                  />
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-300 font-medium block mb-1.5">
                  Mobile Number <span className="text-gold-400">*</span> (10-Digit Indian Mobile for WhatsApp alerts)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9437238055"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-salon-elevated border border-neutral-800 focus:border-gold-400 rounded-lg pl-10 pr-4 py-3 text-sm text-salon-ivory focus:outline-none"
                  />
                  <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                </div>
                <span className="text-[10px] text-neutral-400 block mt-1">
                  * Note: Each guest can only book one active appointment per date.
                </span>
              </div>

              <div>
                <label className="text-xs text-neutral-300 font-medium block mb-1.5">
                  Email Address <span className="text-neutral-500">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="e.g. client@abdulnai.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-salon-elevated border border-neutral-800 focus:border-gold-400 rounded-lg pl-10 pr-4 py-3 text-sm text-salon-ivory focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-300 font-medium block mb-1.5">
                  Special Instructions / Requests <span className="text-neutral-500">(Optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    placeholder="e.g. Specific haircut style, color preference, skin sensitivity..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full bg-salon-elevated border border-neutral-800 focus:border-gold-400 rounded-lg pl-10 pr-4 py-2.5 text-sm text-salon-ivory focus:outline-none resize-none"
                  />
                  <FileText className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT METHOD SELECTION (OPTION A vs OPTION B) */}
          {step === 4 && selectedService && (
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                Step 4: Select Payment Method
              </h4>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-xl bg-salon-elevated/70 border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-0.5">
                    Appointment Summary
                  </span>
                  <h5 className="font-editorial text-base font-bold text-salon-ivory">
                    {selectedService.name}
                  </h5>
                  <span className="text-xs text-neutral-400">
                    {selectedDate} at {selectedSlot} ({selectedService.duration_minutes} mins)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mb-0.5">
                    Total Due
                  </span>
                  <span className="font-editorial text-2xl font-bold text-gold-400">
                    {formatCurrency(selectedService.price)}
                  </span>
                </div>
              </div>

              {/* Two Payment Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* OPTION A: ONLINE PAYMENT */}
                <div
                  onClick={() => setPaymentMethod("ONLINE_RAZORPAY")}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "ONLINE_RAZORPAY"
                      ? "bg-gold-500/10 border-gold-400 shadow-md ring-1 ring-gold-400/50"
                      : "bg-salon-elevated/40 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-semibold">
                      Instant Confirmation
                    </span>
                  </div>

                  <h5 className="font-editorial font-bold text-base text-salon-ivory mb-1">
                    Option A: Online Payment
                  </h5>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                    Pay securely via Razorpay using UPI (PhonePe, Google Pay, Paytm), QR Code, or Debit/Credit Cards.
                  </p>
                </div>

                {/* OPTION B: PAY AT SALON (OFFLINE) */}
                <div
                  onClick={() => setPaymentMethod("PAY_AT_SALON")}
                  className={`p-5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "PAY_AT_SALON"
                      ? "bg-gold-500/10 border-gold-400 shadow-md ring-1 ring-gold-400/50"
                      : "bg-salon-elevated/40 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 font-semibold">
                      Pay In Person
                    </span>
                  </div>

                  <h5 className="font-editorial font-bold text-base text-salon-ivory mb-1">
                    Option B: Pay at Salon
                  </h5>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                    Reserve your slot now and pay at the counter via Cash or by scanning the salon&apos;s PhonePe QR code.
                  </p>
                </div>

              </div>

              {/* OFFLINE DECLARATION CHOICES (Section 3) */}
              {paymentMethod === "PAY_AT_SALON" && (
                <div className="p-5 rounded-xl bg-salon-dark border border-neutral-800 space-y-4 animate-fadeIn">
                  <div className="text-center">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
                      How would you like to handle your payment?
                    </span>
                    <p className="text-[11px] text-neutral-400">
                      Please select your payment declaration for our salon staff.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setOfflineDeclaration("PAYMENT_DONE")}
                      className={`p-3 rounded-lg border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        offlineDeclaration === "PAYMENT_DONE"
                          ? "bg-emerald-950/70 border-emerald-400 text-emerald-300 shadow"
                          : "bg-salon-elevated border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>1. PAYMENT DONE</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setOfflineDeclaration("PAYMENT_PENDING")}
                      className={`p-3 rounded-lg border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        offlineDeclaration === "PAYMENT_PENDING"
                          ? "bg-amber-950/70 border-amber-400 text-amber-300 shadow"
                          : "bg-salon-elevated border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>2. PAYMENT STILL PENDING</span>
                    </button>
                  </div>

                  {/* Owner QR code preview */}
                  <div className="p-3 bg-salon-elevated rounded-lg flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded border border-gold-500/40 bg-white shrink-0 overflow-hidden">
                      <Image
                        src="/owner-qr.jpg"
                        alt="Owner PhonePe QR"
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div className="text-xs text-neutral-300">
                      <span className="text-gold-400 font-semibold block">
                        Salon Owner PhonePe QR Code Attached
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        Owner: Abdul Nai (Phone: <strong>9437238055</strong>)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: CONFIRMATION RECEIPT */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
                  ✓ Your Booking Has Been Submitted
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-salon-ivory mb-2">
                  WE LOOK FORWARD TO WELCOMING YOU
                </h3>
                <p className="text-xs text-neutral-400">
                  A WhatsApp confirmation notification has been dispatched to <strong>{confirmedBooking.phone}</strong>.
                </p>
              </div>

              {/* Receipt Details Card */}
              <div className="max-w-md mx-auto p-5 rounded-xl bg-salon-elevated/70 border border-gold-500/30 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-xs uppercase tracking-wider text-neutral-400">
                    Booking ID:
                  </span>
                  <span className="font-mono text-sm font-bold text-gold-400">
                    {confirmedBooking.booking_id}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Client Name:</span>
                  <span className="text-salon-ivory font-medium">{confirmedBooking.customer_name}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Contact Number:</span>
                  <span className="text-salon-ivory font-medium">{confirmedBooking.phone}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Service:</span>
                  <span className="text-salon-ivory font-medium">{confirmedBooking.service_name}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Scheduled Time:</span>
                  <span className="text-salon-ivory font-medium">
                    {confirmedBooking.appointment_date} at {confirmedBooking.appointment_time}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Payment Status:</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    {confirmedBooking.payment_status.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Payment Method:</span>
                  <span className="text-neutral-300 font-medium">
                    {confirmedBooking.payment_method}
                  </span>
                </div>

                {/* Direct link to Booking Status Page */}
                <div className="pt-3 border-t border-neutral-800 text-center">
                  <Link
                    href={`/booking-status/${confirmedBooking.booking_id}?token=${confirmedBooking.security_token || ""}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-wider"
                  >
                    <span>View Live Booking & Payment Status</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Actions: Allow booking again or close */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleBookAgain}
                  className="w-full sm:w-auto gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Want to Submit or Book Again?</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto text-xs uppercase tracking-wider text-neutral-400 hover:text-white px-6 py-3 rounded border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  Close & Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        {step < 5 && (
          <div className="p-6 border-t border-neutral-800 bg-salon-dark/80 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={submitting}
                className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 px-4 py-2 rounded border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded shadow hover:shadow-gold-500/20 flex items-center gap-2 active:scale-95 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteBooking}
                disabled={submitting}
                className="gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded shadow-xl hover:shadow-gold-500/30 flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Reservation...</span>
                  </>
                ) : paymentMethod === "ONLINE_RAZORPAY" ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay {selectedService ? formatCurrency(selectedService.price) : ""} via Razorpay</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4" />
                    <span>Confirm Pay at Salon Booking</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
