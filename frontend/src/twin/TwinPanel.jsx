import { useMemo, useState } from "react";
import { execute } from "../runtime/ActionEngine";

export default function TwinPanel({
  authority = { isOwner: false, actorId: null, ownerId: null, scope: "unknown" }
}) {
  const [messages, setMessages] = useState(() => [
    { role: "assistant", content: 'Ready. Try: "Build an app builder called Lotus Forge".' }
  ]);
  const [input, setInput] = useState("");
  const [artifact, setArtifact] = useState(null);
  const [activeFile, setActiveFile] = useState(null);

  const safeAuthority = useMemo(
    () => ({
      isOwner: !!authority?.isOwner,
      actorId: authority?.actorId ?? null,
      ownerId: authority?.ownerId ?? null,
      scope: authority?.scope ?? "unknown"
    }),
    [authority]
  );

  const append = (role, content) =>
    setMessages(prev => [...prev, { role, content }]);

  const files = artifact?.files || {};
  const fileKeys = useMemo(() => Object.keys(files).sort(), [files]);
  const activeContent = activeFile ? files[activeFile] : "";

  const handleSend = () => {
    const text = String(input || "").trim();
    if (!text) return;

    setInput("");
    append("user", text);

    let result;
    try {
      result = execute(text, safeAuthority);
    } catch (e) {
      append("assistant", `ActionEngine crash: ${e?.message || "Unknown error"}`);
      return;
    }

    append("assistant", result?.message || "No message returned.");

    if (result?.type === "build" && result?.artifact?.files) {
      setArtifact(result.artifact);
      const first = Object.keys(result.artifact.files).sort()[0] || null;
      setActiveFile(first);
    }
  };

  const onKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#e2e8f0",
        display: "grid",
        gridTemplateColumns: artifact ? "380px 1fr" : "1fr"
      }}
    >
      <div
        style={{
          borderRight: artifact ? "1px solid #1e293b" : "none",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid #1e293b",
            fontWeight: 900
          }}
        >
          TWIN — Brain Online
        </div>

        <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: 10, lineHeight: 1.35 }}>
              <strong>{m.role === "user" ? "You" : "TWIN"}:</strong>{" "}
              <span>{m.content}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: 16,
            borderTop: "1px solid #1e293b",
            display: "flex",
            gap: 8
          }}
        >
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            placeholder='Build an app builder called "Lotus Forge"'
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#020617",
              color: "#e2e8f0",
              resize: "none",
              outline: "none"
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: 900
            }}
          >
            Send
          </button>
        </div>
      </div>

      {artifact && (
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "320px 1fr"
          }}
        >
          <aside style={{ padding: 16, borderRight: "1px solid #1e293b" }}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Generated</div>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 12 }}>
              {artifact.appName} ({artifact.kind}) — template:{" "}
              {artifact.templateId}
            </div>

            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>
              Files
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {fileKeys.map(k => (
                <button
                  key={k}
                  onClick={() => setActiveFile(k)}
                  style={{
                    textAlign: "left",
                    padding: "8px 10px",
                    borderRadius: 10,
                    border: "1px solid #1e293b",
                    background:
                      k === activeFile ? "#0b1220" : "#020617",
                    color: "#e2e8f0",
                    cursor: "pointer"
                  }}
                >
                  {k}
                </button>
              ))}
            </div>
          </aside>

          <main style={{ padding: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12
              }}
            >
              <div style={{ fontWeight: 900 }}>{activeFile}</div>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(String(activeContent || ""))
                }
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid #334155",
                  background: "#0b1220",
                  color: "#e2e8f0",
                  cursor: "pointer",
                  fontWeight: 900
                }}
              >
                Copy
              </button>
            </div>

            <pre
              style={{
                marginTop: 12,
                padding: 14,
                borderRadius: 14,
                border: "1px solid #1e293b",
                background: "#0b1220",
                overflow: "auto",
                minHeight: "80vh",
                whiteSpace: "pre"
              }}
            >
              {String(activeContent || "")}
            </pre>
          </main>
        </div>
      )}
    </div>
  );
}
