import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export function generateWelcomeEmail(customerName: string) {
  return `
    <h1>Welcome to Our Loyalty Program, ${customerName}!</h1>
    <p>We're excited to have you on board. Here are some benefits you can look forward to:</p>
    <ul>
      <li>Earn points on every purchase</li>
      <li>Redeem points for exclusive rewards</li>
      <li>Access to special member-only promotions</li>
    </ul>
    <p>Start earning points today!</p>
  `;
}

export function generateLevelUpEmail(customerName: string, newLevel: string) {
  return `
    <h1>Congratulations, ${customerName}!</h1>
    <p>You've reached a new level in our loyalty program: ${newLevel}</p>
    <p>This new level comes with additional benefits:</p>
    <ul>
      <li>Higher point earning rates</li>
      <li>Access to exclusive ${newLevel} rewards</li>
      <li>Priority customer service</li>
    </ul>
    <p>Keep up the great work!</p>
  `;
}