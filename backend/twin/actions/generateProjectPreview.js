// backend/twin/actions/generateProjectPreview.js

/**
 * generateProjectPreview
 * ----------------------
 * Produces a safe, deterministic preview payload for the frontend.
 * This does NOT execute code — it only assembles a structured snapshot
 * of the project so the LivePreview engine can render it.
 */

export async function generateProjectPreview({ project }) {
  if (!project || typeof project !== "object") {
    throw new Error("Invalid project payload: expected an object.");
  }

  // Basic required fields
  const { id, name, pages } = project;

  if (!id) throw new Error("Project is missing id");
  if (!name) throw new Error("Project is missing name");
  if (!Array.isArray(pages)) {
    throw new Error("Project pages must be an array");
  }

  // Build preview structure
  const preview = {
    id,
    name,
    pageCount: pages.length,
    pages: pages.map((page) => ({
      id: page.id,
      name: page.name,
      componentCount: Array.isArray(page.components)
        ? page.components.length
        : 0,
      components: Array.isArray(page.components)
        ? page.components.map((c) => ({
            id: c.id,
            type: c.type,
            props: c.props || {},
          }))
        : [],
    })),
  };

  return {
    ok: true,
    preview,
  };
}
