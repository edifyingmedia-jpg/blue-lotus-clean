// frontend/src/runtime/RenderScreen.jsx
import React from "react";
import ComponentRenderer from "./ComponentRenderer";

/**
 * RenderScreen
 * ----------------------------------------------------
 * Hardened assembly for a single screen view.
 */
export default function RenderScreen({ screen }) {
  if (!screen) {
    return (
      <div className="p-10 text-gray-400 italic text-center">
        No screen provided.
      </div>
    );
  }

  const { components = [] } = screen;

  return (
    <div className="w-full h-full relative overflow-y-auto overflow-x-hidden">
      {components.map((component, index) => (
        <ComponentRenderer 
          key={component.id || `comp-${index}`} 
          component={component} 
          screen={screen} 
        />
      ))}
    </div>
  );
}
