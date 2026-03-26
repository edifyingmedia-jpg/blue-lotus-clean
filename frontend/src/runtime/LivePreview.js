import React, { useEffect, useState, useMemo } from "react";
import AppRenderer from "./AppRenderer";
import validateAppDefinition from "./AppDefinitionValidator";

/**
 * ErrorBoundary ensures the preview never crashes the builder UI.
 */
class PreviewErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("LivePreview crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "1rem",
          background: "#ffe6e6",
          border: "1px solid #ffb3b3",
          borderRadius: "6px",
          color: "#990000"
        }}>
          <h3>Preview Error</h3>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * LivePreview renders the selected page using the full app definition.
 * It updates instantly as the user edits the builder.
 */
export default function LivePreview({
  appDefinition,
  selectedPageId,
  selectedComponentId
}) {
  const [validationErrors, setValidationErrors] = useState([]);

  // Validate app definition whenever it changes
  useEffect(() => {
    const errors = validateAppDefinition(appDefinition);
    setValidationErrors(errors || []);
  }, [appDefinition]);

  // Extract the selected page
  const selectedPage = useMemo(() => {
    if (!appDefinition?.pages) return null;
    return appDefinition.pages.find(p => p.id === selectedPageId) || null;
  }, [appDefinition, selectedPageId]);

  return (
    <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
      
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div style={{
          background: "#fff3cd",
          border: "1px solid #ffeeba",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "6px",
          color: "#856404"
        }}>
          <h4>Validation Issues</h4>
          <ul>
            {validationErrors.map((err, i) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Page */}
      {!selectedPage && (
        <div style={{
          padding: "1rem",
          background: "#e7f3ff",
          border: "1px solid #b3daff",
          borderRadius: "6px",
          color: "#004085"
        }}>
          <h3>No Page Selected</h3>
          <p>Select a page in the builder to preview it.</p>
        </div>
      )}

      {/* Actual Preview */}
      {selectedPage && (
        <PreviewErrorBoundary>
          <AppRenderer
            appDefinition={appDefinition}
            page={selectedPage}
            selectedComponentId={selectedComponentId}
            mode="preview"
          />
        </PreviewErrorBoundary>
      )}
    </div>
  );
}
