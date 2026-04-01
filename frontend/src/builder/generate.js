// frontend/src/builder/generate.js
import { loadManifest } from "./registry";

/**
 * generateBuilder returns a tiny builder API the UI can call.
 * This is intentionally small: it exposes `renderSpec` and `createApp`.
 *
 * - renderSpec(spec): returns a renderable spec for the workspace
 * - createApp(meta, spec): placeholder that returns a saved object (no backend)
 *
 * The builder UI can call generateBuilder().renderSpec(...) to convert
 * a simple JSON description into something the workspace can render.
 */

export async function generateBuilder() {
  const manifest = await loadManifest();

  function findComponent(name) {
    return manifest.find((m) => m.name === name) || null;
  }

  function renderSpec(spec) {
    // spec example:
    // { type: "Card", props: { title: "Hello" }, children: [{ type: "Button", props: { children: "Click me" } }] }
    if (!spec) return null;
    const node = {
      name: spec.type,
      props: spec.props || {},
      children: Array.isArray(spec.children)
        ? spec.children.map((c) => renderSpec(c))
        : [],
    };
    return node;
  }

  async function createApp(meta = {}, spec = {}) {
    // Minimal in-memory "save" that returns an object the UI can preview.
    const app = {
      id: `local-${Date.now()}`,
      meta,
      spec,
      createdAt: new Date().toISOString(),
    };
    return app;
  }

  return {
    manifest,
    findComponent,
    renderSpec,
    createApp,
  };
}

export default generateBuilder;
