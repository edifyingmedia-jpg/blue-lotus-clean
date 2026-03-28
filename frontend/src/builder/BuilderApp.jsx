import React from "react";

export default function BuilderApp() {
  return (
    <div
      className="builder-shell"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden"
      }}
    >
      {/* Main Builder Layout */}
      <main
        className="builder-main"
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden"
        }}
      >
        {/* Left Sidebar */}
        <aside
          className="builder-sidebar builder-sidebar-left"
          style={{
            width: 260,
            borderRight: "1px solid #ddd",
            background: "#fafafa",
            overflowY: "auto"
          }}
        >
          {/* Component / Structure panel mounts here */}
        </aside>

        {/* Canvas */}
        <section
          className="builder-canvas"
          style={{
            flex: 1,
            overflow: "auto",
            background: "#fff"
          }}
        >
          <div className="builder-canvas-frame">
            {/* LivePreview mounts here */}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside
          className="builder-sidebar builder-sidebar-right"
          style={{
            width: 300,
            borderLeft: "1px solid #ddd",
            background: "#fafafa",
            overflowY: "auto"
          }}
        >
          {/* Inspector / Properties panel mounts here */}
        </aside>
      </main>
    </div>
  );
}
