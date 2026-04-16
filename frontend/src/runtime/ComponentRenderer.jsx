// frontend/src/runtime/ComponentRenderer.jsx
import React, { useMemo } from "react";
import { useRuntime } from "./RuntimeContext";
import componentRegistry from "./ComponentRegistry";

export default function ComponentRenderer({ component, screen }) {
  const { dispatcher, stateEngine } = useRuntime();

  if (!component || typeof component !== "object") {
    return <div className="text-red-500">Invalid component structure</div>;
  }

  const { id, type, props = {}, children = [] } = component;
  const Resolved = componentRegistry.getComponent(type);

  // Memoize props to prevent child re-renders unless the AI actually changes something
  const wrappedProps = useMemo(() => ({
    ...props,
    id,
    onClick: props.onClick ? (e) => {
      e?.stopPropagation(); // Prevent event bubbling in complex layouts
      dispatcher.dispatch(props.onClick, { id, ...props });
    } : undefined,
    onChange: props.onChange ? (e) => {
      dispatcher.dispatch(props.onChange, { value: e.target.value, id });
    } : undefined,
    state: stateEngine.get(),
    screen,
  }), [props, id, dispatcher, stateEngine, screen]);

  return (
    <Resolved {...wrappedProps}>
      {Array.isArray(children) && children.map((child) => (
        <ComponentRenderer 
          key={child.id || `child-${Math.random()}`} 
          component={child} 
          screen={screen} 
        />
      ))}
    </Resolved>
  );
}
