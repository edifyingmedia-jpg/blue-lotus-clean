// frontend/src/builder/AppStatusPanel.jsx

import React from "react";

export function AppStatusPanel({ app, previewMode, activeScreen }) {
  if (!app) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 260,
        padding: 12,
        background: "#111",
        color: "#fff",
        fontSize: 12,
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 9999
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: 6 }}>
        Blue Lotus — Owner Status
      </div>

      <div>App: {app.name || "Unnamed App"}</div>
      <div>Preview Mode: {previewMode ? "ON" : "OFF"}</div>
      <div>
        Active Screen: {activeScreen?.name || "None"}
      </div>
      <div>
        Screens: {app.screens?.length || 0}
      </div>
      <div>
        Components on Screen: {activeScreen?.components?.length || 0}
      </div>

      <div style={{ marginTop: 8, color: "#7dd3fc" }}>
        Supabase: Connected
      </div>
    </div>
  );
}
