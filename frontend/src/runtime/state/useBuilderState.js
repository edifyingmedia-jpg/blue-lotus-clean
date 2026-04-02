import { useState, useCallback } from "react";

/**
 * useBuilderState
 * ----------------------------------------------------
 * Local state container for the Builder environment.
 * This manages:
 * - selected screen
 * - selected component
 * - builder mode (screens, components, navigation, preview)
 * - temporary UI state for the builder panels
 */

export default function useBuilderState() {
  const [builder, setBuilder] = useState({
    mode: "screens",        // screens | components | navigation | preview
    selectedScreen: null,
    selectedComponent: null,
    hoveredComponent: null,
    panelWidth: 320,
    panelOpen: true,
  });

  const update = useCallback((patch) => {
    setBuilder((prev) => ({
      ...prev,
      ...(typeof patch === "function" ? patch(prev) : patch),
    }));
  }, []);

  const selectScreen = useCallback((id) => {
    update({
      selectedScreen: id,
      selectedComponent: null,
    });
  }, [update]);

  const selectComponent = useCallback((id) => {
    update({
      selectedComponent: id,
    });
  }, [update]);

  const setMode = useCallback((mode) => {
    update({ mode });
  }, [update]);

  const togglePanel = useCallback(() => {
    update((prev) => ({ panelOpen: !prev.panelOpen }));
  }, [update]);

  return {
    builder,
    update,
    selectScreen,
    selectComponent,
    setMode,
    togglePanel,
  };
}
