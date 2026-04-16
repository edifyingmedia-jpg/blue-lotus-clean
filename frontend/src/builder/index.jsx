// frontend/src/builder/index.js

/** * BLUE LOTUS EMPIRE - CORE EXPORTS
 * Centrally managing the Actuation Engine and Monetization Logic.
 */

// 1. Neural Logic & Revenue Enforcement
export { generateBuilder } from "./generate"; 
export { RegistryV2 } from "./components/registry.jsx"; 
export { builderSpecSchema } from "./builderSpecSchema"; 

// 2. High-End Workspace Containers
export { default as BuilderApp } from "./BuilderApp"; 
export { default as Workspace } from "./Workspace"; 
export { default as BuilderShell } from "./BuilderShell"; 

// 3. The Rendering Pipeline (Storefront Ready)
export { default as CanvasRenderer } from "./CanvasRenderer"; 
export { default as ComponentRenderer } from "./ComponentRenderer"; 
export { default as ComponentPanel } from "./ComponentPanel"; 
export { default as AppStatusPanel } from "./AppStatusPanel"; 

// 4. Production Factories
export { createBuilderSpec, instantiateBuilderFromSpec } from "./BuilderFactory";
