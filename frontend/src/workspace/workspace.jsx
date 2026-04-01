// frontend/src/Workspace.jsx
import React, { useEffect, useState } from "react";
import ThemeProvider from "./theme/ThemeProvider";
import { loadManifestAndTokens, loadNodesForBuilder } from "./builder/localManifestLoader";
import componentRegistry from "./components/ComponentRegistry";

/**
 * Workspace
 *
 * - Wraps the preview with ThemeProvider so tokens from templates are applied.
 * - On mount, attempts to load a builder manifest/tokens/nodes from localStorage (via localManifestLoader).
 * - If nodes are present, seeds the workspace using window.twinSetSpec (non-destructive).
 * - Exposes the active manifest and tokens in state for other parts of the app (inspector, preview).
 *
 * Non-invasive: this file assumes the rest of your preview/inspector code reads `manifest` and `tokens`
 * from props or context. If your existing Workspace is structured differently, paste the relevant parts
 * (ThemeProvider wrapper and the useEffect) into your current Workspace.jsx.
 */

export default function Workspace({ builderName = "basic-builder", children }) {
  const [manifest, setManifest] = useState([]);
  const [tokens, setTokens] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        // Load manifest and tokens for the named builder (prefers localStorage keys set by BuilderFactory)
        const { manifest: loadedManifest, tokens: loadedTokens, source } = await loadManifestAndTokens(builderName);

        if (!mounted) return;

        if (Array.isArray(loadedManifest) && loadedManifest.length) {
          setManifest(loadedManifest);
        } else {
          setManifest([]);
        }

        if (loadedTokens && Object.keys(loadedTokens).length) {
          setTokens(loadedTokens);
        } else {
          setTokens(null);
        }

        // If nodes were saved for this builder, seed the workspace via twinSetSpec
        const nodesRes = loadNodesForBuilder(builderName);
        if (nodesRes.ok && Array.isArray(nodesRes.nodes) && nodesRes.nodes.length) {
          if (typeof window !== "undefined" && typeof window.twinSetSpec === "function") {
            window.twinSetSpec(nodesRes.nodes);
          } else {
            // fallback: store nodes under a known key so the builder factory or manual loader can pick them up
            const fallbackKey = `blue-lotus:nodes:${builderName}`;
            localStorage.setItem(fallbackKey, JSON.stringify(nodesRes.nodes));
          }
        }

        setLoaded(true);
        // Optionally log source for debugging
        // console.info("Workspace initialized from", source);
      } catch (err) {
        console.error("Workspace init error:", err);
        setLoaded(true);
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, [builderName]);

  // Example: expose manifest and tokens on window for quick debugging (non-destructive)
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__blueLotusManifest = manifest;
      window.__blueLotusTokens = tokens;
    }
  }, [manifest, tokens]);

  // Render a simple loading state until manifest/tokens are loaded
  if (!loaded) {
    return (
      <div style={{ padding: 20, color: "var(--bl-color-text, #000)" }}>
        Loading workspace…
      </div>
    );
  }

  // The ThemeProvider will inject CSS variables from tokens (if provided).
  // Children (preview, inspector) should read manifest from props or via window.__blueLotusManifest.
  return (
    <ThemeProvider customTokens={tokens || undefined}>
      <div style={{ height: "100%", display: "flex", flexDirection: "row", gap: 12 }}>
        {/* Left: builder canvas / preview area (your existing preview component can be placed here) */}
        <div style={{ flex: 1, padding: 12 }}>
          {/* If you have a Preview component, render it here and pass manifest/tokens */}
          {children || (
            <div style={{
              background: "var(--bl-color-background)",
              color: "var(--bl-color-text)",
              padding: "var(--bl-spacing-md)",
              borderRadius: "var(--bl-radius-md)"
            }}>
              <h3 style={{ marginTop: 0 }}>Blue Lotus Workspace</h3>
              <p style={{ color: "var(--bl-color-muted)" }}>
                Manifest loaded: <strong>{manifest.length}</strong> components.
              </p>
              <p style={{ color: "var(--bl-color-muted)" }}>
                Tokens applied: <strong>{tokens ? "yes" : "no"}</strong>.
              </p>
              <p style={{ color: "var(--bl-color-muted)" }}>
                Use <code>window.loadBuilderTemplate('basic-builder')</code> to instantiate templates.
              </p>
            </div>
          )}
        </div>

        {/* Right: inspector / manifest viewer (simple manifest list for now) */}
        <aside style={{
          width: 320,
          borderLeft: `1px solid var(--bl-border-color, rgba(0,0,0,0.06))`,
          padding: 12,
          background: "var(--bl-color-surface)"
        }}>
          <div style={{ marginBottom: 8, fontWeight: 700 }}>Manifest</div>
          {manifest.length === 0 && <div style={{ color: "var(--bl-color-muted)" }}>No manifest found.</div>}
          <ul style={{ paddingLeft: 16 }}>
            {manifest.map((m) => (
              <li key={m.name} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600 }}>{m.label || m.name}</div>
                <div style={{ fontSize: 12, color: "var(--bl-color-muted)" }}>{m.description}</div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700 }}>Registered components</div>
            <div style={{ fontSize: 13, color: "var(--bl-color-muted)" }}>
              {typeof componentRegistry.componentNames === "function"
                ? componentRegistry.componentNames().join(", ")
                : "—"}
            </div>
          </div>
        </aside>
      </div>
    </ThemeProvider>
  );
}
