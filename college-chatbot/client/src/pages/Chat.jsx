import { useCallback, useEffect, useState } from "react";
import api, { getErrorMessage } from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";

// Owns all chat state: the conversation list, the open conversation and its messages.
export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null); // null = a brand-new, unsaved conversation
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadConversations = useCallback(async () => {
    try {
      const res = await api.get("/chat/conversations");
      setConversations(res.data.conversations);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const newConversation = () => {
    setActiveId(null);
    setMessages([]);
    setError("");
    setSidebarOpen(false);
  };

  const openConversation = async (id) => {
    setSidebarOpen(false);
    setError("");
    setActiveId(id);
    setLoadingMessages(true);
    try {
      const res = await api.get(`/chat/conversations/${id}`);
      setMessages(res.data.conversation.messages);
    } catch (err) {
      setError(getErrorMessage(err));
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Returns true on success so ChatWindow knows whether to keep the typed text.
  const sendMessage = async (text) => {
    setError("");
    setSending(true);
    // Show the student's message immediately (optimistic update).
    setMessages((prev) => [...prev, { role: "user", content: text, timestamp: new Date().toISOString() }]);
    try {
      const res = await api.post("/chat", { message: text, conversationId: activeId || undefined });
      setMessages((prev) => [...prev, res.data.reply]);
      setActiveId(res.data.conversationId);
      loadConversations();
      return true;
    } catch (err) {
      setMessages((prev) => prev.slice(0, -1)); // undo the optimistic message
      setError(getErrorMessage(err));
      return false;
    } finally {
      setSending(false);
    }
  };

  const deleteConversation = async (id) => {
    if (!window.confirm("Delete this conversation? This cannot be undone.")) return;
    try {
      await api.delete(`/chat/conversations/${id}`);
      setConversations((prev) => prev.filter((c) => c._id !== id));
      if (id === activeId) newConversation();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const clearChat = async () => {
    if (!window.confirm("Clear all messages in this chat?")) return;
    if (!activeId) {
      setMessages([]);
      return;
    }
    try {
      await api.put(`/chat/conversations/${activeId}/clear`);
      setMessages([]);
      loadConversations();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="app-shell">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="chat-layout">
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          open={sidebarOpen}
          disabled={sending}
          onSelect={openConversation}
          onNew={newConversation}
          onDelete={deleteConversation}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="chat-main">
          <ChatWindow
            messages={messages}
            sending={sending}
            loadingMessages={loadingMessages}
            error={error}
            onSend={sendMessage}
            onClear={clearChat}
            onDismissError={() => setError("")}
          />
        </main>
      </div>
    </div>
  );
}
