// frontend/src/runtime/state/useBuilderState.js

import useAppState from "./useAppState";
import useSelectionState from "./useSelectionState";

/**
 * useBuilderState is the single source of truth
 * for the Blue Lotus builder.
 *
 * It combines:
 * - app definition state
 * - page selection
 * - component selection
 */
export default function useBuilderState(initialAppDefinition) {
  const appState = useAppState(initialAppDefinition);
  const selectionState = useSelectionState(
    initialAppDefinition?.pages?.[0]?.id ?? null
  );

  const { appDefinition } = appState;
  const { selectedPageId, selectedComponentId } = selectionState;

  /**
   * Derived helpers
   */
  const selectedPage =
    appDefinition?.pages?.find((p) => p.id === selectedPageId) ?? null;

  const findComponentById = (components, id) => {
    for (const component of components) {
      if (component.id === id) return component;
      if (component.children) {
        const found = findComponentById(component.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedComponent =
    selectedPage && selectedComponentId
      ? findComponentById(selectedPage.components, selectedComponentId)
      : null;

  return {
    ...appState,
    ...selectionState,

    selectedPage,
    selectedComponent,
  };
}
