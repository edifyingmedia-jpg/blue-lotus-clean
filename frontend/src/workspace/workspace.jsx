import React from "react";

export default function Workspace({ children }) {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: "24px",
        overflow: "auto",
      }}
    >
      {children || (
        <div
          style={{
            height: "100%",
            border: "2px dashed #ccc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#777",
            fontSize: "16px",
          }}
        >
          Workspace ready. No app loaded yet.
        </div>
      )}
    </div>
  );
}
