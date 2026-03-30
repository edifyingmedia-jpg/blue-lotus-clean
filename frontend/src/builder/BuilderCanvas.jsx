import React from "react";
import "./BuilderCanvas.css";

export default function BuilderCanvas({ appDefinition }) {
  if (!appDefinition || !appDefinition.sections) {
    return (
      <div className="builder-canvas empty">
        <div className="builder-placeholder">
          <h2>No App Loaded</h2>
          <p>Ask TWIN to generate an application.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="builder-canvas">
      <div className="app-frame">
        {appDefinition.sections.map((section, index) => (
          <div key={index} className="builder-section">
            {section.components.map((component, idx) => (
              <div key={idx} className="builder-component">
                {component.render()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
