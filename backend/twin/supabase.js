// backend/twin/supabase.js

/**
 * Supabase Backend Client (Owner‑Only)
 * This file initializes the secure server-side Supabase client.
 * All privileged backend operations (schema, sync, repair, migrations)
 * will use this client.
 */

import { createClient } from "@supabase/supabase-js";

/**
 * Validate required environment variables
 */
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// -----------------------------
// Load environment variables
// -----------------------------
const SUPABASE_URL = requireEnv("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

// -----------------------------
// Create secure Supabase client
// -----------------------------
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Owner‑only enforcement
 * Only Tiffany (the platform owner) can run privileged backend operations.
 */
export function assertOwner(user) {
  if (!user || user.role !== "owner") {
    throw new Error("Unauthorized: Only the platform owner can perform this action.");
  }
}

/**
 * Simple test function to confirm Supabase connectivity
 */
export async function testSupabase() {
  const { data, error } = await supabase.from("projects").select("*").limit(1);

  if (error) {
    throw new Error("Supabase connection failed: " + error.message);
  }

  return {
    ok: true,
    message: "Supabase connection successful",
    sample: data
  };
}
