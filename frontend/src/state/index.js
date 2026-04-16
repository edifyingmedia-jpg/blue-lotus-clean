// frontend/src/state/index.js

/**
 * State Hub (Empire Edition)
 * -------------------------
 * The central coordination point for all Blue Lotus state providers.
 * Enforces the unified manifest and project building logic.
 */

export * from "./ProjectContext.jsx";
export * from "./AppDefinitionContext.jsx";
export { default as initialAppDefinition } from "./appDefinition";

// ARCHITECT NOTE: 
// Always wrap the root of the application in both providers 
// to ensure the 10% Architect Tax logic is globally accessible.export * from "./ProjectContext.jsx";
