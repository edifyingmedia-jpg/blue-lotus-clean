// frontend/src/builder/generate.js

import { RegistryV2 } from "./components/registry.jsx";

/**
 * generateBuilder (Updated)
 * -------------------------
 * Converts simple JSON specs into the unified node format
 * used by CanvasRenderer, NodeRenderer, and ComponentRenderer.
 */

export async function generateBuilder() {
  const manifest = Object.keys(RegistryV2).map((key) => ({
    name: key,
    label: key,
    description: `${key} component`,
    props: {}
  }));

  function findComponent(name) {
    return manifest.find((m) => m.name === name) || null;
  }

  function renderSpec(spec) {
    if (!spec) return null;

    return {
      id: crypto.randomUUID(),
      type: spec.type,
      props: spec.props || {},
      children: Array.isArray(spec.children)
        ? spec.children.map((c) => renderSpec(c))
        : []
    };
  }

  async function createApp(meta = {}, spec = {}) {
    return {
      id: `local-${Date.now()}`,
      meta,
      spec,
      createdAt: new Date().toISOString()
    };
  }

  return {
    manifest,
    findComponent,
    renderSpec,
    createApp
  };
}

export default generateBuilder;
