const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Manually parse .env.local or .env for testing
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

async function testLiveSheets() {
  console.log("=================================================");
  console.log("   GOOGLE SHEETS LIVE CONNECTION TEST            ");
  console.log("=================================================");
  console.log("Service Account:", clientEmail);
  console.log("Sheet ID:", spreadsheetId);

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    console.log("\nAttempting to read metadata from spreadsheet...");
    const res = await sheets.spreadsheets.get({ spreadsheetId });
    console.log("[SUCCESS] Successfully connected to spreadsheet!");
    console.log("Spreadsheet Title:", res.data.properties.title);
    console.log("Sheets found:", res.data.sheets.map(s => s.properties.title));
  } catch (err) {
    console.error("\n[ERROR] Connection failed:", err.message);
    if (err.message.includes("The caller does not have permission") || err.message.includes("403")) {
      console.log("\n-> IMPORTANT: Please make sure you have shared the spreadsheet with Editor permissions to:");
      console.log(`   ${clientEmail}`);
    }
  }
}

testLiveSheets();
