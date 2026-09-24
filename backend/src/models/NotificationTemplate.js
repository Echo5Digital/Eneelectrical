const mongoose = require("mongoose");

const notificationTemplateSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["new", "approved", "pending", "cancelled"],
      required: true,
      unique: true,
    },
    subject: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotificationTemplate", notificationTemplateSchema);
