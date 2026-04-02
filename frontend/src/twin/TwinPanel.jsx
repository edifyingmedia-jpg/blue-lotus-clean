import React, { useState } from "react";

export default function TwinPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const aiMessage = {
      role: "assistant",
      content: "TWIN is not wired yet — but your panel is working.",
    };

    setMessages((prev) => [...prev, aiMessage]);
    setInput("");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#0d0d0d",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#4a90e2" : "#222",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              maxWidth: "70%",
            }}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to TWIN…"
          style={{
            flex: 1,
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#111",
            color: "white",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            background: "#4a90e2",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
