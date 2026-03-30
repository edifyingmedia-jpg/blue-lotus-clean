import "./TwinPanel.css";
import { useMemo, useState } from "react";
import { classifyIntent } from "./intentClassifier";

export default function TwinPanel({ onBuild }) {
  const [command, setCommand] = useState("");
  const [log, setLog] = useState([
    {
      id: id(),
      role: "system",
      text:
        "TWIN online — Architect Mode active.\n" +
        "I will imagine the app and build immediately.\n" +
        "You can correct anything afterward."
    }
  ]);

  const canSend = useMemo(() => command.trim().length > 0, [command]);

  const send = () => {
    const text = command.trim();
    if (!text) return;

    const userMsg = { id: id(), role: "user", text };
    const twinMsg = executeArchitectCommand(text, onBuild);

    setLog((prev) => [...prev, userMsg, twinMsg]);
    setCommand("");
  };

  return (
    <div style={panel}>
      <header style={header}>
        <strong style={{ color: "#e5e7eb" }}>TWIN</strong>
        <span style={sub}>Architect</span>
      </header>

      <div style={logBox}>
        {log.map((m) => (
          <div key={m.id} style={bubbleWrap(m.role)}>
            <div style={bubble(m.role)}>
              <div style={label(m.role)}>{m.role}</div>
              <div style={{ whiteSpace: "pre-wrap", color: "#e5e7eb" }}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        style={composer}
      >
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Build something…"
          rows={3}
          style={input}
        />
        <button disabled={!canSend} style={sendBtn(!canSend)}>
          Execute
        </button>
      </form>
    </div>
  );
}

/* ============================
   ARCHITECT EXECUTION LOGIC
============================ */

function executeArchitectCommand(text, onBuild) {
  const intent = classifyIntent(text);

  switch (intent.type) {
    case "greeting":
      return {
        id: id(),
        role: "twin",
        text: "Architect Mode active. Tell me what you want to build."
      };

    case "build_app": {
      const appBuilder = {
        name: "Generated App Builder",
        pages: [
          {
            id: "builder",
            title: "Builder",
            components: [
              {
                id: "components-panel",
                type: "panel",
                role: "components",
                title: "Components"
              },
              {
                id: "canvas-root",
                type: "canvas",
                title: "Canvas"
              },
              {
                id: "twin-panel",
                type: "panel",
                role: "twin",
                title: "TWIN"
              }
            ]
          }
        ],
        meta: {
          generatedBy: "TWIN",
          mode: "architect",
          intent: intent.query
        }
      };

      onBuild(appBuilder);

      return {
        id: id(),
        role: "twin",
        text:
          "App builder scaffold generated and rendered.\n\n" +
          "• Components panel\n" +
          "• Canvas root\n" +
          "• TWIN control panel\n\n" +
          "Tell me what to change or extend."
      };
    }

    default:
      return {
        id: id(),
        role: "twin",
        text:
          "State what you want to build. Example: “Build an app builder for SaaS dashboards.”"
      };
  }
}

/* ============================
   UTIL
============================ */

function id() {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
}

/* ============================
   STYLES
============================ */

const panel = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const sub = {
  fontSize: "12px",
  color: "#94a3b8"
};

const logBox = {
  flex: 1,
  overflow: "auto",
  padding: "8px",
  border: "1px solid #1e293b",
  borderRadius: "10px",
  background: "#020617"
};

const bubbleWrap = (r) => ({
  display: "flex",
  justifyContent: r === "user" ? "flex-end" : "flex-start",
  marginBottom: "8px"
});

const bubble = (r) => ({
  maxWidth: "90%",
  padding: "10px",
  borderRadius: "12px",
  background: r === "user" ? "#0f172a" : "#07101f",
  border: "1px solid #1e293b",
  color: "#e5e7eb"
});

const label = (r) => ({
  fontSize: "11px",
  color: r === "user" ? "#a5b4fc" : "#67e8f9",
  marginBottom: "4px"
});

const composer = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const input = {
  resize: "none",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #1e293b",
  background: "#020617",
  color: "#e5e7eb"
};

const sendBtn = (disabled) => ({
  alignSelf: "flex-end",
  padding: "8px 14px",
  borderRadius: "10px",
  border: "1px solid #1e293b",
  background: disabled ? "#020617" : "#2563eb",
  color: disabled ? "#64748b" : "#e5e7eb",
  cursor: disabled ? "not-allowed" : "pointer"
});
