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
  const [darkMode, setDarkMode] = useState(false);
  const [twinInput, setTwinInput] = useState("");
  const [twinText, setTwinText] = useState("Hello, I am TWIN.");
  const [twinThinking, setTwinThinking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");

  const fileInputRef = useRef(null);

  // --------------------------------------------------
  // CHAT MODE
  // --------------------------------------------------
  const handleTwinSubmit = async (e) => {
    e.preventDefault();
    if (!twinInput.trim()) return;

    setTwinThinking(true);

    try {
     const response = await fetch("/api/twin-brain", {
 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "chat",
          prompt: twinInput
        })
      });

      const data = await response.json();
      setTwinText(data.reply || "TWIN responded, but no message was returned.");
    } catch (err) {
      console.error("TWIN frontend error:", err);
      setTwinText("TWIN had an issue. Try again.");
    }

    setTwinThinking(false);
    setTwinInput("");
  };

  // --------------------------------------------------
  // BUILD MODE (Emergent-style)
  // --------------------------------------------------
  const handleBuild = async () => {
    if (!twinInput.trim()) return;

    setTwinThinking(true);

    try {
      const response = await fetch("/api/twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "build",
          prompt: twinInput
        })
      });

      const data = await response.json();
      setPreviewHTML(data.html || "<h1>No HTML returned</h1>");
    } catch (err) {
      console.error("TWIN build error:", err);
      setPreviewHTML("<h1>Error building app</h1>");
    }

    setTwinThinking(false);
  };

  // --------------------------------------------------
  // HYBRID THEME
  // --------------------------------------------------
  const theme = {
    background: darkMode ? "#0F0F14" : "#F8F9FF",
    surface: darkMode ? "#1A1A22" : "#FFFFFF",
    surfaceSoft: darkMode ? "#15151C" : "#F4F2FF",
    text: darkMode ? "#F5F5F7" : "#3E3E3E",
    textSoft: darkMode ? "#CFCFD4" : "#6E6E6E",
    border: darkMode ? "#2A2A33" : "#E6E1FF",
    accent: "linear-gradient(135deg, #FF8CCF, #C7A4FF, #9EE7FF)"
  };

  // --------------------------------------------------
  // ACTION HANDLERS
  // --------------------------------------------------
  const handleRefresh = () => {};
  const handleUndo = () => {};
  const handleRedo = () => {};
  const handleSave = () => {};
  const handleHealingUpload = () => fileInputRef.current?.click();
  const handleDeploy = () => {};
  const handlePublish = () => {};
  const handleSettings = () => {};
  const handleFileSelected = () => {};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.background,
        color: theme.text,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* TOP BAR */}
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
                "radial-gradient(circle at 30% 20%, #9EE7FF, #C7A4FF 40%, #FF8CCF 70%)",
              boxShadow: "0 10px 30px rgba(255, 140, 207, 0.45)"
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

      {/* MAIN LAYOUT */}
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
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            borderRight: `1px solid ${theme.border}`
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
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
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
                marginTop: "6px",
                borderRadius: "999px",
                padding: "0.65rem 1.4rem",
                border: "none",
                background: theme.accent,
                boxShadow: "0 0 18px rgba(255, 140, 207, 0.45)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                opacity: twinThinking ? 0.7 : 1
              }}
            >
              {twinThinking ? "Thinking..." : "Ask TWIN"}
            </button>
          </form>

          {/* BUILD BUTTON */}
          <button
            onClick={handleBuild}
            disabled={twinThinking}
            style={{
              marginTop: "10px",
              borderRadius: "999px",
              padding: "0.65rem 1.4rem",
              border: "none",
              background: "linear-gradient(135deg, #9EE7FF, #C7A4FF, #FF8CCF)",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              opacity: twinThinking ? 0.7 : 1
            }}
          >
            {twinThinking ? "Building..." : "Build App"}
          </button>

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

          {/* IFRAME PREVIEW */}
          <iframe
            title="preview"
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid " + theme.border,
              borderRadius: "1rem",
              background: "#fff"
            }}
            srcDoc={previewHTML}
          />
        </section>
      </main>
    </div>
  );
}

// COMPONENTS
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
        border: `1px solid ${active ? "#FF8CCF" : "#cbd5e1"}`,
        padding: "0.25rem 0.75rem",
        background: active ? "rgba(255,140,207,0.15)" : "transparent",
        color: active ? "#C7A4FF" : "#64748b",
        cursor: "pointer",
        fontSize: "0.75rem"
      }}
    >
      {label}
    </button>
  );
}

export default App;
