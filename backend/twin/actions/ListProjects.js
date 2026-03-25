// backend/twin/actions/listProjects.js

/**
 * listProjects (Backend Action)
 * Returns all projects owned by a specific user.
 */

import { supabase } from "../supabase.js";

/**
 * listProjects
 * @param {Object} payload
 * @param {string} payload.ownerId - The user whose projects to list
 */
export async function listProjects({ ownerId }) {
  if (!ownerId) {
    throw new Error("Missing ownerId");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", ownerId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error("Supabase error: " + error.message);
  }

  return {
    ok: true,
    projects: data || [],
    count: data?.length || 0,
    message: "Projects loaded successfully"
  };
}
