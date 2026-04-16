// backend/twin/actions/updateProject.js
import { supabase } from "../supabase.js";

/**
 * updateProject
 * @param {Object} payload
 * @param {string} payload.projectId - The ID of the project to update
 * @param {string} payload.ownerId - The ID of the user (for security)
 * @param {Object} payload.updates - The fields to update
 */
export async function updateProject({ projectId, ownerId, updates }) {
  if (!projectId) {
    throw new Error("Missing projectId");
  }
  if (!updates || typeof updates !== "object") {
    throw new Error("Missing or invalid updates object");
  }

  // 1. Force update the timestamp
  const finalUpdates = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  // 2. Perform the update with an ownership check
  let query = supabase
    .from("projects")
    .update(finalUpdates)
    .eq("id", projectId);

  if (ownerId) {
    query = query.eq("owner_id", ownerId);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error("Supabase Update Error:", error);
    throw new Error("Supabase error: " + error.message);
  }

  if (!data) {
    return { ok: false, message: "Project not found or access denied." };
  }

  return {
    ok: true,
    project: data,
    message: "Project updated successfully"
  };
}
