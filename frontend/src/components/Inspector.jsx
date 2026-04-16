// frontend/src/components/Inspector.jsx
import React from "react";
import { useProject } from "../state";
import { findNodeById } from "../utils/findNodeById";

export default function Inspector() {
  const { project, setProject, selectedId } = useProject();

  if (!project || !selectedId) {
    return (
      <div className="p-4 text-slate-500 italic text-sm text-center">
        No component selected.
      </div>
    );
  }

  const node = findNodeById(project.root, selectedId);

  if (!node) {
    return (
      <div className="p-4 text-red-400 text-sm">
        Selected component not found.
      </div>
    );
  }

  function updateProp(key, value) {
    function updateNode(current) {
      if (current.id === selectedId) {
        return {
          ...current,
          props: { ...current.props, [key]: value },
        };
      }
      if (Array.isArray(current.children)) {
        return {
          ...current,
          children: current.children.map(updateNode),
        };
      }
      return current;
    }

    setProject({
      ...project,
      root: updateNode(project.root),
    });
  }

  return (
    <div className="p-4 bg-slate-900 h-full border-l border-slate-800">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
        Properties
      </h3>
      
      <div className="space-y-4">
        <div className="pb-4 border-b border-slate-800">
          <span className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-1 rounded uppercase font-bold">
            {node.type}
          </span>
        </div>

        {Object.entries(node.props || {}).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-slate-500 uppercase">
              {key}
            </label>
            <input
              type="text"
              value={value || ""}
              onChange={(e) => updateProp(key, e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
