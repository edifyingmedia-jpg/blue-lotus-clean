// backend/twin/actions/deleteProject.js

/**
 * deleteProject (Backend Action)
 * Deletes a project from Supabase by ID.
 */

import { supabase } from "../supabase.js";

/**
 * deleteProject
 * @param {Object} payload
 * @param {string} payload.projectId - The ID of the project to delete
 */
export async function deleteProject({ projectId }) {
  if (!projectId) {
    throw new Error("Missing projectId");
  }

  const { data, error } = await supabase
    .from("projects")
    .delete()
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
    projectId,
    message: "Project deleted successfully"
  };
}
