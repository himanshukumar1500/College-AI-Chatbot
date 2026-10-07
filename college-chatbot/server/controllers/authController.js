const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { httpError, asyncHandler } = require("../middleware/errorMiddleware");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Creates a signed JWT containing only the user id.
function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

// Shape of the user object we send to the client (never includes the password).
function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

// POST /api/auth/register  -> always creates a *student* account
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) throw httpError(400, "Name, email and password are all required.");
  if (typeof name !== "string" || name.trim().length < 2) throw httpError(400, "Name must be at least 2 characters.");
  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) throw httpError(400, "Please enter a valid email address.");
  if (typeof password !== "string" || password.length < 6) throw httpError(400, "Password must be at least 6 characters.");

  const exists = await User.findOne({ email: email.trim().toLowerCase() });
  if (exists) throw httpError(409, "An account with this email already exists.");

  // Role is NOT taken from the request body, so nobody can register as admin.
  const user = await User.create({ name: name.trim(), email: email.trim(), password });
  res.status(201).json({ token: signToken(user._id), user: publicUser(user) });
});

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) throw httpError(400, "Email and password are required.");
  if (typeof email !== "string" || typeof password !== "string") throw httpError(400, "Invalid email or password.");

  // password has select:false, so ask for it explicitly
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
  // Same message for "no user" and "wrong password" so attackers can't tell which emails exist.
  if (!user || !(await user.matchPassword(password))) throw httpError(401, "Invalid email or password.");

  res.json({ token: signToken(user._id), user: publicUser(user) });
});

// GET /api/auth/me
exports.getMe = asyncHandler(async (req, res) => {
  res.json({ user: publicUser(req.user) });
});
