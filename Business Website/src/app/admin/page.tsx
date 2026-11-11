"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Calendar,
  CreditCard,
  Users,
  Scissors,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  LogOut,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  Lock,
  Mail,
  FileSpreadsheet,
  Save,
  MessageSquare,
  QrCode,
  DollarSign,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { Booking, Customer, PaymentRecord, Service, SalonSettings, NotificationLog, SyncLog } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("admin@abdulnai.com");
  const [passwordInput, setPasswordInput] = useState<string>("AbdulNaiLuxe2025!");
  const [loginError, setLoginError] = useState<string>("");
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Data States
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<any>(null);
  const [integrations, setIntegrations] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<SalonSettings | null>(null);
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([]);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [bookingTimeFilter, setBookingTimeFilter] = useState<"ALL" | "TODAY" | "UPCOMING" | "COMPLETED" | "CANCELLED">("ALL");
  const [paymentFilter, setPaymentFilter] = useState<string>("ALL");

  // Offline Verification / Settlement Modal
  const [settlementBooking, setSettlementBooking] = useState<Booking | null>(null);
  const [settlementMethod, setSettlementMethod] = useState<string>("CASH");
  const [settlementAmount, setSettlementAmount] = useState<number>(0);
  const [settlementNotes, setSettlementNotes] = useState<string>("");

  // Service Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<Partial<Service>>({
    name: "",
    category: "Hair",
    description: "",
    duration_minutes: 45,
    price: 1000,
    image_url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    is_active: true,
  });

  const [actionSuccess, setActionSuccess] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || "Invalid administrator credentials.");
      }
    } catch {
      setLoginError("Failed to connect to authentication server.");
    } finally {
      setLoggingIn(false);
    }
  };

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, customersRes, servicesRes, settingsRes, autoRes] = await Promise.all([
        fetch("/api/admin/stats").then((r) => r.json()),
        fetch("/api/bookings").then((r) => r.json()),
        fetch("/api/admin/customers").then((r) => r.json()),
        fetch("/api/services").then((r) => r.json()),
        fetch("/api/admin/settings").then((r) => r.json()),
        fetch("/api/admin/automation-logs").then((r) => r.json()).catch(() => ({ success: false })),
      ]);

      if (statsRes.success) {
        setStats(statsRes.stats);
        setIntegrations(statsRes.integrations);
      }
      if (bookingsRes.success) setBookings(bookingsRes.bookings || []);
      if (customersRes.success) setCustomers(customersRes.customers || []);
      if (servicesRes.success) setServices(servicesRes.services || []);
      if (settingsRes.success) setSettings(settingsRes.settings);
      if (autoRes.success) {
        setNotificationLogs(autoRes.notifications || []);
        setSyncLogs(autoRes.syncLogs || []);
      }
    } catch (err) {
      console.error("Failed to load admin dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllAdminData();
    }
  }, [isAuthenticated]);

  // Section 7: Mark Service Completed & Slot Release
  const handleMarkCompleted = async (booking: Booking) => {
    try {
      const res = await fetch(`/api/bookings/${booking.booking_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "COMPLETED",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccess(`Service completed for ${booking.customer_name}. Slot ${booking.appointment_time} released for new bookings!`);
        setTimeout(() => setActionSuccess(""), 5000);
        loadAllAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Section 3: Verify Offline Payment Received
  const handleConfirmOfflinePayment = async (booking: Booking, verified: boolean) => {
    try {
      const res = await fetch(`/api/bookings/${booking.booking_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admin_verification: verified ? "VERIFIED" : "REJECTED",
          payment_status: verified ? "PAID" : "UNPAID",
          payment_method: settlementMethod || "CASH",
          admin_verification_notes: settlementNotes || (verified ? "Verified by salon owner" : "Payment not received"),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccess(
          verified
            ? `Offline payment verified for ${booking.booking_id}. Marked as PAID.`
            : `Offline payment marked not received for ${booking.booking_id}.`
        );
        setTimeout(() => setActionSuccess(""), 4000);
        setSettlementBooking(null);
        loadAllAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (editingService.id) {
        res = await fetch(`/api/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingService),
        });
      } else {
        res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingService),
        });
      }

      const data = await res.json();
      if (data.success) {
        setIsServiceModalOpen(false);
        setActionSuccess("Unisex salon service saved successfully.");
        setTimeout(() => setActionSuccess(""), 4000);
        loadAllAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-salon-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-salon-card border border-gold-500/30 rounded-2xl p-8 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full border border-gold-400/50 flex items-center justify-center bg-salon-elevated mx-auto mb-3">
              <ShieldCheck className="w-6 h-6 text-gold-400" />
            </div>
            <h1 className="font-editorial text-2xl font-bold uppercase tracking-wider text-salon-ivory">
              ABDUL NAI SALON
            </h1>
            <p className="text-xs text-gold-400/90 uppercase tracking-widest mt-1">
              Admin & Automation Console
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-lg bg-red-950/70 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-salon-elevated border border-neutral-800 focus:border-gold-400 rounded-lg pl-10 pr-4 py-3 text-sm text-salon-ivory focus:outline-none"
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-salon-elevated border border-neutral-800 focus:border-gold-400 rounded-lg pl-10 pr-4 py-3 text-sm text-salon-ivory focus:outline-none"
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full gold-gradient-bg text-black font-semibold text-xs uppercase tracking-widest py-3.5 rounded shadow-lg hover:shadow-gold-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {loggingIn ? "Verifying..." : "Enter Admin Dashboard"}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800/80 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-gold-400 transition-colors inline-flex items-center gap-1"
            >
              ← Return to Abdul Nai Salon
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter Bookings by Tab & Search
  const todayStr = new Date().toISOString().split("T")[0];
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      searchQuery === "" ||
      b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.booking_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service_name.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTime = true;
    if (bookingTimeFilter === "TODAY") matchesTime = b.appointment_date === todayStr && b.status !== "CANCELLED";
    if (bookingTimeFilter === "UPCOMING") matchesTime = b.appointment_date >= todayStr && b.status === "CONFIRMED";
    if (bookingTimeFilter === "COMPLETED") matchesTime = b.status === "COMPLETED";
    if (bookingTimeFilter === "CANCELLED") matchesTime = b.status === "CANCELLED";

    let matchesPayment = true;
    if (paymentFilter !== "ALL") matchesPayment = b.payment_status === paymentFilter;

    return matchesSearch && matchesTime && matchesPayment;
  });

  return (
    <div className="min-h-screen bg-salon-dark text-salon-ivory flex flex-col selection:bg-gold-500 selection:text-black">
      
      {/* Top Bar */}
      <header className="bg-salon-card border-b border-neutral-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-gold-400/50 flex items-center justify-center bg-salon-elevated">
              <Scissors className="w-4 h-4 text-gold-400 transform -rotate-45" />
            </div>
            <div>
              <span className="font-editorial text-lg tracking-wider font-bold uppercase text-salon-ivory">
                ABDUL <span className="gold-gradient-text">NAI</span>
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-gold-400">
                Salon Management & Google Sheets
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-2 ml-6 px-3 py-1 rounded-full bg-salon-elevated border border-neutral-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-300">Owner Phone: 9437238055</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={loadAllAdminData}
            className="p-2 text-neutral-400 hover:text-gold-400 rounded-lg hover:bg-neutral-800 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-gold-400" : ""}`} />
          </button>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-300 hover:text-gold-400 px-3 py-1.5 rounded border border-neutral-800"
          >
            <span>Visit Salon</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 px-3 py-1.5 rounded border border-red-950 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {actionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess("")} className="text-emerald-400 hover:text-white">
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-4">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "bookings", label: `Appointments (${bookings.length})`, icon: Calendar },
            { id: "payments", label: `Payments & Settlements`, icon: CreditCard },
            { id: "automation", label: `Google Sheets & WhatsApp`, icon: FileSpreadsheet },
            { id: "customers", label: `Customers (${customers.length})`, icon: Users },
            { id: "services", label: `Services (${services.length})`, icon: Scissors },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all ${
                  active
                    ? "gold-gradient-bg text-black shadow-md"
                    : "bg-salon-card text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* ---------------------------------------------------- */}
        {activeTab === "overview" && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                    Total Bookings
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-editorial text-3xl font-bold text-salon-ivory">
                  {stats.totalBookings}
                </div>
                <span className="text-[11px] text-neutral-400 block mt-2">
                  All online and offline appointments
                </span>
              </div>

              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                    Today&apos;s Appointments
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-editorial text-3xl font-bold text-emerald-400">
                  {stats.todayAppointmentsCount}
                </div>
                <span className="text-[11px] text-neutral-400 block mt-2">
                  Scheduled for today ({todayStr})
                </span>
              </div>

              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                    Collected Revenue (PAID)
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-editorial text-3xl font-bold text-gold-400">
                  {formatCurrency(stats.totalRevenue)}
                </div>
                <span className="text-[11px] text-emerald-400 block mt-2">
                  {stats.completedPaymentsCount} verified payments
                </span>
              </div>

            </div>

            {/* Quick Actions: Awaiting Verification */}
            {bookings.some((b) => b.payment_status === "AWAITING_ADMIN_VERIFICATION") && (
              <div className="p-5 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-purple-400" />
                  <span>Offline Payments Awaiting Owner Verification</span>
                </div>
                <p className="text-xs text-neutral-300">
                  The following customers have declared their offline payment completed. Please verify receipt:
                </p>

                <div className="space-y-2">
                  {bookings
                    .filter((b) => b.payment_status === "AWAITING_ADMIN_VERIFICATION")
                    .map((b) => (
                      <div key={b.id} className="p-3 bg-salon-dark rounded-lg flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono text-gold-400 font-bold mr-2">{b.booking_id}</span>
                          <span className="text-salon-ivory font-semibold">{b.customer_name}</span>
                          <span className="text-neutral-400 ml-2">({b.phone})</span>
                          <span className="text-gold-400 font-bold ml-3">₹{b.service_price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleConfirmOfflinePayment(b, true)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold"
                          >
                            Confirm Received
                          </button>
                          <button
                            onClick={() => handleConfirmOfflinePayment(b, false)}
                            className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[11px]"
                          >
                            Not Received
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: APPOINTMENTS MANAGEMENT (Section 7, 8 & 9) */}
        {/* ---------------------------------------------------- */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            
            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search by customer phone, Booking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-salon-elevated border border-neutral-800 focus:border-gold-400 rounded-lg pl-10 pr-4 py-2.5 text-xs text-salon-ivory focus:outline-none"
                />
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {(["ALL", "TODAY", "UPCOMING", "COMPLETED", "CANCELLED"] as const).map((filterVal) => (
                  <button
                    key={filterVal}
                    onClick={() => setBookingTimeFilter(filterVal)}
                    className={`text-[11px] uppercase tracking-wider px-3 py-1.5 rounded transition-all ${
                      bookingTimeFilter === filterVal
                        ? "gold-gradient-bg text-black font-semibold"
                        : "bg-salon-card text-neutral-400 border border-neutral-800"
                    }`}
                  >
                    {filterVal}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-salon-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-salon-elevated uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                  <tr>
                    <th className="p-4">Booking ID</th>
                    <th className="p-4">Guest</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Slot</th>
                    <th className="p-4">Amount / Bal</th>
                    <th className="p-4">Payment Status</th>
                    <th className="p-4">Service Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-neutral-500">
                        No appointments found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-salon-elevated/40 transition-colors">
                        <td className="p-4">
                          <span className="font-mono font-bold text-gold-400 block">{b.booking_id}</span>
                          <span className="text-[10px] text-neutral-500">
                            Booked: {new Date(b.created_at).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="font-semibold text-salon-ivory block">{b.customer_name}</span>
                          <span className="text-neutral-400 text-[11px]">{b.phone}</span>
                        </td>

                        <td className="p-4">
                          <span className="text-salon-ivory font-medium block">{b.service_name}</span>
                          {b.instructions && (
                            <span className="text-[10px] text-neutral-400 italic block">
                              Note: {b.instructions}
                            </span>
                          )}
                        </td>

                        <td className="p-4">
                          <span className="text-salon-ivory font-medium block">{b.appointment_date}</span>
                          <span className="text-gold-400 font-semibold">{b.appointment_time}</span>
                        </td>

                        <td className="p-4">
                          <span className="font-bold text-gold-400 block">
                            {formatCurrency(b.total_amount || b.service_price)}
                          </span>
                          {b.remaining_balance && Number(b.remaining_balance) > 0 ? (
                            <span className="text-[10px] text-amber-400 block">
                              Bal: {formatCurrency(b.remaining_balance)}
                            </span>
                          ) : (
                            <span className="text-[10px] text-emerald-400 block">Settled</span>
                          )}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold block w-fit mb-1 ${
                              b.payment_status === "PAID"
                                ? "bg-emerald-950/70 text-emerald-400 border border-emerald-800/40"
                                : b.payment_status === "AWAITING_ADMIN_VERIFICATION"
                                ? "bg-purple-950/70 text-purple-300 border border-purple-800/40"
                                : b.payment_status === "FAILED"
                                ? "bg-red-950/70 text-red-400 border border-red-800/40"
                                : "bg-amber-950/70 text-amber-400 border border-amber-800/40"
                            }`}
                          >
                            {b.payment_status.replace(/_/g, " ")}
                          </span>
                          <span className="text-[10px] text-neutral-400 uppercase">
                            {b.payment_method}
                          </span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                              b.status === "COMPLETED"
                                ? "bg-blue-950/80 text-blue-300 border border-blue-800/40"
                                : b.status === "CANCELLED"
                                ? "bg-neutral-800 text-neutral-400 line-through"
                                : "bg-gold-950/80 text-gold-300 border border-gold-800/40"
                            }`}
                          >
                            {b.status}
                          </span>
                          {b.completion_time && (
                            <span className="text-[9px] text-neutral-500 block mt-1">
                              Done: {new Date(b.completion_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            
                            {/* SECTION 7: MARK SERVICE COMPLETED */}
                            {b.status !== "COMPLETED" && b.status !== "CANCELLED" && (
                              <button
                                onClick={() => handleMarkCompleted(b)}
                                className="px-2.5 py-1 bg-blue-900/60 hover:bg-blue-700 text-blue-200 rounded text-[10px] font-bold border border-blue-600/40 transition-colors"
                                title="Releases slot for other customers"
                              >
                                Mark Completed
                              </button>
                            )}

                            {/* OFFLINE VERIFICATION ACTION */}
                            {b.payment_status === "AWAITING_ADMIN_VERIFICATION" && (
                              <button
                                onClick={() => handleConfirmOfflinePayment(b, true)}
                                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[10px] font-bold"
                              >
                                Confirm Payment
                              </button>
                            )}

                            {/* RECORD SETTLEMENT / CASH */}
                            {b.payment_status !== "PAID" && (
                              <button
                                onClick={() => {
                                  setSettlementBooking(b);
                                  setSettlementAmount(b.remaining_balance || b.service_price);
                                }}
                                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-gold-400 rounded text-[10px]"
                              >
                                Settle
                              </button>
                            )}

                            <Link
                              href={`/booking-status/${b.booking_id}`}
                              target="_blank"
                              className="p-1 text-neutral-400 hover:text-white"
                              title="Customer Status Page"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>

                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: PAYMENTS & SETTLEMENTS */}
        {/* ---------------------------------------------------- */}
        {activeTab === "payments" && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-salon-card border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 block mb-1">
                  Total Collected Revenue (Verified)
                </span>
                <span className="font-editorial text-3xl font-bold text-gold-400">
                  {formatCurrency(stats?.totalRevenue || 0)}
                </span>
              </div>

              {/* Payment Status Badges Filter */}
              <div className="flex flex-wrap gap-2 text-xs">
                {["ALL", "PAID", "AWAITING_ADMIN_VERIFICATION", "UNPAID", "PARTIALLY_PAID", "FAILED"].map((pst) => (
                  <button
                    key={pst}
                    onClick={() => setPaymentFilter(pst)}
                    className={`px-3 py-1.5 rounded text-[10px] uppercase font-semibold transition-all ${
                      paymentFilter === pst
                        ? "gold-gradient-bg text-black"
                        : "bg-salon-elevated text-neutral-400 border border-neutral-800"
                    }`}
                  >
                    {pst.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Payments List */}
            <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-salon-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-salon-elevated uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                  <tr>
                    <th className="p-4">Booking ID</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Advance Paid</th>
                    <th className="p-4">Remaining Balance</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-salon-elevated/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-gold-400">{b.booking_id}</td>
                      <td className="p-4 text-salon-ivory font-medium">{b.customer_name}</td>
                      <td className="p-4 text-neutral-300">{b.service_name}</td>
                      <td className="p-4 font-bold text-salon-ivory">{formatCurrency(b.total_amount || b.service_price)}</td>
                      <td className="p-4 text-emerald-400 font-semibold">{formatCurrency(b.advance_amount || (b.payment_status === "PAID" ? b.service_price : 0))}</td>
                      <td className="p-4 text-amber-400 font-semibold">{formatCurrency(b.remaining_balance ?? (b.payment_status === "PAID" ? 0 : b.service_price))}</td>
                      <td className="p-4 uppercase text-neutral-300">{b.payment_method}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            b.payment_status === "PAID"
                              ? "bg-emerald-950/70 text-emerald-400 border border-emerald-800/40"
                              : b.payment_status === "AWAITING_ADMIN_VERIFICATION"
                              ? "bg-purple-950/70 text-purple-300 border border-purple-800/40"
                              : b.payment_status === "FAILED"
                              ? "bg-red-950/70 text-red-400 border border-red-800/40"
                              : "bg-amber-950/70 text-amber-400 border border-amber-800/40"
                          }`}
                        >
                          {b.payment_status.replace(/_/g, " ")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 4: AUTOMATION (GOOGLE SHEETS & WHATSAPP LOGS) */}
        {/* ---------------------------------------------------- */}
        {activeTab === "automation" && (
          <div className="space-y-6">
            
            {/* Status cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Google Sheets Status */}
              <div className="p-6 rounded-xl bg-salon-card border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-editorial text-base font-bold text-salon-ivory">
                      Google Sheets 18-Column Automation
                    </h3>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-semibold">
                    18 Columns Active
                  </span>
                </div>

                <div className="p-3 bg-salon-elevated rounded-lg text-xs space-y-1.5 text-neutral-300">
                  <div>Spreadsheet: <strong>ABDUL NAI — LIVE BOOKING & PAYMENT TRACKER</strong></div>
                  <div>Sync Mode: <strong>Real-time 18-Column UPSERT (Booking ID Key)</strong></div>
                  <div>Failure Queue: <strong>Automatic Retry Handled Gracefully</strong></div>
                </div>
              </div>

              {/* WhatsApp Automation Status */}
              <div className="p-6 rounded-xl bg-salon-card border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-5 h-5 text-gold-400" />
                    <h3 className="font-editorial text-base font-bold text-salon-ivory">
                      Meta WhatsApp Cloud Automation
                    </h3>
                  </div>
                  <span className="text-[10px] text-gold-400 bg-gold-950/60 px-2 py-0.5 rounded border border-gold-800/40 font-semibold">
                    Official API Ready
                  </span>
                </div>

                <div className="p-3 bg-salon-elevated rounded-lg text-xs space-y-1.5 text-neutral-300">
                  <div>Salon Owner Mobile: <strong>9437238055</strong></div>
                  <div>Client Notifications: <strong>Auto Booking & Payment Confirmation</strong></div>
                  <div>Owner Notifications: <strong>New Bookings, Online Success, Offline Declared, Cancellations</strong></div>
                </div>
              </div>

            </div>

            {/* Notification Delivery Logs */}
            <div className="p-6 rounded-xl bg-salon-card border border-neutral-800 space-y-4">
              <h4 className="font-editorial text-base font-bold text-salon-ivory">
                Recent WhatsApp Notification Deliveries
              </h4>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notificationLogs.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-3">
                    No notification events recorded yet in current cycle.
                  </p>
                ) : (
                  notificationLogs.map((log) => (
                    <div key={log.id} className="p-3 rounded bg-salon-elevated text-xs flex items-center justify-between">
                      <div>
                        <span className="font-mono text-gold-400 font-semibold mr-2">{log.booking_id}</span>
                        <span className="text-neutral-300">{log.event_type}</span>
                        <span className="text-neutral-500 ml-2">→ {log.recipient_phone}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/30">
                        {log.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 5: SERVICES */}
        {/* ---------------------------------------------------- */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-lg font-bold text-salon-ivory">
                  Unisex Salon Service Menu
                </h3>
                <p className="text-xs text-neutral-400">
                  Manage pricing, durations, categories, and availability for all guests.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingService({
                    name: "",
                    category: "Hair",
                    description: "",
                    duration_minutes: 45,
                    price: 1200,
                    image_url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
                    is_active: true,
                  });
                  setIsServiceModalOpen(true);
                }}
                className="gold-gradient-bg text-black font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded shadow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add New Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div key={srv.id} className="glass-card rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-salon-dark text-gold-300 border border-gold-500/30 font-medium">
                        {srv.category}
                      </span>
                      <span className="text-xs text-neutral-400">{srv.duration_minutes} mins</span>
                    </div>

                    <h4 className="font-editorial font-bold text-base text-salon-ivory mb-2">
                      {srv.name}
                    </h4>

                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4 line-clamp-2">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                    <span className="font-editorial text-xl font-bold text-gold-400">
                      {formatCurrency(srv.price)}
                    </span>

                    <button
                      onClick={() => {
                        setEditingService(srv);
                        setIsServiceModalOpen(true);
                      }}
                      className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded bg-salon-elevated hover:bg-neutral-800 text-neutral-300 border border-neutral-700"
                    >
                      Edit Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 6: CUSTOMERS */}
        {/* ---------------------------------------------------- */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-salon-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-salon-elevated uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                  <tr>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">Total Appointments</th>
                    <th className="p-4">Total Lifetime Spend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-salon-elevated/40 transition-colors">
                      <td className="p-4 font-semibold text-salon-ivory">{c.name}</td>
                      <td className="p-4 font-mono text-neutral-300">{c.phone}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-salon-elevated text-salon-ivory font-bold">
                          {c.total_bookings}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gold-400">
                        {formatCurrency(c.total_spent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* OFFLINE SETTLEMENT MODAL */}
      {settlementBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-salon-card border border-gold-500/30 rounded-xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h4 className="font-editorial text-base font-bold text-salon-ivory">
                Settle Payment: {settlementBooking.booking_id}
              </h4>
              <button onClick={() => setSettlementBooking(null)} className="text-neutral-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-salon-elevated rounded">
                <span className="text-neutral-400 block">Guest:</span>
                <span className="text-salon-ivory font-bold">{settlementBooking.customer_name} ({settlementBooking.phone})</span>
                <span className="text-neutral-400 block mt-2">Outstanding Balance:</span>
                <span className="text-amber-400 font-bold text-sm">
                  {formatCurrency(settlementBooking.remaining_balance || settlementBooking.service_price)}
                </span>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Select Payment Method</label>
                <select
                  value={settlementMethod}
                  onChange={(e) => setSettlementMethod(e.target.value)}
                  className="w-full bg-salon-elevated border border-neutral-800 rounded p-2 text-salon-ivory"
                >
                  <option value="CASH">Cash at Salon Counter</option>
                  <option value="UPI_QR">PhonePe / UPI QR Scanned</option>
                  <option value="CARD_OFFLINE">Card POS Swiped</option>
                  <option value="OTHER">Other Authorized Method</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Transaction Reference / Staff Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Cash received by cashier"
                  value={settlementNotes}
                  onChange={(e) => setSettlementNotes(e.target.value)}
                  className="w-full bg-salon-elevated border border-neutral-800 rounded p-2 text-salon-ivory"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSettlementBooking(null)}
                  className="px-4 py-2 border border-neutral-800 rounded text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmOfflinePayment(settlementBooking, true)}
                  className="gold-gradient-bg text-black font-semibold px-4 py-2 rounded"
                >
                  Confirm & Mark PAID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-salon-card border border-gold-500/30 rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h4 className="font-editorial text-lg font-bold text-salon-ivory">
                {editingService.id ? "Edit Unisex Salon Service" : "Add New Unisex Service"}
              </h4>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-neutral-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={editingService.name || ""}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full bg-salon-elevated border border-neutral-800 rounded p-2 text-salon-ivory"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Category</label>
                  <select
                    value={editingService.category || "Hair"}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                    className="w-full bg-salon-elevated border border-neutral-800 rounded p-2 text-salon-ivory"
                  >
                    <option value="Hair">Hair</option>
                    <option value="Beard & Shave">Beard & Shave</option>
                    <option value="Facial & Skin">Facial & Skin</option>
                    <option value="Spa & Treatments">Spa & Treatments</option>
                    <option value="Packages">Packages</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={editingService.price || 0}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                    className="w-full bg-salon-elevated border border-neutral-800 rounded p-2 text-salon-ivory"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={editingService.duration_minutes || 45}
                  onChange={(e) => setEditingService({ ...editingService, duration_minutes: Number(e.target.value) })}
                  className="w-full bg-salon-elevated border border-neutral-800 rounded p-2 text-salon-ivory"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingService.description || ""}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full bg-salon-elevated border border-neutral-800 rounded p-2 text-salon-ivory"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 border border-neutral-800 rounded text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="gold-gradient-bg text-black font-semibold px-4 py-2 rounded">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
