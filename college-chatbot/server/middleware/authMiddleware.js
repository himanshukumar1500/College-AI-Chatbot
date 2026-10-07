const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { httpError, asyncHandler } = require("./errorMiddleware");

// Requires "Authorization: Bearer <token>". Attaches the user to req.user.
const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) {
    throw httpError(401, "Not authorized. Please log in.");
  }
  const token = header.split(" ")[1];
  // Throws JsonWebTokenError / TokenExpiredError -> handled in errorHandler
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw httpError(401, "This account no longer exists.");
  req.user = user;
  next();
});

// Use after `protect`: only admins may continue.
function adminOnly(req, res, next) {
  if (req.user && req.user.role === "admin") return next();
  next(httpError(403, "Admin access required."));
}

module.exports = { protect, adminOnly };
