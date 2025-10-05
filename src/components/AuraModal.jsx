// src/components/AuraModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, LoaderCircle } from "lucide-react";

// ENV'den API adresi (yoksa localhost:8000)
const API_BASE =
  (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) ||
  "http://localhost:8000";

export default function AuraModal({ isOpen, onClose, weatherContext }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);

  // İlk sefer session id
  useEffect(() => {
    if (!localStorage.getItem("session_id")) {
      localStorage.setItem("session_id", crypto.randomUUID());
    }
  }, []);

  // Otomatik scroll
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [response, error, isLoading, isOpen]);

  const handleAsk = async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setResponse("");
    setError("");

    // Sistem talimatı
    const systemInstruction =
      "You are Aura, a friendly, witty and empathetic AI weather assistant. Be concise and practical. Use the provided weather context.";

    // weatherContext string değilse güvenli stringe çevir
    const ctxText =
      typeof weatherContext === "string"
        ? weatherContext
        : JSON.stringify(weatherContext || {}, null, 2);

    // ⛔ Backtick YOK: Düz string birleştirme kullanıyoruz
    const userPrompt =
      "Given the current weather context:\n" +
      ctxText +
      "\n\nAnswer the user's question:\n" +
      '"' +
      query +
      '"';

    try {
      // /chat'e doğrudan POST
      const sessionId =
        localStorage.getItem("session_id") ||
        (function () {
          const id = crypto.randomUUID();
          localStorage.setItem("session_id", id);
          return id;
        })();

      const res = await fetch(API_BASE + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: userPrompt },
          ],
          meta: { source: "aura" },
        }),
      });

      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || "HTTP " + res.status);
      }
      let data;
      try {
        data = JSON.parse(text); // { reply: "...", usage: {...} }
      } catch (e) {
        throw new Error("Invalid JSON from /chat: " + text);
      }

      console.log("CHAT RESPONSE:", data);
      setResponse(data && data.reply ? data.reply : "No response.");
    } catch (e) {
      console.error("CHAT ERROR:", e);
      setError(e && e.message ? e.message : String(e));
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAsk();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        role="dialog"
        aria-modal="true"
        className="glass-panel rounded-3xl p-6 w-full max-w-lg text-white border border-white/20 flex flex-col gap-4"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="text-yellow-300 w-5 h-5" />
            Ask Aura
          </h2>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        {/* Output */}
        <div
          ref={listRef}
          className="flex-grow bg-black/20 rounded-lg p-4 min-h-[120px] max-h-[320px] overflow-y-auto"
        >
          {isLoading && (
            <LoaderCircle className="w-6 h-6 animate-spin mx-auto mt-4" />
          )}
          {error && !isLoading && (
            <p className="whitespace-pre-wrap text-red-300">⚠ {error}</p>
          )}
          {response && !error && !isLoading && (
            <p className="whitespace-pre-wrap">{response}</p>
          )}
          {!isLoading && !response && !error && (
            <p className="text-gray-300">
              Ask me anything about the weather… e.g., "What should I wear
              today?"
            </p>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={function (e) {
              setQuery(e.target.value);
            }}
            onKeyDown={onKeyDown}
            placeholder="Type your question…"
            className="flex-grow bg-white/10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={isLoading}
          />
          <button
            onClick={handleAsk}
            disabled={isLoading}
            className="bg-white/20 p-3 rounded-lg disabled:opacity-50"
            aria-label="Send"
            title="Send"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}