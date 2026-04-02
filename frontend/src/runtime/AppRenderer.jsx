import React from "react";
import ComponentRenderer from "./ComponentRenderer";
import AppDefinitionValidator from "./AppDefinitionValidator";

export default function AppRenderer({ appDefinition }) {
  try {
    // Validate the entire app definition before rendering anything
    AppDefinitionValidator.validate(appDefinition);
  } catch (err) {
    return (
      <div style={{ color: "red", padding: "1rem" }}>
        App validation failed: {err.message}
      </div>
    );
  }

  const currentPage = appDefinition.pages?.[0];

  if (!currentPage) {
    return (
      <div style={{ color: "red", padding: "1rem" }}>
        No pages found in app definition.
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      {currentPage.components?.map((component, index) => (
        <ComponentRenderer key={index} component={component} />
      ))}
    </div>
  );
}
