// frontend/src/builder/CanvasRenderer.jsx

import React, { useMemo, useState } from "react";
import { RegistryV2 } from "./components/registry";
import { fetchDataForBinding } from "./ai/dataEngine";

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
 * Schema-aware mock data generator (owner-only preview)
 * -----------------------------------------------------
 * Uses field names to infer realistic sample values.
 */

function generateMockRow(tableName, tableDef, index) {
  const row = {};
  const fields = tableDef?.fields || {};

  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName];
    const type = field.type || "text";

    if (fieldName === "id") {
      row.id = `${tableName}_${index + 1}`;
      return;
    }

    const lower = fieldName.toLowerCase();

    if (lower.includes("email")) {
      row[fieldName] = `user${index + 1}@example.com`;
    } else if (lower.includes("name")) {
      const names = ["Alice", "Bob", "Charlie", "Dana"];
      row[fieldName] = names[index % names.length];
    } else if (lower.includes("title")) {
      row[fieldName] = `Sample ${capitalizeFirst(tableName)} Title ${index + 1}`;
    } else if (lower.includes("description")) {
      row[fieldName] = `Sample description for ${tableName} #${index + 1}.`;
    } else if (lower.includes("price")) {
      row[fieldName] = (19.99 + index).toFixed(2);
    } else if (lower.includes("count")) {
      row[fieldName] = index + 1;
    } else if (lower.includes("age")) {
      row[fieldName] = 20 + index;
    } else if (lower.includes("date")) {
      row[fieldName] = "2026-03-29";
    } else if (lower.includes("avatar") || lower.includes("image")) {
      row[fieldName] = null;
    } else if (type === "number") {
      row[fieldName] = index + 1;
    } else {
      row[fieldName] = `${capitalizeFirst(fieldName)} ${index + 1}`;
    }
  });

  return row;
}

function generateMockTableData(backend, tableName, rowCount = 3) {
  if (!backend?.schema?.[tableName]) return [];
  const tableDef = backend.schema[tableName];

  const rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push(generateMockRow(tableName, tableDef, i));
  }
  return rows;
}

function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Render helpers for preview mode
 * --------------------------------
 */

function getPreviewValueForBinding(backend, binding) {
  if (!binding?.table) return null;

  const rows = generateMockTableData(backend, binding.table, 1);
  const row = rows[0];
  if (!row) return null;

  if (binding.field) {
    return row[binding.field] ?? null;
  }

  const fields = backend?.schema?.[binding.table]?.fields || {};
  const textField =
    Object.keys(fields).find((f) => {
      const lf = f.toLowerCase();
      return (
        lf.includes("name") ||
        lf.includes("title") ||
        lf.includes("label") ||
        lf.includes("email")
      );
    }) || Object.keys(fields)[0];

  return textField ? row[textField] : null;
}

function getPreviewListData(backend, binding) {
  if (!binding?.table) return [];
  return generateMockTableData(backend, binding.table, 3);
}

/**
 * Renders a single component node using RegistryV2.
 * Includes:
 * - data-binding indicators
 * - owner preview mode (mock data)
 * - live data mode (real Supabase reads)
 */

function RenderNode({ node, backend, previewMode, liveDataCache, loadLiveData }) {
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

  let content = null;

  // Live data mode (previewMode = false)
  if (!previewMode && binding && backend) {
    const key = `${binding.table}:${binding.field || "*"}`;
    const cached = liveDataCache[key];

    if (!cached) {
      loadLiveData(binding);
      return (
        <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>
          Loading real data…
        </div>
      );
    }

    if (cached.error) {
      content = (
        <div style={{ fontSize: 12, color: "red" }}>
          Error loading data: {cached.error.message}
        </div>
      );
    } else {
      if (node.type === "list") {
        const rows = cached.data || [];
        content = (
          <div>
            {rows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  padding: "6px 8px",
                  borderBottom: "1px solid #eee",
                  fontSize: 13
                }}
              >
                {Object.keys(row)
                  .filter((k) => k !== "id")
                  .slice(0, 3)
                  .map((field) => (
                    <span key={field} style={{ marginRight: 8 }}>
                      <strong>{field}:</strong> {String(row[field])}
                    </span>
                  ))}
              </div>
            ))}
            {rows.length === 0 && (
              <div style={{ fontSize: 12, color: "#999" }}>No rows found.</div>
            )}
          </div>
        );
      } else if (node.type === "input") {
        content = <Renderer {...node.props} value={cached.data ?? ""} />;
      } else if (node.type === "card") {
        const rows = cached.data || [];
        const row = Array.isArray(rows) ? rows[0] : null;
        if (row) {
          content = (
            <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 6 }}>
              {Object.keys(row)
                .filter((k) => k !== "id")
                .slice(0, 4)
                .map((field) => (
                  <div key={field} style={{ marginBottom: 4, fontSize: 13 }}>
                    <strong>{field}:</strong> {String(row[field])}
                  </div>
                ))}
            </div>
          );
        } else {
          content = <Renderer {...node.props} />;
        }
      } else {
        content = <Renderer {...node.props} />;
      }
    }
  }

  // Preview mode (mock data)
  if (previewMode && binding && backend && !content) {
    if (node.type === "input") {
      const value = getPreviewValueForBinding(backend, binding);
      content = <Renderer {...node.props} value={value ?? ""} />;
    } else if (node.type === "list") {
      const rows = getPreviewListData(backend, binding);
      content = (
        <div>
          {rows.map((row, idx) => (
            <div
              key={idx}
              style={{
                padding: "6px 8px",
                borderBottom: "1px solid #eee",
                fontSize: 13
              }}
            >
              {Object.keys(row)
                .filter((k) => k !== "id")
                .slice(0, 3)
                .map((field) => (
                  <span key={field} style={{ marginRight: 8 }}>
                    <strong>{field}:</strong> {String(row[field])}
                  </span>
                ))}
            </div>
          ))}
          {rows.length === 0 && (
            <div style={{ fontSize: 12, color: "#999" }}>No sample rows.</div>
          )}
        </div>
      );
    } else if (node.type === "card") {
      const rows = getPreviewListData(backend, binding);
      const row = rows[0];
      if (row) {
        content = (
          <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 6 }}>
            {Object.keys(row)
              .filter((k) => k !== "id")
              .slice(0, 4)
              .map((field) => (
                <div key={field} style={{ marginBottom: 4, fontSize: 13 }}>
                  <strong>{field}:</strong> {String(row[field])}
                </div>
              ))}
          </div>
        );
      } else {
        content = <Renderer {...node.props} />;
      }
    } else {
      content = <Renderer {...node.props} />;
    }
  }

  // No binding or no special handling → default render
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

/**
 * Main Canvas Renderer (OWNER VERSION)
 * ------------------------------------
 * - Navigation (tabs, sidebar, top)
 * - Data-binding badges
 * - Live Preview Mode (schema-aware mock data)
 * - Live Data Mode (real Supabase reads)
 */

export function CanvasRenderer({ components, app }) {
  const initialRoute = app?.navigation?.initialRoute || null;
  const [activeRoute, setActiveRoute] = useState(initialRoute);
  const [previewMode, setPreviewMode] = useState(true); // OWNER-ONLY TOGGLE
  const [liveDataCache, setLiveDataCache] = useState({});

  const activeScreen = useMemo(() => {
    if (!app?.screens || app.screens.length === 0) return null;
    const byRoute =
      app.screens.find(
        (s) => s.name.toLowerCase().replace(/\s+/g, "-") === activeRoute
      ) || null;
    return byRoute || app.screens[0];
  }, [app, activeRoute]);

  function handleNavigate(route) {
    setActiveRoute(route);
  }

  async function loadLiveData(binding) {
    if (!binding) return;
    const key = `${binding.table}:${binding.field || "*"}`;
    if (liveDataCache[key]) return;

    const { data, error } = await fetchDataForBinding(binding);

    setLiveDataCache((prev) => ({
      ...prev,
      [key]: { data, error }
    }));
  }

  if (app) {
    return (
      <div style={{ display: "flex", height: "100%" }}>
        {app.navigation?.type === "sidebar" && (
          <Sidebar
            navigation={app.navigation}
            activeRoute={activeRoute}
            onNavigate={handleNavigate}
          />
        )}

        <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
          {app.navigation?.type === "top" && (
            <TopNav
              navigation={app.navigation}
              activeRoute={activeRoute}
              onNavigate={handleNavigate}
            />
          )}

          {app.navigation?.type === "tabs" && (
            <TabBar
              navigation={app.navigation}
              activeRoute={activeRoute}
              onNavigate={handleNavigate}
            />
          )}

          <div style={{ marginBottom: 12, display: "flex", justifyContent: "flex-end" }}>
            <label
              style={{
                fontSize: 12,
                color: "#555",
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer"
              }}
            >
              <input
                type="checkbox"
                checked={previewMode}
                onChange={(e) => setPreviewMode(e.target.checked)}
                style={{ cursor: "pointer" }}
              />
              Live data preview (off = real Supabase data)
            </label>
          </div>

          {activeScreen ? (
            <div>
              <h2 style={{ marginBottom: 16 }}>{activeScreen.name}</h2>
              <div>
                {activeScreen.components.map((node) => (
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
            </div>
          ) : (
            <p style={{ color: "#888" }}>No screen selected.</p>
          )}
        </div>
      </div>
    );
  }

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
        <RenderNode
          key={node.id}
          node={node}
          backend={null}
          previewMode={false}
          liveDataCache={{}}
          loadLiveData={() => {}}
        />
      ))}
    </div>
  );
}
