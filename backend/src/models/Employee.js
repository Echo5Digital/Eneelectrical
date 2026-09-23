const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    photoUrl: { type: String, trim: true, default: "" },
    visibility: {
      type: String,
      enum: ["visible", "hidden"],
      default: "visible",
    },
    availability: {
      type: String,
      enum: ["available", "away"],
      default: "available",
    },
    services: { type: [String], default: [] },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
