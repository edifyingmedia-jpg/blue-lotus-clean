// frontend/src/builder/CanvasRenderer.jsx
import React, { useMemo, useState } from "react";
import { RegistryV2 } from "./components/registry.jsx";
import { fetchDataForBinding } from "./ai/dataEngine";
import { AppStatusPanel } from "./AppStatusPanel";

/* ------------------------- PREMIUM NAVIGATION ------------------------- */
function NavItem({ item, activeRoute, onNavigate }) {
  const isActive = activeRoute === item.route;
  return (
    <div 
      onClick={() => onNavigate(item.route)} 
      className={`px-4 py-2 rounded-xl cursor-pointer transition-all text-[10px] font-black uppercase tracking-widest ${
        isActive 
          ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
          : 'text-slate-500 hover:text-cyan-400 hover:bg-white/[0.02]'
      }`}
    >
      {item.label}
    </div>
  );
}

function Sidebar({ navigation, activeRoute, onNavigate }) {
  return (
    <div className="w-56 border-r border-white/5 p-6 bg-[#0F0F14] space-y-2 shadow-2xl">
      <div className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.3em] mb-6 px-4">Navigation_Nodes</div>
      {navigation.items.map((item) => (
        <NavItem key={item.route} item={item} activeRoute={activeRoute} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

/* ------------------------- BINDING & RENDERING ------------------------- */
function BindingBadge({ binding }) {
  if (!binding) return null;
  const label = binding.field ? `${binding.table}.${binding.field}` : binding.table;
  return (
    <div className="ml-4 px-2 py-0.5 text-[8px] font-black bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded uppercase tracking-[0.2em] animate-pulse">
      {label}
    </div>
  );
}

export function CanvasRenderer({ app }) {
  const [activeRoute, setActiveRoute] = useState(app?.navigation?.initialRoute || null);
  const [previewMode, setPreviewMode] = useState(true);
  const [liveDataCache, setLiveDataCache] = useState({});

  const activeScreen = useMemo(() => {
    if (!app?.screens?.length) return null;
    return app.screens.find((s) => s.name.toLowerCase().replace(/\s+/g, "-") === activeRoute) || app.screens[0];
  }, [app, activeRoute]);

  return (
    <div className="flex h-full bg-[#09090B] text-slate-300">
      {app?.navigation?.type === "sidebar" && (
        <Sidebar navigation={app.navigation} activeRoute={activeRoute} onNavigate={setActiveRoute} />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR: SYSTEM CONTROLS */}
        <div className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-8 h-4 rounded-full transition-all relative ${previewMode ? 'bg-cyan-600' : 'bg-slate-800'}`}>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={previewMode} 
                  onChange={(e) => setPreviewMode(e.target.checked)} 
                />
                <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all ${previewMode ? 'left-5' : 'left-1'}`} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300">Preview_Simulation</span>
            </label>
          </div>
          
          <div className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
            Actuation_Mode: <span className="text-cyan-500">{previewMode ? 'STAGING' : 'LIVE_SYNTH'}</span>
          </div>
        </div>

        <div className="flex-1 p-12 overflow-auto custom-scrollbar">
          {activeScreen ? (
            <div className="max-w-4xl mx-auto">
               {/* Rendering Logic remains functionally the same but with premium spacing */}
               {activeScreen.components.map((node) => (
                 <div key={node.id} className="mb-8 group">
                   <div className="flex items-center">
                     {/* The Registry handles the actual component visuals */}
                     <RegistryV2.container {...node.props}>
                        {node.type} Node
                     </RegistryV2.container>
                     <BindingBadge binding={app.backend?.bindings?.[node.id]} />
                   </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-[10px] font-mono text-slate-700 tracking-[1em] uppercase">Void_Sequence</p>
            </div>
          )}
        </div>
      </div>

      <AppStatusPanel app={app} previewMode={previewMode} activeScreen={activeScreen} />
    </div>
  );
}
