export default function Workspace() {
  return (
    <div
      style={{
        backgroundColor: "#202020",
        borderRadius: "12px",
        padding: "32px",
        color: "#fff",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        minHeight: "100%",
      }}
    >
      <h1 style={{ marginBottom: "12px" }}>Workspace</h1>
      <p style={{ opacity: 0.75, marginBottom: "8px" }}>
        Workspace ready. No app loaded yet.
      </p>
      <p style={{ opacity: 0.6, fontSize: "13px" }}>
        In later phases, this surface will render live Blue Lotus apps generated
        from TWIN instructions.
      </p>
    </div>
  );
}
