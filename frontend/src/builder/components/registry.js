// frontend/src/builder/components/registry.js

import React from "react";

/**
 * Component Registry v2
 * ---------------------
 * This is the expanded set of UI primitives your CanvasRenderer can use.
 * TWIN PRIME will eventually generate these automatically.
 */

export const RegistryV2 = {
  text: ({ value, size = 16 }) => (
    <div style={{ fontSize: size, padding: "4px 0" }}>{value}</div>
  ),

  heading: ({ value, level = 2 }) => {
    const Tag = `h${level}`;
    return <Tag style={{ margin: "8px 0" }}>{value}</Tag>;
  },

  button: ({ label }) => (
    <button
      style={{
        padding: "10px 18px",
        background: "#4a6cf7",
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: 15
      }}
    >
      {label || "Button"}
    </button>
  ),

  input: ({ placeholder }) => (
    <input
      placeholder={placeholder || "Enter text"}
      style={{
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 6,
        width: "100%",
        fontSize: 15
      }}
    />
  ),

  image: ({ src, alt }) => (
    <img
      src={src || "https://via.placeholder.com/300x200"}
      alt={alt || "Image"}
      style={{
        maxWidth: "100%",
        borderRadius: 8,
        margin: "8px 0"
      }}
    />
  ),

  card: ({ children }) => (
    <div
      style={{
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        marginBottom: 12
      }}
    >
      {children}
    </div>
  ),

  container: ({ children, padding = 16 }) => (
    <div style={{ padding }}>{children}</div>
  ),

  row: ({ children, gap = 12 }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap,
        alignItems: "center"
      }}
    >
      {children}
    </div>
  ),

  column: ({ children, gap = 12 }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap
      }}
    >
      {children}
    </div>
  ),

  divider: () => (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #ddd",
        margin: "12px 0"
      }}
    />
  ),

  section: ({ title, children }) => (
    <div style={{ marginBottom: 24 }}>
      {title && (
        <h3 style={{ marginBottom: 12, borderBottom: "1px solid #eee" }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  ),

  list: ({ children }) => (
    <ul style={{ paddingLeft: 20, margin: "8px 0" }}>{children}</ul>
  ),

  listItem: ({ value }) => <li style={{ marginBottom: 4 }}>{value}</li>,

  spacer: ({ size = 16 }) => <div style={{ height: size }} />
};
