export default function Image({ src, alt = "", style }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        maxWidth: "100%",
        height: "auto",
        display: "block",
        ...style
      }}
    />
  );
}
