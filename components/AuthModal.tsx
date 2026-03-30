"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";

interface Props { open: boolean; onClose: () => void; onLogin: (u: string) => void; }

const inputStyle: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12, padding: "13px 16px", color: "#fff", fontSize: "0.9rem",
};
const labelStyle: React.CSSProperties = { fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: 6 };

export default function AuthModal({ open, onClose, onLogin }: Props) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const getUsers = () => typeof window !== "undefined" ? JSON.parse(localStorage.getItem("wa_users") || "[]") : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const users = getUsers();
    if (mode === "signup") {
      if (!form.username || !form.email || !form.password) return setError("Fill all fields.");
      if (form.password.length < 6) return setError("Password must be at least 6 characters.");
      if (users.find((u: { username: string }) => u.username === form.username)) return setError("Username already taken.");
      localStorage.setItem("wa_users", JSON.stringify([...users, form]));
      onLogin(form.username);
    } else {
      const user = users.find((u: { username: string; password: string }) => u.username === form.username && u.password === form.password);
      if (!user) return setError("Invalid username or password.");
      onLogin(form.username);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <motion.div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }} />
          <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
            style={{ position: "relative", background: "rgba(10,15,30,0.97)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "36px 32px", width: "100%", maxWidth: 420, boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>

            <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={18} />
            </button>

            {/* Mode tabs */}
            <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.05)", borderRadius: 999, padding: 4, marginBottom: 28 }}>
              {(["login", "signup"] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setError(""); }}
                  style={{ flex: 1, padding: "10px", borderRadius: 999, border: "none", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", transition: "all 0.25s", background: mode === m ? "linear-gradient(135deg,#8e2157,#c0396e)" : "transparent", color: mode === m ? "#fff" : "rgba(255,255,255,0.45)" }}>
                  {m === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelStyle}>Username</label>
                <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="Enter username" style={inputStyle} />
              </div>
              {mode === "signup" && (
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Enter email" style={inputStyle} />
                </div>
              )}
              <div style={{ position: "relative" }}>
                <label style={labelStyle}>Password</label>
                <input type={showPass ? "text" : "password"} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter password" style={{ ...inputStyle, paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: 14, bottom: 13, background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", alignItems: "center" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && <p style={{ color: "#f87171", fontSize: "0.85rem" }}>{error}</p>}
              <button type="submit" style={{ background: "linear-gradient(135deg,#8e2157,#c0396e)", border: "none", borderRadius: 12, padding: "14px", color: "#fff", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", marginTop: 4, transition: "opacity 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                {mode === "login" ? "Login" : "Create Account"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
