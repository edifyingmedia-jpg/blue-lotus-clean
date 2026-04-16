// frontend/src/components/ComponentPanel.jsx
import React from "react";

export default function ComponentPanel({ addComponent }) {
  const basicComponents = [
    { type: "view", label: "Layout Box (View)" },
    { type: "container", label: "Page Container" },
    { type: "text", label: "Text" },
    { type: "button", label: "Button" },
    { type: "input", label: "Input Field" },
    { type: "image", label: "Image" },
    { type: "spacer", label: "Space" }
  ];

  return (
    <div className="mt-5 p-4 bg-slate-900 text-white rounded-lg border border-slate-700">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-400">
        Components
      </h3>
      <div className="space-y-2">
        {basicComponents.map((comp) => (
          <button
            key={comp.type}
            className="w-full text-left px-3 py-2 text-sm bg-slate-800 hover:bg-blue-600 rounded border border-slate-700 transition-colors"
            onClick={() => addComponent(comp.type)}
          >
            + {comp.label}
          </button>
        ))}
      </div>
    </div>
  );
}
