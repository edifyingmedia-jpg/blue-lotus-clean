import React from "react";
import ComponentRenderer from "./ComponentRenderer";

/**
 * resolveNode
 * -----------
 * Takes a node definition and returns a rendered React element.
 */

export default function resolveNode(node) {
  if (!node || typeof node !== "object") {
    console.warn("resolveNode: invalid node:", node);
    return null;
  }

  const { type, props = {}, children = [] } = node;

  // If this is a primitive component, render it directly
  if (!children || children.length === 0) {
    return <ComponentRenderer node={node} />;
  }

  // If this component has children, wrap them
  return (
    <div>
      <ComponentRenderer node={node} />
      {children.map((child, index) => (
        <div key={index}>{resolveNode(child)}</div>
      ))}
    </div>
  );
}
