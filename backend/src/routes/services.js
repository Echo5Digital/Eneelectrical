const express = require("express");
const Service = require("../models/Service");
const requireAuth = require("../middleware/auth");

const router = express.Router();

const CATEGORIES = ["Residential", "Commercial"];
const VISIBILITY_VALUES = ["visible", "hidden"];

function validateServiceInput(body, { partial = false } = {}) {
  const errors = {};
  const has = (key) => body[key] !== undefined;

  if (!partial || has("name")) {
    if (!body.name || !String(body.name).trim()) errors.name = "Service name is required";
  }
  if (!partial || has("category")) {
    if (!CATEGORIES.includes(body.category)) errors.category = "Invalid category";
  }
  if (has("durationMinutes")) {
    if (typeof body.durationMinutes !== "number" || body.durationMinutes < 0)
      errors.durationMinutes = "Duration must be a positive number";
  }
  if (has("price")) {
    if (typeof body.price !== "number" || body.price < 0) errors.price = "Price must be a positive number";
  }
  if (has("visibility")) {
    if (!VISIBILITY_VALUES.includes(body.visibility)) errors.visibility = "Invalid visibility";
  }
  return errors;
}

const ALLOWED_FIELDS = ["name", "category", "durationMinutes", "price", "description", "visibility"];

// Public: list visible services (consumed by the site's appointment wizard)
router.get("/", async (req, res) => {
  const items = await Service.find({ visibility: "visible" }).sort({ category: 1, name: 1 });
  res.json({ items, total: items.length });
});

// Admin: list all services regardless of visibility
router.get("/admin", requireAuth, async (req, res) => {
  const { q, category, visibility } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (visibility) filter.visibility = visibility;
  if (q) filter.name = new RegExp(q, "i");

  const items = await Service.find(filter).sort({ category: 1, name: 1 });
  res.json({ items, total: items.length });
});

// Admin: get a single service
router.get("/:id", requireAuth, async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json(service);
});

// Admin: create a service
router.post("/", requireAuth, async (req, res) => {
  const errors = validateServiceInput(req.body || {});
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const payload = {};
  for (const key of ALLOWED_FIELDS) {
    if (req.body[key] !== undefined) payload[key] = req.body[key];
  }

  try {
    const service = await Service.create(payload);
    res.status(201).json(service);
  } catch (err) {
    console.error("Failed to create service:", err);
    res.status(500).json({ error: "Failed to create service" });
  }
});

// Admin: update a service
router.patch("/:id", requireAuth, async (req, res) => {
  const errors = validateServiceInput(req.body || {}, { partial: true });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const updates = {};
  for (const key of ALLOWED_FIELDS) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  const service = await Service.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json(service);
});

// Admin: delete a service
router.delete("/:id", requireAuth, async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json({ ok: true });
});

module.exports = router;
