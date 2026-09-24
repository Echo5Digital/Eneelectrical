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

// Renders the plain-text template body (with placeholders already applied)
// as HTML paragraphs, preserving the blank-line-separated structure staff
// write in the admin Notifications editor.
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

function buildBookingEmailHtml({ booking, subject, body, dateText, logoCid }) {
  const status = STATUS_HEADING[booking.status] || STATUS_HEADING.approved;
  const serviceName = escapeHtml(booking.serviceType);

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:32px 16px;background-color:#F7F8FA;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background-color:#ffffff;border:1px solid #E5EAF0;border-radius:16px;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:32px 32px 0;text-align:center;">
                ${
                  logoCid
                    ? `<div style="display:inline-block;border:1px solid #E5EAF0;border-radius:12px;padding:16px 24px;">
                        <img src="cid:${logoCid}" alt="ENE Electrical" height="56" style="display:block;" />
                      </div>`
                    : `<div style="font-size:22px;font-weight:bold;color:#0B1F3A;">ENE Electrical</div>`
                }
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;text-align:center;">
                <h1 style="margin:0 0 8px;color:#0B1F3A;font-size:26px;font-weight:bold;">${status.heading}</h1>
                <p style="margin:0;color:#5B6B7F;font-size:15px;line-height:1.5;">
                  Your ${serviceName} appointment ${status.subtitle}
                </p>
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
            <tr>
              <td style="padding:8px 32px 0;">
                <table role="presentation" width="100%" style="background-color:#F0F5FB;border-radius:12px;" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:20px 24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="40" style="vertical-align:top;padding-top:2px;">
                            <div style="width:32px;height:32px;border-radius:8px;background-color:#ffffff;border:1px solid #D6E0EC;text-align:center;line-height:32px;font-size:16px;">📅</div>
                          </td>
                          <td style="padding-left:12px;">
                            <div style="color:#8A97A8;font-size:12px;">Date</div>
                            <div style="color:#0B1F3A;font-size:15px;font-weight:bold;">${escapeHtml(dateText)}</div>
                          </td>
                        </tr>
                      </table>
                      <hr style="border:none;border-top:1px solid #D6E0EC;margin:16px 0;" />
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="40" style="vertical-align:top;padding-top:2px;">
                            <div style="width:32px;height:32px;border-radius:50%;border:2px solid #0B1F3A;text-align:center;line-height:28px;font-size:14px;">🕐</div>
                          </td>
                          <td style="padding-left:12px;">
                            <div style="color:#8A97A8;font-size:12px;">Time</div>
                            <div style="color:#0B1F3A;font-size:15px;font-weight:bold;">${escapeHtml(booking.timeSlot)}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 0;">
                <table role="presentation" width="100%" style="background-color:#F0F5FB;border-radius:12px;" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:24px;text-align:center;">
                      <h2 style="margin:0 0 4px;color:#0B1F3A;font-size:18px;font-weight:bold;">Have any queries?</h2>
                      <p style="margin:0 0 16px;color:#8A97A8;font-size:14px;">Feel free to contact us.</p>
                      <table role="presentation" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom:10px;">
                            <a href="tel:${COMPANY_PHONE_TEL}" style="color:#0B1F3A;font-size:14px;text-decoration:none;">
                              <span style="display:inline-block;width:24px;height:24px;border-radius:50%;background-color:#0B1F3A;color:#ffffff;text-align:center;line-height:24px;font-size:12px;margin-right:8px;vertical-align:middle;">☎</span>
                              <span style="text-decoration:underline;vertical-align:middle;">${COMPANY_PHONE}</span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="mailto:${COMPANY_EMAIL}" style="color:#0B1F3A;font-size:14px;text-decoration:none;">
                              <span style="display:inline-block;width:24px;height:24px;border-radius:50%;background-color:#0B1F3A;color:#ffffff;text-align:center;line-height:24px;font-size:12px;margin-right:8px;vertical-align:middle;">✉</span>
                              <span style="text-decoration:underline;vertical-align:middle;">${COMPANY_EMAIL}</span>
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

module.exports = { buildBookingEmailHtml };
