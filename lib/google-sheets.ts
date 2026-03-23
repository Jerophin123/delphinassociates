import { google } from 'googleapis';
import crypto from 'crypto';

export async function appendToGoogleSheet(data: any, emailStatus: string = 'Sent') {
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
            data.name || 'N/A',            // Full Name
            data.email || 'N/A',           // Email Address
            data.phone || 'N/A',           // Phone Number
            data.subject || 'N/A',         // Subject
            data.message || 'N/A',         // Message
            timestamp,                     // Timestamp
            emailStatus,                   // Email Status
            documentId                     // DocumentID
          ]
        ]
      }
    });
    
    console.log("✅ Successfully logged to Google Sheets");
    return { success: true, documentId };
  } catch (error: any) {
    console.error('❌ Error appending to Google Sheet:', error.message);
    return { success: false, error: error.message };
  }
}
