// frontend/src/components/LivePreview.jsx
import React from "react";
import componentRegistry from "./ComponentRegistry";

export default function LivePreview({ tree }) {
  // 1. Safety check for empty trees
  if (!tree || !tree.type) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 italic text-sm">
        Your app preview will appear here...
      </div>
    );
  }

  // 2. Resolve the component
  const Component = componentRegistry.getComponent(tree.type);

  // 3. Modernized Error State
  if (!Component) {
    return (
      <div className="p-4 m-4 bg-red-950/30 border border-red-900/50 rounded-lg">
        <h4 className="text-red-400 text-xs font-bold uppercase mb-1">Preview Error</h4>
        <p className="text-red-200 text-sm">
          The brain requested a <strong>{tree.type}</strong>, but it isn't registered.
        </p>
      </div>
    );
  }

  // 4. Clean Render
  return (
    <div className="w-full h-full bg-white text-slate-900 overflow-auto">
      <Component {...(tree.props || {})} />
    </div>
  );
}
