// frontend/src/components/primitives/Image.jsx

export default function Image({ src, alt = "", className = "", style = {} }) {
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={`max-w-full h-auto block ${className}`}
    />
  );
}
