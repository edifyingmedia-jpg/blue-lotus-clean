// frontend/src/builder/generate.js
import { RegistryV2 } from "./components/registry.jsx";

/**
 * generateBuilder (Updated)
 * -------------------------
 * Converts Registry components into a manifest the AI can understand,
 * and provides the factory functions for creating the app tree.
 */
export async function generateBuilder() {
  // Create a manifest that explicitly tells the AI about Tailwind support
  const manifest = Object.keys(RegistryV2).map((key) => ({
    name: key,
    label: key,
    description: `${key} component - Supports Tailwind CSS via 'className' prop.`,
    props: {
      className: "string", // Hinting to the AI to use utility classes
    }
  }));

  function findComponent(name) {
    return manifest.find((m) => m.name === name) || null;
  }

  function renderSpec(spec) {
    if (!spec) return null;
    return {
      id: crypto.randomUUID(),
      type: spec.type,
      props: {
        ...spec.props,
        // Ensure every component has a base transition for that "Blue Lotus" feel
        className: spec.props?.className || "" 
      },
      children: Array.isArray(spec.children) 
        ? spec.children.map((c) => renderSpec(c)) 
        : []
    };
  }

  async function createApp(meta = {}, spec = {}) {
    return {
      id: `bl-app-${Date.now()}`,
      meta: {
        ...meta,
        engine: "Blue Lotus v2",
        styling: "Tailwind-Utility"
      },
      spec: renderSpec(spec),
      createdAt: new Date().toISOString()
    };
  }

  return { manifest, findComponent, renderSpec, createApp };
}

export default generateBuilder;
