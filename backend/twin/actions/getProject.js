// backend/twin/actions/getProject.js

/**
 * getProject (Backend Action)
 * Retrieves a project by ID from Supabase.
 */

import { supabase } from "../supabase.js";

export async function getProject({ projectId }) {
  if (!projectId) {
    throw new Error("Missing projectId");
  }

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
