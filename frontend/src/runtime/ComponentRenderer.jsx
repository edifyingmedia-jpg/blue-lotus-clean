import React from "react";

export default function ComponentRenderer({ component }) {
  if (!component || typeof component !== "object") {
    return <div style={{ color: "red" }}>Invalid component</div>;
  }

  const { type, props } = component;

  switch (type) {
    case "text":
      return <p {...props}>{props?.text || ""}</p>;

    case "heading":
      return <h1 {...props}>{props?.text || ""}</h1>;

    case "button":
      return (
        <button
          {...props}
          onClick={props?.onClick || (() => console.log("Button clicked"))}
        >
          {props?.text || "Button"}
        </button>
      );

    case "image":
      return <img {...props} alt={props?.alt || "image"} />;

    case "input":
      return <input {...props} />;

    default:
      return (
        <div style={{ color: "orange" }}>
          Unknown component type: {type}
        </div>
      );
  }
}
