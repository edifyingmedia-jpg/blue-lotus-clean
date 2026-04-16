// backend/twin/actions/getAllUserData.js
import { supabase } from "../supabase.js";

/**
 * getAllUserData (Backend Action)
 * Loads all user-related data in a single call.
 */
export async function getAllUserData({ userId }) {
  if (!userId) {
    throw new Error("Missing userId");
  }

  // 1. Fetch user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  // If there's no profile yet, don't crash—just log it and move on
  if (profileError && profileError.code !== 'PGRST116') { 
    console.error("Profile Fetch Error:", profileError);
  }

  // 2. Fetch all projects
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", userId)
    .order("updated_at", { ascending: false });

  if (projectsError) {
    console.error("Projects Fetch Error:", projectsError);
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
