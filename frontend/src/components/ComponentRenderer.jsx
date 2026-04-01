// frontend/src/components/ComponentRenderer.jsx
import React from "react";
import componentRegistry from "./ComponentRegistry";

export default function ComponentRenderer({ name, props }) {
  const Comp = componentRegistry && componentRegistry[name];
  if (!Comp) {
    return (
      <div style={{ color: "#fff", padding: 12, background: "#111" }}>
        Unknown component: {name}
      </div>
    );
  }
  return <Comp {...(props || {})} />;
}

export { ComponentRenderer };
