import React from "react";
import "./BuilderCanvas.css";

export default function BuilderCanvas({ appDefinition }) {
  if (!appDefinition) {
    return (
      <main className="builder-canvas empty">
        <div className="builder-placeholder">
          <h2>Awaiting Build</h2>
          <p>TWIN will render the application here.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="builder-canvas">
      {appDefinition.sections?.map((section, index) => (
        <section key={index} className="builder-section">
          {section.components?.map((component, idx) => (
            <div key={idx} className="builder-component">
              {renderComponent(component)}
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}

function renderComponent(component) {
  switch (component.type) {
    case "Text":
      return <p>{component.content}</p>;

    case "Image":
      return <img src={component.src} alt={component.alt || ""} />;

    case "Button":
      return <button>{component.label}</button>;

    default:
      return null;
  }
}
