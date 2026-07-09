import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (NOT your Gmail login password)
  },
});

/**
 * Sends a notification email to the gallery owner when a new inquiry arrives.
 */
export const sendInquiryNotification = async (inquiry) => {
  const mailOptions = {
    from: `"AURA GALLERY" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `🎨 New Inquiry: "${inquiry.subject}" from ${inquiry.fullName}`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #faf9f7; border: 1px solid #e8e4de; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: #1a1a1a; padding: 28px 36px;">
          <h1 style="color: #fff; font-size: 18px; letter-spacing: 0.12em; margin: 0; font-weight: 400;">AURA GALLERY</h1>
          <p style="color: rgba(255,255,255,0.5); margin: 6px 0 0; font-size: 12px; letter-spacing: 0.06em; font-family: sans-serif;">NEW COMMISSION INQUIRY</p>
        </div>

        <!-- Body -->
        <div style="padding: 36px;">
          <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 14px; color: #374151;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; width: 30%; color: #9ca3af; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; font-weight: 600; color: #1a1a1a;">${inquiry.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #9ca3af; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece6;"><a href="mailto:${inquiry.email}" style="color: #1a1a1a;">${inquiry.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece6; color: #9ca3af; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece6;">${inquiry.subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; line-height: 1.7; color: #374151;">${inquiry.message}</td>
            </tr>
          </table>

          <!-- CTA -->
          <div style="margin-top: 32px; text-align: center;">
            <a 
              href="mailto:${inquiry.email}?subject=Re: ${encodeURIComponent(inquiry.subject)}"
              style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 32px; text-decoration: none; font-family: sans-serif; font-size: 13px; letter-spacing: 0.06em; border-radius: 4px;"
            >
              Reply to ${inquiry.fullName} →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 36px; background: #f5f2ec; border-top: 1px solid #e8e4de; text-align: center;">
          <p style="font-family: sans-serif; font-size: 11px; color: #9ca3af; margin: 0;">
            This notification was sent by AURA GALLERY automated system.<br/>
            Received at ${new Date(inquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Notification sent to ${process.env.NOTIFY_EMAIL}`);
};

/**
 * Sends a confirmation email to the person who submitted the inquiry.
 */
export const sendConfirmationToInquirer = async (inquiry) => {
  const mailOptions = {
    from: `"Eliza Thorne — AURA GALLERY" <${process.env.EMAIL_USER}>`,
    to: inquiry.email,
    subject: `Thank you for your inquiry, ${inquiry.fullName.split(' ')[0]}`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #faf9f7; border: 1px solid #e8e4de; border-radius: 8px; overflow: hidden;">
        
        <div style="background: #1a1a1a; padding: 28px 36px;">
          <h1 style="color: #fff; font-size: 18px; letter-spacing: 0.12em; margin: 0; font-weight: 400;">AURA GALLERY</h1>
        </div>

        <div style="padding: 40px 36px; font-size: 15px; color: #374151; line-height: 1.8;">
          <p style="font-size: 22px; color: #1a1a1a; margin-top: 0;">Dear ${inquiry.fullName.split(' ')[0]},</p>
          <p>Thank you for reaching out. Your inquiry regarding <strong>"${inquiry.subject}"</strong> has been received.</p>
          <p>I personally review every message and will respond to you within <strong>2–3 business days</strong>.</p>
          <p style="margin-top: 32px; font-style: italic; color: #6b7280;">
            "Every conversation is the beginning of a new work."
          </p>
          <p style="margin-top: 32px;">With warmth,<br/><strong>Eliza Thorne</strong><br/><span style="font-size: 13px; color: #9ca3af;">AURA GALLERY</span></p>
        </div>

        <div style="padding: 20px 36px; background: #f5f2ec; border-top: 1px solid #e8e4de; text-align: center;">
          <p style="font-family: sans-serif; font-size: 11px; color: #9ca3af; margin: 0;">© ${new Date().getFullYear()} AURA GALLERY. All rights reserved.</p>
        </div>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`📧 Confirmation sent to ${inquiry.email}`);
};
