const COMPANY_PHONE = process.env.COMPANY_PHONE || "(832) 783-0303";
const COMPANY_PHONE_TEL = process.env.COMPANY_PHONE_TEL || "+18327830303";
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || "info@eneelectrical.com";

const STATUS_HEADING = {
  new: { heading: "Appointment Received", subtitle: "has been received and is awaiting confirmation." },
  approved: { heading: "Appointment Confirmed", subtitle: "has been successfully scheduled." },
  pending: { heading: "Appointment Pending", subtitle: "is waiting for confirmation." },
  cancelled: { heading: "Appointment Cancelled", subtitle: "has been cancelled." },
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Renders a plain-text template body (with placeholders already applied) as
// HTML paragraphs, preserving the blank-line-separated structure staff write
// in the admin Notifications editor.
function bodyToHtmlParagraphs(body) {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map(
      (block) =>
        `<p style="margin:0 0 16px;color:#1A2530;font-size:15px;line-height:1.6;">${escapeHtml(block).replace(/\n/g, "<br>")}</p>`
    )
    .join("");
}

function renderLogo() {
  return `<div style="display:inline-block;border:1px solid #E5EAF0;border-radius:12px;padding:16px 28px;">
    <span style="font-size:24px;font-weight:bold;color:#0B1F3A;font-family:Arial,Helvetica,sans-serif;letter-spacing:0.5px;">ENE</span>
    <div style="font-size:10px;font-weight:bold;color:#0B1F3A;letter-spacing:2px;margin-top:-2px;">ELECTRICAL</div>
  </div>`;
}

function renderInfoBox(rows) {
  const rowsHtml = rows
    .map(
      (row, idx) => `
        ${idx > 0 ? `<hr style="border:none;border-top:1px solid #D6E0EC;margin:16px 0;" />` : ""}
        <div style="color:#8A97A8;font-size:12px;">${escapeHtml(row.label)}</div>
        <div style="color:#0B1F3A;font-size:15px;font-weight:bold;">${escapeHtml(row.value)}</div>`
    )
    .join("");

  return `<table role="presentation" width="100%" style="background-color:#F0F5FB;border-radius:12px;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:20px 24px;">${rowsHtml}</td>
    </tr>
  </table>`;
}

// Shared card shell (logo, heading/subtitle, divider, body copy, an optional
// info box, optional extra HTML, and the footer) used by both the
// customer-facing booking email and the internal staff notifications, so
// every outbound email looks like it comes from the same system.
function buildEmailShell({ heading, subtitle, body, infoBox, extraHtml }) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:32px 16px;background-color:#F7F8FA;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background-color:#ffffff;border:1px solid #E5EAF0;border-radius:16px;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:32px 32px 0;text-align:center;">
                ${renderLogo()}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;text-align:center;">
                <h1 style="margin:0 0 8px;color:#0B1F3A;font-size:26px;font-weight:bold;">${heading}</h1>
                ${subtitle ? `<p style="margin:0;color:#5B6B7F;font-size:15px;line-height:1.5;">${subtitle}</p>` : ""}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <hr style="border:none;border-top:1px solid #E5EAF0;margin:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                ${bodyToHtmlParagraphs(body)}
              </td>
            </tr>
            ${
              infoBox
                ? `<tr>
                    <td style="padding:8px 32px 0;">${infoBox}</td>
                  </tr>`
                : ""
            }
            ${extraHtml ? `<tr><td style="padding:24px 32px 0;">${extraHtml}</td></tr>` : ""}
            <tr>
              <td style="padding:24px 32px 32px;text-align:center;">
                <p style="margin:0;color:#B0BAC7;font-size:12px;">© ${new Date().getFullYear()} ENE Electrical. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildBookingEmailHtml({ booking, subject, body, dateText }) {
  const status = STATUS_HEADING[booking.status] || STATUS_HEADING.approved;
  const serviceName = escapeHtml(booking.serviceType);

  const contactBox = `<table role="presentation" width="100%" style="background-color:#F0F5FB;border-radius:12px;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="padding:24px;text-align:center;">
        <h2 style="margin:0 0 4px;color:#0B1F3A;font-size:18px;font-weight:bold;">Have any queries?</h2>
        <p style="margin:0 0 16px;color:#8A97A8;font-size:14px;">Feel free to contact us.</p>
        <table role="presentation" align="center" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-bottom:8px;">
              <a href="tel:${COMPANY_PHONE_TEL}" style="color:#0B1F3A;font-size:14px;text-decoration:underline;">${COMPANY_PHONE}</a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="mailto:${COMPANY_EMAIL}" style="color:#0B1F3A;font-size:14px;text-decoration:underline;">${COMPANY_EMAIL}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;

  return buildEmailShell({
    heading: status.heading,
    subtitle: `Your ${serviceName} appointment ${status.subtitle}`,
    body,
    infoBox: renderInfoBox([
      { label: "Date", value: dateText },
      { label: "Time", value: booking.timeSlot },
    ]),
    extraHtml: contactBox,
  });
}

// Internal staff-facing notification (lead alerts to LEAD_NOTIFY_EMAIL,
// employee appointment alerts): same card shell as the customer email, but
// with a details box instead of date/time and no customer contact box.
function buildInternalNotificationEmailHtml({ heading, subtitle, body, details }) {
  return buildEmailShell({
    heading: escapeHtml(heading),
    subtitle: subtitle ? escapeHtml(subtitle) : "",
    body,
    infoBox: details && details.length > 0 ? renderInfoBox(details) : null,
  });
}

module.exports = { buildBookingEmailHtml, buildInternalNotificationEmailHtml };
