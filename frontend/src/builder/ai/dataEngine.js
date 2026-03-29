// frontend/src/builder/ai/dataEngine.js
import { supabase } from "../../lib/supabaseClient";

/**
 * Fetches data for a binding.
 * Binding can be:
 *   { table: "users" }
 *   { table: "users", field: "name" }
 */

export async function fetchDataForBinding(binding) {
  if (!binding?.table) return { data: null, error: null };

  const table = binding.table;

  // Fetch rows
  const { data, error } = await supabase.from(table).select("*").limit(20);

  if (error) return { data: null, error };

  // If binding is table-only → return rows
  if (!binding.field) {
    return { data, error: null };
  }

  // If binding is table.field → return first row's field
  const first = data?.[0] || null;
  const value = first ? first[binding.field] : null;

  return { data: value, error: null };
}
