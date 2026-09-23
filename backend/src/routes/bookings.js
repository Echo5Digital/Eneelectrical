const express = require("express");
const rateLimit = require("express-rate-limit");
const Booking = require("../models/Booking");
const requireAuth = require("../middleware/auth");
const { sendBookingStatusEmail } = require("../utils/notifyCustomer");

const router = express.Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-()+]{7,20}$/;
const CATEGORIES = ["Residential", "Commercial"];
const STATUSES = ["approved", "pending", "cancelled"];

function validateBookingInput(body, { partial = false } = {}) {
  const errors = {};
  const has = (key) => body[key] !== undefined;

  if (!partial || has("customerName")) {
    if (!body.customerName || !String(body.customerName).trim())
      errors.customerName = "Customer name is required";
  }
  if (!partial || has("email")) {
    if (!body.email || !EMAIL_RE.test(body.email)) errors.email = "Valid email is required";
  }
  if (!partial || has("phone")) {
    if (!body.phone || !PHONE_RE.test(body.phone)) errors.phone = "Valid phone is required";
  }
  if (!partial || has("serviceCategory")) {
    if (!CATEGORIES.includes(body.serviceCategory)) errors.serviceCategory = "Invalid service category";
  }
  if (!partial || has("serviceType")) {
    if (!body.serviceType || !String(body.serviceType).trim()) errors.serviceType = "Service type is required";
  }
  if (!partial || has("date")) {
    if (!body.date || Number.isNaN(new Date(body.date).getTime())) errors.date = "Valid date is required";
  }
  if (!partial || has("timeSlot")) {
    if (!body.timeSlot || !String(body.timeSlot).trim()) errors.timeSlot = "Time slot is required";
  }
  if (has("status")) {
    if (!STATUSES.includes(body.status)) errors.status = "Invalid status";
  }
  return errors;
}

const ALLOWED_FIELDS = [
  "customerName",
  "email",
  "phone",
  "serviceCategory",
  "serviceType",
  "date",
  "timeSlot",
  "zipCode",
  "notes",
  "status",
];

// Public: submit a new booking (from the site's appointment wizard)
router.post("/public", submitLimiter, async (req, res) => {
  const errors = validateBookingInput(req.body || {});
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const payload = {};
  for (const key of ALLOWED_FIELDS) {
    if (key === "status") continue;
    if (req.body[key] !== undefined) payload[key] = req.body[key];
  }
  payload.status = "approved";

  try {
    const booking = await Booking.create(payload);
    sendBookingStatusEmail(booking).catch((err) =>
      console.error("Failed to send booking status email:", err)
    );
    res.status(201).json({ ok: true, id: booking._id });
  } catch (err) {
    console.error("Failed to create public booking:", err);
    res.status(500).json({ error: "Failed to save your booking. Please try again." });
  }
});

// Admin: aggregate stats for the booking-system dashboard
router.get("/stats", requireAuth, async (req, res) => {
  // Booking dates are stored as UTC-midnight date-only values, so "today"
  // must be computed in UTC too -- using the server's local timezone here
  // would shift the boundary and drop/include bookings depending on where
  // the process happens to be hosted.
  const now = new Date();
  const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  const defaultEnd = new Date(todayStart);
  defaultEnd.setUTCDate(defaultEnd.getUTCDate() + 30);
  defaultEnd.setUTCHours(23, 59, 59, 999);

  const start = req.query.start ? new Date(req.query.start) : todayStart;
  const end = req.query.end ? new Date(req.query.end) : defaultEnd;

  const rangeFilter = { date: { $gte: start, $lte: end } };

  const [totalAppointments, byStatus, upcoming, uniqueEmails] = await Promise.all([
    Booking.countDocuments(rangeFilter),
    Booking.aggregate([
      { $match: rangeFilter },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Booking.find({ date: { $gte: todayStart } })
      .sort({ date: 1 })
      .limit(10),
    Booking.distinct("email", rangeFilter),
  ]);

  const statusCounts = byStatus.reduce((acc, row) => {
    acc[row._id] = row.count;
    return acc;
  }, {});

  res.json({
    range: { start, end },
    totalAppointments,
    customers: uniqueEmails.length,
    statusCounts,
    upcoming,
  });
});

// Admin: list bookings (date-range filter for calendar, search/status/pagination for table)
router.get("/", requireAuth, async (req, res) => {
  const { status, q, start, end, page = 1, limit = 25 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (q) {
    filter.$or = [
      { customerName: new RegExp(q, "i") },
      { email: new RegExp(q, "i") },
      { phone: new RegExp(q, "i") },
    ];
  }
  if (start || end) {
    filter.date = {};
    if (start) filter.date.$gte = new Date(start);
    if (end) filter.date.$lte = new Date(end);
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || 25));

  const [items, total] = await Promise.all([
    Booking.find(filter)
      .sort({ date: 1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Booking.countDocuments(filter),
  ]);

  res.json({ items, total, page: pageNum, limit: limitNum });
});

// Admin: get a single booking
router.get("/:id", requireAuth, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json(booking);
});

// Admin: create a booking
router.post("/", requireAuth, async (req, res) => {
  const errors = validateBookingInput(req.body || {});
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const payload = {};
  for (const key of ALLOWED_FIELDS) {
    if (req.body[key] !== undefined) payload[key] = req.body[key];
  }

  try {
    const booking = await Booking.create(payload);
    sendBookingStatusEmail(booking).catch((err) =>
      console.error("Failed to send booking status email:", err)
    );
    res.status(201).json(booking);
  } catch (err) {
    console.error("Failed to create booking:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Admin: duplicate a booking
router.post("/:id/duplicate", requireAuth, async (req, res) => {
  const original = await Booking.findById(req.params.id);
  if (!original) return res.status(404).json({ error: "Booking not found" });

  const copy = original.toObject();
  delete copy._id;
  delete copy.createdAt;
  delete copy.updatedAt;
  copy.status = "pending";

  try {
    const duplicate = await Booking.create(copy);
    sendBookingStatusEmail(duplicate).catch((err) =>
      console.error("Failed to send booking status email:", err)
    );
    res.status(201).json(duplicate);
  } catch (err) {
    console.error("Failed to duplicate booking:", err);
    res.status(500).json({ error: "Failed to duplicate booking" });
  }
});

// Admin: update a booking
router.patch("/:id", requireAuth, async (req, res) => {
  const errors = validateBookingInput(req.body || {}, { partial: true });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const updates = {};
  for (const key of ALLOWED_FIELDS) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  const existing = await Booking.findById(req.params.id);
  if (!existing) return res.status(404).json({ error: "Booking not found" });
  const statusChanged = updates.status !== undefined && updates.status !== existing.status;

  const booking = await Booking.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!booking) return res.status(404).json({ error: "Booking not found" });

  if (statusChanged) {
    sendBookingStatusEmail(booking).catch((err) =>
      console.error("Failed to send booking status email:", err)
    );
  }

  res.json(booking);
});

// Admin: delete a booking
router.delete("/:id", requireAuth, async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });
  res.json({ ok: true });
});

module.exports = router;
