// frontend/src/builder/CanvasRenderer.jsx

import React, { useState } from "react";
import { RegistryV2 } from "./components/registry";

/**
 * Hybrid Navigation UI Components
 * --------------------------------
 * Clean, readable, not overly styled.
 */

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

/**
 * Data Binding Badge (Hybrid Mode)
 * --------------------------------
 * Appears inline next to components that are bound to backend data.
 * Hovering shows a tooltip with table/field info.
 */

function BindingBadge({ binding }) {
  if (!binding) return null;

  const label = binding.field
    ? `${binding.table}.${binding.field}`
    : binding.table;

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
        cursor: "default",
        border: "1px solid #d0d7ff",
        position: "relative"
      }}
      title={`Bound to ${label}`}
    >
      {label}
    </div>
  );
}

/**
 * Renders a single component node using RegistryV2.
 * Includes data-binding indicators.
 */
function RenderNode({ node, backend }) {
  const Renderer = RegistryV2[node.type];

  const binding = backend?.bindings?.[node.id] || null;

  if (!Renderer) {
    return (
      <div
        style={{
          padding: 12,
          border: "1px dashed red",
          marginBottom: 8
        }}
      >
        Unknown component type: <strong>{node.type}</strong>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Renderer {...node.props} />
        <BindingBadge binding={binding} />
      </div>

      {node.children?.length > 0 && (
        <div style={{ marginLeft: 16, marginTop: 8 }}>
          {node.children.map((child) => (
            <RenderNode key={child.id} node={child} backend={backend} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Main Canvas Renderer
 */
export function CanvasRenderer({ components, app }) {
  const initialRoute = app?.navigation?.initialRoute || null;
  const [activeRoute, setActiveRoute] = useState(initialRoute);

  const activeScreen =
    app?.screens?.find((s) => s.name.toLowerCase().replace(/\s+/g, "-") === activeRoute) ||
    app?.screens?.[0] ||
    null;

  function handleNavigate(route) {
    setActiveRoute(route);
  }

  if (app) {
    return (
      <div style={{ display: "flex", height: "100%" }}>
        {/* Sidebar */}
        {app.navigation?.type === "sidebar" && (
          <Sidebar
            navigation={app.navigation}
            activeRoute={activeRoute}
            onNavigate={handleNavigate}
          />
        )}

        <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
          {/* Top Nav */}
          {app.navigation?.type === "top" && (
            <TopNav
              navigation={app.navigation}
              activeRoute={activeRoute}
              onNavigate={handleNavigate}
            />
          )}

          {/* Tab Bar */}
          {app.navigation?.type === "tabs" && (
            <TabBar
              navigation={app.navigation}
              activeRoute={activeRoute}
              onNavigate={handleNavigate}
            />
          )}

          {/* Active Screen */}
          {activeScreen ? (
            <div>
              <h2 style={{ marginBottom: 16 }}>{activeScreen.name}</h2>
              <div>
                {activeScreen.components.map((node) => (
                  <RenderNode
                    key={node.id}
                    node={node}
                    backend={app.backend}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p style={{ color: "#888" }}>No screen selected.</p>
          )}
        </div>
      </div>
    );
  }

  // No app → fallback to component-only rendering
  if (!components || components.length === 0) {
    return (
      <p style={{ color: "#888" }}>
        No components to render. Use the AI panel to generate UI.
      </p>
    );
  }

  return (
    <div>
      {components.map((node) => (
        <RenderNode key={node.id} node={node} backend={null} />
      ))}
    </div>
  );
}
