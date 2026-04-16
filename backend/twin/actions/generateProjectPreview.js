// backend/twin/actions/generateProjectPreview.js

/**
 * generateProjectPreview
 * Formats raw AI output into a structured snapshot for the LivePreview engine.
 */
export async function generateProjectPreview({ project }) {
  if (!project || typeof project !== "object") {
    throw new Error("Invalid project payload: expected an object.");
  }

  const { id = "temp-id", name = "New Project", pages = [] } = project;

  const preview = {
    id,
    name,
    pageCount: pages.length,
    pages: pages.map((page) => ({
      id: page.id || `page-${Math.random().toString(36).substr(2, 5)}`,
      name: page.name || "Untitled Page",
      componentCount: Array.isArray(page.components) ? page.components.length : 0,
      components: Array.isArray(page.components)
        ? page.components.map((c) => ({
            id: c.id || `comp-${Math.random().toString(36).substr(2, 5)}`,
            type: c.type || "div",
            props: c.props || {},
          }))
        : [],
    })),
  };

  return { ok: true, preview };
}
