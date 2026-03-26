// frontend/src/runtime/state/useAppState.js

import { useState, useCallback } from "react";

/**
 * useAppState manages the full app definition.
 * This is the single source of truth for:
 * - pages
 * - components
 * - layout
 * - props
 */

export default function useAppState(initialAppDefinition) {
  const [appDefinition, setAppDefinition] = useState(initialAppDefinition);

  /**
   * Replace the entire app definition.
   */
  const setApp = useCallback((nextDefinition) => {
    setAppDefinition(nextDefinition);
  }, []);

  /**
   * Update a page by id.
   */
  const updatePage = useCallback((pageId, updater) => {
    setAppDefinition((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.id === pageId ? updater(page) : page
      ),
    }));
  }, []);

  /**
   * Update a component by id (deep search).
   */
  const updateComponent = useCallback((componentId, updater) => {
    const updateTree = (components) =>
      components.map((component) => {
        if (component.id === componentId) {
          return updater(component);
        }

        if (component.children) {
          return {
            ...component,
            children: updateTree(component.children),
          };
        }

        return component;
      });

    setAppDefinition((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => ({
        ...page,
        components: updateTree(page.components),
      })),
    }));
  }, []);

  return {
    appDefinition,
    setApp,
    updatePage,
    updateComponent,
  };
}
