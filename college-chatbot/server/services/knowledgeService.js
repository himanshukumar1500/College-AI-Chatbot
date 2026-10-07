// Finds the college entries most relevant to a student's question.
// Simple keyword scoring - easy to understand and explain. For a very large
// knowledge base you could replace this with a MongoDB text index or embeddings.
const CollegeInfo = require("../models/CollegeInfo");

const STOP_WORDS = new Set([
  "the", "and", "for", "are", "what", "when", "where", "which", "who", "how", "can", "does", "you",
  "your", "with", "about", "tell", "from", "that", "this", "have", "has", "will", "there", "their",
  "please", "any", "get", "give", "need", "want", "know", "its", "our", "was", "were", "but", "not",
]);

// "Hostel timings?" -> ["hostel", "timing"]
function tokenize(text) {
  return String(text)
    .toLowerCase()
    .split(/[^a-z0-9.+%]+/)
    .map((w) => w.replace(/^[.+%]+|[.+%]+$/g, ""))
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w));
}

function scoreEntry(entry, tokens, rawText) {
  let score = 0;
  const keywords = (entry.keywords || []).map((k) => k.toLowerCase());
  const questionText = entry.question.toLowerCase();
  const category = entry.category.toLowerCase();
  const answerText = entry.answer.toLowerCase();

  // Whole keyword phrases found in the text (e.g. "id card") are a strong signal.
  for (const k of keywords) if (rawText.includes(k)) score += 3;

  for (const t of tokens) {
    if (keywords.some((k) => k.includes(t))) score += 2;
    if (questionText.includes(t)) score += 2;
    if (category.includes(t)) score += 2;
    if (answerText.includes(t)) score += 1;
  }
  return score;
}

/**
 * @param {string} text  current question (+ previous question for follow-ups)
 * @param {number} limit max entries to return
 */
async function findRelevantInfo(text, limit = 6) {
  const entries = await CollegeInfo.find().lean();
  const tokens = [...new Set(tokenize(text))];
  const rawText = text.toLowerCase();
  if (tokens.length === 0) return [];

  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, tokens, rawText) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.entry);
}

module.exports = { findRelevantInfo, tokenize };
