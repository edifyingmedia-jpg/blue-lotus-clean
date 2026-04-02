// frontend/src/runtime/AppRenderer.jsx

import React from "react";
import componentRegistry from "../components/ComponentRegistry";

export default function AppRenderer({ appDefinition }) {
  if (!appDefinition || !appDefinition.sections) {
    return null;
  }

  return (
    <>
      {appDefinition.sections.map((section, index) => (
        <div key={index}>
          {section.components.map((component, idx) => {
            const Component = componentRegistry.getComponent(component.type);

            if (!Component) {
              return (
                <div
                  key={idx}
                  style={{
                    padding: 8,
                    background: "#330000",
                    color: "white",
                  }}
                >
                  Unknown component: {component.type}
                </div>
              );
            }

            return <Component key={idx} {...(component.props || {})} />;
          })}
        </div>
      ))}
    </>
  );
}
