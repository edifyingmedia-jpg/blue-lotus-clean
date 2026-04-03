// frontend/src/runtime/ComponentRenderer.jsx

import React from "react";
import { useRuntime } from "./RuntimeContext";
import componentRegistry from "./ComponentRegistry";

/**
 * ComponentRenderer
 * ----------------------------------------------------
 * Resolves a component definition into a real UI element.
 * Supports:
 *  - runtime context injection
 *  - action dispatching
 *  - nested children
 *  - registry-based component lookup
 */

export default function ComponentRenderer({ component, screen }) {
  const { dispatcher, stateEngine } = useRuntime();

  if (!component || typeof component !== "object") {
    return (
      <div style={{ color: "red" }}>
        Invalid component
      </div>
    );
  }

  const { id, type, props = {}, children = [] } = component;

  // Resolve the actual React component from the registry
  const Resolved = componentRegistry.get(type);

  if (!Resolved) {
    return (
      <div style={{ color: "orange", padding: 8 }}>
        Unknown component type: <strong>{type}</strong>
      </div>
    );
  }

  // Wrap event handlers so they dispatch actions
  const wrappedProps = {
    ...props,
    onClick: props.onClick
      ? () => dispatcher.dispatch(props.onClick)
      : props.onClick,
    onChange: props.onChange
      ? (e) => dispatcher.dispatch(props.onChange, e.target.value)
      : props.onChange,
    state: stateEngine.get(),
    screen,
  };

  return (
    <Resolved {...wrappedProps}>
      {Array.isArray(children) &&
        children.map((child) => (
          <ComponentRenderer
            key={child.id}
            component={child}
            screen={screen}
          />
        ))}
    </Resolved>
  );
}
