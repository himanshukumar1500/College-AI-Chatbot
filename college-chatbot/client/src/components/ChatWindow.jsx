import { useEffect, useRef, useState } from "react";
import ChatMessage, { TypingIndicator } from "./ChatMessage.jsx";
import Loading from "./Loading.jsx";

const SUGGESTED_QUESTIONS = [
  "How can I apply for admission?",
  "What are the library timings?",
  "Tell me about CSE department.",
  "What documents are required?",
  "Where is the hostel?",
  "What are the exam rules?",
];

const MAX_LENGTH = 1000;

export default function ChatWindow({ messages, sending, loadingMessages, error, onSend, onClear, onDismissError }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Always scroll to the newest message.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  const submit = async (text) => {
    const question = text.trim();
    if (!question || sending) return;
    setInput("");
    const ok = await onSend(question);
    if (!ok) setInput(question); // put the text back so the student can retry
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(input);
  };

  // Enter sends, Shift+Enter adds a new line.
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <section className="chat-window">
      <div className="chat-header">
        <h1>Ask about your college</h1>
        {!isEmpty && (
          <button className="btn btn-ghost btn-small" onClick={onClear} disabled={sending}>
            Clear chat
          </button>
        )}
      </div>

      <div className="chat-messages">
        {loadingMessages ? (
          <Loading label="Loading conversation..." />
        ) : isEmpty ? (
          <div className="welcome">
            <h2>What would you like to know?</h2>
            <p>
              Ask about admissions, courses, exams, fees, the library or the hostel. Answers come from the college
              information added by the administration.
            </p>
            <div className="suggestions">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button key={q} className="chip" onClick={() => submit(q)} disabled={sending}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => <ChatMessage key={m._id || `${m.role}-${i}`} message={m} />)
        )}
        {sending && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="alert alert-error chat-error" role="alert">
          <span>{error}</span>
          <button className="icon-btn" onClick={onDismissError} aria-label="Dismiss error">
            ✕
          </button>
        </div>
      )}

      <form className="chat-input" onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          rows={1}
          maxLength={MAX_LENGTH}
          aria-label="Your question"
        />
        <button className="btn btn-primary" type="submit" disabled={sending || !input.trim()}>
          Send
        </button>
      </form>
    </section>
  );
}
