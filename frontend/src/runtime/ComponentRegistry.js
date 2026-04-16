// frontend/src/runtime/ComponentRegistry.js
import React from "react";
// ... (keep your existing imports)

const registry = {
  text: ActionText,
  button: ActionButton,
  input: ActionInput,
  image: ActionImage,
  container: ActionContainer,
  list: ActionList,
  spacer: ActionSpacer,
  divider: ActionDivider,
  group: ActionGroup,
  card: ActionCard,
  toggle: ActionToggle,
};

// A simple fallback to help you debug missing components in the builder
const FallbackComponent = ({ type }) => (
  <div className="p-2 border border-dashed border-red-500 text-red-500 text-xs">
    Unknown Component: {type}
  </div>
);

export function getComponent(type) {
  const Component = registry[type];
  if (!Component) {
    console.warn(`[Runtime] Component type "${type}" not found in registry.`);
    return (props) => <FallbackComponent type={type} {...props} />;
  }
  return Component;
}

export default registry;
