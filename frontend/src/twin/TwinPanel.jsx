import { useState } from "react";

export default function TwinPanel({ artifact }) {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!artifact) {
    return (
      <div style={{ padding: 24, color: "#94a3b8" }}>
        TWIN: Ready. Try: "Build an app builder called Lotus Forge".
      </div>
    );
  }

  const files = artifact.files || {};
  const fileNames = Object.keys(files);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        height: "100%",
        background: "#020617",
        color: "#e2e8f0",
      }}
    >
      {/* File List */}
      <div
        style={{
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

        {fileNames.map((name) => (
          <div
            key={name}
            onClick={() => setSelectedFile(name)}
            style={{
              padding: "6px 8px",
              cursor: "pointer",
              borderRadius: 4,
              background:
                selectedFile === name ? "#1e293b" : "transparent",
              color:
                selectedFile === name ? "#e2e8f0" : "#94a3b8",
              fontFamily: "monospace",
              fontSize: 13,
            }}
          >
            {name}
          </div>
        ))}
      </div>

      {/* File Viewer */}
      <div style={{ padding: 24, overflow: "auto" }}>
        {selectedFile ? (
          <>
            <div
              style={{
                fontSize: 13,
                color: "#94a3b8",
                marginBottom: 12,
                fontFamily: "monospace",
              }}
            >
              {selectedFile}
            </div>

            <pre
              style={{
                background: "#020617",
                color: "#e2e8f0",
                padding: 16,
                borderRadius: 6,
                fontSize: 13,
                lineHeight: 1.5,
                overflowX: "auto",
              }}
            >
              {files[selectedFile]}
            </pre>
          </>
        ) : (
          <div style={{ color: "#64748b" }}>
            Select a file to view its contents.
          </div>
        )}
      </div>
    </div>
  );
}
