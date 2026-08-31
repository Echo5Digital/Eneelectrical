const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    source: {
      type: String,
      enum: ["contact_form", "appointment_booking"],
      required: true,
    },
    serviceRequested: { type: String, trim: true, default: "" },
    preferredDate: { type: String, trim: true, default: "" },
    preferredTime: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "scheduled", "won", "lost"],
      default: "new",
    },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
