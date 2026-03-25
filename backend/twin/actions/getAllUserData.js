// backend/twin/actions/getAllUserData.js

/**
 * getAllUserData (Backend Action)
 * Loads all user-related data in a single call.
 */

import { supabase } from "../supabase.js";

export async function getAllUserData({ userId }) {
  if (!userId) {
    throw new Error("Missing userId");
  }

  // Fetch user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    throw new Error("Supabase error (profile): " + profileError.message);
  }

  // Fetch all projects
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", userId)
    .order("updated_at", { ascending: false });

  if (projectsError) {
    throw new Error("Supabase error (projects): " + projectsError.message);
  }

  return {
    ok: true,
    userId,
    profile: profile || null,
    projects: projects || [],
    message: "User data loaded successfully"
  };
}
