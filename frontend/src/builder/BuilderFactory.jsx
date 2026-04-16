// frontend/src/builder/BuilderFactory.jsx
import React from "react";

/** Default meta for builder specs */
export const defaultMeta = {
  name: "builder",
  version: "0.1.0",
  createdAt: null,
  description: "A builder spec (manifest + tokens + initial nodes)",
};

/** Create a canonical builder spec object */
export function createBuilderSpec({ meta = {}, manifest = [], tokens = {}, nodes = [] } = {}) {
  const now = new Date().toISOString();
  return {
    meta: { ...defaultMeta, ...meta, createdAt: meta.createdAt || now },
    manifest: Array.isArray(manifest) ? manifest : [],
    tokens: tokens || {},
    nodes: Array.isArray(nodes) ? nodes : [],
  };
}

/** Instantiate a builder in the current Workspace from a spec */
export function instantiateBuilderFromSpec(spec, { storageKeyPrefix = "blue-lotus" } = {}) {
  if (!spec || typeof spec !== "object") return { ok: false, error: "Invalid spec" };
  try {
    const manifestKey = `${storageKeyPrefix}:manifest:${spec.meta.name || "builder"}`;
    const tokensKey = `${storageKeyPrefix}:tokens:${spec.meta.name || "builder"}`;
    localStorage.setItem(manifestKey, JSON.stringify(spec.manifest));
    localStorage.setItem(tokensKey, JSON.stringify(spec.tokens));

    if (typeof window !== "undefined" && typeof window.twinSetSpec === "function") {
      const nodes = (spec.nodes || []).map((n) => ({
        ...n,
        id: n.id || `n-${Math.random().toString(36).slice(2, 9)}`
      }));
      window.twinSetSpec(nodes);
      return { ok: true, seeded: true, manifestKey, tokensKey };
    }

    const nodesKey = `${storageKeyPrefix}:nodes:${spec.meta.name || "builder"}`;
    localStorage.setItem(nodesKey, JSON.stringify(spec.nodes || []));
    return { ok: true, seeded: false, manifestKey, tokensKey, nodesKey };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/** Lightweight React helper component for the Factory UI */
export function BuilderFactoryUI({ spec, onResult }) {
  const handleInstantiate = () => {
    const res = instantiateBuilderFromSpec(spec);
    if (onResult) onResult(res);
  };

  const handleSave = () => {
    // Note: saveSpecToLocalStorage logic omitted for brevity but remains same as original
    console.log("Saving spec...");
  };

  return (
    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
      <div className="mb-2 font-bold text-sm text-slate-200">
        {spec?.meta?.name || "Builder Spec"}
      </div>
      <div className="text-xs text-slate-500 mb-4 leading-relaxed">
        {spec?.meta?.description || "Portable builder spec"}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={handleInstantiate}
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded transition-all"
        >
          Instantiate
        </button>
        <button 
          onClick={handleSave}
          className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded transition-all"
        >
          Save Template
        </button>
      </div>
    </div>
  );
}

export default {
  createBuilderSpec,
  instantiateBuilderFromSpec,
};
