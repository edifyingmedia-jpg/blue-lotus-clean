// frontend/src/components/ComponentRenderer.jsx
import React from "react";
import componentRegistry from "./ComponentRegistry";

export default function ComponentRenderer({ component }) {
  // 1. Safety check for malformed component data
  if (!component || !component.type) {
    return null;
  }

  // 2. Resolve the React component from our registry
  const Component = componentRegistry.getComponent(component.type);

  // 3. Error handling for unregistered or unknown components
  if (!Component) {
    return (
      <div className="p-3 my-2 bg-red-900/20 border border-red-900 text-red-200 text-xs rounded-md">
        <span className="font-bold uppercase tracking-tight">Actuation Error:</span> Unknown component type "{component.type}"
      </div>
    );
  }

  // 4. Render the component with its dynamic props
  return <Component {...(component.props || {})} />;
}
