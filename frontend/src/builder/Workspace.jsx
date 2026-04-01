export default function Workspace({ content }) {
  return (
    <div
      style={{
        height: "100%",
        padding: "32px",
        boxSizing: "border-box",
        background: "#f4f4f4",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: "12px",
          background: "#fff",
          border: "1px solid #ddd",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        {content ? (
          <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
        ) : (
          <div style={{ color: "#666" }}>Workspace idle.</div>
        )}
      </div>
    </div>
  );
}
