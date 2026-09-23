const express = require("express");
const rateLimit = require("express-rate-limit");
const Lead = require("../models/Lead");
const requireAuth = require("../middleware/auth");
const { sendLeadNotification } = require("../utils/mailer");

const router = express.Router();

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-()+]{7,20}$/;

function validateLeadInput(body) {
  const errors = {};
  if (!body.name || !body.name.trim()) errors.name = "Name is required";
  if (!body.email || !EMAIL_RE.test(body.email)) errors.email = "Valid email is required";
  if (!body.phone || !PHONE_RE.test(body.phone)) errors.phone = "Valid phone is required";
  if (!body.message || !body.message.trim()) errors.message = "Message is required";
  if (!["contact_form", "appointment_booking"].includes(body.source)) {
    errors.source = "Invalid source";
  }
  return errors;
}

// Public: submit a new lead (from the site's contact/booking forms)
router.post("/", submitLimiter, async (req, res) => {
  const errors = validateLeadInput(req.body || {});
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const { name, email, phone, message, source, serviceRequested, preferredDate, preferredTime, address } =
    req.body;

  try {
    const lead = await Lead.create({
      name,
      email,
      phone,
      message,
      source,
      serviceRequested: serviceRequested || "",
      preferredDate: preferredDate || "",
      preferredTime: preferredTime || "",
      address: address || "",
    });

    sendLeadNotification(lead).catch((err) =>
      console.error("Failed to send lead notification email:", err.code || err.message, err.command || "")
    );

    res.status(201).json({ ok: true, id: lead._id });
  } catch (err) {
    console.error("Failed to create lead:", err);
    res.status(500).json({ error: "Failed to save your request. Please try again." });
  }
});

// Admin: list leads (with basic filtering/search/pagination)
router.get("/", requireAuth, async (req, res) => {
  const { status, source, q, page = 1, limit = 25 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (source) filter.source = source;
  if (q) {
    filter.$or = [
      { name: new RegExp(q, "i") },
      { email: new RegExp(q, "i") },
      { phone: new RegExp(q, "i") },
    ];
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 25));

  const [items, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Lead.countDocuments(filter),
  ]);

  res.json({ items, total, page: pageNum, limit: limitNum });
});

// Admin: get a single lead
router.get("/:id", requireAuth, async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json(lead);
});

// Admin: update a lead (status, notes, etc.)
router.patch("/:id", requireAuth, async (req, res) => {
  const allowed = ["status", "notes", "name", "email", "phone", "message"];
  const updates = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  const lead = await Lead.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json(lead);
});

// Admin: delete a lead
router.delete("/:id", requireAuth, async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json({ ok: true });
});

module.exports = router;
