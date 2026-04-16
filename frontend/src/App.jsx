import React, { useState, useRef } from "react";
import {
  RefreshCw,
  Undo2,
  Redo2,
  Save,
  Github,
  Upload,
  Rocket,
  Share2,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";

function App() {
  // -----------------------------
  // STATE
  // -----------------------------
  const [darkMode, setDarkMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [twinInput, setTwinInput] = useState("");
  const [twinThinking, setTwinThinking] = useState(false);
  const [twinText, setTwinText] = useState(
    "Welcome to Blue Lotus. Describe what you want to build, refine, or heal."
  );
  const [uploadedCode, setUploadedCode] = useState(null);
  const fileInputRef = useRef(null);

  // -----------------------------
  // THEME
  // -----------------------------
  const theme = {
  background: darkMode ? "#1A1A1A" : "#FFFDF8",      // warm cream
  surface: darkMode ? "#2A2A2A" : "#FFFFFF",         // soft white
  surfaceSoft: darkMode ? "#242424" : "#FFF7F2",     // peach‑cream
  text: darkMode ? "#F5F5F5" : "#4A4A4A",            // warm gray
  textSoft: darkMode ? "#CFCFCF" : "#7A7A7A",        // soft warm gray
  border: darkMode ? "#3A3A3A" : "#F0E6DD",          // warm beige border
  primary: "#FF7AC3",                                // Loveable pink
  primarySoft: "rgba(255, 122, 195, 0.18)",          // soft pink glow
};

  // -----------------------------
  // HEALING UPLOAD
  // -----------------------------
  const handleHealingUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedCode(file);

    setTwinText(
      `I’ve received your code. I’ll examine it now. When you're ready, just say “Fix it” or “Heal this code.”`
    );
  };

  // -----------------------------
  // TWIN SUBMISSION
  // -----------------------------
  const handleTwinSubmit = (e) => {
    e.preventDefault();
    if (!twinInput.trim()) return;

    const message = twinInput.trim().toLowerCase();
    setTwinThinking(true);

    // Healing trigger
    if (uploadedCode && (message.includes("fix") || message.includes("heal"))) {
      setTimeout(() => {
        setTwinText(
          "I’ve examined your code. Several issues were detected and have now been healed. Your project is stable and ready."
        );
        setTwinThinking(false);
        setTwinInput("");
      }, 900);
      return;
    }

    // Normal build request
    setTimeout(() => {
      setTwinText(
        "I’m designing your next steps. I’ll break your request into small, safe, testable actions."
      );
      setTwinThinking(false);
      setTwinInput("");
    }, 900);
  };

  // -----------------------------
  // TOP BAR ACTIONS (STUBS)
  // -----------------------------
  const handleRefresh = () => {};
  const handleUndo = () => {};
  const handleRedo = () => {};
  const handleSave = () => {};
  const handleDeploy = () => {};
  const handlePublish = () => {};
  const handleSettings = () => {};

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.background,
        color: theme.text,
        display: "flex",
        flexDirection: "column",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
      }}
    >
      {/* -------------------------------------------------- */}
      {/* TOP BAR */}
      {/* -------------------------------------------------- */}
      <header
        style={{
          padding: "0.75rem 1.25rem",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: theme.surface,
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        {/* LEFT: LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "999px",
              background:
                "radial-gradient(circle at 30% 20%, #bfdbfe, #3b82f6 40%, #1d4ed8 70%, #0f172a 100%)",
              boxShadow: "0 10px 30px rgba(37, 99, 235, 0.45)"
            }}
          />
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: theme.textSoft,
                fontWeight: 700
              }}
            >
              Blue Lotus
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 600 }}>
              Luxury App Builder
            </div>
          </div>
        </div>

        {/* CENTER: ICON BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            background: theme.surfaceSoft,
            padding: "0.35rem 0.75rem",
            borderRadius: "999px",
            border: `1px solid ${theme.border}`
          }}
        >
          <IconButton icon={<RefreshCw size={16} />} onClick={handleRefresh} />
          <IconButton icon={<Undo2 size={16} />} onClick={handleUndo} />
          <IconButton icon={<Redo2 size={16} />} onClick={handleRedo} />
          <IconButton icon={<Save size={16} />} onClick={handleSave} />
          <IconButton icon={<Github size={16} />} />
          <IconButton icon={<Upload size={16} />} onClick={handleHealingUpload} />
          <IconButton icon={<Rocket size={16} />} onClick={handleDeploy} />
          <IconButton icon={<Share2 size={16} />} onClick={handlePublish} />
          <IconButton icon={<Settings size={16} />} onClick={handleSettings} />
        </div>

        {/* RIGHT: AUDIO + DARK MODE */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <IconButton
            icon={audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            onClick={() => setAudioEnabled((p) => !p)}
          />
          <TogglePill
            label={darkMode ? "Dark" : "Light"}
            active={darkMode}
            onToggle={() => setDarkMode((p) => !p)}
          />
        </div>
      </header>

      {/* -------------------------------------------------- */}
      {/* MAIN LAYOUT */}
      {/* -------------------------------------------------- */}
      <main
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "minmax(320px, 420px) 1fr",
          borderTop: `1px solid ${theme.border}`,
          borderBottom: `1px solid ${theme.border}`
        }}
      >
        {/* LEFT: TWIN PANEL */}
        <section
          style={{
            background: theme.surface,
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: theme.textSoft,
                fontWeight: 600
              }}
            >
              TWIN
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 600 }}>
              Blueprint Architect
            </div>
          </div>

          {/* TWIN MESSAGE */}
          <div
            style={{
              background: theme.surfaceSoft,
              borderRadius: "1rem",
              padding: "1rem",
              border: `1px solid ${theme.border}`,
              fontSize: "0.9rem",
              lineHeight: 1.5
            }}
          >
            {twinText}
          </div>

          {/* INPUT */}
          <form
            onSubmit={handleTwinSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <textarea
              value={twinInput}
              onChange={(e) => setTwinInput(e.target.value)}
              placeholder="Describe what you want to build or heal..."
              style={{
                minHeight: "80px",
                borderRadius: "0.75rem",
                border: `1px solid ${theme.border}`,
                padding: "0.75rem",
                background: theme.surfaceSoft,
                color: theme.text
              }}
            />
            <button
              type="submit"
              disabled={twinThinking}
              style={{
                borderRadius: "999px",
                padding: "0.5rem 1.25rem",
                border: "none",
                background:
                  "linear-gradient(135deg, #3b82f6, #4f46e5, #0ea5e9)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                opacity: twinThinking ? 0.7 : 1
              }}
            >
              {twinThinking ? "Thinking..." : "Ask TWIN"}
            </button>
          </form>

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelected}
            style={{ display: "none" }}
          />
        </section>

        {/* RIGHT: WORKSPACE */}
        <section
          style={{
            background: theme.surfaceSoft,
            padding: "1.25rem",
            borderLeft: `1px solid ${theme.border}`
          }}
        >
          <div
            style={{
              fontSize: "0.85rem",
              color: theme.textSoft,
              marginBottom: "0.5rem"
            }}
          >
            Workspace Preview
          </div>

          <div
            style={{
              borderRadius: "1rem",
              border: `1px dashed ${theme.border}`,
              padding: "1rem",
              background: darkMode ? "#0f172a" : "#f9fafb",
              color: theme.textSoft,
              fontSize: "0.85rem"
            }}
          >
            Your generated UI will appear here as TWIN builds or heals your app.
          </div>
        </section>
      </main>
    </div>
  );
}

// --------------------------------------------------
// COMPONENTS
// --------------------------------------------------
function IconButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "0.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px"
      }}
    >
      {icon}
    </button>
  );
}

function TogglePill({ label, active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        borderRadius: "999px",
        border: `1px solid ${active ? "#3b82f6" : "#cbd5e1"}`,
        padding: "0.25rem 0.75rem",
        background: active ? "rgba(59,130,246,0.15)" : "transparent",
        color: active ? "#1d4ed8" : "#64748b",
        cursor: "pointer",
        fontSize: "0.75rem"
      }}
    >
      {label}
    </button>
  );
}

export default App;
