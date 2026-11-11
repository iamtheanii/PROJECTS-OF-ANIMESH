export type ServiceCategory = 'Hair' | 'Beard & Shave' | 'Facial & Skin' | 'Spa & Treatments' | 'Packages';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration_minutes: number;
  price: number;
  image_url: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export type PaymentStatus = 
  | 'PENDING' 
  | 'PAID' 
  | 'UNPAID' 
  | 'AWAITING_ADMIN_VERIFICATION' 
  | 'PARTIALLY_PAID' 
  | 'FAILED' 
  | 'REFUNDED';

export type PaymentMethod = 
  | 'ONLINE_RAZORPAY' 
  | 'PAY_AT_SALON' 
  | 'CASH' 
  | 'UPI_QR' 
  | 'OTHER';

export type CustomerPaymentDeclaration = 
  | 'NONE' 
  | 'PAYMENT_DONE' 
  | 'PAYMENT_PENDING';

export type AdminVerification = 
  | 'PENDING' 
  | 'VERIFIED' 
  | 'REJECTED';

export interface Booking {
  id: string;
  booking_id: string; // e.g. AN-2026-XXXXX
  customer_id?: string;
  customer_name: string;
  phone: string;
  email?: string;
  service_id: string;
  service_name: string;
  service_price: number; // total amount
  total_amount: number;
  advance_amount: number;
  remaining_balance: number;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // HH:MM AM/PM
  instructions?: string;
  status: BookingStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod | string;
  customer_payment_declaration: CustomerPaymentDeclaration;
  admin_verification: AdminVerification;
  admin_verification_notes?: string;
  completion_time?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  google_sheet_synced: boolean;
  security_token?: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  total_bookings: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

export interface PaymentRecord {
  id: string;
  booking_id: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method?: string;
  webhook_event_id?: string;
  collected_by?: string;
  notes?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface NotificationLog {
  id: string;
  booking_id: string;
  recipient_type: 'CUSTOMER' | 'OWNER';
  recipient_phone: string;
  event_type: string;
  message_content: string;
  status: 'SENT' | 'FAILED' | 'LOGGED_SIMULATED';
  timestamp: string;
  error?: string;
}

export interface SyncLog {
  id: string;
  booking_id: string;
  action: string;
  status: 'SUCCESS' | 'FAILED' | 'RETRY_QUEUED';
  details: string;
  timestamp: string;
}

export interface SalonSettings {
  contact: {
    phone: string;
    owner_phone: string;
    email: string;
    address: string;
    instagram: string;
  };
  hours: {
    opening: string;
    closing: string;
    slot_duration: number; // in minutes
    working_days: string[];
  };
}
