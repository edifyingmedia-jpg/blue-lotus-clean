// backend/twin/supabase.js

/**
 * Supabase Client (Backend Only)
 * ------------------------------
 * This file creates a secure server-side Supabase client.
 * The frontend NEVER imports this file.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL) {
  throw new Error("Missing SUPABASE_URL environment variable");
}

if (!SUPABASE_SERVICE_ROLE) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE environment variable");
}

// Server-side client with full privileges
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: {
    persistSession: false,
  },
});
