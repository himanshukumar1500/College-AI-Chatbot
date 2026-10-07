const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const { findRelevantInfo } = require("../services/knowledgeService");
const { generateReply } = require("../services/openaiService");
const { httpError, asyncHandler } = require("../middleware/errorMiddleware");

const MAX_MESSAGE_LENGTH = 1000;

// Finds a conversation that belongs to the logged-in user (or throws 404).
// Filtering by user stops students from reading each other's chats.
async function findOwnConversation(id, userId) {
  if (!mongoose.isValidObjectId(id)) throw httpError(400, "Invalid conversation id.");
  const conversation = await Conversation.findOne({ _id: id, user: userId });
  if (!conversation) throw httpError(404, "Conversation not found.");
  return conversation;
}

// POST /api/chat   body: { message, conversationId? }
// Sends a question to the AI. Creates a new conversation when conversationId is omitted.
exports.sendMessage = asyncHandler(async (req, res) => {
  const { message, conversationId } = req.body || {};

  if (typeof message !== "string" || message.trim().length === 0) throw httpError(400, "Message cannot be empty.");
  const text = message.trim();
  if (text.length > MAX_MESSAGE_LENGTH) throw httpError(400, `Message is too long (maximum ${MAX_MESSAGE_LENGTH} characters).`);

  let conversation = null;
  if (conversationId) conversation = await findOwnConversation(conversationId, req.user._id);

  const history = conversation ? conversation.messages : [];

  // For follow-ups like "What about weekends?" also search using the previous student question.
  const lastUserMessage = [...history].reverse().find((m) => m.role === "user");
  const searchText = lastUserMessage ? `${text} ${lastUserMessage.content}` : text;
  const contextEntries = await findRelevantInfo(searchText);

  // Ask the AI first; only save to the database if it succeeds.
  const replyText = await generateReply(history, text, contextEntries);

  if (!conversation) conversation = new Conversation({ user: req.user._id });
  if (conversation.messages.length === 0) conversation.title = text.slice(0, 50);
  conversation.messages.push({ role: "user", content: text });
  conversation.messages.push({ role: "assistant", content: replyText });
  await conversation.save();

  const saved = conversation.messages[conversation.messages.length - 1];
  res.json({
    conversationId: conversation._id,
    title: conversation.title,
    reply: { role: saved.role, content: saved.content, timestamp: saved.timestamp },
  });
});

// POST /api/chat/conversations  -> creates an empty conversation
exports.createConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.create({ user: req.user._id });
  res.status(201).json({ conversation });
});

// GET /api/chat/conversations  -> list (no messages), newest first
exports.getConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({ user: req.user._id })
    .select("title createdAt updatedAt")
    .sort({ updatedAt: -1 });
  res.json({ conversations });
});

// GET /api/chat/conversations/:id  -> one conversation with all messages
exports.getConversation = asyncHandler(async (req, res) => {
  const conversation = await findOwnConversation(req.params.id, req.user._id);
  res.json({ conversation });
});

// PUT /api/chat/conversations/:id/clear  -> removes messages but keeps the conversation
exports.clearConversation = asyncHandler(async (req, res) => {
  const conversation = await findOwnConversation(req.params.id, req.user._id);
  conversation.messages = [];
  conversation.title = "New conversation";
  await conversation.save();
  res.json({ conversation });
});

// DELETE /api/chat/conversations/:id
exports.deleteConversation = asyncHandler(async (req, res) => {
  const conversation = await findOwnConversation(req.params.id, req.user._id);
  await conversation.deleteOne();
  res.json({ message: "Conversation deleted." });
});
