import React from "react";

export default function AppLayout({ children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f7f7f8"
      }}
    >
      {children}
    </div>
  );
}
