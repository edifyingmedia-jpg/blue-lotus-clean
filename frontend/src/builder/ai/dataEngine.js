// frontend/src/builder/ai/dataEngine.js

import { supabase } from "../../lib/supabaseClient";

/**
 * fetchDataForBinding(binding)
 * ----------------------------
 * The binding object looks like:
 *   { table: "users" }
 *   { table: "users", field: "name" }
 *
 * This function performs REAL Supabase reads:
 *   - If only table is provided → returns rows
 *   - If table + field → returns the first row's field value
 *
 * Returned shape:
 *   { data, error }
 */

export async function fetchDataForBinding(binding) {
  if (!binding?.table) {
    return { data: null, error: null };
  }

  const table = binding.table;

  try {
    // Fetch up to 20 rows from the table
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .limit(20);

    if (error) {
      return { data: null, error };
    }

    // If binding is table-only → return rows
    if (!binding.field) {
      return { data, error: null };
    }

    // If binding is table.field → return first row's field
    const first = data?.[0] || null;
    const value = first ? first[binding.field] : null;

    return { data: value, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}
