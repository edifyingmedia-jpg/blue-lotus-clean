// frontend/src/runtime/ComponentRegistry.js

/**
 * ComponentRegistry
 * --------------------------------------------------
 * Maps component "type" strings from the app definition
 * to real React components in the runtime.
 *
 * This is the authoritative registry for the Blue Lotus runtime.
 */

import BLText from "../components/primitives/Text.jsx";

// These components do not exist yet.
// They are intentionally disabled to prevent build failures.
const BLButton = null;
const BLImage = null;
const BLView = null;

// The official runtime registry
const registry = {
  text: BLText,
  button: BLButton,
  image: BLImage,
  view: BLView,
};

export function getComponent(type) {
  return registry[type] || null;
}
