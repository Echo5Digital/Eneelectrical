require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../src/models/Service");

const SEED_SERVICES = [
  { name: "Electrical Repair & Installation", category: "Residential", durationMinutes: 330, price: 0 },
  { name: "EV Charger Installation", category: "Residential", durationMinutes: 180, price: 0 },
  { name: "Generator Installation", category: "Residential", durationMinutes: 270, price: 0 },
  { name: "New Construction Wiring", category: "Residential", durationMinutes: 180, price: 0 },
  { name: "Panel Upgrades", category: "Residential", durationMinutes: 240, price: 0 },
  { name: "Recessed LED Lighting", category: "Residential", durationMinutes: 150, price: 0 },
  { name: "Commercial Electrical Repair", category: "Commercial", durationMinutes: 330, price: 0 },
  { name: "Commercial Panel Upgrades", category: "Commercial", durationMinutes: 240, price: 0 },
  { name: "Commercial Lighting Installation", category: "Commercial", durationMinutes: 180, price: 0 },
  { name: "Commercial Wiring & Rewiring", category: "Commercial", durationMinutes: 300, price: 0 },
  { name: "Commercial Generator Installation", category: "Commercial", durationMinutes: 300, price: 0 },
  { name: "Commercial Electrical Inspection", category: "Commercial", durationMinutes: 120, price: 0 },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  for (const service of SEED_SERVICES) {
    const existing = await Service.findOne({ name: service.name, category: service.category });
    if (existing) {
      console.log(`Skipping existing: ${service.name}`);
      continue;
    }
    await Service.create(service);
    console.log(`Created: ${service.name}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
