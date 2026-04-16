// frontend/src/workspace/workspace.jsx
import React, { useEffect, useState } from "react";
import ThemeProvider from "../theme/ThemeProvider";
import { loadManifestAndTokens, loadNodesForBuilder } from "../builder/localManifestLoader";
import componentRegistry from "../components/ComponentRegistry";

/**
 * Workspace (Empire Edition)
 * -------------------------
 * The primary industrial console for Blue Lotus.
 * Hardened for Ink & Cyan aesthetics and 10% Revenue tracking.
 */
export default function Workspace({ builderName = "basic-builder", children }) {
  const [manifest, setManifest] = useState([]);
  const [tokens, setTokens] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const { manifest: loadedManifest, tokens: loadedTokens } = await loadManifestAndTokens(builderName);
        if (!mounted) return;
        
        setManifest(Array.isArray(loadedManifest) ? loadedManifest : []);
        setTokens(loadedTokens || null);

        const nodesRes = loadNodesForBuilder(builderName);
        if (nodesRes.ok && Array.isArray(nodesRes.nodes) && nodesRes.nodes.length) {
          if (typeof window !== "undefined" && typeof window.twinSetSpec === "function") {
            window.twinSetSpec(nodesRes.nodes);
          }
        }
        setLoaded(true);
        console.log(`WORKSPACE_INITIALIZED: [${builderName}] active.`);
      } catch (err) {
        console.error("WORKSPACE_INIT_FAILURE:", err);
        setLoaded(true);
      }
    }
    init();
    return () => { mounted = false; };
  }, [builderName]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-cyan-500 animate-pulse">
          Loading_Workspace_Neural_Bridge...
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider customTokens={tokens || undefined}>
      <div className="flex h-screen bg-[#09090B] overflow-hidden">
        
        {/* LEFT: PRIMARY CANVAS */}
        <main className="flex-1 overflow-auto p-6 border-r border-white/5">
          <div className="max-w-7xl mx-auto">
            {children || (
              <div className="p-12 border border-dashed border-white/10 rounded-[2.5rem] bg-white/5">
                <h3 className="text-[14px] font-black uppercase tracking-[0.4em] text-white mb-4">Blue Lotus Workspace</h3>
                <div className="text-[10px] font-mono text-slate-500 space-y-2 uppercase tracking-widest">
                  <p>Manifest_Nodes: {manifest.length}</p>
                  <p>Atmospheric_Tokens: {tokens ? "Active" : "Standard"}</p>
                  <p>Revenue_Model: 10%_Architect_Tax</p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT: INDUSTRIAL INSPECTOR */}
        <aside className="w-80 bg-[#0F0F14] border-l border-white/5 flex flex-col">
          <header className="p-6 border-b border-white/5 bg-black/20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Neural_Manifest</h2>
          </header>
          
          <div className="flex-1 overflow-y-auto p-6">
            {manifest.length === 0 ? (
              <div className="text-[9px] font-mono text-slate-700 uppercase">Void_Manifest</div>
            ) : (
              <ul className="space-y-6">
                {manifest.map((m) => (
                  <li key={m.name} className="group">
                    <div className="text-[10px] font-bold text-cyan-500/80 group-hover:text-cyan-400 transition-colors uppercase tracking-wider">
                      {m.label || m.name}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 mt-1 uppercase tracking-tight leading-relaxed">
                      {m.description}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <footer className="p-6 border-t border-white/5 bg-black/40">
            <div className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-2">Registry_Nodes</div>
            <div className="text-[8px] font-mono text-slate-400 truncate">
              {typeof componentRegistry.componentNames === "function" 
                ? componentRegistry.componentNames().join(", ") 
                : "VOID"}
            </div>
          </footer>
        </aside>
      </div>
    </ThemeProvider>
  );
}
