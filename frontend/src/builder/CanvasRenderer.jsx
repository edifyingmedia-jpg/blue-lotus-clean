// frontend/src/builder/CanvasRenderer.jsx
import React, { useMemo, useState } from "react";
import { RegistryV2 } from "./components/registry.jsx";
import { fetchDataForBinding } from "./ai/dataEngine";
import { AppStatusPanel } from "./AppStatusPanel";

/* ------------------------- NAVIGATION COMPONENTS ------------------------- */

function NavItem({ item, activeRoute, onNavigate }) {
  const isActive = activeRoute === item.route;
  return (
    <div 
      onClick={() => onNavigate(item.route)}
      className={`px-3 py-1.5 rounded-md cursor-pointer transition-all text-sm font-medium
        ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
    >
      {item.label}
    </div>
  );
}

function Sidebar({ navigation, activeRoute, onNavigate }) {
  return (
    <div className="w-48 border-r border-slate-800 p-4 bg-slate-900/50 space-y-2">
      {navigation.items.map((item) => (
        <NavItem key={item.route} item={item} activeRoute={activeRoute} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function TopNav({ navigation, activeRoute, onNavigate }) {
  return (
    <div className="flex gap-4 p-3 border-b border-slate-800 bg-slate-900/50 mb-4">
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
    <div className="ml-3 px-2 py-0.5 text-[10px] font-bold bg-blue-900/30 text-blue-400 border border-blue-800/50 rounded uppercase tracking-tighter cursor-help" title={`Bound to ${label}`}>
      {label}
    </div>
  );
}

function RenderNode({ node, backend, previewMode, liveDataCache, loadLiveData }) {
  const Renderer = RegistryV2[node.type];
  const binding = backend?.bindings?.[node.id] || null;

  if (!Renderer) {
    return (
      <div className="p-3 border border-dashed border-red-900 bg-red-900/10 text-red-400 text-xs rounded my-2">
        Unknown component type: <span className="font-bold underline">{node.type}</span>
      </div>
    );
  }

  let content = <Renderer {...node.props} />;

  // Live Data Logic
  if (!previewMode && binding) {
    const key = `${binding.table}:${binding.field || "*"}`;
    const cached = liveDataCache[key];
    if (!cached) {
      loadLiveData(binding);
      return <div className="text-slate-500 text-xs animate-pulse italic">Loading real data...</div>;
    }
    if (cached.error) return <div className="text-red-500 text-xs">Error: {cached.error.message}</div>;
    if (node.type === "input") content = <Renderer {...node.props} value={cached.data ?? ""} />;
  }

  return (
    <div className="mb-4 group">
      <div className="flex items-center">
        {content}
        <BindingBadge binding={binding} />
      </div>
      {node.children?.length > 0 && (
        <div className="ml-6 mt-3 pl-4 border-l border-slate-800">
          {node.children.map((child) => (
            <RenderNode key={child.id} node={child} backend={backend} previewMode={previewMode} liveDataCache={liveDataCache} loadLiveData={loadLiveData} />
          ))}
        </div>
      )}
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

  function loadLiveData(binding) {
    const key = `${binding.table}:${binding.field || "*"}`;
    if (liveDataCache[key]) return;
    fetchDataForBinding(binding).then(({ data, error }) => {
      setLiveDataCache((prev) => ({ ...prev, [key]: { data, error } }));
    });
  }

  return (
    <div className="flex h-full bg-[#020202]">
      {app?.navigation?.type === "sidebar" && <Sidebar navigation={app.navigation} activeRoute={activeRoute} onNavigate={setActiveRoute} />}
      
      <div className="flex-1 p-8 overflow-auto">
        {app?.navigation?.type === "top" && <TopNav navigation={app.navigation} activeRoute={activeRoute} onNavigate={setActiveRoute} />}
        
        <div className="mb-6 flex items-center gap-3">
          <input 
            type="checkbox" 
            checked={previewMode} 
            onChange={(e) => setPreviewMode(e.target.checked)} 
            className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Preview Mode</span>
        </div>

        {activeScreen ? (
          activeScreen.components.map((node) => (
            <RenderNode key={node.id} node={node} backend={app.backend} previewMode={previewMode} liveDataCache={liveDataCache} loadLiveData={loadLiveData} />
          ))
        ) : (
          <p className="text-slate-600 italic">Select a screen to begin.</p>
        )}
      </div>

      <AppStatusPanel app={app} previewMode={previewMode} activeScreen={activeScreen} />
    </div>
  );
}
