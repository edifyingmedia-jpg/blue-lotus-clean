import "./TwinPanel.css";
import { useMemo, useState } from "react";

/* ============================================
   INTENT CLASSIFIER
============================================ */
function classifyIntent(text) {
  const t = text.trim().toLowerCase();

  if (!t) return { type: "empty" };
  if (["hi", "hey", "hello"].includes(t)) return { type: "greeting" };
  if (t.includes("build") && t.includes("app builder"))
    return { type: "build_app_builder" };

  return { type: "unknown" };
}

/* ============================================
   PROPOSAL GENERATOR
============================================ */
function createBuildAppBuilderProposal(message) {
  return {
    id: "build-app-builder",
    type: "proposal",
    title: "Build an app builder",
    description:
      "Create a visual app builder with a components sidebar, central canvas, and TWIN command panel.",
    sourceMessage: message,
    steps: [
      "Define base layout: sidebar, canvas, and TWIN panel regions.",
      "Wire the components sidebar to a component registry.",
      "Enable adding components to the canvas and persisting layout state."
    ]
  };
}

/* ============================================
   PROPOSAL EXECUTION
============================================ */
function executeProposal(proposal, onBuild) {
  if (!proposal) return;

  if (proposal.id === "build-app-builder") {
    const app = {
      name: "App Builder",
      pages: [
        {
          id: "builder",
          title: "Builder",
          components: [
            { id: "sidebar", type: "panel", role: "components" },
            { id: "canvas", type: "canvas-root" },
            { id: "twin", type: "panel", role: "twin" }
          ]
        }
      ]
    };

    onBuild(app);
  }
}

/* ============================================
   MAIN COMPONENT
============================================ */
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

  const [pendingProposal, setPendingProposal] = useState(null);

  const canSend = useMemo(() => command.trim().length > 0, [command]);

  const send = () => {
    const text = command.trim();
    if (!text) return;

    const userMsg = { id: id(), role: "user", text };
    const intent = classifyIntent(text);

    setLog((prev) => [...prev, userMsg]);

    switch (intent.type) {
      case "greeting": {
        const twinMsg = {
          id: id(),
          role: "twin",
          text:
            "Hi. I’m in Architect Mode — tell me what you want to build, like “Build an app builder for creators.”"
        };
        setLog((prev) => [...prev, twinMsg]);
        setPendingProposal(null);
        break;
      }

      case "build_app_builder": {
        const proposal = createBuildAppBuilderProposal(text);
        setPendingProposal(proposal);

        const twinMsg = {
          id: id(),
          role: "twin",
          text:
            "I’ve drafted a proposal to build an app builder. Review and approve to execute."
        };
        setLog((prev) => [...prev, twinMsg]);
        break;
      }

      case "unknown":
      default: {
        const twinMsg = {
          id: id(),
          role: "twin",
          text:
            "Tell me what you want to build, like: “Build an app builder for solo creators.”"
        };
        setLog((prev) => [...prev, twinMsg]);
        setPendingProposal(null);
        break;
      }
    }

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

        {/* ============================
            PROPOSAL CARD
        ============================ */}
        {pendingProposal && (
          <div style={proposalCard}>
            <h3 style={{ margin: 0, color: "#e5e7eb" }}>
              {pendingProposal.title}
            </h3>
            <p style={{ color: "#94a3b8" }}>{pendingProposal.description}</p>

            <ul style={{ color: "#cbd5e1", paddingLeft: "20px" }}>
              {pendingProposal.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                style={approveBtn}
                onClick={() => {
                  executeProposal(pendingProposal, onBuild);
                  setPendingProposal(null);

                  setLog((prev) => [
                    ...prev,
                    {
                      id: id(),
                      role: "twin",
                      text: "Executing approved proposal and updating the builder."
                    }
                  ]);
                }}
              >
                Approve & Execute
              </button>

              <button
                style={rejectBtn}
                onClick={() => {
                  setPendingProposal(null);
                  setLog((prev) => [
                    ...prev,
                    {
                      id: id(),
                      role: "twin",
                      text:
                        "Proposal discarded. Tell me what you want to build instead."
                    }
                  ]);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        )}
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

/* ============================================
   UTIL
============================================ */
function id() {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
}

/* ============================================
   STYLES
============================================ */

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

/* ============================================
   PROPOSAL CARD STYLES
============================================ */

const proposalCard = {
  marginTop: "12px",
  padding: "12px",
  borderRadius: "10px",
  background: "#0b1220",
  border: "1px solid #1e293b"
};

const approveBtn = {
  padding: "8px 12px",
  borderRadius: "8px",
  background: "#16a34a",
  color: "#e5e7eb",
  border: "none",
  cursor: "pointer"
};

const rejectBtn = {
  padding: "8px 12px",
  borderRadius: "8px",
  background: "#b91c1c",
  color: "#e5e7eb",
  border: "none",
  cursor: "pointer"
};
