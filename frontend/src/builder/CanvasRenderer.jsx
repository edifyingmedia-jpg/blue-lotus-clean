// frontend/src/builder/CanvasRenderer.jsx

import React, { useMemo, useState } from "react";
import { RegistryV2 } from "./components/registry";
import { fetchDataForBinding } from "./ai/dataEngine";
import { AppStatusPanel } from "./AppStatusPanel";

/* -------------------------------------------------------
   NAVIGATION COMPONENTS
------------------------------------------------------- */

function TabBar({ navigation, activeRoute, onNavigate }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: 12, borderBottom: "1px solid #ddd" }}>
      {navigation.items.map((item) => (
        <div
          key={item.route}
          onClick={() => onNavigate(item.route)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            borderRadius: 6,
            background: activeRoute === item.route ? "#4a6cf7" : "transparent",
            color: activeRoute === item.route ? "#fff" : "#333"
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

function Sidebar({ navigation, activeRoute, onNavigate }) {
  return (
    <div style={{ width: 180, borderRight: "1px solid #ddd", padding: 16 }}>
      {navigation.items.map((item) => (
        <div
          key={item.route}
          onClick={() => onNavigate(item.route)}
          style={{
            padding: "8px 12px",
            marginBottom: 8,
            cursor: "pointer",
            borderRadius: 6,
            background: activeRoute === item.route ? "#4a6cf7" : "transparent",
            color: activeRoute === item.route ? "#fff" : "#333"
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

function TopNav({ navigation, activeRoute, onNavigate }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: 12, borderBottom: "1px solid #ddd" }}>
      {navigation.items.map((item) => (
        <div
          key={item.route}
          onClick={() => onNavigate(item.route)}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            borderRadius: 6,
            background: activeRoute === item.route ? "#4a6cf7" : "transparent",
            color: activeRoute === item.route ? "#fff" : "#333"
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   BINDING BADGE
------------------------------------------------------- */

function BindingBadge({ binding }) {
  if (!binding) return null;
  const label = binding.field ? `${binding.table}.${binding.field}` : binding.table;

  return (
    <span
      style={{
        marginLeft: 8,
        fontSize: 11,
        padding: "2px 6px",
        background: "#e8ecff",
        borderRadius: 4
      }}
    >
      {label}
    </span>
  );
}

/* -------------------------------------------------------
   RENDER NODE
------------------------------------------------------- */

function RenderNode({ node, backend, previewMode, liveDataCache, loadLiveData }) {
  const Renderer = RegistryV2[node.type];
  const binding = backend?.bindings?.[node.id];

  if (!Renderer) {
    return <div style={{ color: "red" }}>Unknown component: {node.type}</div>;
  }

  let content = null;

  if (!previewMode && binding) {
    const key = `${binding.table}:${binding.field || "*"}`;
    const cached = liveDataCache[key];

    if (!cached) {
      loadLiveData(binding);
      return <div style={{ color: "#999" }}>Loading real data…</div>;
    }

    if (cached.error) {
      return <div style={{ color: "red" }}>{cached.error.message}</div>;
    }

    if (node.type === "input") {
      content = <Renderer {...node.props} value={cached.data ?? ""} />;
    } else {
      content = <Renderer {...node.props} />;
    }
  }

  if (!content) {
    content = <Renderer {...node.props} />;
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {content}
        <BindingBadge binding={binding} />
      </div>

      {node.children?.map((child) => (
        <RenderNode
          key={child.id}
          node={child}
          backend={backend}
          previewMode={previewMode}
          liveDataCache={liveDataCache}
          loadLiveData={loadLiveData}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   MAIN CANVAS RENDERER
------------------------------------------------------- */

export function CanvasRenderer({ components, app }) {
  const [previewMode, setPreviewMode] = useState(true);
  const [activeRoute, setActiveRoute] = useState(app?.navigation?.initialRoute);
  const [liveDataCache, setLiveDataCache] = useState({});

  const activeScreen = useMemo(() => {
    if (!app?.screens?.length) return null;
    return (
      app.screens.find(
        (s) => s.name.toLowerCase().replace(/\s+/g, "-") === activeRoute
      ) || app.screens[0]
    );
  }, [app, activeRoute]);

  function loadLiveData(binding) {
    const key = `${binding.table}:${binding.field || "*"}`;
    if (liveDataCache[key]) return;

    fetchDataForBinding(binding).then(({ data, error }) => {
      setLiveDataCache((prev) => ({ ...prev, [key]: { data, error } }));
    });
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {app?.navigation?.type === "sidebar" && (
        <Sidebar navigation={app.navigation} activeRoute={activeRoute} onNavigate={setActiveRoute} />
      )}

      <div style={{ flex: 1, padding: 24 }}>
        {app?.navigation?.type === "top" && (
          <TopNav navigation={app.navigation} activeRoute={activeRoute} onNavigate={setActiveRoute} />
        )}

        {app?.navigation?.type === "tabs" && (
          <TabBar navigation={app.navigation} activeRoute={activeRoute} onNavigate={setActiveRoute} />
        )}

        <label style={{ fontSize: 12 }}>
          <input
            type="checkbox"
            checked={previewMode}
            onChange={(e) => setPreviewMode(e.target.checked)}
          />{" "}
          Preview Mode
        </label>

        {activeScreen?.components?.map((node) => (
          <RenderNode
            key={node.id}
            node={node}
            backend={app.backend}
            previewMode={previewMode}
            liveDataCache={liveDataCache}
            loadLiveData={loadLiveData}
          />
        ))}
      </div>

      <AppStatusPanel
        app={app}
        previewMode={previewMode}
        activeScreen={activeScreen}
      />
    </div>
  );
}
