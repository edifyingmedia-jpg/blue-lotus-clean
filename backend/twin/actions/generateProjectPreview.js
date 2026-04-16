// backend/twin/actions/generateProjectPreview.js

/**
 * generateProjectPreview
 * ----------------------
 * Formats raw AI output into a structured, safe snapshot for the LivePreview engine.
 * It adds missing IDs and normalizes props so the frontend doesn't crash.
 */
export async function generateProjectPreview({ project }) {
  if (!project || typeof project !== "object") {
    throw new Error("Invalid project payload: expected an object.");
  }

  // Set top-level defaults
  const { 
    id = `proj-${Math.random().toString(36).substr(2, 5)}`, 
    name = "New Blue Lotus Project", 
    pages = [] 
  } = project;

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
            // Normalize props for Tailwind and React rendering
            props: {
              ...c.props,
              className: c.props?.className || "", // Pre-fill for style editing
              children: c.props?.children || c.props?.text || "" // Ensure content exists
            },
          }))
        : [],
    })),
  };

  return {
    ok: true,
    preview,
  };
}
