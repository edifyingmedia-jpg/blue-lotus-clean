// backend/twin/actions/generateProjectPreview.js

/**
 * generateProjectPreview (Backend Action)
 * Prepares a normalized, preview-safe version of the project definition.
 */

import { supabase } from "../supabase.js";

/**
 * generateProjectPreview
 * @param {Object} payload
 * @param {string} payload.projectId - The project to preview
 */
export async function generateProjectPreview({ projectId }) {
  if (!projectId) {
    throw new Error("Missing projectId");
  }

  // Load the project
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) {
    throw new Error("Supabase error: " + error.message);
  }

  if (!project) {
    return {
      ok: false,
      projectId,
      message: "Project not found"
    };
  }

  const definition = project.definition;

  if (!definition || typeof definition !== "object") {
    throw new Error("Invalid or missing project definition");
  }

  // Normalize screens
  const screens = Array.isArray(definition.screens)
    ? definition.screens.map(screen => ({
        id: screen.id,
        name: screen.name,
        type: screen.type || "screen",
        components: screen.components || [],
        routes: screen.routes || []
      }))
    : [];

  // Normalize components
  const components = Array.isArray(definition.components)
    ? definition.components.map(c => ({
        id: c.id,
        type: c.type,
        props: c.props || {},
        children: c.children || []
      }))
    : [];

  // Normalize routes
  const routes = Array.isArray(definition.routes)
    ? definition.routes.map(r => ({
        path: r.path,
        screenId: r.screenId
      }))
    : [];

  // Construct preview payload
  const preview = {
    projectId,
    name: project.name,
    updated_at: project.updated_at,
    screens,
    components,
    routes
  };

  return {
    ok: true,
    preview,
    message: "Preview generated successfully"
  };
}
