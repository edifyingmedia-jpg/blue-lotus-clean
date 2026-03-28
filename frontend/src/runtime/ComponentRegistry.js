// frontend/src/runtime/ComponentRegistry.js

import BLText from "../components/primitives/Text.jsx";        // this file exists
import BLView from "./components/primitives/View.jsx";         // this file exists

// These two DO NOT EXIST ANYWHERE in your repo yet.
// So we temporarily disable them until you create them.
const BLButton = null;
const BLImage = null;

const registry = {
  text: BLText,
  view: BLView,
  button: BLButton,
  image: BLImage,
};

export function getComponent(type) {
  return registry[type] || null;
}
