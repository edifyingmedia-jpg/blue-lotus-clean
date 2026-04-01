import { useState } from "react";

export default function TwinPanel({ artifact, onBuild }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onBuild(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#020617",
        color: "#e2e8f0",
      }}
    >
      {/* Command Input */}
      <div
        style={{
          borderBottom: "1px solid #1e293b",
          padding: 12,
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Try: "Build an app builder called Lotus Forge"'
          style={{
            width: "100%",
            minHeight: 48,
            resize: "none",
            background: "#020617",
            color: "#e2e8f0",
            border: "1px solid #1e293b",
            borderRadius: 6,
            padding: 10,
            fontSize: 14,
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Work Canvas */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {!artifact ? (
          <div
            style={{
              padding: 24,
              color: "#64748b",
            }}
          >
            TWIN: Ready. Try: "Build an app builder called Lotus Forge".
          </div>
        ) : (
          <>
            {/* File List */}
            <div
              style={{
                width: 240,
                borderRight: "1px solid #1e293b",
                padding: 16,
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "#64748b",
                  marginBottom: 12,
                }}
              >
                Generated Files
              </div>

              {Object.keys(artifact.files || {}).map((name) => (
                <div
                  key={name}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    color: "#94a3b8",
                    marginBottom: 6,
                  }}
                >
                  {name}
                </div>
              ))}
            </div>

            {/* Viewer */}
            <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
              <pre
                style={{
                  background: "#0b1220",
                  border: "1px solid #1e293b",
                  color: "#e2e8f0",
                  padding: 16,
                  borderRadius: 6,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {Object.values(artifact.files || {})[0]}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
