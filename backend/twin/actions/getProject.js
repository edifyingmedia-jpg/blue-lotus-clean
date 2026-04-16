// backend/twin/actions/getProject.js
/**
 * getProject (Backend Action)
 * Retrieves a project by ID from Supabase, ensuring it belongs to the requester.
 */
import { supabase } from "../supabase.js";

export async function getProject({ projectId, ownerId }) {
  if (!projectId) {
    throw new Error("Missing projectId");
  }

  // We add .eq('owner_id', ownerId) as an extra layer of security
  let query = supabase
    .from("projects")
    .select("*")
    .eq("id", projectId);

  if (ownerId) {
    query = query.eq("owner_id", ownerId);
  }

  const { data, error } = await query.single();

  if (error) {
    console.error("Supabase Fetch Error:", error);
    // Return a clean 'not found' rather than a crash if the ID is just wrong
    if (error.code === 'PGRST116') {
      return { ok: false, message: "Project not found or access denied." };
    }
    throw new Error("Supabase error: " + error.message);
  }

  return {
    ok: true,
    project: data,
    message: "Project loaded successfully"
  };
}
