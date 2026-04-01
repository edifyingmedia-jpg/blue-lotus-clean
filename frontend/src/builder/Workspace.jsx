// frontend/src/builder/Workspace.jsx
import React, { useEffect, useState, useCallback } from "react";
import ComponentRenderer from "../components/ComponentRenderer";
import { componentRegistry } from "../components/ComponentRegistry";

/**
 * Workspace
 *
 * - Loads /components.json manifest (used for the components panel and defaults).
 * - Renders a live preview using ComponentRenderer and a simple Inspector.
 * - Exposes a global function `window.twinBuild(command: string)` that
 *   parses a small set of natural-language patterns and programmatically
 *   inserts components into the workspace so you never have to "Insert" manually.
 *
 * Usage:
 *  - In the live site console or from TWIN, call:
 *      window.twinBuild('Build a simple page with a Card titled "Hello" containing a Button labeled "Click me".')
 *
 *  - The parser is intentionally small and deterministic. It recognizes patterns
 *    for Card and Button with quoted titles/labels. If it can't parse, it falls
 *    back to a simple heuristic that will create a Card with a Button child.
 */

function useManifest() {
  const [manifest, setManifest] = useState([]);
  useEffect(() => {
    let mounted = true;
    fetch("/components.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : r.text().then((t) => Promise.reject(t))))
      .then((json) => {
        if (mounted && Array.isArray(json)) setManifest(json);
      })
      .catch((err) => {
        console.warn("Could not load components.json manifest:", err);
        if (mounted) setManifest([]);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return manifest;
}

function defaultNode(type, props = {}, children = []) {
  return {
    id: `n-${Math.random().toString(36).slice(2, 9)}`,
    type,
    props,
    children,
  };
}

/** Very small natural language parser for common builder commands */
function parseBuildCommand(command = "") {
  // Normalize whitespace
  const text = (command || "").trim();

  // Try to extract quoted strings for title/label
  // Pattern: Card titled "Hello" containing a Button labeled "Click me"
  const cardTitleMatch = text.match(/Card(?:\s+title(?:ed)?)?\s*["']([^"']+)["']/i);
  const buttonLabelMatch = text.match(/Button(?:\s+label(?:ed)?)?\s*["']([^"']+)["']/i);

  if (cardTitleMatch || buttonLabelMatch) {
    const title = cardTitleMatch ? cardTitleMatch[1] : "Card";
    const label = buttonLabelMatch ? buttonLabelMatch[1] : "Click";
    const buttonNode = defaultNode("Button", { children: label });
    const cardNode = defaultNode("Card", { title }, [buttonNode]);
    return [cardNode];
  }

  // Heuristic fallback: if the command mentions "card" and "button" anywhere
  if (/card/i.test(text) && /button/i.test(text)) {
    const buttonNode = defaultNode("Button", { children: "Click" });
    const cardNode = defaultNode("Card", { title: "Hello", children: [buttonNode] });
    return [cardNode];
  }

  // If the command mentions only "card"
  if (/card/i.test(text)) {
    const cardNode = defaultNode("Card", { title: "Hello" }, []);
    return [cardNode];
  }

  // If the command mentions only "button"
  if (/button/i.test(text)) {
    const buttonNode = defaultNode("Button", { children: "Click" }, []);
    return [buttonNode];
  }

  // Nothing recognized: return an empty array
  return [];
}

function Inspector({ node, onChangeProps }) {
  if (!node) return <div style={{ padding: 12 }}>Select a component to edit its props</div>;
  const { props } = node;
  return (
    <div style={{ padding: 12 }}>
      <h4 style={{ marginTop: 0 }}>{node.type} — Inspector</h4>

      {/* Title prop (common for Card) */}
      {"title" in props && (
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 12, color: "#ddd" }}>Title</label>
          <input
            value={props.title || ""}
            onChange={(e) => onChangeProps({ ...props, title: e.target.value })}
            style={{ width: "100%", padding: 6, borderRadius: 4, border: "1px solid #333" }}
          />
        </div>
      )}

      {/* Children as simple text (for Button) */}
      {"children" in props && (
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 12, color: "#ddd" }}>Text</label>
          <input
            value={props.children || ""}
            onChange={(e) => onChangeProps({ ...props, children: e.target.value })}
            style={{ width: "100%", padding: 6, borderRadius: 4, border: "1px solid #333" }}
          />
        </div>
      )}

      {/* JSON fallback */}
      <div style={{ marginTop: 12 }}>
        <label style={{ display: "block", fontSize: 12, color: "#ddd" }}>Raw props (JSON)</label>
        <textarea
          value={JSON.stringify(props, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              onChangeProps(parsed);
            } catch (err) {
              // ignore parse errors while typing
            }
          }}
          rows={6}
          style={{ width: "100%", padding: 6, borderRadius: 4, border: "1px solid #333", fontFamily: "monospace", fontSize: 12 }}
        />
      </div>
    </div>
  );
}

/** Recursive renderer wrapper that wires selection events and uses the registry */
function PreviewNode({ node, onSelect }) {
  if (!node) return null;
  const Comp = componentRegistry && componentRegistry[node.type];
  const children = (node.children || []).map((c) => <PreviewNode key={c.id} node={c} onSelect={onSelect} />);
  if (!Comp) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect(node);
        }}
        style={{ padding: 8, border: "1px dashed #444", color: "#fff" }}
      >
        Unknown component: {node.type}
      </div>
    );
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect && onSelect(node);
      }}
      style={{ display: "inline-block" }}
    >
      <Comp {...(node.props || {})}>{children.length ? children : node.props && node.props.children}</Comp>
    </div>
  );
}

export default function Workspace() {
  const manifest = useManifest();
  const [nodes, setNodes] = useState([]); // top-level nodes
  const [selectedId, setSelectedId] = useState(null);

  // Helper: find node by id (DFS)
  const findNodeById = useCallback((id, list = nodes) => {
    for (const n of list) {
      if (n.id === id) return n;
      if (n.children && n.children.length) {
        const found = findNodeById(id, n.children);
        if (found) return found;
      }
    }
    return null;
  }, [nodes]);

  const setNodeProps = useCallback((id, newProps) => {
    function walk(list) {
      return list.map((n) => {
        if (n.id === id) {
          return { ...n, props: newProps };
        }
        if (n.children && n.children.length) {
          return { ...n, children: walk(n.children) };
        }
        return n;
      });
    }
    setNodes((prev) => walk(prev));
  }, []);

  const replaceNodes = useCallback((newNodes) => {
    setNodes(newNodes);
    setSelectedId(newNodes.length ? newNodes[0].id : null);
  }, []);

  // Expose a global builder function so TWIN or the console can call it
  useEffect(() => {
    window.twinBuild = async function (command) {
      try {
        const parsed = parseBuildCommand(command);
        if (parsed && parsed.length) {
          replaceNodes(parsed);
          console.info("twinBuild: created", parsed);
          return { ok: true, nodes: parsed };
        }
        // If nothing parsed, return a helpful message and do not change state
        console.warn("twinBuild: could not parse command. No changes made.");
        return { ok: false, error: "Could not parse command" };
      } catch (err) {
        console.error("twinBuild error:", err);
        return { ok: false, error: String(err) };
      }
    };

    // Also expose a helper to programmatically set a spec object
    window.twinSetSpec = function (specNodes) {
      if (!Array.isArray(specNodes)) {
        console.warn("twinSetSpec expects an array of nodes");
        return { ok: false };
      }
      replaceNodes(specNodes);
      return { ok: true };
    };

    return () => {
      // cleanup
      try {
        delete window.twinBuild;
        delete window.twinSetSpec;
      } catch (e) {}
    };
  }, [replaceNodes]);

  // Small components panel (read-only) so you can see what's available
  const ComponentsPanel = () => (
    <div style={{ padding: 12 }}>
      <h4 style={{ marginTop: 0 }}>Components</h4>
      {manifest.length === 0 && <div style={{ color: "#888" }}>No manifest loaded</div>}
      {manifest.map((c) => (
        <div key={c.name} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <strong style={{ color: "#fff" }}>{c.label || c.name}</strong>
            <div style={{ fontSize: 12, color: "#aaa" }}>{c.name}</div>
          </div>
          <div style={{ fontSize: 12, color: "#999" }}>{/* intentionally no Insert button */}</div>
        </div>
      ))}
      <div style={{ marginTop: 12, fontSize: 12, color: "#bbb" }}>
        Use <code>window.twinBuild(command)</code> to programmatically build pages.
      </div>
    </div>
  );

  const Preview = () => (
    <div
      style={{
        padding: 16,
        minHeight: 300,
        background: "#07101a",
        borderRadius: 8,
        color: "#fff",
      }}
      onClick={() => setSelectedId(null)}
    >
      {nodes.length === 0 ? (
        <div style={{ color: "#777" }}>No nodes yet. Call window.twinBuild(...) to create content.</div>
      ) : (
        nodes.map((n) => <PreviewNode key={n.id} node={n} onSelect={(node) => setSelectedId(node.id)} />)
      )}
    </div>
  );

  const selectedNode = selectedId ? findNodeById(selectedId) : null;

  return (
    <div style={{ display: "flex", gap: 12, padding: 12, color: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div style={{ width: 260, background: "#071018", borderRadius: 8, overflow: "hidden" }}>
        <ComponentsPanel />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Live Preview</h3>
          <div style={{ fontSize: 13, color: "#aaa" }}>
            <code>window.twinBuild('Build a simple page with a Card titled "Hello" containing a Button labeled "Click me".')</code>
          </div>
        </div>
        <Preview />
      </div>

      <div style={{ width: 320, background: "#071018", borderRadius: 8, overflow: "hidden" }}>
        <Inspector
          node={selectedNode}
          onChangeProps={(newProps) => {
            if (!selectedNode) return;
            setNodeProps(selectedNode.id, newProps);
          }}
        />
      </div>
    </div>
  );
}
