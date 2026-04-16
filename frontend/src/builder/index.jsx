// frontend/src/builder/index.js

// Core Logic & Registry
export { generateBuilder } from "./generate";
export { RegistryV2 } from "./components/registry.jsx";
export { builderSpecSchema } from "./builderSpecSchema";

// Main Layout Containers
export { default as BuilderApp } from "./BuilderApp";
export { default as Workspace } from "./Workspace";
export { default as BuilderShell } from "./BuilderShell";

// Rendering & Panels
export { default as CanvasRenderer } from "./CanvasRenderer";
export { default as ComponentRenderer } from "./ComponentRenderer";
export { default as ComponentPanel } from "./ComponentPanel";
export { default as AppStatusPanel } from "./AppStatusPanel";

// Factories
export { createBuilderSpec, instantiateBuilderFromSpec } from "./BuilderFactory";
