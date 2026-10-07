const mongoose = require("mongoose");

// Single source of truth for categories (also sent to the admin UI).
const CATEGORIES = [
  "Admissions",
  "Academics",
  "CSE Department",
  "Examination",
  "Library",
  "Hostel",
  "Fees",
  "Campus",
  "Student Services",
  "Contact",
];

const collegeInfoSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, enum: CATEGORIES },
    question: { type: String, required: true, trim: true, maxlength: 300 },
    answer: { type: String, required: true, trim: true, maxlength: 3000 },
    keywords: { type: [String], default: [] },
  },
  { timestamps: true }
);

const CollegeInfo = mongoose.model("CollegeInfo", collegeInfoSchema);
CollegeInfo.CATEGORIES = CATEGORIES;
module.exports = CollegeInfo;
