require("dotenv").config();
const mongoose = require("mongoose");
const NotificationTemplate = require("../src/models/NotificationTemplate");

const DEFAULT_TEMPLATES = [
  {
    status: "new",
    subject: "%service_name% Appointment Received",
    body: [
      "Dear %customer_name%,",
      "",
      "You have successfully scheduled a %service_name% appointment on %appointment_date% at %appointment_time%.",
      "",
      "Thank you for choosing our company,",
      "%company_name%",
    ].join("\n"),
  },
  {
    status: "approved",
    subject: "%service_name% Appointment Approved",
    body: [
      "Dear %customer_name%,",
      "",
      "You have successfully scheduled a %service_name% appointment on %appointment_date% at %appointment_time%.",
      "",
      "Thank you for choosing our company,",
      "%company_name%",
    ].join("\n"),
  },
  {
    status: "pending",
    subject: "%service_name% Appointment Pending",
    body: [
      "Dear %customer_name%,",
      "",
      "Your %service_name% appointment, scheduled for %appointment_date% at %appointment_time%, is waiting for confirmation.",
      "",
      "Thank you for choosing our company,",
      "%company_name%",
    ].join("\n"),
  },
  {
    status: "cancelled",
    subject: "%service_name% Appointment Cancelled",
    body: [
      "Dear %customer_name%,",
      "",
      "Your %service_name% appointment, scheduled on %appointment_date% at %appointment_time%, has been cancelled.",
      "",
      "Thank you for choosing our company,",
      "%company_name%",
    ].join("\n"),
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  for (const template of DEFAULT_TEMPLATES) {
    const existing = await NotificationTemplate.findOne({ status: template.status });
    if (existing) {
      console.log(`Skipping existing: ${template.status}`);
      continue;
    }
    await NotificationTemplate.create(template);
    console.log(`Created: ${template.status}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
