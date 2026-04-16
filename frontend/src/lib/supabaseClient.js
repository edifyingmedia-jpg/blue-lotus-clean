// frontend/src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

/**
 * BLUE LOTUS DATA ACTUATOR
 * -------------------------
 * Initializing the primary neural link to Supabase.
 * This client manages the Revenue Engine and Member Registry.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// High-integrity check for Environment Variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "ACTUATION_FAILURE: Missing Supabase Credentials. " +
    "The Empire cannot connect to the Revenue Ledger."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'bl-empire-auth' // Branded storage key for the session
  },
  global: {
    headers: { 'x-application-name': 'Blue-Lotus-Empire' }
  }
});

/**
 * ARCHITECT NOTE:
 * All calls to this client from the Storefront must include
 * the 10% commission logic within the RPC or Table triggers.
 */
