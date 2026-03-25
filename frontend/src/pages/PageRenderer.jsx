import React from "react";
import { getComponentRenderer } from "../components/ComponentRegistry";

export default function PageRenderer({ page }) {
  if (!page) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>{page.name}</h2>

      {page.components.map((component) => {
        const Renderer = getComponentRenderer(component.type);
        if (!Renderer) return null;

        return (
          <div key={component.id} style={{ marginBottom: 15 }}>
            <Renderer component={component} />
          </div>
        );
      })}
    </div>
  );
}
