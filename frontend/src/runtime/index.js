// frontend/src/runtime/index.js

/**
 * Runtime Entry Point
 * --------------------------------------------------
 * Exports the full Blue Lotus runtime API.
 * This allows the builder, preview engine, and
 * external tools to import everything cleanly.
 */

export { default as LivePreview } from "./LivePreview";
export { default as AppRenderer } from "./AppRenderer.jsx";
export { default as PageRenderer } from "./PageRenderer.jsx";
export { default as ComponentRenderer } from "./ComponentRenderer.jsx";

export { RuntimeProvider, useRuntime } from "./RuntimeContext";

export { getComponent } from "./ComponentRegistry";
