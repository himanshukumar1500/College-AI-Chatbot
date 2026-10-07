// Lists past conversations. On mobile it slides in over the chat.
export default function Sidebar({ conversations, activeId, open, disabled, onSelect, onNew, onDelete, onClose }) {
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={open ? "sidebar sidebar-open" : "sidebar"} aria-label="Conversations">
        <div className="sidebar-top">
          <button className="btn btn-primary btn-block" onClick={onNew} disabled={disabled}>
            + New conversation
          </button>
          <button className="icon-btn sidebar-close" onClick={onClose} aria-label="Close conversations">
            ✕
          </button>
        </div>

        <h2 className="sidebar-heading">Previous conversations</h2>

        {conversations.length === 0 ? (
          <p className="sidebar-empty">No conversations yet. Ask your first question to begin.</p>
        ) : (
          <ul className="conversation-list">
            {conversations.map((c) => (
              <li key={c._id} className={c._id === activeId ? "conversation-item active" : "conversation-item"}>
                <button className="conversation-title" onClick={() => onSelect(c._id)} disabled={disabled} title={c.title}>
                  {c.title}
                </button>
                <button
                  className="icon-btn conversation-delete"
                  onClick={() => onDelete(c._id)}
                  disabled={disabled}
                  aria-label={`Delete conversation ${c.title}`}
                  title="Delete"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
}
