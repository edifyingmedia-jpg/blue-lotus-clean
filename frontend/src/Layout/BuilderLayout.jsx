import React from "react";

export default function BuilderLayout({ left, right }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        height: "100vh",
        overflow: "hidden",
        background: "#f7f7f8"
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRight: "1px solid #e2e2e6",
          padding: "16px",
          overflowY: "auto"
        }}
      >
        {left}
      </div>

      <div
        style={{
          background: "#f7f7f8",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {right}
      </div>
    </div>
  );
}
