// frontend/src/runtime/resolveNode.js

import componentRegistry from "../components/ComponentRegistry";

export function resolveNode(node) {
  if (!node || !node.type) {
    return null;
  }

  const Component = componentRegistry.getComponent(node.type);

  if (!Component) {
    return {
      render: () => (
        <div style={{ padding: 8, background: "#330000", color: "white" }}>
          Unknown component: {node.type}
        </div>
      ),
    };
  }

  return {
    render: () => <Component {...(node.props || {})} />,
  };
}
