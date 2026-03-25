// backend/twin/actions/updateProject.js

/**
 * updateProject (Backend Action)
 * Updates an existing project in Supabase.
 */

import { supabase } from "../supabase.js";

/**
 * updateProject
 * @param {Object} payload
 * @param {string} payload.projectId - The ID of the project to update
 * @param {Object} payload.updates - The fields to update
 */
export async function updateProject({ projectId, updates }) {
  if (!projectId) {
    throw new Error("Missing projectId");
  }

  if (!updates || typeof updates !== "object") {
    throw new Error("Missing or invalid updates object");
  }

  // Always update the timestamp
  updates.updated_at = new Date().toISOString();

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
    message: "Project updated successfully"
  };
}
