// frontend/src/builder/CanvasRenderer.jsx

import React, { useMemo, useState } from "react";
import { RegistryV2 } from "./components/registry.jsx";
import { fetchDataForBinding } from "./ai/dataEngine";
import { AppStatusPanel } from "./AppStatusPanel";

/* -------------------------------------------------------
   NAVIGATION COMPONENTS
------------------------------------------------------- */

function TabBar({ navigation, activeRoute, onNavigate }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "12px 16px",
        borderBottom: "1px solid #ddd",
        background: "#fafafa",
        marginBottom: 16
      }}
    >
      {navigation.items.map((item) => (
        <div
          key={item.route}
          onClick={() => onNavigate(item.route)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
            background: activeRoute === item.route ? "#4a6cf7" : "transparent",
            color: activeRoute === item.route ? "white" : "#333",
            fontWeight: activeRoute === item.route ? "bold" : "normal"
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
    <div
      style={{
        width: 180,
        borderRight: "1px solid #ddd",
        padding: 16,
        background: "#fafafa"
      }}
    >
      {navigation.items.map((item) => (
        <div
          key={item.route}
          onClick={() => onNavigate(item.route)}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: 8,
            background: activeRoute === item.route ? "#4a6cf7" : "transparent",
            color: activeRoute === item.route ? "white" : "#333",
            fontWeight: activeRoute === item.route ? "bold" : "normal"
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
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "12px 16px",
        borderBottom: "1px solid #ddd",
        background: "#fafafa",
        marginBottom: 16
      }}
    >
      {navigation.items.map((item) => (
        <div
          key={item.route}
          onClick={() => onNavigate(item.route)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
            background: activeRoute === item.route ? "#4a6cf7" : "transparent",
            color: activeRoute === item.route ? "white" : "#333",
            fontWeight: activeRoute === item.route ? "bold" : "normal"
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
    <div
      style={{
        display: "inline-block",
        marginLeft: 8,
        padding: "2px 6px",
        fontSize: 11,
        background: "#e8ecff",
        color: "#3b4cca",
        borderRadius: 4,
        border: "1px solid #d0d7ff",
        cursor: "default"
      }}
      title={`Bound to ${label}`}
    >
      {label}
    </div>
  );
}

/* -------------------------------------------------------
   RENDER NODE
------------------------------------------------------- */

function RenderNode({ node, backend, previewMode, liveDataCache, loadLiveData }) {
  const Renderer = RegistryV2[node.type];
  const binding = backend?.bindings?.[node.id] || null;

  if (!Renderer) {
    return (
      <div style={{ padding: 12, border: "1px dashed red" }}>
        Unknown component type: <strong>{node.type}</strong>
      </div>
    );
  }

  let content = null;

  /* -----------------------------
     LIVE DATA MODE
  ----------------------------- */
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

  /* -----------------------------
     PREVIEW MODE (MOCK)
  ----------------------------- */
  if (!content) {
    content = <Renderer {...node.props} />;
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {content}
        <BindingBadge binding={binding} />
      </div>

      {node.children?.length > 0 && (
        <div style={{ marginLeft: 16, marginTop: 8 }}>
          {node.children.map((child) => (
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
      )}
    </div>
  );
}

/* -------------------------------------------------------
   MAIN CANVAS RENDERER
------------------------------------------------------- */

export function CanvasRenderer({ components, app }) {
  const initialRoute = app?.navigation?.initialRoute || null;
  const [activeRoute, setActiveRoute] = useState(initialRoute);
  const [previewMode, setPreviewMode] = useState(true);
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
      setLiveDataCache((prev) => ({
        ...prev,
        [key]: { data, error }
      }));
    });
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {app?.navigation?.type === "sidebar" && (
        <Sidebar
          navigation={app.navigation}
          activeRoute={activeRoute}
          onNavigate={setActiveRoute}
        />
      )}

      <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
        {app?.navigation?.type === "top" && (
          <TopNav
            navigation={app.navigation}
            activeRoute={activeRoute}
            onNavigate={setActiveRoute}
          />
        )}

        {app?.navigation?.type === "tabs" && (
          <TabBar
            navigation={app.navigation}
            activeRoute={activeRoute}
            onNavigate={setActiveRoute}
          />
        )}

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12 }}>
            <input
              type="checkbox"
              checked={previewMode}
              onChange={(e) => setPreviewMode(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Preview Mode (off = real data)
          </label>
        </div>

        {activeScreen ? (
          activeScreen.components.map((node) => (
            <RenderNode
              key={node.id}
              node={node}
              backend={app.backend}
              previewMode={previewMode}
              liveDataCache={liveDataCache}
              loadLiveData={loadLiveData}
            />
          ))
        ) : (
          <p style={{ color: "#888" }}>No screen selected
