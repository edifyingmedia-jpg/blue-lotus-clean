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
 * Renders a single component node using RegistryV2.
 */
function RenderNode({ node }) {
  const Renderer = RegistryV2[node.type];

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
      <Renderer {...node.props} />

      {node.children?.length > 0 && (
        <div style={{ marginLeft: 16, marginTop: 8 }}>
          {node.children.map((child) => (
            <RenderNode key={child.id} node={child} />
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
  // Determine active route
  const initialRoute = app?.navigation?.initialRoute || null;
  const [activeRoute, setActiveRoute] = useState(initialRoute);

  // Find active screen
  const activeScreen =
    app?.screens?.find((s) => s.name.toLowerCase().replace(/\s+/g, "-") === activeRoute) ||
    app?.screens?.[0] ||
    null;

  // Navigation handler
  function handleNavigate(route) {
    setActiveRoute(route);
  }

  // If app exists, render navigation + active screen
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
                  <RenderNode key={node.id} node={node} />
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
        <RenderNode key={node.id} node={node} />
      ))}
    </div>
  );
}
