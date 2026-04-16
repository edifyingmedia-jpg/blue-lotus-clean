// frontend/src/builder/BuilderCanvas.jsx
import React from "react";
import { ComponentRenderer } from "../components";

export default function BuilderCanvas({ appDefinition }) {
  // 1. Safety check for empty or invalid definitions
  if (!appDefinition || (!appDefinition.sections && !appDefinition.root)) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#050505] text-slate-500">
        <div className="text-center p-8 border border-dashed border-slate-800 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-400 mb-2">No App Manifested</h2>
          <p className="text-sm">Ask TWIN to begin the architectural sequence.</p>
        </div>
      </div>
    );
  }

  // 2. Modernized Layout using the centralized ComponentRenderer
  // Supports both 'sections' arrays and single 'root' node trees
  const rootNode = appDefinition.root || { type: 'Container', children: appDefinition.sections };

  return (
    <div className="w-full h-full bg-white overflow-auto shadow-inner">
      <div className="max-w-5xl mx-auto min-h-full">
        <ComponentRenderer component={rootNode} />
      </div>
    </div>
  );
}
