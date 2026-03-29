// frontend/src/lib/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

/**
 * Blue Lotus Supabase Client
 * --------------------------
 * This client is used by:
 *  - Blue Lotus (the forge)
 *  - Generated Lotus app builders
 *  - Generated apps
 *
 * It reads credentials from environment variables:
 *  VITE_SUPABASE_URL
 *  VITE_SUPABASE_ANON_KEY
 *
 * These must be set in:
 *  - .env.local (local dev)
 *  - Netlify environment variables (production)
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Blue Lotus] Missing Supabase environment variables. " +
      "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
