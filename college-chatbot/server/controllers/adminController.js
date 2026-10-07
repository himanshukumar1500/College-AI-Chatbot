const mongoose = require("mongoose");
const User = require("../models/User");
const CollegeInfo = require("../models/CollegeInfo");
const { httpError, asyncHandler } = require("../middleware/errorMiddleware");

// Validates and cleans the body for create/update of a CollegeInfo entry.
function cleanInfoBody(body = {}) {
  const { category, question, answer } = body;
  let { keywords } = body;

  if (!category || !CollegeInfo.CATEGORIES.includes(category)) {
    throw httpError(400, `Category must be one of: ${CollegeInfo.CATEGORIES.join(", ")}.`);
  }
  if (typeof question !== "string" || !question.trim()) throw httpError(400, "Question is required.");
  if (typeof answer !== "string" || !answer.trim()) throw httpError(400, "Answer is required.");

  // Accept "a, b, c" or ["a","b","c"]
  if (typeof keywords === "string") keywords = keywords.split(",");
  if (!Array.isArray(keywords)) keywords = [];
  keywords = [...new Set(keywords.map((k) => String(k).trim().toLowerCase()).filter(Boolean))];

  return { category, question: question.trim(), answer: answer.trim(), keywords };
}

function checkId(id) {
  if (!mongoose.isValidObjectId(id)) throw httpError(400, "Invalid id.");
}

// GET /api/admin/users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }); // password is select:false
  res.json({ count: users.length, users });
});

// GET /api/admin/college-info?category=Hostel
exports.getCollegeInfo = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = String(req.query.category);
  const items = await CollegeInfo.find(filter).sort({ category: 1, createdAt: 1 });
  res.json({ count: items.length, categories: CollegeInfo.CATEGORIES, items });
});

// POST /api/admin/college-info
exports.createCollegeInfo = asyncHandler(async (req, res) => {
  const item = await CollegeInfo.create(cleanInfoBody(req.body));
  res.status(201).json({ item });
});

// PUT /api/admin/college-info/:id
exports.updateCollegeInfo = asyncHandler(async (req, res) => {
  checkId(req.params.id);
  const item = await CollegeInfo.findByIdAndUpdate(req.params.id, cleanInfoBody(req.body), {
    new: true,
    runValidators: true,
  });
  if (!item) throw httpError(404, "College info entry not found.");
  res.json({ item });
});

// DELETE /api/admin/college-info/:id
exports.deleteCollegeInfo = asyncHandler(async (req, res) => {
  checkId(req.params.id);
  const item = await CollegeInfo.findByIdAndDelete(req.params.id);
  if (!item) throw httpError(404, "College info entry not found.");
  res.json({ message: "College info entry deleted." });
});
