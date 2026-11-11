-- ========================================================
-- ABDUL NAI LUXURY UNISEX SALON - SUPABASE DATABASE SCHEMA
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 45,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255),
    total_bookings INTEGER DEFAULT 0,
    total_spent NUMERIC(10, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(255),
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    service_name VARCHAR(255) NOT NULL,
    service_price NUMERIC(10, 2) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    advance_amount NUMERIC(10, 2) DEFAULT 0,
    remaining_balance NUMERIC(10, 2) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(20) NOT NULL,
    instructions TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED')),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'PAID', 'UNPAID', 'AWAITING_ADMIN_VERIFICATION', 'PARTIALLY_PAID', 'FAILED', 'REFUNDED')),
    payment_method VARCHAR(50) DEFAULT 'ONLINE_RAZORPAY',
    customer_payment_declaration VARCHAR(50) DEFAULT 'NONE',
    admin_verification VARCHAR(50) DEFAULT 'PENDING',
    admin_verification_notes TEXT,
    completion_time TIMESTAMPTZ,
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    razorpay_signature TEXT,
    google_sheet_synced BOOLEAN DEFAULT FALSE,
    security_token VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PAYMENTS & TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) NOT NULL,
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'UNPAID', 'AWAITING_ADMIN_VERIFICATION', 'PARTIALLY_PAID', 'FAILED', 'REFUNDED')),
    payment_method VARCHAR(50),
    webhook_event_id VARCHAR(100) UNIQUE,
    collected_by VARCHAR(50),
    notes TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. NOTIFICATION LOGS TABLE
CREATE TABLE IF NOT EXISTS notification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) NOT NULL,
    recipient_type VARCHAR(20) NOT NULL,
    recipient_phone VARCHAR(30) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    message_content TEXT NOT NULL,
    status VARCHAR(30) NOT NULL,
    error TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GOOGLE SHEETS SYNC LOGS TABLE
CREATE TABLE IF NOT EXISTS google_sheets_sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SALON SETTINGS TABLE
CREATE TABLE IF NOT EXISTS salon_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(appointment_date);
CREATE INDEX IF NOT EXISTS idx_bookings_phone ON bookings(phone);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);

-- Default Initial Unisex Services
INSERT INTO services (name, category, description, duration_minutes, price, image_url, is_active) VALUES
('The Royal Cut & Style', 'Hair', 'Bespoke precision haircut, consultation, hot towel wrap, and royal pomade styling by master stylists for all genders.', 45, 1200.00, 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80', true),
('Signature Beard Sculpting & Steam', 'Beard & Shave', 'Artisan beard shaping, ozone steam therapy, botanical beard oil nourishment, and hot lather straight razor finish.', 30, 800.00, 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80', true),
('24K Gold Luxury Facial', 'Facial & Skin', 'Cellular revitalizing unisex treatment infused with 24K gold foil, enzymatic peel, and lymphatic facial massage.', 60, 2500.00, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', true),
('Charcoal Detox Scalp Ritual', 'Spa & Treatments', 'Deep pore scalp clarification with Japanese binchotan charcoal, cooling peppermint mask, and tension relief acupressure.', 45, 1800.00, 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80', true),
('The Emperor Complete Unisex Luxury Package', 'Packages', 'Full experience: Royal haircut, styling, 24K facial ritual, clarifying scalp therapy, and luxury hand care.', 120, 4800.00, 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80', true),
('Atelier Glamour & Grooming Day Package', 'Packages', 'Executive styling, botanical hair rinse, detox pore mask, and revitalizing neck & shoulder therapy.', 90, 3200.00, 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80', true);

-- Default Salon Settings with Owner Phone 9437238055
INSERT INTO salon_settings (key, value) VALUES
('contact', '{"phone": "+91 98765 43210", "owner_phone": "9437238055", "email": "concierge@abdulnai.com", "address": "74/A luxury Boulevard, Jubilee Enclave, Mumbai 400050", "instagram": "@abdulnai_luxe"}'),
('hours', '{"opening": "09:00 AM", "closing": "09:00 PM", "slot_duration": 30, "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}');
