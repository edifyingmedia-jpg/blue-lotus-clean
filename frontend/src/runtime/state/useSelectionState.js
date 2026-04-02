import { useState, useCallback } from "react";

/**
 * useSelectionState
 * ----------------------------------------------------
 * Manages selection inside the builder + runtime:
 * - selected component
 * - hovered component
 * - clear / update helpers
 */

export default function useSelectionState() {
  const [selection, setSelection] = useState({
    selectedId: null,
    hoveredId: null,
  });

  const select = useCallback((id) => {
    setSelection((prev) => ({
      ...prev,
      selectedId: id,
    }));
  }, []);

  const hover = useCallback((id) => {
    setSelection((prev) => ({
      ...prev,
      hoveredId: id,
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelection((prev) => ({
      ...prev,
      selectedId: null,
    }));
  }, []);

  const clearHover = useCallback(() => {
    setSelection((prev) => ({
      ...prev,
      hoveredId: null,
    }));
  }, []);

  return {
    selection,
    select,
    hover,
    clearSelection,
    clearHover,
  };
}
