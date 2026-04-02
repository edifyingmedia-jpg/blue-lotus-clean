// frontend/src/components/index.js

export { default as ComponentRenderer } from "./ComponentRenderer.jsx";

// Correct default export import — ComponentRegistry.js does NOT have a named export
export { default as componentRegistry } from "./ComponentRegistry.js";

export default {
  ComponentRenderer: require("./ComponentRenderer.jsx").default,
  componentRegistry: require("./ComponentRegistry.js").default,
};
