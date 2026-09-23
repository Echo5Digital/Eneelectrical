const NotificationTemplate = require("../models/NotificationTemplate");
const { getTransport } = require("./mailer");

const COMPANY_NAME = process.env.SMTP_FROM_NAME || "ENE Electrical";

// Booking dates are stored as UTC-midnight date-only values (see backend
// routes/bookings.js stats comment) -- format via UTC getters so the email
// shows the same calendar day the customer picked, regardless of the
// server's local timezone.
function formatBookingDate(date) {
  const d = new Date(date);
  const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return utcDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function applyPlaceholders(template, booking) {
  const values = {
    "%customer_name%": booking.customerName,
    "%service_name%": booking.serviceType,
    "%appointment_date%": formatBookingDate(booking.date),
    "%appointment_time%": booking.timeSlot,
    "%company_name%": COMPANY_NAME,
  };

  const substitute = (text) =>
    Object.entries(values).reduce((acc, [token, value]) => acc.split(token).join(value), text);

  return {
    subject: substitute(template.subject),
    body: substitute(template.body),
  };
}

async function sendBookingStatusEmail(booking) {
  try {
    const template = await NotificationTemplate.findOne({ status: booking.status });
    if (!template || !template.enabled) return;

    const transport = getTransport();
    if (!transport) return;

    const { subject, body } = applyPlaceholders(template, booking);

    await transport.sendMail({
      from: `"${COMPANY_NAME}" <${process.env.SMTP_USER}>`,
      to: booking.email,
      subject,
      text: body,
    });
  } catch (err) {
    console.error("Failed to send booking status email:", err.message);
  }
}

module.exports = { sendBookingStatusEmail };
