const express = require("express");
const {
  getUsers,
  getCollegeInfo,
  createCollegeInfo,
  updateCollegeInfo,
  deleteCollegeInfo,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, adminOnly); // logged in AND role === "admin"

router.get("/users", getUsers);
router.get("/college-info", getCollegeInfo);
router.post("/college-info", createCollegeInfo);
router.put("/college-info/:id", updateCollegeInfo);
router.delete("/college-info/:id", deleteCollegeInfo);

module.exports = router;
