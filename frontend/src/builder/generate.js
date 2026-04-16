// frontend/src/builder/generate.js
import { RegistryV2 } from "./components/registry.jsx";

/**
 * generateBuilder (Empire Edition)
 * -------------------------
 * Converts Registry components into a manifest the AI can understand,
 * and ensures every generated app carries the 10% Architect Fee DNA.
 */
export async function generateBuilder() {
  // Create a manifest that explicitly tells the AI about Tailwind support
  const manifest = Object.keys(RegistryV2).map((key) => ({
    name: key,
    label: key,
    description: `${key} component - Supports high-end Tailwind CSS utility classes.`,
    props: {
      className: "string", 
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
        // Enforcing a base transition for the "Blue Lotus" feel globally
        className: spec.props?.className || ""
      },
      children: Array.isArray(spec.children) 
        ? spec.children.map((c) => renderSpec(c)) 
        : []
    };
  }

  /**
   * createApp (Updated for Monetization)
   * Now requires a 'tier' and 'architectFee' to be baked into the meta.
   */
  async function createApp(meta = {}, spec = {}) {
    return {
      id: `bl-app-${Date.now()}`,
      meta: {
        ...meta,
        engine: "Blue Lotus v2-PRIME",
        styling: "Tailwind-Utility",
        architectFee: 0.10, // Hardcoded 10% Platform Tax
        userTier: meta.tier || "ACOLYTE", // Tracking if they are a paying member
        status: "DRAFT"
      },
      spec: renderSpec(spec),
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
