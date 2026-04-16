// frontend/src/runtime/PageRenderer.jsx
import React from "react";
import ComponentRenderer from "./ComponentRenderer";

/**
 * Assemblies the active page by mapping top-level components.
 */
export default function PageRenderer({ page }) {
  if (!page) {
    return (
      <div className="p-8 text-gray-400 italic text-center">
        No page selected or screen is empty.
      </div>
    );
  }

  return (
    <div 
      className={`w-full min-h-full ${page.className || ""}`}
      style={page.style}
    >
      {page.components?.map((component) => (
        <ComponentRenderer 
          key={component.id} 
          component={component} 
        />
      ))}
    </div>
  );
}
