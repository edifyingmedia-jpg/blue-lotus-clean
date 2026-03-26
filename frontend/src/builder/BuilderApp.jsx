// frontend/src/builder/BuilderApp.jsx

import React, { useMemo } from "react";
import LivePreview from "../runtime/LivePreview";
import useBuilderState from "../runtime/state/useBuilderState";

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function findComponentById(components, id) {
  for (const c of components || []) {
    if (c.id === id) return c;
    const kids = c.children || [];
    const found = findComponentById(kids, id);
    if (found) return found;
  }
  return null;
}

function flattenComponents(components, out = []) {
  for (const c of components || []) {
    out.push(c);
    if (c.children?.length) flattenComponents(c.children, out);
  }
  return out;
}

const defaultAppDefinition = {
  id: "app-1",
  name: "Blue Lotus App",
  state: {},
  pages: [
    {
      id: "page-home",
      name: "Home",
      components: [
        {
          id: "c-hero",
          type: "container",
          props: { style: { padding: "24px", maxWidth: "960px", margin: "0 auto" } },
          children: [
            {
              id: "c-title",
              type: "text",
              props: {
                text: "Welcome to Blue Lotus",
                style: { fontSize: "32px", fontWeight: 700, marginBottom: "12px" },
              },
            },
            {
              id: "c-subtitle",
              type: "text",
              props: {
                text: "Edit pages, select components, and see changes instantly.",
                style: { fontSize: "16px", opacity: 0.8, marginBottom: "16px" },
              },
            },
            {
              id: "c-cta",
              type: "button",
              props: {
                label: "Get Started",
                style: { padding: "10px 14px", borderRadius: "10px" },
              },
            },
          ],
        },
      ],
    },
  ],
};

export default function BuilderApp({ initialAppDefinition = defaultAppDefinition }) {
  const {
    appDefinition,
    updatePage,
    updateComponent,
    selectedPageId,
    selectedComponentId,
    selectPage,
    selectComponent,
    selectedPage,
    selectedComponent,
  } = useBuilderState(initialAppDefinition);

  const pages = appDefinition?.pages || [];

  const pageComponents = useMemo(() => {
    const page = pages.find((p) => p.id === selectedPageId) || pages[0] || null;
    return page?.components || [];
  }, [pages, selectedPageId]);

  const flat = useMemo(() => flattenComponents(pageComponents, []), [pageComponents]);

  const inspectorJson = useMemo(() => {
    if (!selectedComponent) return "";
    return JSON.stringify(selectedComponent.props || {}, null, 2);
  }, [selectedComponent]);

  const layout = {
    height: "100vh",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "280px 1fr 360px",
    gridTemplateRows: "56px 1fr",
    gridTemplateAreas: `
      "top top top"
      "left center right"
    `,
    background: "#0b0f17",
    color: "#e8eefc",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  };

  const topbar = {
    gridArea: "top",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)",
  };

  const panel = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
  };

  const left = {
    gridArea: "left",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const center = {
    gridArea: "center",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const right = {
    gridArea: "right",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const cardHeader = {
    padding: "12px 12px 10px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const cardBody = { padding: "10px 12px 12px" };

  const button = {
    background: "rgba(120,160,255,0.18)",
    border: "1px solid rgba(120,160,255,0.35)",
    color: "#e8eefc",
    padding: "8px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
  };

  const subtle = { opacity: 0.75, fontSize: "12px" };

  const selectedRow = {
    background: "rgba(120,160,255,0.18)",
    border: "1px solid rgba(120,160,255,0.35)",
  };

  const row = {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.02)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  };

  const input = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "#e8eefc",
    borderRadius: "10px",
    padding: "10px",
    outline: "none",
  };

  const textarea = {
    ...input,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: "12px",
    minHeight: "260px",
    resize: "vertical",
    lineHeight: 1.4,
  };

  const currentPage = pages.find((p) => p.id === selectedPageId) || pages[0] || null;

  const onRenamePage = (name) => {
    if (!currentPage) return;
    updatePage(currentPage.id, (p) => ({ ...p, name }));
  };

  const onSelectComponent = (id) => {
    const exists = findComponentById(pageComponents, id);
    if (exists) selectComponent(id);
  };

  const onApplyPropsJson = (jsonText) => {
    if (!selectedComponentId) return;
    const nextProps = safeJsonParse(jsonText, null);
    if (!nextProps || typeof nextProps !== "object" || Array.isArray(nextProps)) return;

    updateComponent(selectedComponentId, (c) => ({
      ...c,
      props: nextProps,
    }));
  };

  return (
    <div style={layout}>
      <div style={topbar}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <div style={{ fontWeight: 800, letterSpacing: "0.2px" }}>Blue Lotus Builder</div>
          <div style={subtle}>Build real apps—live preview, real components, real state.</div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={button}
            onClick={() => {
              const first = pages[0]?.id || null;
              if (first) selectPage(first);
            }}
          >
            Home
          </button>
        </div>
      </div>

      {/* Left: Pages + Components */}
      <div style={left}>
        <div style={{ ...panel, overflow: "hidden" }}>
          <div style={cardHeader}>
            <div style={{ fontWeight: 700 }}>Pages</div>
            <div style={subtle}>{pages.length}</div>
          </div>
          <div style={{ ...cardBody, display: "flex", flexDirection: "column", gap: "8px" }}>
            {pages.map((p) => (
              <div
                key={p.id}
                style={{ ...row, ...(p.id === selectedPageId ? selectedRow : null) }}
                onClick={() => selectPage(p.id)}
                role="button"
                tabIndex={0}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontWeight: 650 }}>{p.name || p.id}</div>
                  <div style={subtle}>{p.id}</div>
                </div>
                <div style={subtle}>{(p.components || []).length} root</div>
              </div>
            ))}

            {currentPage && (
              <div style={{ marginTop: "10px" }}>
                <div style={{ ...subtle, marginBottom: "6px" }}>Rename selected page</div>
                <input
                  style={input}
                  value={currentPage.name || ""}
                  onChange={(e) => onRenamePage(e.target.value)}
                  placeholder="Page name"
                />
              </div>
            )}
          </div>
        </div>

        <div style={{ ...panel, overflow: "hidden", flex: 1, minHeight: 0 }}>
          <div style={cardHeader}>
            <div style={{ fontWeight: 700 }}>Components</div>
            <div style={subtle}>{flat.length}</div>
          </div>
          <div style={{ ...cardBody, overflow: "auto", maxHeight: "100%" }}>
            {flat.map((c) => (
              <div
                key={c.id}
                style={{ ...row, marginBottom: "8px", ...(c.id === selectedComponentId ? selectedRow : null) }}
                onClick={() => onSelectComponent(c.id)}
                role="button"
                tabIndex={0}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontWeight: 650 }}>{c.type}</div>
                  <div style={subtle}>{c.id}</div>
                </div>
                <div style={subtle}>{c.children?.length ? `${c.children.length} children` : ""}</div>
              </div>
            ))}
            {!flat.length && <div style={subtle}>No components on this page yet.</div>}
          </div>
        </div>
      </div>

      {/* Center: Live preview */}
      <div style={center}>
        <div style={{ ...panel, overflow: "hidden", flex: 1, minHeight: 0 }}>
          <div style={cardHeader}>
            <div style={{ fontWeight: 700 }}>Live preview</div>
            <div style={subtle}>{currentPage ? currentPage.name : "No page"}</div>
          </div>
          <div style={{ padding: "12px", height: "calc(100% - 48px)", overflow: "auto", background: "#0a0d14" }}>
            <div
              style={{
                background: "#ffffff",
                color: "#0b0f17",
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.08)",
                minHeight: "100%",
                overflow: "hidden",
              }}
            >
              <LivePreview
                appDefinition={appDefinition}
                selectedPageId={selectedPageId}
                selectedComponentId={selectedComponentId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Inspector */}
      <div style={right}>
        <div style={{ ...panel, overflow: "hidden" }}>
          <div style={cardHeader}>
            <div style={{ fontWeight: 700 }}>Inspector</div>
            <div style={subtle}>{selectedComponent ? selectedComponent.type : "No selection"}</div>
          </div>

          <div style={{ ...cardBody, display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <div style={{ ...subtle, marginBottom: "6px" }}>Selected page</div>
              <div style={{ fontWeight: 650 }}>{selectedPage ? selectedPage.name : "None"}</div>
              <div style={subtle}>{selectedPage ? selectedPage.id : ""}</div>
            </div>

            <div>
              <div style={{ ...subtle, marginBottom: "6px" }}>Selected component</div>
              <div style={{ fontWeight: 650 }}>{selectedComponent ? selectedComponent.id : "None"}</div>
              <div style={subtle}>{selectedComponent ? selectedComponent.type : ""}</div>
            </div>

            <div>
              <div style={{ ...subtle, marginBottom: "6px" }}>Props (JSON)</div>
              <textarea
                style={textarea}
                value={inspectorJson}
                onChange={(e) => {
                  // live edit buffer is the textarea itself; apply on blur for stability
                  // (keeps preview from breaking on half-typed JSON)
                  e.target.dataset.dirty = "1";
                }}
                onBlur={(e) => {
                  if (!selectedComponent) return;
                  const text = e.target.value;
                  onApplyPropsJson(text);
                  e.target.dataset.dirty = "0";
                }}
                readOnly={!selectedComponent}
              />
              <div style={{ ...subtle, marginTop: "6px" }}>
                Changes apply when you click out of the box (blur). Invalid JSON is ignored.
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={button}
                onClick={() => {
                  if (!selectedComponentId) return;
                  updateComponent(selectedComponentId, (c) => ({
                    ...c,
                    props: { ...(c.props || {}), style: { ...(c.props?.style || {}), border: "1px solid #e5e7eb" } },
                  }));
                }}
                disabled={!selectedComponentId}
              >
                Add subtle border
              </button>

              <button
                style={button}
                onClick={() => {
                  if (currentPage?.components?.[0]?.id) selectComponent(currentPage.components[0].id);
                }}
                disabled={!currentPage?.components?.length}
              >
                Select first
              </button>
            </div>
          </div>
        </div>

        <div style={{ ...panel, overflow: "hidden" }}>
          <div style={cardHeader}>
            <div style={{ fontWeight: 700 }}>App</div>
            <div style={subtle}>{appDefinition?.name || ""}</div>
          </div>
          <div style={cardBody}>
            <div style={subtle}>App id</div>
            <div style={{ fontWeight: 650, marginBottom: "10px" }}>{appDefinition?.id}</div>
            <div style={subtle}>Pages</div>
            <div style={{ fontWeight: 650 }}>{pages.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
