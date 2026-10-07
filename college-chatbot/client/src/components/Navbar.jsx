import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// onMenuClick is only passed on the chat page (opens the sidebar on mobile).
export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        {onMenuClick && (
          <button className="icon-btn menu-btn" onClick={onMenuClick} aria-label="Open conversations">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          </button>
        )}
        <Link to="/chat" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          College AI Chatbot
        </Link>
      </div>

      <nav className="navbar-right">
        {user?.role === "admin" && (
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        )}
        <span className="nav-user" title={user?.email}>
          {user?.name}
        </span>
        <button className="btn btn-ghost btn-small" onClick={handleLogout}>
          Log out
        </button>
      </nav>
    </header>
  );
}
