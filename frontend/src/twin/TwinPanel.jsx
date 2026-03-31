import { useEffect, useState } from "react";

export default function TwinPanel({
  authority = {
    isOwner: false,
    actorId: null,
    ownerId: null,
    scope: "unknown"
  },
  onBuild = () => {}
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);

  // Ensure TwinPanel never crashes on mount
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        Initializing TWIN…
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Placeholder AI response (no repetition loop)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Acknowledged. Awaiting explicit build instruction."
        }
      ]);
    }, 300);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #1e293b",
          fontWeight: "bold"
        }}
      >
        TWIN — Owner Forge
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "16px",
          overflowY: "auto"
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "12px",
              opacity: 0.95
            }}
          >
            <strong>{msg.role === "user" ? "You" : "TWIN"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #1e293b",
          display: "flex",
          gap: "8px"
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a command…"
          style={{
            flex: 1,
            padding: "10px",
            background: "#020617",
            color: "white",
            border: "1px solid #334155"
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "10px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
