const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { seedCollegeInfo, seedAdmin } = require("./config/seed");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// CORS: only the configured frontend origin(s) may call the API from a browser.
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map((o) => o.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  // Refuse to start with missing critical configuration.
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing. Copy server/.env.example to server/.env and fill it in.");
    process.exit(1);
  }
  if (!process.env.OPENAI_API_KEY) {
    console.warn("Warning: OPENAI_API_KEY is not set. Login works, but chat answers will fail until you add it.");
  }

  try {
    await connectDB();
    await seedCollegeInfo(); // only inserts when the collection is empty
    await seedAdmin(); // only when ADMIN_EMAIL / ADMIN_PASSWORD are set
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

start();
