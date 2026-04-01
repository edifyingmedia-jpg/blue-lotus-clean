import { useState } from "react";
import "./TwinPanel.css";

export default function TwinPanel() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "TWIN is online. This panel will later control app generation and workspace behavior.",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="twin-panel">
      <div className="twin-header">
        <div className="twin-title">TWIN Console</div>
        <div className="twin-subtitle">Owner runtime control surface</div>
      </div>

      <div className="twin-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`twin-msg ${m.role === "user" ? "user" : "ai"}`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="twin-input-bar">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type to TWIN (no backend yet — this is a visual console only)..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
