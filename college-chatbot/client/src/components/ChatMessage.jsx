// One message bubble. Student messages are on the right, AI messages on the left.
function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={isUser ? "message-row message-user" : "message-row message-ai"}>
      <div className="avatar" aria-hidden="true">
        {isUser ? "You" : "AI"}
      </div>
      <div className="bubble">
        <p className="bubble-text">{message.content}</p>
        <time className="bubble-time">{formatTime(message.timestamp)}</time>
      </div>
    </div>
  );
}

// Animated dots shown while the AI is "thinking".
export function TypingIndicator() {
  return (
    <div className="message-row message-ai" role="status" aria-label="The assistant is typing">
      <div className="avatar" aria-hidden="true">AI</div>
      <div className="bubble typing">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}
