const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    serviceCategory: {
      type: String,
      enum: ["Residential", "Commercial"],
      required: true,
    },
    serviceType: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true, trim: true },
    zipCode: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["approved", "pending", "cancelled"],
      default: "approved",
    },
  },
  { timestamps: true }
);

bookingSchema.index({ date: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
