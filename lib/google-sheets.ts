import { google } from 'googleapis';
import crypto from 'crypto';

// Escape formula characters (=, +, -, @) to prevent CSV/Formula injection in Google Sheets
function sanitizeFormula(value: any): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (/^[=\+\-@]/.test(str)) {
    return `'${str}`;
  }
  return str;
}

export async function appendToGoogleSheet(data: any, emailStatus: string = 'Sent') {
  const timeout = 15000; // 15 second timeout
  try {
    // We only execute this if the env vars exist
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.warn("Google Sheets credentials missing. Skipping sheet logging.");
      return { success: false, reason: "Missing credentials" };
    }

    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey) {
      // Handle escaped newlines from .env directly and any accidental surrounding quotes
      privateKey = privateKey.replace(/\\n/g, '\n').replace(/"/g, '');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Generate a unique ID simulating Firestore Document ID behavior
    const documentId = crypto.randomUUID();
    
    // Format timestamp nicely
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    
    // Map data to the exact required columns:
    // Full Name | Email Address | Phone Number | Subject | Message | Timestamp | Email Status | DocumentID
    const _response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:H', // Assumes first sheet tab is named 'Sheet1'
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            sanitizeFormula(data.name),            // Full Name
            sanitizeFormula(data.email),           // Email Address
            sanitizeFormula(data.phone),           // Phone Number
            sanitizeFormula(data.subject),         // Subject
            sanitizeFormula(data.message),         // Message
            timestamp,                             // Timestamp
            emailStatus,                           // Email Status
            documentId                             // DocumentID
          ]
        ]
      }
    });
    
    console.log("✅ Successfully logged to Google Sheets");
    return { success: true, documentId };
  } catch (error: any) {
    console.error('❌ Error appending to Google Sheet:', error.message || error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}

export async function logVisitorToGoogleSheet(data: any) {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_VISITOR_ID) {
      return { success: false, reason: "Missing credentials" };
    }
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey) {
      privateKey = privateKey.replace(/\\n/g, '\n').replace(/"/g, '');
    }
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetName = 'Visitors';

    const rowData = [
      data.timestamp || new Date().toLocaleString(),
      sanitizeFormula(data.ip),
      sanitizeFormula(data.city),
      sanitizeFormula(data.region),
      sanitizeFormula(data.country),
      sanitizeFormula(data.postalcode || data.postalCode),
      sanitizeFormula(data.timezone),
      sanitizeFormula(data.maplink || data.mapLink),
      sanitizeFormula(data.isp),
      sanitizeFormula(data.deviceBrand),
      sanitizeFormula(data.deviceModel),
      sanitizeFormula(data.os),
      sanitizeFormula(data.browser),
      sanitizeFormula(data.screenSize),
      sanitizeFormula(data.deviceType),
      sanitizeFormula(data.referrer),
      sanitizeFormula(data.pageVisited),
      sanitizeFormula(data.language),
      sanitizeFormula(data.connection),
      sanitizeFormula(data.cpuCores),
      sanitizeFormula(data.deviceMemory),
      sanitizeFormula(data.colorDepth),
      sanitizeFormula(data.pixelRatio),
      sanitizeFormula(data.urlParameters),
      sanitizeFormula(data.fullUserAgent),
      sanitizeFormula(data.localTime),
      sanitizeFormula(data.platform)
    ];

    try {
      // Attempt to append to existing sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_VISITOR_ID,
        range: `${sheetName}!A:AA`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [rowData] }
      });
    } catch (error: any) {
      // If sheet doesn't exist (Unable to parse range error)
      if (error.message && error.message.includes('Unable to parse range')) {
        // Create the sheet
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: process.env.GOOGLE_SHEET_VISITOR_ID,
          requestBody: {
            requests: [{
              addSheet: { properties: { title: sheetName } }
            }]
          }
        });

        // Add headers
        const headers = [
          'timestamp', 'ip', 'city', 'region', 'country', 'postalCode', 'timezone', 
          'mapLink', 'isp', 'deviceBrand', 'deviceModel', 'os', 'browser', 
          'screenSize', 'deviceType', 'referrer', 'pageVisited',
          'language', 'connection', 'cpuCores', 'deviceMemory', 'colorDepth',
          'pixelRatio', 'urlParameters', 'fullUserAgent', 'localTime', 'platform'
        ];
        
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_VISITOR_ID,
          range: `${sheetName}!A1:AA1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [headers] }
        });

        // Append the actual data now
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_VISITOR_ID,
          range: `${sheetName}!A:AA`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [rowData] }
        });
      } else {
        throw error;
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error('❌ Error appending visitor to Google Sheet:', error.message || error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}
