import React from "react";

export default function Image({
  src,
  alt = "",
  width,
  height,
  radius,
  fit = "cover",
  style = {}
}) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: width || "100%",
        height: height || "auto",
        borderRadius: radius || 0,
        objectFit: fit,
        display: "block",
        ...style
      }}
    />
  );
}
