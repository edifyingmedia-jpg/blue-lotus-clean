import React from "react";

export default function ComponentRenderer({ component }) {
  switch (component.type) {
    case "text":
      return <p>{component.props?.text || "Text"}</p>;

    case "button":
      return (
        <button>
          {component.props?.label || "Button"}
        </button>
      );

    case "input":
      return (
        <input
          type="text"
          placeholder={component.props?.placeholder || "Enter text"}
        />
      );

    default:
      return null;
  }
}
