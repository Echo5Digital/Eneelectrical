const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Residential", "Commercial"],
      required: true,
    },
    durationMinutes: { type: Number, default: 60, min: 0 },
    price: { type: Number, default: 0, min: 0 },
    description: { type: String, trim: true, default: "" },
    visibility: {
      type: String,
      enum: ["visible", "hidden"],
      default: "visible",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
