import React from "react";
import ComponentRenderer from "./ComponentRenderer";

export default function PageRenderer({ page }) {
  if (!page) {
    return (
      <div style={{ padding: "1rem", color: "#666" }}>
        No page selected.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {page.components?.map((component) => (
        <ComponentRenderer key={component.id} node={component} />
      ))}
    </div>
  );
}
