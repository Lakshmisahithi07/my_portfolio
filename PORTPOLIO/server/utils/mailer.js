const nodemailer = require('nodemailer');

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn('Email transport not fully configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env');
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: String(SMTP_SECURE).toLowerCase() === 'true', // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

async function sendNotification({ name, email, message }) {
  const transporter = createTransporter();
  if (!transporter) return { ok: false, error: 'Transport not configured' };

  const toAddress = process.env.NOTIFY_TO || 'sahithia55@gmail.com';

  const mailOptions = {
    from: {
      name: 'Portfolio Contact Bot',
      address: process.env.SMTP_FROM || process.env.SMTP_USER,
    },
    to: toAddress,
    replyTo: email,
    subject: `New Contact Message from ${name}`,
    text: `You received a new message from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    html: `<p>You received a new message from your portfolio.</p>
           <p><strong>Name:</strong> ${name}<br/>
           <strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br/>')}</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { ok: true, id: info.messageId };
  } catch (err) {
    console.error('Nodemailer error:', err);
    return { ok: false, error: String(err) };
  }
}

module.exports = { sendNotification };
