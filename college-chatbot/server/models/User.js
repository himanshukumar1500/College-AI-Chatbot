const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  // select:false -> the hash is never returned unless explicitly requested
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  createdAt: { type: Date, default: Date.now },
});

// Hash the password before saving (only when it was set/changed).
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare a plain-text password with the stored hash.
userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", userSchema);
