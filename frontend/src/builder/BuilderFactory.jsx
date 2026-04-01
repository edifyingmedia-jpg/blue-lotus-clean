// frontend/src/builder/BuilderFactory.jsx
import React from "react";

/**
 * BuilderFactory
 *
 * - Provides utilities to create a portable "builder spec" (manifest, tokens, initial nodes, meta).
 * - Can instantiate a builder instance in the current Workspace by seeding nodes and manifest into localStorage
 *   and calling the existing global twinSetSpec/twinBuild hooks.
 *
 * Usage (programmatic):
 *   import { createBuilderSpec, instantiateBuilderFromSpec, saveSpecToLocalStorage } from './builder/BuilderFactory';
 *
 *   const spec = createBuilderSpec({ name: 'My Builder', manifest, tokens, nodes });
 *   instantiateBuilderFromSpec(spec); // seeds current Workspace
 *   saveSpecToLocalStorage(spec, 'my-builder-template');
 *
 * Notes:
 * - This file intentionally avoids changing Workspace.jsx. It uses the public API the Workspace already exposes.
 * - The spec shape is intentionally simple and portable (JSON serializable).
 */

/** Default meta for builder specs */
export const defaultMeta = {
  name: "builder",
  version: "0.1.0",
  createdAt: null,
  description: "A builder spec (manifest + tokens + initial nodes)",
};

/** Create a canonical builder spec object */
export function createBuilderSpec({ meta = {}, manifest = [], tokens = {}, nodes = [] } = {}) {
  const now = new Date().toISOString();
  return {
    meta: {
      ...defaultMeta,
      ...meta,
      createdAt: meta.createdAt || now,
    },
    manifest: Array.isArray(manifest) ? manifest : [],
    tokens: tokens || {},
    nodes: Array.isArray(nodes) ? nodes : [],
  };
}

/**
 * Instantiate a builder in the current Workspace from a spec.
 *
 * Behavior:
 * - Stores manifest and tokens in localStorage under a predictable key so the Workspace (or other loader)
 *   can read them if you extend it to do so.
 * - Calls window.twinSetSpec(spec.nodes) if available to seed the workspace nodes.
 * - Returns an object describing what it did.
 *
 * This is intentionally permissive and non-destructive: it does not delete other localStorage keys.
 */
export function instantiateBuilderFromSpec(spec, { storageKeyPrefix = "blue-lotus" } = {}) {
  if (!spec || typeof spec !== "object") {
    return { ok: false, error: "Invalid spec" };
  }

  try {
    // Persist manifest and tokens so other parts of the app can read them
    const manifestKey = `${storageKeyPrefix}:manifest:${spec.meta.name || "builder"}`;
    const tokensKey = `${storageKeyPrefix}:tokens:${spec.meta.name || "builder"}`;
    localStorage.setItem(manifestKey, JSON.stringify(spec.manifest));
    localStorage.setItem(tokensKey, JSON.stringify(spec.tokens));

    // If the workspace exposes twinSetSpec, use it to seed nodes
    if (typeof window !== "undefined" && typeof window.twinSetSpec === "function") {
      // Ensure nodes have ids (simple generator)
      const nodes = (spec.nodes || []).map((n) => {
        if (!n.id) {
          return { ...n, id: `n-${Math.random().toString(36).slice(2, 9)}` };
        }
        return n;
      });
      window.twinSetSpec(nodes);
      return { ok: true, seeded: true, manifestKey, tokensKey };
    }

    // If twinSetSpec not available, store nodes in localStorage for manual retrieval
    const nodesKey = `${storageKeyPrefix}:nodes:${spec.meta.name || "builder"}`;
    localStorage.setItem(nodesKey, JSON.stringify(spec.nodes || []));
    return { ok: true, seeded: false, manifestKey, tokensKey, nodesKey, note: "twinSetSpec not found; nodes saved to localStorage" };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/** Save a spec to localStorage under a friendly key */
export function saveSpecToLocalStorage(spec, keyName = "builder-template", { storageKeyPrefix = "blue-lotus" } = {}) {
  try {
    const key = `${storageKeyPrefix}:spec:${keyName}`;
    localStorage.setItem(key, JSON.stringify(spec));
    return { ok: true, key };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/** Load a spec from localStorage by keyName */
export function loadSpecFromLocalStorage(keyName = "builder-template", { storageKeyPrefix = "blue-lotus" } = {}) {
  try {
    const key = `${storageKeyPrefix}:spec:${keyName}`;
    const raw = localStorage.getItem(key);
    if (!raw) return { ok: false, error: "Not found" };
    const spec = JSON.parse(raw);
    return { ok: true, spec, key };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/** Lightweight React helper component to expose a small UI for instantiating specs (optional) */
export function BuilderFactoryUI({ spec, onResult }) {
  const handleInstantiate = () => {
    const res = instantiateBuilderFromSpec(spec);
    if (onResult) onResult(res);
  };

  const handleSave = () => {
    const res = saveSpecToLocalStorage(spec, spec.meta.name || `builder-${Date.now()}`);
    if (onResult) onResult(res);
  };

  return (
    <div style={{ padding: 12, background: "transparent", color: "var(--color-text)" }}>
      <div style={{ marginBottom: 8, fontWeight: 600 }}>{spec?.meta?.name || "Builder Spec"}</div>
      <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 12 }}>{spec?.meta?.description || "Portable builder spec"}</div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={handleInstantiate}>Instantiate in Workspace</button>
        <button onClick={handleSave}>Save Template</button>
      </div>
    </div>
  );
}

export default {
  createBuilderSpec,
  instantiateBuilderFromSpec,
  saveSpecToLocalStorage,
  loadSpecFromLocalStorage,
};
