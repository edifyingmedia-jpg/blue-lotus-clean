// backend/twin/actions/getProject.js

/**
 * getProject (Backend Action)
 * Retrieves a project by ID from Supabase.
 * This is the first real TWIN backend action.
 */

import { supabase } from "../supabase.js";

/**
 * getProject
 * @param {Object} payload
 * @param {string} payload.projectId - The ID of the project to retrieve
 */
export async function getProject({ projectId }) {
  if (!projectId) {
    throw new Error("Missing projectId");
  }

  // Query Supabase
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
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
    message: "Project loaded successfully"
  };
}
