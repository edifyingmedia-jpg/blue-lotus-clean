import { useEffect, useMemo, useState } from "react";
import { execute } from "../runtime/ActionEngine";

export default function TwinPanel({
  authority = {
    isOwner: false,
    actorId: null,
    ownerId: null,
    scope: "unknown"
  },
  onBuild = () => {}
}) {
  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      role: "assistant",
      content:
        "TWIN online. Give me a build command like: “Build an app builder for X.”"
    }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setReady(true);
  }, []);

  const safeAuthority = useMemo(() => {
    const a = authority || {};
    return {
      isOwner: !!a.isOwner,
      actorId: a.actorId ?? null,
      ownerId: a.ownerId ?? null,
      scope: a.scope ?? "unknown"
    };
  }, [authority]);

  const append = (role, content) => {
    setMessages(prev => [...prev, { role, content }]);
  };

  const handleSend = () => {
    const text = (input || "").trim();
    if (!text) return;

    setInput("");
    append("user", text);

    let result;
    try {
      result = execute(text, safeAuthority);
    } catch (e) {
      append(
        "assistant",
        `Runtime error in ActionEngine: ${e?.message || "Unknown error"}`
      );
      return;
    }

    const message =
      result?.message ||
      "No response returned from ActionEngine. Check execute() return shape.";

    append("assistant", message);

    if (result?.type === "build") {
      try {
        onBuild(result);
      } catch (e) {
        append(
          "assistant",
          `Build handler error: ${e?.message || "Unknown error"}`
        );
      }
    }
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!ready) {
    return (
      <div style={{ minHeight: "100vh", background: "#020617", color: "white", padding: "40px" }}>
        Initializing TWIN…
      </div>
    );
  }

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
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #1e293b",
          fontWeight: 700
        }}
      >
        TWIN — Owner Forge
      </div>

      <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "12px", lineHeight: 1.4 }}>
            <strong>{m.role === "user" ? "You" : "TWIN"}:</strong>{" "}
            <span>{m.content}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #1e293b",
          display: "flex",
          gap: "8px"
        }}
      >
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Try: "Build an app builder for landing pages"'
          rows={2}
          style={{
            flex: 1,
            padding: "10px",
            background: "#020617",
            color: "white",
            border: "1px solid #334155",
            resize: "none",
            outline: "none"
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "10px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
