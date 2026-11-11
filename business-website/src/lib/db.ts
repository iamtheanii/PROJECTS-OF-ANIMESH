import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "./supabase";
import {
  Booking,
  Customer,
  PaymentRecord,
  Service,
  SalonSettings,
  PaymentStatus,
  BookingStatus,
  PaymentMethod,
  CustomerPaymentDeclaration,
  AdminVerification,
} from "@/types";
import { generateSecurityToken } from "./utils";

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const BUNDLED_DB_PATH = path.join(process.cwd(), "salon_db.json");
const LOCAL_DB_PATH = isServerless ? path.join("/tmp", "salon_db.json") : BUNDLED_DB_PATH;

declare global {
  var __salon_db_cache: LocalDatabase | undefined;
}

interface LocalDatabase {
  services: Service[];
  bookings: Booking[];
  customers: Customer[];
  payments: PaymentRecord[];
  settings: SalonSettings;
}

const DEFAULT_SERVICES: Service[] = [
  {
    id: "srv-1",
    name: "The Royal Cut & Style",
    category: "Hair",
    description: "Bespoke precision haircut, consultation, hot towel wrap, and royal pomade styling by master stylists for all genders.",
    duration_minutes: 45,
    price: 1200,
    image_url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    is_active: true,
  },
  {
    id: "srv-2",
    name: "Signature Beard Sculpting & Steam",
    category: "Beard & Shave",
    description: "Artisan beard shaping, ozone steam therapy, botanical beard oil nourishment, and hot lather straight razor finish.",
    duration_minutes: 30,
    price: 800,
    image_url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80",
    is_active: true,
  },
  {
    id: "srv-3",
    name: "24K Gold Luxury Facial",
    category: "Facial & Skin",
    description: "Cellular revitalizing unisex treatment infused with 24K gold foil, enzymatic peel, and lymphatic facial massage.",
    duration_minutes: 60,
    price: 2500,
    image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    is_active: true,
  },
  {
    id: "srv-4",
    name: "Charcoal Detox Scalp Ritual",
    category: "Spa & Treatments",
    description: "Deep pore scalp clarification with Japanese binchotan charcoal, cooling peppermint mask, and tension relief acupressure.",
    duration_minutes: 45,
    price: 1800,
    image_url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
    is_active: true,
  },
  {
    id: "srv-5",
    name: "The Emperor Complete Unisex Luxury Package",
    category: "Packages",
    description: "Full experience: Royal haircut, styling, 24K facial ritual, clarifying scalp therapy, and luxury hand care.",
    duration_minutes: 120,
    price: 4800,
    image_url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",
    is_active: true,
  },
  {
    id: "srv-6",
    name: "Atelier Glamour & Grooming Day Package",
    category: "Packages",
    description: "Executive styling, botanical hair rinse, detox pore mask, and revitalizing neck & shoulder therapy.",
    duration_minutes: 90,
    price: 3200,
    image_url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80",
    is_active: true,
  },
];

const DEFAULT_SETTINGS: SalonSettings = {
  contact: {
    phone: "+91 98765 43210",
    owner_phone: "9437238055",
    email: "concierge@abdulnai.com",
    address: "74/A Luxury Boulevard, Jubilee Enclave, Mumbai 400050",
    instagram: "@abdulnai_luxe",
  },
  hours: {
    opening: "09:00 AM",
    closing: "09:00 PM",
    slot_duration: 30,
    working_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  },
};

function getLocalData(): LocalDatabase {
  if (globalThis.__salon_db_cache) {
    return globalThis.__salon_db_cache;
  }

  try {
    let rawContent = "";
    if (fs.existsSync(LOCAL_DB_PATH)) {
      rawContent = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
    } else if (fs.existsSync(BUNDLED_DB_PATH)) {
      rawContent = fs.readFileSync(BUNDLED_DB_PATH, "utf-8");
      try {
        fs.writeFileSync(LOCAL_DB_PATH, rawContent);
      } catch {}
    }

    if (rawContent) {
      const parsed = JSON.parse(rawContent);
      if (!parsed.services || parsed.services.length === 0) {
        parsed.services = DEFAULT_SERVICES;
      }
      globalThis.__salon_db_cache = parsed;
      return parsed;
    }

    const initial: LocalDatabase = {
      services: DEFAULT_SERVICES,
      bookings: [],
      customers: [],
      payments: [],
      settings: DEFAULT_SETTINGS,
    };
    try {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initial, null, 2));
    } catch {}
    globalThis.__salon_db_cache = initial;
    return initial;
  } catch (err) {
    console.error("Local database read error:", err);
    const fallback: LocalDatabase = {
      services: DEFAULT_SERVICES,
      bookings: [],
      customers: [],
      payments: [],
      settings: DEFAULT_SETTINGS,
    };
    globalThis.__salon_db_cache = fallback;
    return fallback;
  }
}

function saveLocalData(data: LocalDatabase): void {
  globalThis.__salon_db_cache = data;
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    try {
      fs.writeFileSync(path.join("/tmp", "salon_db.json"), JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("Local database save error:", err);
    }
  }
}

// ----------------- SERVICES -----------------
export async function getServices(): Promise<Service[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: true });
    if (!error && data && data.length > 0) return data;
  }
  return getLocalData().services;
}

export async function getServiceById(id: string): Promise<Service | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("services").select("*").eq("id", id).single();
    if (!error && data) return data;
  }
  const db = getLocalData();
  return db.services.find((s) => s.id === id) || null;
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single();
    if (!error && data) return data;
  }
  const db = getLocalData();
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  db.services[index] = { ...db.services[index], ...updates };
  saveLocalData(db);
  return db.services[index];
}

export async function createService(newService: Omit<Service, "id">): Promise<Service> {
  const serviceWithId: Service = {
    ...newService,
    id: `srv-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("services").insert([newService]).select().single();
    if (!error && data) return data;
  }

  const db = getLocalData();
  db.services.push(serviceWithId);
  saveLocalData(db);
  return serviceWithId;
}

// ----------------- AVAILABILITY & SLOTS MANAGEMENT -----------------
// RULE: An appointment slot is unavailable ONLY if an active booking exists
// with status != 'CANCELLED' AND status != 'COMPLETED'.
// When an appointment is COMPLETED or CANCELLED, the slot is automatically released!
export async function checkSlotAvailability(date: string, time: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .select("id")
      .eq("appointment_date", date)
      .eq("appointment_time", time)
      .neq("status", "CANCELLED")
      .neq("status", "COMPLETED");

    if (!error && data) {
      return data.length === 0;
    }
  }

  const db = getLocalData();
  const existing = db.bookings.find(
    (b) =>
      b.appointment_date === date &&
      b.appointment_time === time &&
      b.status !== "CANCELLED" &&
      b.status !== "COMPLETED"
  );
  return !existing;
}

export async function getBookedSlotsForDate(date: string): Promise<string[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .select("appointment_time")
      .eq("appointment_date", date)
      .neq("status", "CANCELLED")
      .neq("status", "COMPLETED");

    if (!error && data) {
      return data.map((b) => b.appointment_time);
    }
  }

  const db = getLocalData();
  return db.bookings
    .filter(
      (b) =>
        b.appointment_date === date &&
        b.status !== "CANCELLED" &&
        b.status !== "COMPLETED"
    )
    .map((b) => b.appointment_time);
}

// RULE: "Remember same booked customer cant book twice with same details."
// Checks if customer with same phone already has an active (non-cancelled, non-completed) booking on that date!
export async function checkCustomerDuplicateBooking(phone: string, date: string): Promise<Booking | null> {
  const cleanPhone = phone.replace(/\D/g, "");

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("phone", cleanPhone)
      .eq("appointment_date", date)
      .neq("status", "CANCELLED")
      .neq("status", "COMPLETED");

    if (!error && data && data.length > 0) {
      return data[0];
    }
  }

  const db = getLocalData();
  const existing = db.bookings.find(
    (b) =>
      b.phone.replace(/\D/g, "") === cleanPhone &&
      b.appointment_date === date &&
      b.status !== "CANCELLED" &&
      b.status !== "COMPLETED"
  );
  return existing || null;
}

// ----------------- BOOKINGS -----------------
export async function getBookings(filters?: {
  status?: string;
  payment_status?: string;
  date?: string;
  search?: string;
  phone?: string;
}): Promise<Booking[]> {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.payment_status) query = query.eq("payment_status", filters.payment_status);
    if (filters?.date) query = query.eq("appointment_date", filters.date);
    if (filters?.phone) query = query.eq("phone", filters.phone.replace(/\D/g, ""));
    const { data, error } = await query;
    if (!error && data) {
      if (filters?.search) {
        const s = filters.search.toLowerCase();
        return data.filter(
          (b) =>
            b.booking_id.toLowerCase().includes(s) ||
            b.customer_name.toLowerCase().includes(s) ||
            b.phone.includes(s) ||
            b.service_name.toLowerCase().includes(s)
        );
      }
      return data;
    }
  }

  const db = getLocalData();
  let list = [...db.bookings].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  if (filters?.status) list = list.filter((b) => b.status === filters.status);
  if (filters?.payment_status) list = list.filter((b) => b.payment_status === filters.payment_status);
  if (filters?.date) list = list.filter((b) => b.appointment_date === filters.date);
  if (filters?.phone) {
    const clean = filters.phone.replace(/\D/g, "");
    list = list.filter((b) => b.phone.replace(/\D/g, "") === clean);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    list = list.filter(
      (b) =>
        b.booking_id.toLowerCase().includes(s) ||
        b.customer_name.toLowerCase().includes(s) ||
        b.phone.includes(s) ||
        b.service_name.toLowerCase().includes(s)
    );
  }

  return list;
}

export async function getBookingByBookingId(bookingId: string): Promise<Booking | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("bookings").select("*").eq("booking_id", bookingId).single();
    if (!error && data) return data;
  }
  const db = getLocalData();
  return db.bookings.find((b) => b.booking_id === bookingId) || null;
}

export async function createBooking(
  booking: Omit<Booking, "id" | "created_at" | "updated_at">
): Promise<Booking> {
  const totalAmount = Number(booking.total_amount ?? booking.service_price);
  const advanceAmount = Number(booking.advance_amount ?? 0);
  const remainingBalance = Number(booking.remaining_balance ?? (totalAmount - advanceAmount));

  const security_token = generateSecurityToken(booking.booking_id, booking.phone);

  const fullBooking: Booking = {
    ...booking,
    id: `bkg-${Date.now()}`,
    total_amount: totalAmount,
    advance_amount: advanceAmount,
    remaining_balance: remainingBalance,
    customer_payment_declaration: booking.customer_payment_declaration || "NONE",
    admin_verification: booking.admin_verification || "PENDING",
    security_token,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("bookings").insert([fullBooking]).select().single();
    if (!error && data) {
      await recordOrUpdateCustomer(data.customer_name, data.phone, data.email, advanceAmount);
      return data;
    }
  }

  const db = getLocalData();
  db.bookings.push(fullBooking);
  saveLocalData(db);

  await recordOrUpdateCustomer(fullBooking.customer_name, fullBooking.phone, fullBooking.email, advanceAmount);
  return fullBooking;
}

export async function updateBookingStatus(
  bookingId: string,
  updates: Partial<Booking>
): Promise<Booking | null> {
  const payload: Partial<Booking> = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  // Recalculate remaining balance if advance or total changes
  if (updates.advance_amount !== undefined || updates.total_amount !== undefined) {
    const existing = await getBookingByBookingId(bookingId);
    if (existing) {
      const total = updates.total_amount !== undefined ? updates.total_amount : existing.total_amount;
      const advance = updates.advance_amount !== undefined ? updates.advance_amount : existing.advance_amount;
      payload.remaining_balance = Math.max(0, total - advance);
    }
  }

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .update(payload)
      .eq("booking_id", bookingId)
      .select()
      .single();
    if (!error && data) return data;
  }

  const db = getLocalData();
  const index = db.bookings.findIndex((b) => b.booking_id === bookingId);
  if (index === -1) return null;
  db.bookings[index] = { ...db.bookings[index], ...payload };
  saveLocalData(db);
  return db.bookings[index];
}

// ----------------- CUSTOMERS -----------------
export async function getCustomers(): Promise<Customer[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("customers").select("*").order("total_spent", { ascending: false });
    if (!error && data) return data;
  }
  return getLocalData().customers;
}

export async function recordOrUpdateCustomer(
  name: string,
  phone: string,
  email?: string,
  amount: number = 0
): Promise<Customer> {
  const db = getLocalData();
  const cleanPhone = phone.replace(/\D/g, "");
  let customer = db.customers.find((c) => c.phone.replace(/\D/g, "") === cleanPhone);

  if (customer) {
    customer.total_bookings += 1;
    customer.total_spent += Number(amount);
    customer.updated_at = new Date().toISOString();
    if (email && !customer.email) customer.email = email;
    if (name) customer.name = name;
  } else {
    customer = {
      id: `cust-${Date.now()}`,
      name,
      phone: cleanPhone,
      email: email || "",
      total_bookings: 1,
      total_spent: Number(amount),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.customers.push(customer);
  }

  saveLocalData(db);

  if (isSupabaseConfigured && supabase) {
    await supabase.from("customers").upsert(
      {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        total_bookings: customer.total_bookings,
        total_spent: customer.total_spent,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "phone" }
    );
  }

  return customer;
}

// ----------------- PAYMENTS -----------------
export async function getPayments(): Promise<PaymentRecord[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("payments").select("*").order("created_at", { ascending: false });
    if (!error && data) return data;
  }
  return getLocalData().payments;
}

export async function recordPayment(payment: Omit<PaymentRecord, "id" | "created_at" | "updated_at">): Promise<PaymentRecord> {
  const newPayment: PaymentRecord = {
    ...payment,
    id: `pay-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("payments").insert([newPayment]).select().single();
    if (!error && data) return data;
  }

  const db = getLocalData();
  if (payment.webhook_event_id) {
    const existing = db.payments.find((p) => p.webhook_event_id === payment.webhook_event_id);
    if (existing) return existing;
  }

  db.payments.push(newPayment);
  saveLocalData(db);
  return newPayment;
}

// ----------------- SETTINGS -----------------
export async function getSettings(): Promise<SalonSettings> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from("salon_settings").select("*");
    if (!error && data && data.length > 0) {
      const contactRow = data.find((r) => r.key === "contact");
      const hoursRow = data.find((r) => r.key === "hours");
      return {
        contact: contactRow ? contactRow.value : DEFAULT_SETTINGS.contact,
        hours: hoursRow ? hoursRow.value : DEFAULT_SETTINGS.hours,
      };
    }
  }
  return getLocalData().settings;
}

export async function updateSettings(settings: Partial<SalonSettings>): Promise<SalonSettings> {
  const db = getLocalData();
  db.settings = { ...db.settings, ...settings };
  saveLocalData(db);

  if (isSupabaseConfigured && supabase) {
    if (settings.contact) {
      await supabase.from("salon_settings").upsert({ key: "contact", value: settings.contact });
    }
    if (settings.hours) {
      await supabase.from("salon_settings").upsert({ key: "hours", value: settings.hours });
    }
  }

  return db.settings;
}
