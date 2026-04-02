export default function Input({ value, onChange, placeholder, style }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "10px 12px",
        borderRadius: 6,
        border: "1px solid #ccc",
        fontSize: 14,
        width: "100%",
        ...style
      }}
    />
  );
}
