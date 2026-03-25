import ComponentRenderer from "./ComponentRenderer";

export const registry = {
  text: ComponentRenderer,
  button: ComponentRenderer,
  input: ComponentRenderer
};

export function getComponentRenderer(type) {
  return registry[type] || null;
}
