import React from "react";
import { formatValue } from "../utils";
import { COMPONENT_TYPES } from "./ComponentRegistry.js";

export function ComponentRenderer({ component }) {
  if (!component) {
    return null;
  }

  const { type, props } = component;

  switch (type) {
    case "text":
      return (
        <div style={{ marginBottom: 12 }}>
          {formatValue(props.text || COMPONENT_TYPES.text.defaultProps.text)}
        </div>
      );

    case "button":
      return (
        <button
          style={{ marginBottom: 12, padding: "8px 16px" }}
        >
          {formatValue(props.label || COMPONENT_TYPES.button.defaultProps.label)}
        </button>
      );

    case "image":
      return (
        <img
          src={props.src || COMPONENT_TYPES.image.defaultProps.src}
          alt=""
          style={{ maxWidth: "100%", marginBottom: 12 }}
        />
      );

    default:
      return (
        <div style={{ marginBottom: 12 }}>
          Unknown component: {type}
        </div>
      );
  }
}
