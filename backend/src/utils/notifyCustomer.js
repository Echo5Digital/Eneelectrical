const NotificationTemplate = require("../models/NotificationTemplate");
const Employee = require("../models/Employee");
const { getTransport } = require("./mailer");
const { buildBookingEmailHtml } = require("./emailTemplate");

const COMPANY_NAME = process.env.SMTP_FROM_NAME || "ENE Electrical";

const EMPLOYEE_NOTIFICATION_TEMPLATE = [
  "Hi %employee_full_name%,",
  "",
  "You have one confirmed %service_name% appointment on %appointment_date% at %appointment_start_time%. The appointment is added to your schedule.",
  "",
  "Thank you,",
  "%company_name%",
].join("\n");

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
    const html = buildBookingEmailHtml({
      booking,
      subject,
      body,
      dateText: formatBookingDate(booking.date),
    });

    await transport.sendMail({
      from: `"${COMPANY_NAME}" <${process.env.SMTP_USER}>`,
      to: booking.email,
      subject,
      text: body,
      html,
    });
  } catch (err) {
    console.error("Failed to send booking status email:", err.code || err.message, err.command || "");
  }
}

// Notifies every visible, available employee assigned to the booked service
// (there's no per-booking employee assignment yet, so this matches on the
// employee's `services` list rather than a single specific person).
async function notifyEmployeesOfNewBooking(booking) {
  try {
    const transport = getTransport();
    if (!transport) return;

    const employees = await Employee.find({
      services: booking.serviceType,
      visibility: "visible",
      availability: "available",
    });
    if (employees.length === 0) return;

    const startTime = String(booking.timeSlot).split(" - ")[0].trim();
    const values = {
      "%service_name%": booking.serviceType,
      "%appointment_date%": formatBookingDate(booking.date),
      "%appointment_start_time%": startTime,
      "%company_name%": COMPANY_NAME,
    };

    await Promise.all(
      employees.map((employee) => {
        const body = Object.entries({
          ...values,
          "%employee_full_name%": employee.name,
        }).reduce((acc, [token, value]) => acc.split(token).join(value), EMPLOYEE_NOTIFICATION_TEMPLATE);

        return transport
          .sendMail({
            from: `"${COMPANY_NAME}" <${process.env.SMTP_USER}>`,
            to: employee.email,
            subject: `New ${booking.serviceType} Appointment Scheduled`,
            text: body,
          })
          .catch((err) =>
            console.error(`Failed to send employee notification to ${employee.email}:`, err.code || err.message)
          );
      })
    );
  } catch (err) {
    console.error("Failed to notify employees of new booking:", err.code || err.message, err.command || "");
  }
}

module.exports = { sendBookingStatusEmail, notifyEmployeesOfNewBooking };
