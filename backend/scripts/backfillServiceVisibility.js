require("dotenv").config();
const mongoose = require("mongoose");

async function backfill() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db;
  const collection = db.collection("services");

  const missingVisibility = await collection.find({ visibility: { $exists: false } }).toArray();
  console.log(`Found ${missingVisibility.length} documents missing 'visibility'`);

  for (const doc of missingVisibility) {
    const visibility = doc.visible === false ? "hidden" : "visible";
    await collection.updateOne(
      { _id: doc._id },
      { $set: { visibility }, $unset: { visible: "" } }
    );
    console.log(`Updated ${doc.name} (${doc.category}) -> visibility: ${visibility}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

backfill().catch((err) => {
  console.error(err);
  process.exit(1);
});
