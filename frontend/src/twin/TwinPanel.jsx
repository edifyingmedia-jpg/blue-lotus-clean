import { useState } from "react";
import "./TwinPanel.css";

export default function TwinPanel({ artifact, onBuild }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "twin",
      text: 'TWIN: Ready. Try "Build an app builder called Lotus Forge".'
    }
  ]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input.trim() };
    const twinReply = {
      role: "twin",
      text: "Acknowledged. Builder generation pipeline will be connected next."
    };

    setMessages((prev) => [...prev, userMessage, twinReply]);
    onBuild(input.trim());
    setInput("");
  };

  return (
    <div className="twin-panel">
      <div className="twin-messages">
        {messages.map((m, i) => (
          <div key={i} className="twin-message">
            {m.text}
          </div>
        ))}
      </div>

      <div className="twin-inputRow">
        <textarea
          className="twin-textarea"
          value={input}
          rows={4}
          placeholder='Try: "Build an app builder called Lotus Forge"'
          onChange={(e) => setInput(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(
              e.target.scrollHeight,
              240
            )}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        <button
          className="twin-send"
          onClick={handleSubmit}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
