// frontend/src/components/index.js
export { default as ComponentRenderer } from "./ComponentRenderer.jsx";
export { componentRegistry } from "./ComponentRegistry.js";

export default {
  ComponentRenderer: require("./ComponentRenderer.jsx").default,
  componentRegistry: require("./ComponentRegistry.js").componentRegistry,
};
