const nodemailer = require("nodemailer");
const dns = require("dns");
const { buildInternalNotificationEmailHtml } = require("./emailTemplate");

// Some cloud hosts resolve smtp.gmail.com to an IPv6 address first, and
// Gmail's SMTP servers are known to silently drop/time out IPv6 connections
// from unfamiliar cloud IP ranges far more often than IPv4. Forcing IPv4
// resolution order avoids that class of "Connection timeout" failure.
dns.setDefaultResultOrder("ipv4first");

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
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });
}

async function sendLeadNotification(lead) {
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const transport = getTransport();
  if (!transport || !to) return;

  const isAppointment = lead.source === "appointment_booking";
  const subject = `New ${isAppointment ? "appointment request" : "lead"}: ${lead.name}`;

  const bodyLines = ["A new website submission has come in.", "", "Message:", lead.message];
  const text = [
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
  ]
    .filter(Boolean)
    .join("\n");

  const details = [
    { label: "Name", value: lead.name },
    { label: "Email", value: lead.email },
    { label: "Phone", value: lead.phone },
    lead.serviceRequested ? { label: "Service", value: lead.serviceRequested } : null,
    lead.preferredDate ? { label: "Preferred date", value: lead.preferredDate } : null,
    lead.preferredTime ? { label: "Preferred time", value: lead.preferredTime } : null,
    lead.address ? { label: "Address", value: lead.address } : null,
  ].filter(Boolean);

  const html = buildInternalNotificationEmailHtml({
    heading: isAppointment ? "New Appointment Request" : "New Lead",
    subtitle: `${lead.name} just submitted the website ${isAppointment ? "appointment" : "contact"} form.`,
    body: bodyLines.join("\n"),
    details,
  });

  await transport.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "Website Leads"}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendLeadNotification, getTransport };
