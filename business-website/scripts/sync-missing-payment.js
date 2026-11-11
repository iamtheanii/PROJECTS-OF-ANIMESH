const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
});

const clientEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
let privateKeyRaw = env.GOOGLE_PRIVATE_KEY || '';
const spreadsheetId = env.GOOGLE_SHEET_ID;
let key = privateKeyRaw.replace(/\\n/g, '\n');

async function syncLiveBooking() {
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const row = [
    'AN-2026-1WK9HM3K',               // 1. Booking ID
    'Byanjan behera',                 // 2. Customer Name
    '7008285305',                     // 3. Phone Number
    'Live Payment Trial Test',        // 4. Service
    '11 Nov 2026',                    // 5. Booking Date
    '2026-11-12',                     // 6. Appointment Date
    '10:00 AM',                       // 7. Appointment Time
    5,                                // 8. Total Amount
    5,                                // 9. Advance Amount
    0,                                // 10. Remaining Balance
    'ONLINE_RAZORPAY',                // 11. Payment Method
    'PAID',                           // 12. Payment Status
    'pay_TyvV4295h1TBEM',             // 13. Transaction ID
    'CONFIRMED',                      // 14. Booking Status
    'NONE',                           // 15. Customer Payment Declaration
    'VERIFIED',                       // 16. Admin Verification
    'N/A',                            // 17. Completion Time
    new Date('2026-11-11T21:30:12+05:30').toISOString() // 18. Last Updated
  ];

  const appendRes = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:R',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row]
    }
  });

  console.log('SYNC_SUCCESS: Appended row to Google Sheet!', appendRes.data.updates.updatedRange);
}

syncLiveBooking().catch(err => console.error('SYNC_ERROR:', err));
