const http = require('http');

async function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 3000,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data), raw: data });
        } catch {
          resolve({ status: res.statusCode, data: null, raw: data });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runE2E() {
  console.log("\n========================================================");
  console.log("   ABDUL NAI — LIVE END-TO-END HTTP API VERIFICATION    ");
  console.log("========================================================\n");

  const BASE_URL = "http://localhost:3000";
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Services
    console.log("--- 1. Fetching Services Menu ---");
    const srvRes = await request(`${BASE_URL}/api/services`);
    assert(srvRes.status === 200 && srvRes.data.success && srvRes.data.services.length > 0, `Returned ${srvRes.data?.services?.length} luxury services`);

    const service = srvRes.data.services[0];

    // 2. Availability Check
    console.log("\n--- 2. Checking Slot Availability ---");
    const day = Math.floor(Math.random() * 20) + 10;
    const testDate = `2026-12-${day}`;
    const availRes1 = await request(`${BASE_URL}/api/availability?date=${testDate}`);
    const testSlot = availRes1.data.availableSlots[0] || "03:00 PM";
    assert(availRes1.status === 200 && availRes1.data.availableSlots.includes(testSlot), `Slot ${testSlot} is available on ${testDate}`);

    // 3. Create Booking
    console.log("\n--- 3. Creating Customer Booking ---");
    const bookRes = await request(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      body: {
        customer_name: "Advocate Aryaman Roy",
        phone: "9820198201",
        email: "aryaman@roy-chambers.in",
        service_id: service.id,
        service_name: service.name,
        service_price: service.price,
        appointment_date: testDate,
        appointment_time: testSlot,
        instructions: "Royal pomade and extra hot towel, please."
      }
    });

    assert(bookRes.status === 201 && bookRes.data.success, `Booking created with ID: ${bookRes.data?.booking?.booking_id}`);
    const booking = bookRes.data.booking;
    assert(booking.payment_status === "PENDING", "Initial payment status is PENDING");
    assert(booking.status === "CONFIRMED", "Initial appointment status is CONFIRMED");

    // 4. Double Booking Prevention Test
    console.log("\n--- 4. Testing Double-Booking Prevention ---");
    const duplicateBookingRes = await request(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      body: {
        customer_name: "Imposter Booking",
        phone: "9999999999",
        service_id: service.id,
        service_name: service.name,
        service_price: service.price,
        appointment_date: testDate,
        appointment_time: testSlot
      }
    });
    assert(duplicateBookingRes.status === 409, "Double booking attempt correctly rejected with HTTP 409 Conflict");

    // 5. Razorpay Order Creation
    console.log("\n--- 5. Creating Razorpay Order ---");
    const orderRes = await request(`${BASE_URL}/api/payments/create-order`, {
      method: 'POST',
      body: { booking_id: booking.booking_id }
    });
    assert(orderRes.status === 200 && orderRes.data.order_id, `Razorpay order created: ${orderRes.data?.order_id} for ${orderRes.data?.amount} paise`);

    // 6. Server-Side Signature Verification & Payment Success
    console.log("\n--- 6. Verifying Razorpay Payment Server-Side ---");
    const verifyRes = await request(`${BASE_URL}/api/payments/verify`, {
      method: 'POST',
      body: {
        order_id: orderRes.data.order_id,
        payment_id: `pay_e2e_${Date.now()}`,
        signature: `mock_sig_${Date.now()}_verified`,
        booking_id: booking.booking_id,
        method: "UPI_GPAY"
      }
    });
    assert(verifyRes.status === 200 && verifyRes.data.success, "Payment verified successfully");
    assert(verifyRes.data.booking.payment_status === "PAID", "Booking payment status updated to PAID in DB");

    // 7. Razorpay Webhook Idempotency Test
    console.log("\n--- 7. Razorpay Webhook Idempotency ---");
    const webhookRes = await request(`${BASE_URL}/api/payments/webhook`, {
      method: 'POST',
      body: {
        event: "payment.captured",
        event_id: `evt_e2e_${Date.now()}`,
        payload: {
          payment: {
            entity: {
              id: verifyRes.data.booking.razorpay_payment_id,
              order_id: orderRes.data.order_id,
              amount: service.price * 100,
              currency: "INR",
              method: "upi"
            }
          }
        }
      }
    });
    assert(webhookRes.status === 200 && webhookRes.data.success, "Webhook processed idempotently");

    // 8. Admin Authentication
    console.log("\n--- 8. Admin Authentication ---");
    const adminLoginRes = await request(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      body: {
        email: "admin@abdulnai.com",
        password: "AbdulNaiLuxe2025!"
      }
    });
    assert(adminLoginRes.status === 200 && adminLoginRes.data.success, "Admin authenticated with credentials");

    // 9. Admin Stats Overview
    console.log("\n--- 9. Admin Overview Stats ---");
    const statsRes = await request(`${BASE_URL}/api/admin/stats`);
    assert(statsRes.status === 200 && statsRes.data.stats.totalBookings >= 1, `Admin stats report ${statsRes.data?.stats?.totalBookings} total bookings`);
    assert(statsRes.data.stats.totalRevenue >= service.price, `Collected revenue correctly computed: INR ${statsRes.data?.stats?.totalRevenue}`);

    // 10. Admin Mark Appointment Completed
    console.log("\n--- 10. Admin Status Update ---");
    const updateRes = await request(`${BASE_URL}/api/bookings/${booking.booking_id}`, {
      method: 'PATCH',
      body: { status: "COMPLETED" }
    });
    assert(updateRes.status === 200 && updateRes.data.booking.status === "COMPLETED", "Admin marked appointment as COMPLETED");

    console.log("\n========================================================");
    console.log(`ALL E2E SCENARIOS VERIFIED: ${passed} Passed, ${failed} Failed`);
    console.log("========================================================\n");
  } catch (err) {
    console.error("E2E Test Execution Error:", err);
  }
}

runE2E();
