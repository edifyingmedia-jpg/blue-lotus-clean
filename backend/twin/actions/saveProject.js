// backend/twin/actions/saveProject.js

/**
 * saveProject (Backend Action)
 * Saves the full project definition, builder state, and metadata.
 */

import { supabase } from "../supabase.js";

/**
 * saveProject
 * @param {Object} payload
 * @param {string} payload.projectId - The project to save
 * @param {Object} payload.definition - The full project definition (builder state)
 * @param {Object} payload.metadata - Optional metadata (name, description, etc.)
 */
export async function saveProject({ projectId, definition, metadata = {} }) {
  if (!projectId) {
    throw new Error("Missing projectId");
  }

  if (!definition || typeof definition !== "object") {
    throw new Error("Missing or invalid project definition");
  }

  const updates = {
    definition,
    ...metadata,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    throw new Error("Supabase error: " + error.message);
  }

  if (!data) {
    return {
      ok: false,
      projectId,
      message: "Project not found"
    };
  }

  return {
    ok: true,
    project: data,
    message: "Project saved successfully"
  };
}
