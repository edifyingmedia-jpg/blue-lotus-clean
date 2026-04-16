// backend/twin/actions/listProjects.js
import { supabase } from "../supabase.js";

/**
 * listProjects
 * Returns all projects owned by a specific user, sorted by most recently updated.
 */
export async function listProjects({ ownerId }) {
  if (!ownerId) {
    throw new Error("Missing ownerId - cannot fetch projects without a user reference.");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", ownerId)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Supabase List Error:", error); // Vital for debugging in production
    throw new Error("Supabase error: " + error.message);
  }

  return {
    ok: true,
    projects: data || [],
    count: data ? data.length : 0,
    message: data?.length > 0 ? "Projects loaded." : "No projects found for this user."
  };
}
