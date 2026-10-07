// Seeds demo college data and (optionally) an admin account.
// - Runs automatically on server start when the collection is empty / admin is configured.
// - Run `npm run seed` (from server/) to RESET the knowledge base to the sample data.
const path = require("path");
const User = require("../models/User");
const CollegeInfo = require("../models/CollegeInfo");
const collegeData = require("../data/collegeData");

async function seedCollegeInfo({ force = false } = {}) {
  const count = await CollegeInfo.countDocuments();
  if (count > 0 && !force) return;
  if (force) await CollegeInfo.deleteMany({});
  await CollegeInfo.insertMany(collegeData);
  console.log(`Seeded ${collegeData.length} sample college entries`);
}

async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;
  if (ADMIN_PASSWORD.length < 6) {
    console.warn("ADMIN_PASSWORD must be at least 6 characters. Admin not created.");
    return;
  }
  const email = ADMIN_EMAIL.toLowerCase().trim();
  const existing = await User.findOne({ email });
  if (existing) return;
  await User.create({ name: "Administrator", email, password: ADMIN_PASSWORD, role: "admin" });
  console.log(`Admin account created: ${email}`);
}

module.exports = { seedCollegeInfo, seedAdmin };

// Allow: node config/seed.js  (force-resets the knowledge base)
if (require.main === module) {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
  const connectDB = require("./db");
  const mongoose = require("mongoose");
  (async () => {
    try {
      await connectDB();
      await seedCollegeInfo({ force: true });
      await seedAdmin();
    } catch (err) {
      console.error(err.message);
      process.exitCode = 1;
    } finally {
      await mongoose.disconnect();
    }
  })();
}
