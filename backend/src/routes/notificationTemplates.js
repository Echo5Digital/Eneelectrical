const express = require("express");
const NotificationTemplate = require("../models/NotificationTemplate");
const requireAuth = require("../middleware/auth");

const router = express.Router();

const STATUSES = ["approved", "pending", "cancelled"];

// Admin: list all templates
router.get("/", requireAuth, async (req, res) => {
  const items = await NotificationTemplate.find({}).sort({ status: 1 });
  res.json({ items });
});

// Admin: get a single template by status
router.get("/:status", requireAuth, async (req, res) => {
  if (!STATUSES.includes(req.params.status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  const template = await NotificationTemplate.findOne({ status: req.params.status });
  if (!template) return res.status(404).json({ error: "Template not found" });
  res.json(template);
});

// Admin: update a template's subject/body/enabled
router.patch("/:status", requireAuth, async (req, res) => {
  if (!STATUSES.includes(req.params.status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const updates = {};
  if (req.body.subject !== undefined) {
    if (!String(req.body.subject).trim()) {
      return res.status(400).json({ errors: { subject: "Subject is required" } });
    }
    updates.subject = req.body.subject;
  }
  if (req.body.body !== undefined) {
    if (!String(req.body.body).trim()) {
      return res.status(400).json({ errors: { body: "Message body is required" } });
    }
    updates.body = req.body.body;
  }
  if (req.body.enabled !== undefined) {
    updates.enabled = !!req.body.enabled;
  }

  const template = await NotificationTemplate.findOneAndUpdate(
    { status: req.params.status },
    updates,
    { new: true, runValidators: true }
  );
  if (!template) return res.status(404).json({ error: "Template not found" });
  res.json(template);
});

module.exports = router;
