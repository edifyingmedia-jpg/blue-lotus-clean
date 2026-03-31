import { useEffect, useMemo, useState } from "react";

export function TwinPanel({ artifact }) {
  const files = useMemo(() => artifact?.files || {}, [artifact]);
  const fileNames = useMemo(() => Object.keys(files), [files]);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!selectedFile && fileNames.length) {
      setSelectedFile(fileNames[0]);
    }
  }, [fileNames, selectedFile]);

  if (!artifact) {
    return (
      <div style={{ color: "#64748b", padding: 16 }}>
        TWIN: Ready. Try: "Build an app builder called Lotus Forge".
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
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
      <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
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
                background: "#0b1220",
                border: "1px solid #1e293b",
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

export default TwinPanel;
