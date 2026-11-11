# ABDUL NAI — Premium Luxury Salon Booking & Management Platform

A production-grade, full-stack appointment booking, payment processing, and business automation platform built for **ABDUL NAI** (Haute Coiffure & Luxury Grooming).

---

## 💎 Features & Capabilities

### Phase 1 — Luxury Brand Experience & Design
- **Color Palette:** Luxury black (`#0b0b0e`), ivory, crisp white, and champagne-gold gradients (`#c59223`, `#dfbf68`).
- **Editorial Typography:** Playfair Display serif paired with Cormorant Garamond and Inter.
- **Micro-Interactions & Transitions:** Fluid hover effects, gold ambient glow, and responsive mobile-first navigation.
- **10 Core Homepage Sections:**
  1. Hero section with *"LOOK GOOD. FEEL CONFIDENT."* & quick CTA
  2. Reserve Appointment CTA
  3. About Abdul Nai (Heritage, craftsmanship, and master apprenticeships)
  4. Curated Service Menu (Filterable by Hair, Beard, Facial, Spa, Packages)
  5. Featured VIP Packages (The Emperor Experience & Gentleman Grooming Day)
  6. Why Choose Us (Master Barbers, Hospital-grade Autoclave Sterilization, 24K Gold Therapy, VIP Suites)
  7. Atelier Gallery (Bento grid showcase)
  8. Customer Testimonials (Verified reviews from distinguished gentlemen)
  9. Location & Contact (Mumbai atelier address, valet parking, and interactive map)
  10. Footer with staff admin portal navigation

### Phase 2 — Complete Booking Engine
- Step-by-step interactive booking flow:
  1. Service selection with duration and pricing
  2. Real-time date & slot availability picker
  3. Double-booking prevention algorithm (checks live slots across date/time)
  4. Guest information collection with 10-digit mobile validation
  5. Booking review summary
  6. Unique Booking ID generation (`AN-2025-XXXXX`)
  7. Automated confetti celebration & reservation confirmation receipt

### Phase 3 — Razorpay Payment Processing
- **Official Razorpay Checkout Integration:**
  - UPI (Google Pay, PhonePe, Paytm, BHIM)
  - Credit & Debit Cards (Visa, Mastercard, RuPay, Amex)
  - NetBanking & Wallets
- **Server-Side Security:**
  - Server-side Razorpay Order generation via `/api/payments/create-order`
  - Strict HMAC-SHA256 signature verification via `/api/payments/verify`
  - Official Webhook endpoint (`/api/payments/webhook`) with idempotent event processing
  - Payment statuses: `PENDING`, `PAID`, `FAILED`, `REFUNDED`

### Phase 4 — Google Sheets Automation
- Automated bi-directional synchronization with **ABDUL NAI - CUSTOMER & PAYMENT MANAGEMENT**
- Column schema:
  `Booking ID | Booking Date | Customer Name | Phone | Email | Service | Appointment Date | Time | Amount | Payment Method | Payment Status | Transaction ID | Booking Status | Instructions`
- **Automation Rules:**
  - New booking → Appends new row with `PENDING` payment status
  - Verified payment → Updates existing row to `PAID` with Razorpay Transaction ID
  - Failed payment → Updates status to `FAILED`
  - Appointment completed/cancelled → Synchronizes status change live
  - Uses `Booking ID` as the unique search index to prevent duplicate entries
  - Resilient exponential backoff retry; never breaks customer checkout if Google API has transient network latency.

### Phase 5 — Staff Admin Dashboard (`/admin`)
- **Secure Authentication:** Dedicated admin login screen.
- **Live Overview Metrics:**
  - Total Bookings
  - Today's Appointments
  - Total Registered Customers
  - Total Collected Revenue
  - Pending Payments
  - System Integration Health Indicators
- **Operational Modules:**
  - **Bookings Management:** Live search, filter by status, mark completed, confirm or cancel appointments.
  - **Payments Ledger:** View all transaction IDs, payment methods, timestamps, and collected revenues.
  - **Customer Directory:** Client database tracking total visits, lifetime spending, and detailed past appointment history.
  - **Service Catalogue:** Add new services, edit pricing/duration/descriptions, and toggle customer visibility.
  - **Settings:** Edit contact info, salon business hours, and inspection of Google Sheets schema.

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS, Lucide Icons, Canvas Confetti
- **Database:** Supabase PostgreSQL + Resilient local fallback store
- **Payments:** Razorpay Node.js SDK & Client Checkout
- **Spreadsheets:** Googleapis (Official Google Sheets v4 API)
- **Notifications:** WhatsApp Business API integration layer

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (Tested on v22.19.0)
- npm or pnpm

### 2. Installation
```bash
# Clone the repository and install dependencies
npm install
```

### 3. Environment Variables Setup
Copy the template environment file:
```bash
cp .env.example .env.local
```
Configure your credentials in `.env.local`:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YourKeyIdHere
RAZORPAY_KEY_SECRET=YourRazorpaySecretHere
RAZORPAY_WEBHOOK_SECRET=YourWebhookSecretHere

# Google Sheets
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id_here

# Admin Login
ADMIN_EMAIL=admin@abdulnai.com
ADMIN_PASSWORD=AbdulNaiLuxe2025!
```

### 4. Database Setup (Supabase)
Run the SQL migration script located at `supabase/schema.sql` in your Supabase SQL Editor:
- Creates `services`, `customers`, `bookings`, `payments`, and `salon_settings` tables.
- Applies indexes and default luxury services seed data.

### 5. Running the Application
```bash
# Run Development Server
npm run dev

# Run Production Build
npm run build
npm run start
```
The application will be accessible at: `http://localhost:3000`  
The Admin Portal will be accessible at: `http://localhost:3000/admin`

---

## 🧪 Verification & Testing
To execute the automated platform verification suite:
```bash
node scripts/test-platform.js
```
Verifies:
- Supabase SQL migration integrity
- Booking ID generation algorithm
- Server-side Razorpay HMAC-SHA256 signature verification & tamper rejection
- 14-column Google Sheets data contract
- Razorpay Webhook idempotency protection
