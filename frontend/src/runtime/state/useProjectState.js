// frontend/src/runtime/state/useProjectState.js

import { useState, useCallback } from "react";

/**
 * useProjectState
 * --------------------------------------------------
 * Centralized state hook for managing the project definition.
 * This powers both the builder and the runtime preview.
 */

export function useProjectState(initialProject) {
  const [project, setProject] = useState(initialProject);

  /**
   * Update a component's props
   */
  const updateComponentProps = useCallback((pageId, componentId, newProps) => {
    setProject((prev) => {
      const pages = prev.pages.map((page) => {
        if (page.id !== pageId) return page;

        const components = page.components.map((component) => {
          if (component.id !== componentId) return component;
          return { ...component, props: { ...component.props, ...newProps } };
        });

        return { ...page, components };
      });

      return { ...prev, pages };
    });
  }, []);

  /**
   * Select a component
   */
  const selectComponent = useCallback((componentId) => {
    setProject((prev) => ({
      ...prev,
      selectedComponentId: componentId,
    }));
  }, []);

  /**
   * Change the current page
   */
  const setCurrentPage = useCallback((pageId) => {
    setProject((prev) => ({
      ...prev,
      currentPageId: pageId,
    }));
  }, []);

  return {
    project,
    setProject,
    updateComponentProps,
    selectComponent,
    setCurrentPage,
  };
}
