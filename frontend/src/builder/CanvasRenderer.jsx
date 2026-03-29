// frontend/src/builder/CanvasRenderer.jsx

import React, { useMemo, useState } from "react";
import { RegistryV2 } from "./components/registry";
import { fetchDataForBinding } from "./ai/dataEngine";

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
   MOCK DATA (PREVIEW MODE)
------------------------------------------------------- */

function capitalizeFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

function generateMockRow(tableName, tableDef, index) {
  const row = {};
  const fields = tableDef?.fields || {};

  Object.keys(fields).forEach((fieldName) => {
    const lower = fieldName.toLowerCase();

    if (fieldName === "id") {
      row.id = `${tableName}_${index + 1}`;
    } else if (lower.includes("email")) {
      row[fieldName] = `user${index + 1}@example.com`;
    } else if (lower.includes("name")) {
      row[fieldName] = ["Alice", "Bob", "Charlie", "Dana"][index % 4];
    } else if (lower.includes("title")) {
      row[fieldName] = `Sample ${capitalizeFirst(tableName)} Title ${index + 1}`;
    } else if (lower.includes("description")) {
      row[fieldName] = `Sample description for ${tableName} #${index + 1}.`;
    } else if (lower.includes("price")) {
      row[fieldName] = (19.99 + index).toFixed(2);
    } else if (lower.includes("date")) {
      row[fieldName] = "2026-03-29";
    } else {
      row[fieldName] = `${capitalizeFirst(fieldName)} ${index + 1}`;
    }
  });

  return row;
}

function generateMockTableData(backend, tableName, count = 3) {
  const tableDef = backend?.schema?.[tableName];
  if (!tableDef) return [];
  return Array.from({ length: count }, (_, i) =>
    generateMockRow(tableName, tableDef, i)
  );
}

function getPreviewValue(backend, binding) {
  const rows = generateMockTableData(backend, binding.table, 1);
  const row = rows[0];
  if (!row) return null;

  if (binding.field) return row[binding.field];

  const fields = backend.schema[binding.table].fields;
  const firstTextField =
    Object.keys(fields).find((f) =>
      ["name", "title", "email"].some((k) => f.toLowerCase().includes(k))
    ) || Object.keys(fields)[0];

  return row[firstTextField];
}

/* -------------------------------------------------------
   RENDER NODE
------------------------------------------------------- */

function RenderNode({
  node,
  backend,
  previewMode,
  liveDataCache,
  loadLiveData
}) {
  const Renderer = RegistryV2[node.type];
  const binding = backend?.bindings?.[node.id] || null;

  if (!Renderer) {
    return (
      <div style={{ padding: 12, border: "1px dashed red" }}>
        Unknown component type: {node.type}
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
      return (
        <div style={{ color: "red" }}>
          Error loading data: {cached.error.message}
        </div>
      );
    }

    const data = cached.data;

    if (node.type === "list") {
      return (
        <div>
          {Array.isArray(data) &&
            data.map((row, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 8px",
                  borderBottom: "1px solid #eee"
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
        </div>
      );
    }

    if (node.type === "input") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Renderer {...node.props} value={data ?? ""} />
          <BindingBadge binding={binding} />
        </div>
      );
    }

    if (node.type === "card") {
      const row = Array.isArray(data) ? data[0] : null;
      if (row) {
        return (
          <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 6 }}>
            {Object.keys(row)
              .filter((k) => k !== "id")
              .slice(0, 4)
              .map((field) => (
                <div key={field} style={{ marginBottom: 4 }}>
                  <strong>{field}:</strong> {String(row[field])}
                </div>
              ))}
          </div>
        );
      }
    }
  }

  /* -----------------------------
     PREVIEW MODE (MOCK DATA)
  ----------------------------- */
  if (previewMode && binding) {
    if (node.type === "input") {
      const value = getPreviewValue(backend, binding);
      content = <Renderer {...node.props} value={value ?? ""} />;
    } else if (node.type === "list") {
      const rows = generateMockTableData(backend, binding.table);
      content = (
        <div>
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                padding: "6px 8px",
                borderBottom: "1px solid #eee"
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
        </div>
      );
    } else if (node.type === "card") {
      const row = generateMockTableData(backend, binding.table)[0];
      if (row) {
        content = (
          <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 6 }}>
            {Object.keys(row)
              .filter((k) => k !== "id")
              .slice(0, 4)
              .map((field) => (
                <div key={field} style={{ marginBottom: 4 }}>
                  <strong>{field}:</strong> {String(row[field])}
                </div>
              ))}
          </div>
        );
      }
    }
  }

  /* -----------------------------
     DEFAULT RENDER
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
   MAIN CANVAS RENDERER (OWNER VERSION)
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

  function handleNavigate(route) {
    setActiveRoute(route);
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

          <div style={{ marginBottom: 12, textAlign: "right" }}>
            <label style={{ fontSize: 12, cursor: "pointer" }}>
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
            <div>
              <h2 style={{ marginBottom: 16 }}>{activeScreen.name}</h2>
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
          ) : (
            <p style={{ color: "#888" }}>No screen selected.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {components?.map((node) => (
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
