const nodemailer = require("nodemailer");

function getTransport() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendLeadNotification(lead) {
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const transport = getTransport();
  if (!transport || !to) return;

  const subject = `New ${lead.source === "appointment_booking" ? "appointment request" : "lead"}: ${lead.name}`;
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    lead.serviceRequested ? `Service: ${lead.serviceRequested}` : null,
    lead.preferredDate ? `Preferred date: ${lead.preferredDate}` : null,
    lead.preferredTime ? `Preferred time: ${lead.preferredTime}` : null,
    lead.address ? `Address: ${lead.address}` : null,
    "",
    "Message:",
    lead.message,
  ].filter(Boolean);

  await transport.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "Website Leads"}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text: lines.join("\n"),
  });
}

module.exports = { sendLeadNotification, getTransport };
