import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getErrorMessage } from "../services/api.js";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Quick checks in the browser; the server validates again.
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      navigate("/chat");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <div className="auth-brand">
          <span className="brand-mark" aria-hidden="true" />
          College AI Chatbot
        </div>
        <h1>Create your account</h1>
        <p className="auth-sub">It takes a minute. Your chats are saved so you can continue them later.</p>

        {error && <div className="alert alert-error" role="alert">{error}</div>}

        <label className="field">
          <span>Full name</span>
          <input type="text" value={form.name} onChange={update("name")} autoComplete="name" required />
        </label>
        <label className="field">
          <span>Email</span>
          <input type="email" value={form.email} onChange={update("email")} autoComplete="email" required />
        </label>
        <label className="field">
          <span>Password (at least 6 characters)</span>
          <input type="password" value={form.password} onChange={update("password")} autoComplete="new-password" required />
        </label>
        <label className="field">
          <span>Confirm password</span>
          <input type="password" value={form.confirm} onChange={update("confirm")} autoComplete="new-password" required />
        </label>

        <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
        </button>
        <p className="auth-switch">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}
