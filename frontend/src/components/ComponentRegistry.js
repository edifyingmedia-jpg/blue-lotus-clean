// frontend/src/components/ComponentRegistry.js
/**
 * ComponentRegistry
 *
 * - Single source of truth for component lookups used by the builder and preview.
 * - Exposes a mutable registry so builder instances can register additional components
 *   at runtime (e.g., when a template provides its own manifest and component set).
 *
 * Usage:
 *   import { getComponent, registerComponent, componentNames } from './components/ComponentRegistry';
 *   const Cmp = getComponent('Button');
 *   registerComponent('MyWidget', MyWidget);
 */

import Button from "./Button";
import Card from "./Card";

/** Base registry (components bundled with the app) */
const registry = {
  Button,
  Card,
};

/** Register a component at runtime (overwrites if name exists) */
export function registerComponent(name, component) {
  if (!name || !component) return false;
  registry[name] = component;
  return true;
}

/** Bulk register components from an object map */
export function registerComponents(map = {}) {
  Object.entries(map).forEach(([k, v]) => {
    if (k && v) registry[k] = v;
  });
}

/** Get a component by name (returns undefined if not found) */
export function getComponent(name) {
  return registry[name];
}

/** List of registered component names */
export function componentNames() {
  return Object.keys(registry);
}

/** Export the registry for advanced use (read-only recommended) */
export default {
  getComponent,
  registerComponent,
  registerComponents,
  componentNames,
};
