export interface ContactData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

// Escape HTML to prevent XSS
function escapeHtml(text: string) {
    if (!text) return '';
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m] || m);
}

// Use CID attachment for bulletproof embedded image rendering across all email clients
function getLogoUrl() {
    return 'cid:companylogo';
}

export function getClientEmailHTML(data: ContactData) {
    const safeData = {
        fullName: escapeHtml(data.name || 'there'),
        message: escapeHtml(data.message || 'N/A'),
        logoUrl: getLogoUrl()
    };

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delphin Associates - Contact Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0A0A0A;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #121212; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 16px; overflow: hidden; border-collapse: separate;">
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center; background-color: #121212;">
                            <img src="${safeData.logoUrl}" alt="Delphin Associates" style="max-width: 300px; height: auto; display: block; margin: 0 auto;" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="height: 1px; background: rgba(212, 175, 55, 0.2);"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px; background-color: #121212;">
                            <p style="margin: 0 0 20px; padding: 0; font-size: 18px; color: #D4AF37; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">
                                Hi ${safeData.fullName},
                            </p>
                            <p style="margin: 0 0 20px; padding: 0; font-size: 16px; line-height: 1.6; color: #FFFFFF; font-family: Arial, Helvetica, sans-serif;">
                                Thank you for contacting <span style="color: #D4AF37; font-weight: bold;">Delphin Associates</span>!
                            </p>
                            <p style="margin: 0 0 20px; padding: 0; font-size: 16px; line-height: 1.6; color: #FFFFFF; font-family: Arial, Helvetica, sans-serif;">
                                We have received your message:
                            </p>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid rgba(212, 175, 55, 0.2); background-color: #0A0A0A; border-radius: 12px; overflow: hidden; border-collapse: separate;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0; padding: 0; font-size: 15px; line-height: 1.6; color: #C5A46D; font-style: italic; font-family: Arial, Helvetica, sans-serif;">
                                            "${safeData.message}"
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 20px 0; padding: 0; font-size: 16px; line-height: 1.6; color: #FFFFFF; font-family: Arial, Helvetica, sans-serif;">
                                Our team will review your inquiry and respond to you shortly. We appreciate your interest in Delphin Associates.
                            </p>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td align="center" style="padding: 15px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="background-color: #D4AF37; border-radius: 12px; overflow: hidden;">
                                                    <a href="mailto:delphinassociates@gmail.com" style="display: inline-block; padding: 15px 40px; font-size: 16px; font-weight: bold; color: #0A0A0A; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; font-family: Arial, Helvetica, sans-serif;">
                                                        Contact Us
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="height: 1px; background: rgba(212, 175, 55, 0.2);"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; background-color: #121212;">
                            <p style="margin: 0 0 10px; padding: 0; font-size: 14px; color: #D4AF37; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">
                                Regards,
                            </p>
                            <p style="margin: 0 0 5px; padding: 0; font-size: 16px; color: #C5A46D; font-weight: bold; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif;">
                                Delphin Associates
                            </p>
                            <p style="margin: 10px 0 0; padding: 0; font-size: 12px; color: #B0B0B0; font-family: Arial, Helvetica, sans-serif;">
                                CHENNAI - 91.
                            </p>
                            <p style="margin: 15px 0 0; padding: 0; font-size: 11px; color: #B0B0B0; font-family: Arial, Helvetica, sans-serif;">
                                BUILDING SINCE : 1999
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}

export function getAdminEmailHTML(data: ContactData) {
    const safeData = {
        fullName: escapeHtml(data.name || 'N/A'),
        email: escapeHtml(data.email || 'N/A'),
        phone: escapeHtml(data.phone || 'N/A'),
        subject: escapeHtml(data.subject || 'N/A'),
        message: escapeHtml(data.message || 'N/A'),
        logoUrl: getLogoUrl()
    };

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission - Delphin Associates</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0A0A0A;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #121212; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 16px; overflow: hidden; border-collapse: separate;">
                    <tr>
                        <td style="padding: 40px 40px 30px; text-align: center; background-color: #121212;">
                            <img src="${safeData.logoUrl}" alt="Delphin Associates" style="max-width: 300px; height: auto; display: block; margin: 0 auto;" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="height: 1px; background: rgba(212, 175, 55, 0.2);"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 40px 20px; background-color: #121212;">
                            <p style="margin: 0; padding: 0; font-size: 20px; color: #D4AF37; font-weight: bold; text-transform: uppercase; font-family: Arial, Helvetica, sans-serif;">
                                New Contact Form Submission
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 40px; background-color: #121212;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0; border: 1px solid rgba(212, 175, 55, 0.2); background-color: #0A0A0A; border-radius: 12px; overflow: hidden; border-collapse: separate;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                                            <tr>
                                                <td style="padding: 0 0 5px;">
                                                    <p style="margin: 0; padding: 0; font-size: 12px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">Name</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="margin: 0; padding: 0; font-size: 16px; color: #FFFFFF; font-family: Arial, Helvetica, sans-serif;">${safeData.fullName}</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                                            <tr>
                                                <td style="padding: 0 0 5px;">
                                                    <p style="margin: 0; padding: 0; font-size: 12px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">Email</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="margin: 0; padding: 0; font-size: 16px; color: #FFFFFF; font-family: Arial, Helvetica, sans-serif;">
                                                        <a href="mailto:${safeData.email}" style="color: #C5A46D; text-decoration: none;">${safeData.email}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                                            <tr>
                                                <td style="padding: 0 0 5px;">
                                                    <p style="margin: 0; padding: 0; font-size: 12px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">Phone</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="margin: 0; padding: 0; font-size: 16px; color: #FFFFFF; font-family: Arial, Helvetica, sans-serif;">
                                                        <a href="tel:${safeData.phone}" style="color: #C5A46D; text-decoration: none;">${safeData.phone}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 15px;">
                                            <tr>
                                                <td style="padding: 0 0 5px;">
                                                    <p style="margin: 0; padding: 0; font-size: 12px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">Subject</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="margin: 0; padding: 0; font-size: 16px; color: #FFFFFF; font-family: Arial, Helvetica, sans-serif;">${safeData.subject}</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 0 0 5px;">
                                                    <p style="margin: 0; padding: 0; font-size: 12px; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">Message</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="margin: 0; padding: 0; font-size: 16px; line-height: 1.6; color: #FFFFFF; font-family: Arial, Helvetica, sans-serif;">${safeData.message}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Quick Action Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="padding-right: 15px;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="background-color: #D4AF37; border-radius: 12px; overflow: hidden;">
                                                                <a href="mailto:${safeData.email}?subject=Re: ${safeData.subject}" style="display: inline-block; padding: 12px 30px; font-size: 14px; font-weight: bold; color: #0A0A0A; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; font-family: Arial, Helvetica, sans-serif;">
                                                                    Reply via Mail
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="background-color: transparent; border: 2px solid #D4AF37; border-radius: 12px; overflow: hidden;">
                                                                <a href="tel:${safeData.phone}" style="display: inline-block; padding: 12px 30px; font-size: 14px; font-weight: bold; color: #D4AF37; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; font-family: Arial, Helvetica, sans-serif;">
                                                                    Call Now
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="height: 1px; background: rgba(212, 175, 55, 0.2);"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; background-color: #121212;">
                            <p style="margin: 0; padding: 0; font-size: 12px; color: #B0B0B0; font-family: Arial, Helvetica, sans-serif;">CHENNAI - 91.</p>
                            <p style="margin: 10px 0 0; padding: 0; font-size: 11px; color: #B0B0B0; font-family: Arial, Helvetica, sans-serif;">BUILDING SINCE : 1999</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}
