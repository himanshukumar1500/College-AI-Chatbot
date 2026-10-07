import { useCallback, useEffect, useMemo, useState } from "react";
import api, { getErrorMessage } from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
import Loading from "../components/Loading.jsx";

const EMPTY_FORM = { category: "", question: "", answer: "", keywords: "" };

export default function Admin() {
  const [tab, setTab] = useState("knowledge"); // "knowledge" | "users"
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [filterCategory, setFilterCategory] = useState("");
  const [search, setSearch] = useState("");

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [infoRes, usersRes] = await Promise.all([api.get("/admin/college-info"), api.get("/admin/users")]);
      setItems(infoRes.data.items);
      setCategories(infoRes.data.categories);
      setUsers(usersRes.data.users);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      category: item.category,
      question: item.question,
      answer: item.answer,
      keywords: (item.keywords || []).join(", "),
    });
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!form.category || !form.question.trim() || !form.answer.trim()) {
      setError("Category, question and answer are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/admin/college-info/${editingId}`, form);
        setNotice("Entry updated.");
      } else {
        await api.post("/admin/college-info", form);
        setNotice("Entry added.");
      }
      resetForm();
      await loadAll();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.question}"?`)) return;
    setError("");
    setNotice("");
    try {
      await api.delete(`/admin/college-info/${item._id}`);
      if (editingId === item._id) resetForm();
      setNotice("Entry deleted.");
      await loadAll();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const visibleItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((item) => {
      if (filterCategory && item.category !== filterCategory) return false;
      if (!term) return true;
      return `${item.question} ${item.answer} ${(item.keywords || []).join(" ")}`.toLowerCase().includes(term);
    });
  }, [items, filterCategory, search]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="admin-page">
        <h1>Admin dashboard</h1>
        <p className="admin-sub">
          Manage what the chatbot knows about the college and see who has registered.
        </p>

        <div className="tabs" role="tablist">
          <button role="tab" aria-selected={tab === "knowledge"} className={tab === "knowledge" ? "tab active" : "tab"} onClick={() => setTab("knowledge")}>
            College information ({items.length})
          </button>
          <button role="tab" aria-selected={tab === "users"} className={tab === "users" ? "tab active" : "tab"} onClick={() => setTab("users")}>
            Users ({users.length})
          </button>
        </div>

        {error && <div className="alert alert-error" role="alert">{error}</div>}
        {notice && <div className="alert alert-success" role="status">{notice}</div>}

        {loading ? (
          <Loading label="Loading dashboard..." />
        ) : tab === "knowledge" ? (
          <>
            <form className="panel admin-form" onSubmit={handleSubmit}>
              <h2>{editingId ? "Edit entry" : "Add a question and answer"}</h2>
              <div className="form-grid">
                <label className="field">
                  <span>Category</span>
                  <select value={form.category} onChange={update("category")} required>
                    <option value="">Choose a category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Keywords (separate with commas)</span>
                  <input type="text" value={form.keywords} onChange={update("keywords")} placeholder="hostel, timing, gate, warden" />
                </label>
              </div>
              <label className="field">
                <span>Question</span>
                <input type="text" value={form.question} onChange={update("question")} maxLength={300} required />
              </label>
              <label className="field">
                <span>Answer</span>
                <textarea rows={4} value={form.answer} onChange={update("answer")} maxLength={3000} required />
              </label>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Save changes" : "Add entry"}
                </button>
                {editingId && (
                  <button className="btn btn-ghost" type="button" onClick={resetForm}>
                    Cancel editing
                  </button>
                )}
              </div>
            </form>

            <div className="filters">
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} aria-label="Filter by category">
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search entries..." aria-label="Search entries" />
            </div>

            {visibleItems.length === 0 ? (
              <p className="empty">No entries match. Add one using the form above.</p>
            ) : (
              <ul className="entry-list">
                {visibleItems.map((item) => (
                  <li key={item._id} className="entry">
                    <div className="entry-head">
                      <span className="tag">{item.category}</span>
                      <div className="entry-actions">
                        <button className="btn btn-ghost btn-small" onClick={() => startEdit(item)}>Edit</button>
                        <button className="btn btn-danger btn-small" onClick={() => handleDelete(item)}>Delete</button>
                      </div>
                    </div>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                    {item.keywords?.length > 0 && <p className="entry-keywords">Keywords: {item.keywords.join(", ")}</p>}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div className="panel table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={u.role === "admin" ? "tag tag-admin" : "tag"}>{u.role}</span>
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
