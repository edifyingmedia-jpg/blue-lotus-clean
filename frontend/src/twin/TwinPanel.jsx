import React, { useState } from "react";
import executeProposal from "./executeProposal";

export default function TwinPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const result = await executeProposal(input);

    const twinMessage = result.ok
      ? { role: "twin", text: JSON.stringify(result.result, null, 2) }
      : { role: "twin", text: `Error: ${result.error}` };

    setMessages((prev) => [...prev, twinMessage]);
    setInput("");
  }

  return (
    <div style={{ padding: "1rem", background: "#111", color: "#eee" }}>
      <h2 style={{ marginBottom: "1rem" }}>TWIN Panel</h2>

      <div
        style={{
          height: "300px",
          overflowY: "auto",
          padding: "1rem",
          background: "#222",
          borderRadius: "6px",
          marginBottom: "1rem",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "0.75rem",
              color: m.role === "user" ? "#9cf" : "#cfc",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>{m.role === "user" ? "You" : "TWIN"}:</strong> {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command..."
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#000",
            color: "#fff",
          }}
        />
      </form>
    </div>
  );
}
