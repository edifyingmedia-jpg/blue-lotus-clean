import { useEffect, useState } from "react";
import AppDefinitionValidator from "./AppDefinitionValidator";
import ComponentRenderer from "./ComponentRenderer";

export default function AppRenderer({ appDefinition, navigationEngine }) {
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const result = AppDefinitionValidator.validate(appDefinition);
    if (!result.valid) {
      setError(result.error);
      setValid(false);
      return;
    }

    setValid(true);
    setError(null);

    if (appDefinition.pages && appDefinition.pages.length > 0) {
      setCurrentPage(appDefinition.pages[0]);
    }
  }, [appDefinition]);

  useEffect(() => {
    if (!navigationEngine) return;

    navigationEngine.onChange((pageId) => {
      const next = appDefinition.pages.find((p) => p.id === pageId);
      if (next) setCurrentPage(next);
    });
  }, [navigationEngine, appDefinition]);

  if (!valid) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        {error || "Invalid app definition."}
      </div>
    );
  }

  if (!currentPage) {
    return <div style={{ padding: 20 }}>No page selected.</div>;
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {currentPage.components.map((comp, index) => (
        <ComponentRenderer
          key={index}
          type={comp.type}
          props={comp.props}
        />
      ))}
    </div>
  );
}
