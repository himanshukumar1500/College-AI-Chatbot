// MongoDB connection using Mongoose.
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing. Add it to server/.env");
  }
  try {
    // Fail fast (8s) instead of hanging forever when the database is unreachable.
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    throw new Error(
      `Could not connect to MongoDB (${err.message}). ` +
        "Check MONGO_URI, your internet connection and (for Atlas) the IP access list."
    );
  }
}

module.exports = connectDB;
