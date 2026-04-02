import { useState, useCallback } from "react";

/**
 * useProjectState
 * ----------------------------------------------------
 * Manages the active project structure inside the
 * Blue Lotus runtime + builder environment.
 *
 * This includes:
 * - project metadata
 * - screens/pages
 * - components on each screen
 * - selection helpers
 * - safe update helpers
 */

export default function useProjectState(initialProject = null) {
  const [project, setProject] = useState(initialProject);

  // -----------------------------
  // Update project root
  // -----------------------------
  const updateProject = useCallback((patch) => {
    setProject((prev) => ({
      ...prev,
      ...(typeof patch === "function" ? patch(prev) : patch),
    }));
  }, []);

  // -----------------------------
  // Screen helpers
  // -----------------------------
  const addScreen = useCallback((screen) => {
    updateProject((prev) => ({
      ...prev,
      screens: [...(prev?.screens || []), screen],
    }));
  }, [updateProject]);

  const updateScreen = useCallback((id, patch) => {
    updateProject((prev) => ({
      ...prev,
      screens: prev.screens.map((s) =>
        s.id === id ? { ...s, ...(typeof patch === "function" ? patch(s) : patch) } : s
      ),
    }));
  }, [updateProject]);

  const removeScreen = useCallback((id) => {
    updateProject((prev) => ({
      ...prev,
      screens: prev.screens.filter((s) => s.id !== id),
    }));
  }, [updateProject]);

  // -----------------------------
  // Component helpers
  // -----------------------------
  const addComponent = useCallback((screenId, component) => {
    updateScreen(screenId, (screen) => ({
      ...screen,
      components: [...(screen.components || []), component],
    }));
  }, [updateScreen]);

  const updateComponent = useCallback((screenId, componentId, patch) => {
    updateScreen(screenId, (screen) => ({
      ...screen,
      components: screen.components.map((c) =>
        c.id === componentId
          ? { ...c, ...(typeof patch === "function" ? patch(c) : patch) }
          : c
      ),
    }));
  }, [updateScreen]);

  const removeComponent = useCallback((screenId, componentId) => {
    updateScreen(screenId, (screen) => ({
      ...screen,
      components: screen.components.filter((c) => c.id !== componentId),
    }));
  }, [updateScreen]);

  // -----------------------------
  // Return API
  // -----------------------------
  return {
    project,
    setProject,
    updateProject,
    addScreen,
    updateScreen,
    removeScreen,
    addComponent,
    updateComponent,
    removeComponent,
  };
}
