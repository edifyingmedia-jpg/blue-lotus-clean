export default function Workspace({ artifact }) {
  if (!artifact) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#64748b",
          fontSize: 14,
        }}
      >
        Generated apps will appear here.
      </div>
    );
  }

  const entry =
    artifact.files["src/main.jsx"] ||
    artifact.files["src/App.jsx"] ||
    Object.values(artifact.files)[0];

  return (
    <div
      style={{
        height: "100%",
        padding: 24,
        overflow: "auto",
        background: "#0b1220",
      }}
    >
      <div
        style={{
          marginBottom: 12,
          fontSize: 13,
          color: "#94a3b8",
          fontFamily: "monospace",
        }}
      >
        App Preview
      </div>

      <div
        style={{
          border: "1px solid #1e293b",
          borderRadius: 8,
          padding: 16,
          background: "#020617",
        }}
      >
        <pre
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            color: "#e2e8f0",
          }}
        >
          {entry}
        </pre>
      </div>
    </div>
  );
}
