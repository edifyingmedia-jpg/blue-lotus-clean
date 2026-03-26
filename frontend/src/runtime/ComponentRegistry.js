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
import BLButton from "../components/primitives/Button.jsx";
import BLImage from "../components/primitives/Image.jsx";
import BLView from "../components/primitives/View.jsx"; // optional container

// The official runtime registry
const registry = {
  text: BLText,
  button: BLButton,
  image: BLImage,
  view: BLView,
};

/**
 * getComponent(type)
 * Returns the React component for a given type string.
 */
export function getComponent(type) {
  return registry[type] || null;
}
