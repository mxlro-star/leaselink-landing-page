import { Client } from "@microsoft/microsoft-graph-client";
import { getToken } from "../../../lib/auth";

export async function POST(req) {
  try {
    const { email, bookingDateTime } = await req.json();

    if (!email || !bookingDateTime) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Microsoft Graph client
    const client = Client.init({
      authProvider: async (done) => {
        try {
          const token = await getToken();
          done(null, token);
        } catch (error) {
          console.error('Authentication error:', error);
          done(error, null);
        }
      },
    });

    const date = new Date(bookingDateTime);
    const formattedDate = date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create the email message with all properties set at creation
    const messageContent = {
      subject: 'Your LETORA Property Consultation Confirmation',
      importance: 'normal',
      body: {
        contentType: 'HTML',
        content: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a365d;">Your Property Consultation is Confirmed</h2>
            <p>Thank you for booking a consultation with LETORA Property Management.</p>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;">Your consultation is scheduled for:</p>
              <p style="font-size: 18px; font-weight: bold; color: #1a365d; margin: 10px 0;">
                ${formattedDate} at ${formattedTime}
              </p>
            </div>
            <p>We look forward to speaking with you and discussing how we can help maximize your property's potential.</p>
            <p>If you need to reschedule or have any questions, please don't hesitate to contact us.</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0;">Best regards,<br>The LETORA Team</p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                LETORA Property Management<br>
                Email: team@letora.co.uk<br>
                WhatsApp: +44 7947 764486
              </p>
            </div>
          </div>
        `
      },
      toRecipients: [
        {
          emailAddress: {
            address: email
          }
        }
      ],
      from: {
        emailAddress: {
          address: "team@letora.co.uk",
          name: "LETORA Property Management"
        }
      },
      sender: {
        emailAddress: {
          address: "team@letora.co.uk",
          name: "LETORA Property Management"
        }
      },
      replyTo: [
        {
          emailAddress: {
            address: "team@letora.co.uk",
            name: "LETORA Property Management"
          }
        }
      ],
      internetMessageHeaders: [
        {
          name: "x-priority",
          value: "1"
        },
        {
          name: "x-msmail-priority",
          value: "High"
        },
        {
          name: "x-ms-exchange-organization-authas",
          value: "Internal"
        },
        {
          name: "x-ms-exchange-organization-authsource",
          value: "CWXP123MB1895.GBRP123.PROD.OUTLOOK.COM"
        },
        {
          name: "x-ms-exchange-organization-auth",
          value: "true"
        }
      ]
    };

    try {
      console.log('Creating message...');
      
      // Create the message with all properties set
      const message = await client
        .api('/users/team@letora.co.uk/messages')
        .post(messageContent);

      console.log('Message created, sending...');
      
      // Send the message
      await client
        .api(`/users/team@letora.co.uk/messages/${message.id}/send`)
        .post();

      console.log('Message sent successfully');
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Failed to send email:', {
        error,
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        body: error.body
      });
      throw error;
    }
  } catch (error) {
    console.error('Email sending error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      statusCode: error.statusCode,
      requestId: error.requestId,
      body: error.body
    });

    return new Response(
      JSON.stringify({
        error: 'Failed to send confirmation email',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          code: error.code,
          statusCode: error.statusCode,
          requestId: error.requestId
        } : undefined
      }),
      {
        status: error.statusCode || 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 