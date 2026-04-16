// backend/twin/actions/createProject.js
/**
 * createProject (Backend Action)
 * Creates a new project in Supabase and returns the database record.
 */
import { supabase } from "../supabase.js";

/**
 * createProject
 * @param {Object} payload
 * @param {string} payload.name - The project name
 * @param {string} payload.ownerId - The user creating the project
 */
export async function createProject({ name, ownerId }) {
  if (!name) {
    throw new Error("Missing project name");
  }
  if (!ownerId) {
    throw new Error("Missing ownerId");
  }

  const newProject = {
    name,
    owner_id: ownerId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // 1. Insert the project into the 'projects' table
  const { data, error } = await supabase
    .from("projects")
    .insert(newProject)
    .select() // Ensures we get the created record (including its new ID) back
    .single();

  // 2. Error handling specifically for Supabase
  if (error) {
    console.error("Supabase Project Creation Error:", error);
    throw new Error(`Supabase error: ${error.message}`);
  }

  // 3. Return the project data for the frontend/brain to use
  return {
    ok: true,
    project: data,
    message: "Project created successfully"
  };
}
