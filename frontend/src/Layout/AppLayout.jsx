import React from "react";

export default function AppLayout({ left, right }) {
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
      {/* App Header */}
      <header
        style={{
          height: 56,
          background: "#111",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          fontWeight: 600,
          letterSpacing: 0.5
        }}
      >
        Blue Lotus Builder
      </header>

      {/* Builder Body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden"
        }}
      >
        {/* Left Panel */}
        <aside
          style={{
            width: 260,
            borderRight: "1px solid #ddd",
            background: "#fafafa",
            overflowY: "auto"
          }}
        >
          {left}
        </aside>

        {/* Right / Main Area */}
        <main
          style={{
            flex: 1,
            overflow: "hidden"
          }}
        >
          {right}
        </main>
      </div>
    </div>
  );
}
