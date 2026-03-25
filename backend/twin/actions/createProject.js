// backend/twin/actions/createProject.js

/**
 * createProject (Backend Action)
 * Creates a new project in Supabase.
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

  const { data, error } = await supabase
    .from("projects")
    .insert(newProject)
    .select()
    .single();

  if (error) {
    throw new Error("Supabase error: " + error.message);
  }

  return {
    ok: true,
    project: data,
    message: "Project created successfully"
  };
}
