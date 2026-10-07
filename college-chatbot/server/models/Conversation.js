const mongoose = require("mongoose");

// A message embedded inside a conversation.
const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, default: "New conversation", trim: true, maxlength: 80 },
    messages: [messageSchema],
  },
  { timestamps: true } // adds createdAt + updatedAt
);

module.exports = mongoose.model("Conversation", conversationSchema);
