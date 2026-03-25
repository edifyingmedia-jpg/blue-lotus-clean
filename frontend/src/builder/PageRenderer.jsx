import React from "react";
import { formatValue } from "../utils";

export function PageRenderer({ page }) {
  if (!page) {
    return <div>No page loaded</div>;
  }

  return (
    <div>
      {page.components.map((component) => {
        switch (component.type) {
          case "text":
            return (
              <div key={component.id} style={{ marginBottom: 12 }}>
                {formatValue(component.props.text || "Text")}
              </div>
            );

          case "button":
            return (
              <button
                key={component.id}
                style={{ marginBottom: 12, padding: "8px 16px" }}
              >
                {formatValue(component.props.label || "Button")}
              </button>
            );

          case "image":
            return (
              <img
                key={component.id}
                src={component.props.src || ""}
                alt=""
                style={{ maxWidth: "100%", marginBottom: 12 }}
              />
            );

          default:
            return (
              <div key={component.id} style={{ marginBottom: 12 }}>
                Unknown component: {component.type}
              </div>
            );
        }
      })}
    </div>
  );
}
