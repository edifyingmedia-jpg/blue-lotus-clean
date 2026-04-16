// frontend/src/builder/BuilderFactory.jsx
import React from "react";

/** Default meta for builder specs */
export const defaultMeta = {
  name: "builder",
  version: "1.0.0-PRIME",
  createdAt: null,
  description: "Architectural blueprint for neural actuation.",
  tier: "ACOLYTE", // Default tier
  commission_rate: 0.10 // Your 10% Architect Fee
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
  if (!spec || typeof spec !== "object") return { ok: false, error: "INVALID_SPEC" };
  
  try {
    const manifestKey = `${storageKeyPrefix}:manifest:${spec.meta.name}`;
    const tokensKey = `${storageKeyPrefix}:tokens:${spec.meta.name}`;
    
    localStorage.setItem(manifestKey, JSON.stringify(spec.manifest));
    localStorage.setItem(tokensKey, JSON.stringify(spec.tokens));

    if (typeof window !== "undefined" && typeof window.twinSetSpec === "function") {
      const nodes = (spec.nodes || []).map((n) => ({
        ...n,
        id: n.id || `n-${Math.random().toString(36).slice(2, 9)}`
      }));
      window.twinSetSpec(nodes);
      return { ok: true, seeded: true };
    }

    return { ok: true, seeded: false };
  } catch (err) {
    return { ok: false, error: "STORAGE_FAULT" };
  }
}

/** The Premium Factory UI */
export function BuilderFactoryUI({ spec, onResult }) {
  const handleInstantiate = () => {
    const res = instantiateBuilderFromSpec(spec);
    if (onResult) onResult(res);
  };

  return (
    <div className="p-6 bg-[#0F0F14] border border-white/5 rounded-[2rem] shadow-2xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-black text-[10px] text-cyan-500 uppercase tracking-[0.3em]">
            {spec?.meta?.name || "Blueprint_Null"}
          </div>
          <div className="text-[9px] font-mono text-slate-600 mt-1 uppercase tracking-widest">
            Tier: {spec?.meta?.tier || "UNRANKED"}
          </div>
        </div>
        <div className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">
          v{spec?.meta?.version}
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-6 leading-relaxed italic">
        "{spec?.meta?.description || "No description provided for this architecture."}"
      </p>

      <div className="flex gap-3">
        <button 
          onClick={handleInstantiate} 
          className="flex-1 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all active:scale-[0.95]"
        >
          Actuate Template
        </button>
        <button className="flex-1 py-4 bg-transparent border border-white/10 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-white transition-colors">
          Forge Clone
        </button>
      </div>
      
      {/* Commission Logic Teaser */}
      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-[8px] font-mono text-slate-700 uppercase tracking-[0.2em]">Architecture Tax</span>
        <span className="text-[9px] font-bold text-cyan-900">10.00%</span>
      </div>
    </div>
  );
}

export default { createBuilderSpec, instantiateBuilderFromSpec };
