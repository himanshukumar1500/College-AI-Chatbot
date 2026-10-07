import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Loading from "./components/Loading.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Chat from "./pages/Chat.jsx";
import Admin from "./pages/Admin.jsx";

// Only logged-in users may see the page; adminOnly also requires role "admin".
function Protected({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading fullPage label="Loading..." />;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/chat" replace />;
  return children;
}

// Login/Register pages are skipped when already logged in.
function GuestOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading fullPage label="Loading..." />;
  if (user) return <Navigate to="/chat" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
      <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />
      <Route path="/chat" element={<Protected><Chat /></Protected>} />
      <Route path="/admin" element={<Protected adminOnly><Admin /></Protected>} />
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}
