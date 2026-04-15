// frontend/src/App.jsx
import React, { useState, useEffect, useCallback } from "react";

const BLUE_LOTUS_LIGHT = {
  background: "#f7f9fc",
  surface: "#ffffff",
  surfaceSoft: "#f0f4ff",
  border: "#d7e0f5",
  primary: "#3b82f6",
  primarySoft: "#e0edff",
  accent: "#4f46e5",
  text: "#0f172a",
  textSoft: "#64748b",
};

const BLUE_LOTUS_DARK = {
  background: "#020617",
  surface: "#020617",
  surfaceSoft: "#020617",
  border: "#1e293b",
  primary: "#60a5fa",
  primarySoft: "#0b1120",
  accent: "#818cf8",
  text: "#e5e7eb",
  textSoft: "#9ca3af",
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [twinThinking, setTwinThinking] = useState(false);
  const [twinText, setTwinText] = useState(
    "Tell me what you want to build, and I’ll architect it step by step."
  );
  const [twinInput, setTwinInput] = useState("");
  const [todoItems, setTodoItems] = useState([
    "Clarify app purpose and primary user",
    "Define core features and flows",
    "Generate initial UI layout",
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [creditsLimit] = useState(1000);
  const [throttleEnabled, setThrottleEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [lastSessionSummary, setLastSessionSummary] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const theme = darkMode ? BLUE_LOTUS_DARK : BLUE_LOTUS_LIGHT;

  // --- AUDIO (TWIN VOICE) ---
  const speak = useCallback(
    (text) => {
      if (!audioEnabled || typeof window === "undefined") return;
      try {
        const synth = window.speechSynthesis;
        if (!synth) return;
        if (synth.speaking) synth.cancel();

        const utter = new SpeechSynthesisUtterance(text);
        utter.onstart = () => setSpeaking(true);
        utter.onend = () => setSpeaking(false);
        utter.onerror = () => setSpeaking(false);
        synth.speak(utter);
      } catch {
        // fail silently
      }
    },
    [audioEnabled]
  );

  useEffect(() => {
    if (audioEnabled && twinText) {
      speak(twinText);
    }
  }, [audioEnabled, twinText, speak]);

  // --- TOP BAR ACTIONS (STUBS FOR NOW) ---
  const handleRefresh = () => {
    setTwinText("Workspace refreshed. What would you like to build or refine next?");
    setTwinInput("");
  };

  const handleDelete = () => {
    setTwinText("I’ve cleared the current context. We can start a fresh build whenever you’re ready.");
    setTodoItems([]);
  };

  const handleUndo = () => {
    setTwinText("Undo is not wired to a history stack yet, but I can regenerate or adjust any step you choose.");
  };

  const handleSave = () => {
    setTwinText("I’ve conceptually saved this state. Once wired to storage, this will persist your blueprint.");
  };

  const handlePushGitHub = () => {
    setTwinText(
      "When connected to GitHub, I’ll push generated code to your repo with clear commit messages."
    );
  };

  const handleDeploy = () => {
    setTwinText(
      "Deployment hooks can connect to Vercel or your chosen host. I’ll prepare production-ready builds."
    );
  };

  const handlePublish = () => {
    setTwinText(
      "Publishing will expose your app to users. I’ll ensure routes, auth, and UX are ready before that step."
    );
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
    setTwinText((prev) =>
      isPaused
        ? "Resuming from where we left off. I remember the last blueprint and next steps."
        : "Pausing active generation. I’ll hold this state until you’re ready to continue."
    );
  };

  // --- TODO LIST ---
  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodoItems((prev) => [...prev, newTodo.trim()]);
    setNewTodo("");
  };

  const removeTodo = (index) => {
    setTodoItems((prev) => prev.filter((_, i) => i !== index));
  };

  // --- TWIN MESSAGE HANDLING (STUB FOR REAL BACKEND) ---
  const handleTwinSubmit = (e) => {
    e.preventDefault();
    if (!twinInput.trim()) return;
    if (isPaused) {
      setTwinText(
        "I’m currently paused. Resume me to continue building, or adjust your request before we proceed."
      );
      return;
    }

    setTwinThinking(true);

    // Simulate credit usage + response
    setTimeout(() => {
      const newCredits = throttleEnabled
        ? Math.min(creditsUsed + 15, creditsLimit)
        : creditsUsed + 30;

      setCreditsUsed(newCredits);

      const explanation = `
I’m designing this like a luxury builder: a Lovable-style split layout with a Blue Lotus identity.
On the left, I’ll keep our conversation, decisions, and TODOs.
On the right, I’ll evolve the live app canvas as we refine features.
Next, I’ll break your request into small, safe, testable steps so we don’t waste credits.
      `.trim();

      setTwinText(explanation);
      setLastSessionSummary(
        "Last session: clarified intent, updated TODOs, and prepared the next build steps."
      );
      setTwinThinking(false);
      setTwinInput("");
    }, 900);
  };

  const creditPercent = Math.min((creditsUsed / creditsLimit) * 100, 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(circle at top left, #e0f2fe 0, ${theme.background} 40%, ${theme.background} 100%)`,
        color: theme.text,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP BAR */}
      <header
        style={{
          borderBottom: `1px solid ${theme.border}`,
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(16px)",
          background:
            "linear-gradient(to right, rgba(248, 250, 252, 0.9), rgba(239, 246, 255, 0.9))",
        }}
      >
        {/* Left: Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 20%, #bfdbfe, #3b82f6 40%, #1d4ed8 70%, #0f172a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(37, 99, 235, 0.45)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Lotus petals (simple abstract) */}
            <div
              style={{
                position: "absolute",
                width: 26,
                height: 26,
                borderRadius: "50%",
                border: "1px solid rgba(219, 234, 254, 0.9)",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 20%, #eff6ff, #bfdbfe 60%, #1d4ed8 100%)",
                boxShadow: "0 0 12px rgba(191, 219, 254, 0.9)",
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                color: theme.textSoft,
              }}
            >
              Blue Lotus
            </div>
            <div
              style={{
                fontWeight: 600,
                fontSize: "1rem",
                color: theme.text,
              }}
            >
              Luxury App Builder
            </div>
          </div>
        </div>

        {/* Center: Command Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.25rem 0.5rem",
            borderRadius: "999px",
            backgroundColor: theme.surfaceSoft,
            border: `1px solid ${theme.border}`,
          }}
        >
          <TopBarButton label="Refresh" onClick={handleRefresh} />
          <TopBarButton label="Delete" onClick={handleDelete} />
          <TopBarButton label="Undo" onClick={handleUndo} />
          <TopBarButton label="Save" onClick={handleSave} />
          <TopBarButton label="Push to GitHub" onClick={handlePushGitHub} />
          <TopBarButton label="Deploy" onClick={handleDeploy} />
          <TopBarButton label="Publish" onClick={handlePublish} />
          <TopBarButton
            label={isPaused ? "Resume TWIN" : "Pause TWIN"}
            onClick={handlePauseToggle}
            highlight
          />
        </div>

        {/* Right: Toggles */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Audio toggle */}
          <TogglePill
            label="Voice"
            active={audioEnabled}
            onToggle={() => setAudioEnabled((prev) => !prev)}
          />
          {/* Throttle toggle */}
          <TogglePill
            label="Throttle"
            active={throttleEnabled}
            onToggle={() => setThrottleEnabled((prev) => !prev)}
          />
          {/* Light/Dark toggle */}
          <TogglePill
            label={darkMode ? "Dark" : "Light"}
            active={darkMode}
            onToggle={() => setDarkMode((prev) => !prev)}
          />
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(320px, 420px) minmax(0, 1fr)",
          gap: "1px",
          borderTop: `1px solid ${theme.border}`,
          borderBottom: `1px solid ${theme.border}`,
          backgroundColor: theme.border,
        }}
      >
        {/* LEFT: TWIN PANEL */}
        <section
          style={{
            backgroundColor: theme.surface,
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* TWIN Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.25rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: theme.textSoft,
                  fontWeight: 600,
                }}
              >
                TWIN
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: theme.text,
                }}
              >
                Blueprint Architect
              </div>
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: theme.textSoft,
                textAlign: "right",
              }}
            >
              {twinThinking
                ? "Designing your next move..."
                : speaking && audioEnabled
                ? "Speaking your blueprint..."
                : "Ready to build with you."}
            </div>
          </div>

          {/* TWIN Explanation Bubble */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(219, 234, 254, 0.9), rgba(221, 239, 253, 0.9))",
              borderRadius: "1rem",
              padding: "0.9rem 1rem",
              border: `1px solid ${theme.border}`,
              boxShadow: "0 10px 30px rgba(148, 163, 184, 0.25)",
              fontSize: "0.9rem",
              color: "#0f172a",
              lineHeight: 1.5,
            }}
          >
            {twinText}
          </div>

          {/* TWIN Input */}
          <form
            onSubmit={handleTwinSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <textarea
              value={twinInput}
              onChange={(e) => setTwinInput(e.target.value)}
              placeholder="Describe the app, flow, or feature you want me to build or refine..."
              style={{
                resize: "vertical",
                minHeight: "80px",
                maxHeight: "180px",
                borderRadius: "0.75rem",
                border: `1px solid ${theme.border}`,
                padding: "0.75rem 0.9rem",
                fontSize: "0.9rem",
                outline: "none",
                backgroundColor: theme.surfaceSoft,
                color: theme.text,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <button
                type="submit"
                disabled={twinThinking}
                style={{
                  borderRadius: "999px",
                  padding: "0.45rem 1.1rem",
                  border: "none",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg, #3b82f6, #4f46e5, #0ea5e9)",
                  color: "#f9fafb",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.45)",
                  opacity: twinThinking ? 0.7 : 1,
                }}
              >
                {twinThinking ? "Designing..." : "Ask TWIN to Build"}
              </button>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: theme.textSoft,
                  textAlign: "right",
                  flex: 1,
                }}
              >
                TWIN will explain what she’s creating as she works, and she’ll
                throttle to protect your credits.
              </div>
            </div>
          </form>

          {/* TODO LIST */}
          <div
            style={{
              marginTop: "0.75rem",
              padding: "0.75rem",
              borderRadius: "0.9rem",
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.surfaceSoft,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: theme.textSoft,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Build TODOs
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
                maxHeight: "120px",
                overflowY: "auto",
              }}
            >
              {todoItems.length === 0 && (
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: theme.textSoft,
                  }}
                >
                  No tasks yet. Ask TWIN to propose a build plan.
                </div>
              )}
              {todoItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                    fontSize: "0.85rem",
                  }}
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeTodo(index)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: theme.textSoft,
                      fontSize: "0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                marginTop: "0.35rem",
              }}
            >
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a TODO for this build..."
                style={{
                  flex: 1,
                  borderRadius: "999px",
                  border: `1px solid ${theme.border}`,
                  padding: "0.35rem 0.7rem",
                  fontSize: "0.8rem",
                  backgroundColor: theme.surface,
                  color: theme.text,
                }}
              />
              <button
                type="button"
                onClick={addTodo}
                style={{
                  borderRadius: "999px",
                  border: "none",
                  padding: "0.35rem 0.8rem",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  backgroundColor: theme.primarySoft,
                  color: theme.primary,
                  fontWeight: 600,
                }}
              >
                Add
              </button>
            </div>
          </div>

          {/* SESSION MEMORY */}
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.75rem",
              color: theme.textSoft,
            }}
          >
            {lastSessionSummary || "No prior session summary yet. I’ll remember once we’ve built together."}
          </div>
        </section>

        {/* RIGHT: BUILDER CANVAS */}
        <section
          style={{
            backgroundColor: theme.surfaceSoft,
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Canvas Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.25rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: theme.textSoft,
                  fontWeight: 600,
                }}
              >
                App Canvas
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: theme.text,
                }}
              >
                Live Blueprint Preview
              </div>
            </div>
            {/* Credits */}
            <div
              style={{
                minWidth: "220px",
                textAlign: "right",
                fontSize: "0.75rem",
                color: theme.textSoft,
              }}
            >
              <div style={{ marginBottom: "0.25rem" }}>
                Credits used:{" "}
                <span style={{ fontWeight: 600, color: theme.text }}>
                  {creditsUsed}
                </span>{" "}
                / {creditsLimit}
              </div>
              <div
                style={{
                  width: "100%",
                  height: 6,
                  borderRadius: "999px",
                  backgroundColor: darkMode ? "#020617" : "#e5e7eb",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${creditPercent}%`,
                    height: "100%",
                    borderRadius: "999px",
                    background:
                      creditPercent > 80
                        ? "linear-gradient(90deg, #f97316, #ef4444)"
                        : "linear-gradient(90deg, #22c55e, #3b82f6)",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Canvas Body */}
          <div
            style={{
              flex: 1,
              borderRadius: "1rem",
              border: `1px solid ${theme.border}`,
              background:
                "radial-gradient(circle at top, rgba(219, 234, 254, 0.7), rgba(15, 23, 42, 0.02))",
              padding: "1rem",
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) minmax(260px, 1fr)",
              gap: "0.75rem",
            }}
          >
            {/* Left: Preview Placeholder */}
            <div
              style={{
                borderRadius: "0.9rem",
                border: `1px dashed ${theme.border}`,
                backgroundColor: darkMode ? "#020617" : "#f9fafb",
                padding: "0.9rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: theme.textSoft,
                  marginBottom: "0.25rem",
                }}
              >
                Generated UI will appear here
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: theme.textSoft,
                  lineHeight: 1.5,
                }}
              >
                As TWIN generates components, routes, and flows, this canvas will
                render the live preview. For now, treat this as a placeholder
                for your app’s evolving interface.
              </div>
            </div>

            {/* Right: Suggestions / Notes */}
            <div
              style={{
                borderRadius: "0.9rem",
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.surface,
                padding: "0.9rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: theme.textSoft,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                TWIN Suggestions
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  fontSize: "0.8rem",
                  color: theme.textSoft,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                }}
              >
                <li>
                  Start with a single clear user journey (e.g., “create and
                  publish a simple landing page”).
                </li>
                <li>
                  Let me break the build into small, testable steps so we can
                  adjust without wasting credits.
                </li>
                <li>
                  Once we like the blueprint, we’ll wire this canvas to real
                  generated React/Next.js code.
                </li>
              </ul>
            </div>
          </div>

          {/* Status Strip */}
          <div
            style={{
              fontSize: "0.75rem",
              color: theme.textSoft,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span>
              Status:{" "}
              {isPaused
                ? "TWIN is paused. Resume when you’re ready to continue building."
                : twinThinking
                ? "TWIN is actively designing your next steps."
                : "TWIN is idle, ready for your next instruction."}
            </span>
            <span>
              Voice: {audioEnabled ? "On" : "Off"} · Throttle:{" "}
              {throttleEnabled ? "On" : "Off"}
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

function TopBarButton({ label, onClick, highlight }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderRadius: "999px",
        border: "none",
        padding: "0.3rem 0.8rem",
        fontSize: "0.75rem",
        cursor: "pointer",
        backgroundColor: highlight ? "#1d4ed8" : "transparent",
        color: highlight ? "#e5e7eb" : "#0f172a",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function TogglePill({ label, active, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        borderRadius: "999px",
        border: `1px solid ${active ? "#3b82f6" : "#cbd5f5"}`,
        padding: "0.25rem 0.7rem",
        fontSize: "0.75rem",
        cursor: "pointer",
        backgroundColor: active ? "rgba(59, 130, 246, 0.08)" : "transparent",
        color: active ? "#1d4ed8" : "#64748b",
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "999px",
          backgroundColor: active ? "#22c55e" : "#cbd5f5",
        }}
      />
      {label}
    </button>
  );
}

export default App;
