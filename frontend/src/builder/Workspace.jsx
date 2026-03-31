import TwinPanel from "../twin/TwinPanel";

export default function Workspace({ artifact, onCommand }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "420px 1fr",
        height: "100vh",
        background: "#020617",
        color: "#e2e8f0",
      }}
    >
      {/* TWIN */}
      <div
        style={{
          borderRight: "1px solid #1e293b",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TwinPanel artifact={artifact} onSubmit={onCommand} />
      </div>

      {/* Preview / Workspace */}
      <div
        style={{
          padding: 24,
          overflow: "auto",
        }}
      >
        {!artifact ? (
          <div style={{ color: "#64748b" }}>
            Generated apps will appear here.
          </div>
        ) : (
          <div>
            <h3 style={{ marginBottom: 12 }}>Generated App</h3>

            <div
              style={{
                border: "1px solid #1e293b",
                borderRadius: 8,
                padding: 16,
                background: "#0b1220",
              }}
            >
              <pre
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {artifact.files["src/App.jsx"] ||
                  "No previewable entry found."}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
