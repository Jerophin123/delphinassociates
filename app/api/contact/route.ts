import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import { getClientEmailHTML, getAdminEmailHTML, ContactData } from '@/lib/email-templates';
import { appendToGoogleSheet } from '@/lib/google-sheets';

// Reuse transporter for performance
let transporter: nodemailer.Transporter;

function getTransporter() {
  if (!transporter) {
    const user = process.env.GMAIL_USER || 'delphinassociates@gmail.com';
    const pass = process.env.GMAIL_APP_PASSWORD || 'wdfkpcdbzolfrurw'; // Hardcoded fallback based on DAAuto scripts if env not present

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass
      }
    });
  }
  return transporter;
}

export async function POST(request: Request) {
  try {
    const data: ContactData = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const t = getTransporter();

    const clientEmailHTML = getClientEmailHTML(data);
    const adminEmailHTML = getAdminEmailHTML(data);

    // Setup the logo attachment (embeds image directly in the email payload)
    const attachments = [
      {
        filename: 'logo.jpg',
        path: path.join(process.cwd(), 'public', 'logo.jpg'),
        cid: 'companylogo', // same cid value as in the html img src
      }
    ];

    // Prepare email to the user (Contact Confirmation)
    const clientMailOptions = {
      from: "Delphin Associates <delphinassociates@gmail.com>",
      to: data.email,
      subject: "We received your message",
      html: clientEmailHTML,
      attachments,
    };

    // Prepare email to admin (New Contact Alert)
    const adminMailOptions = {
      from: "Delphin Associates <delphinassociates@gmail.com>",
      to: process.env.GMAIL_USER || "delphinassociates@gmail.com",
      subject: "New Contact Form Submission",
      html: adminEmailHTML,
      replyTo: data.email,
      attachments,
    };

    // Send both emails in parallel
    let emailStatus = 'Sent Successfully';
    try {
      await Promise.all([
        t.sendMail(clientMailOptions),
        t.sendMail(adminMailOptions),
      ]);
    } catch (emailErr) {
      console.error('Email send failed:', emailErr);
      emailStatus = 'Failed to Send';
    }

    // Google Sheets Logger - Log it regardless of email success/failure
    // Wrapped in try-catch so a Sheets API failure doesn't crash the whole request
    try {
      await appendToGoogleSheet(data, emailStatus);
    } catch (sheetErr) {
      console.error('Google Sheets logging failed (non-fatal):', sheetErr);
    }

    if (emailStatus === 'Failed to Send') {
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Error in contact API Route:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
