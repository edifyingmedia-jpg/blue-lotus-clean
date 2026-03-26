import React from "react";

export default function BuilderApp() {
  return (
    <div className="builder-shell">
      {/* Header */}
      <header className="builder-header">
        <div className="builder-header-left">
          <span className="builder-title">Blue Lotus</span>
          <span className="builder-subtitle">Meta Builder</span>
        </div>

        <div className="builder-header-right">
          <span className="builder-mode">Authoring</span>
          {/* Publish button will live here later */}
        </div>
      </header>

      {/* Main Layout */}
      <main className="builder-main">
        {/* Left Sidebar */}
        <aside className="builder-sidebar builder-sidebar-left">
          {/* Structure / Pages / Components */}
        </aside>

        {/* Canvas */}
        <section className="builder-canvas">
          <div className="builder-canvas-frame">
            {/* LivePreview will mount here */}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="builder-sidebar builder-sidebar-right">
          {/* Inspector / Properties */}
        </aside>
      </main>
    </div>
  );
}
