export default function Button({ label, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: 6,
        border: "1px solid #ccc",
        background: "#f5f5f5",
        cursor: "pointer",
        fontSize: 14,
        ...style
      }}
    >
      {label}
    </button>
  );
}
