// All communication with OpenAI lives here. The API key stays on the server.
const OpenAI = require("openai");
const { httpError } = require("../middleware/errorMiddleware");

let client = null;

// Create the client lazily so the server can still start (and show a clear
// error on chat requests) if the key has not been configured yet.
function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw httpError(503, "The AI service is not configured. Ask the administrator to set OPENAI_API_KEY.");
  }
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

// Builds the system prompt: behaviour rules + the college information found for this question.
function buildSystemPrompt(contextEntries) {
  const collegeName = process.env.COLLEGE_NAME || "the college";

  const context = contextEntries.length
    ? contextEntries
        .map((e, i) => `${i + 1}. [${e.category}] Q: ${e.question}\n   A: ${e.answer}`)
        .join("\n")
    : "(No matching college information was found for this question.)";

  return `You are an AI assistant for ${collegeName}. Answer student questions using the available college information below.

Rules:
- Use ONLY the college information provided below for official facts. Do not invent college policies, fees, timings, faculty information, dates, phone numbers or other official information.
- If the information is unavailable or incomplete, clearly tell the student that the information is not available and suggest contacting the college administration.
- Use the earlier messages in the conversation to understand follow-up questions (for example, "What about weekends?" refers to the topic just discussed).
- If a question is ambiguous, ask one short clarifying question.
- Keep responses clear, helpful, concise and student-friendly. Use plain text (short sentences or simple "-" lists); do not use Markdown headings or tables.
- If the student greets you, greet them back and offer to help with college questions. If a question is unrelated to the college, politely say you can only help with college-related topics.
- Some entries may be marked [Sample]; treat them as the available information.

College information:
${context}`;
}

/**
 * @param {Array<{role:string, content:string}>} history previous messages (oldest first)
 * @param {string} userMessage the new question
 * @param {Array} contextEntries relevant CollegeInfo documents
 * @returns {Promise<string>} the assistant's reply text
 */
async function generateReply(history, userMessage, contextEntries) {
  const openai = getClient();
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  // Keep only the last 10 messages to control cost and stay within token limits.
  const recent = history.slice(-10).map((m) => ({ role: m.role, content: m.content }));

  let completion;
  try {
    completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: buildSystemPrompt(contextEntries) },
        ...recent,
        { role: "user", content: userMessage },
      ],
    });
  } catch (err) {
    // Only OpenAI/network failures can reach this catch block.
    console.error("OpenAI error:", err.status || "", err.message);
    if (err.status === 401) throw httpError(502, "The AI service rejected the API key. Please contact the administrator.");
    if (err.status === 429) throw httpError(429, "The AI service is busy or out of quota. Please try again in a moment.");
    if (err.status === 404) throw httpError(502, `The AI model "${model}" is not available for this API key.`);
    if (err.status) throw httpError(502, "The AI service is temporarily unavailable. Please try again.");
    throw httpError(502, "Could not reach the AI service. Please check the server's internet connection.");
  }

  const text = completion.choices?.[0]?.message?.content?.trim();
  if (!text) throw httpError(502, "The AI returned an empty response. Please try again.");
  return text;
}

module.exports = { generateReply, buildSystemPrompt };
