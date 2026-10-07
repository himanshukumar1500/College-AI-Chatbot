const express = require("express");
const {
  sendMessage,
  createConversation,
  getConversations,
  getConversation,
  clearConversation,
  deleteConversation,
} = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect); // every chat route requires a logged-in user

router.post("/", sendMessage);
router.post("/conversations", createConversation);
router.get("/conversations", getConversations);
router.get("/conversations/:id", getConversation);
router.put("/conversations/:id/clear", clearConversation);
router.delete("/conversations/:id", deleteConversation);

module.exports = router;
