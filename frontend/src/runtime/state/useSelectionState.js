// frontend/src/runtime/state/useSelectionState.js

import { useState, useCallback } from "react";

/**
 * useSelectionState manages the builder's selection:
 * - selected page
 * - selected component
 *
 * This hook is used by both the Builder UI and the Live Preview
 * so they stay in sync.
 */

export default function useSelectionState(initialPageId = null) {
  const [selectedPageId, setSelectedPageId] = useState(initialPageId);
  const [selectedComponentId, setSelectedComponentId] = useState(null);

  /**
   * Select a page and clear component selection.
   */
  const selectPage = useCallback((pageId) => {
    setSelectedPageId(pageId);
    setSelectedComponentId(null);
  }, []);

  /**
   * Select a component inside the current page.
   */
  const selectComponent = useCallback((componentId) => {
    setSelectedComponentId(componentId);
  }, []);

  /**
   * Clear all selections.
   */
  const clearSelection = useCallback(() => {
    setSelectedPageId(null);
    setSelectedComponentId(null);
  }, []);

  return {
    selectedPageId,
    selectedComponentId,
    selectPage,
    selectComponent,
    clearSelection,
  };
}
