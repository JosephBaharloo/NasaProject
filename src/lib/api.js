// src/services/api.js
export const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:8000";

export async function chat(messages) {
  // basit session id
  const sessionId =
    localStorage.getItem("session_id") ||
    (() => {
      const id = crypto.randomUUID();
      localStorage.setItem("session_id", id);
      return id;
    })();

  const res = await fetch(${API_BASE}/chat, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, messages, meta: { source: "aura" } }),
  });

  let text;
  try { text = await res.text(); } catch {}
  if (!res.ok) {
    throw new Error(text || HTTP ${res.status});
  }
  try {
    return JSON.parse(text); // { reply: "..." }
  } catch {
    throw new Error("Invalid JSON from /chat: " + (text ?? ""));
  }
}