const express = require("express");
const Employee = require("../models/Employee");
const requireAuth = require("../middleware/auth");

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-()+]{7,20}$/;
const VISIBILITY_VALUES = ["visible", "hidden"];
const AVAILABILITY_VALUES = ["available", "away"];

function validateEmployeeInput(body, { partial = false } = {}) {
  const errors = {};
  const has = (key) => body[key] !== undefined;

  if (!partial || has("name")) {
    if (!body.name || !String(body.name).trim()) errors.name = "Name is required";
  }
  if (!partial || has("phone")) {
    if (!body.phone || !PHONE_RE.test(body.phone)) errors.phone = "Valid phone is required";
  }
  if (!partial || has("email")) {
    if (!body.email || !EMAIL_RE.test(body.email)) errors.email = "Valid email is required";
  }
  if (has("visibility")) {
    if (!VISIBILITY_VALUES.includes(body.visibility)) errors.visibility = "Invalid visibility";
  }
  if (has("availability")) {
    if (!AVAILABILITY_VALUES.includes(body.availability)) errors.availability = "Invalid availability";
  }
  if (has("services")) {
    if (!Array.isArray(body.services)) errors.services = "Services must be a list";
  }
  return errors;
}

const ALLOWED_FIELDS = [
  "name",
  "phone",
  "email",
  "photoUrl",
  "visibility",
  "availability",
  "services",
  "notes",
];

// Admin: list employees (search + filter)
router.get("/", requireAuth, async (req, res) => {
  const { q, visibility, availability } = req.query;
  const filter = {};
  if (visibility) filter.visibility = visibility;
  if (availability) filter.availability = availability;
  if (q) {
    filter.$or = [
      { name: new RegExp(q, "i") },
      { email: new RegExp(q, "i") },
      { phone: new RegExp(q, "i") },
    ];
  }

  const items = await Employee.find(filter).sort({ createdAt: -1 });
  res.json({ items, total: items.length });
});

// Admin: get a single employee
router.get("/:id", requireAuth, async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ error: "Employee not found" });
  res.json(employee);
});

// Admin: create an employee
router.post("/", requireAuth, async (req, res) => {
  const errors = validateEmployeeInput(req.body || {});
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const payload = {};
  for (const key of ALLOWED_FIELDS) {
    if (req.body[key] !== undefined) payload[key] = req.body[key];
  }

  try {
    const employee = await Employee.create(payload);
    res.status(201).json(employee);
  } catch (err) {
    console.error("Failed to create employee:", err);
    res.status(500).json({ error: "Failed to create employee" });
  }
});

// Admin: update an employee
router.patch("/:id", requireAuth, async (req, res) => {
  const errors = validateEmployeeInput(req.body || {}, { partial: true });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const updates = {};
  for (const key of ALLOWED_FIELDS) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  const employee = await Employee.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!employee) return res.status(404).json({ error: "Employee not found" });
  res.json(employee);
});

// Admin: delete an employee
router.delete("/:id", requireAuth, async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ error: "Employee not found" });
  res.json({ ok: true });
});

module.exports = router;
