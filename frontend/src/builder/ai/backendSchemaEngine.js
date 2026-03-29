// frontend/src/builder/ai/backendSchemaEngine.js

/**
 * Backend Schema Engine (Supabase-first)
 * --------------------------------------
 * This module handles:
 *  - Creating tables
 *  - Adding fields
 *  - Adding relationships
 *  - Generating CRUD definitions
 *  - Producing Supabase-compatible schema metadata
 *  - Binding UI components to backend tables
 *
 * The output is stored inside:
 *    app.backend.schema
 *    app.backend.crud
 *    app.backend.bindings
 */

export function ensureBackend(app) {
  if (!app.backend) {
    app.backend = {
      schema: {},      // tables + fields
      relations: [],   // relationships
      crud: {},        // CRUD endpoints
      bindings: {}     // UI component → table/field bindings
    };
  }
  return app.backend;
}

/**
 * Creates a new table.
 * Example:
 *   "Create a users table with name, email, avatar"
 */
export function createTable(app, command) {
  const backend = ensureBackend(app);

  const match = command.match(/create (a|an|the)? ([a-zA-Z0-9_]+) table/i);
  if (!match) return null;

  const tableName = match[2].toLowerCase();

  if (!backend.schema[tableName]) {
    backend.schema[tableName] = {
      fields: {
        id: { type: "uuid", primary: true, default: "uuid_generate_v4()" }
      }
    };
  }

  // Extract fields
  const fields = extractFields(command);
  fields.forEach((field) => {
    backend.schema[tableName].fields[field] = inferFieldType(field);
  });

  // Auto-generate CRUD
  backend.crud[tableName] = generateCRUD(tableName);

  return tableName;
}

/**
 * Add a field to an existing table.
 * Example:
 *   "Add age to users"
 */
export function addField(app, command) {
  const backend = ensureBackend(app);

  const match = command.match(/add ([a-zA-Z0-9_]+) to ([a-zA-Z0-9_]+)/i);
  if (!match) return null;

  const field = match[1].toLowerCase();
  const table = match[2].toLowerCase();

  if (!backend.schema[table]) {
    backend.schema[table] = { fields: {} };
  }

  backend.schema[table].fields[field] = inferFieldType(field);

  return { table, field };
}

/**
 * Add a relationship.
 * Example:
 *   "Link posts to users"
 *   "Posts belongs to users"
 */
export function addRelationship(app, command) {
  const backend = ensureBackend(app);

  const match = command.match(/(link|belongs to|relate) ([a-zA-Z0-9_]+) to ([a-zA-Z0-9_]+)/i);
  if (!match) return null;

  const tableA = match[2].toLowerCase();
  const tableB = match[3].toLowerCase();

  backend.relations.push({
    from: tableA,
    to: tableB,
    type: "foreign_key",
    field: `${tableB}_id`
  });

  // Ensure foreign key field exists
  if (!backend.schema[tableA]) backend.schema[tableA] = { fields: {} };
  backend.schema[tableA].fields[`${tableB}_id`] = { type: "uuid", references: tableB };

  return { tableA, tableB };
}

/**
 * Bind a UI component to a backend table or field.
 * Example:
 *   "Bind this list to posts"
 *   "Bind this input to users.name"
 */
export function bindComponent(app, componentId, command) {
  const backend = ensureBackend(app);

  const matchTable = command.match(/bind .* to ([a-zA-Z0-9_]+)/i);
  const matchField = command.match(/bind .* to ([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)/i);

  if (matchField) {
    const table = matchField[1].toLowerCase();
    const field = matchField[2].toLowerCase();

    backend.bindings[componentId] = { table, field };
    return { table, field };
  }

  if (matchTable) {
    const table = matchTable[1].toLowerCase();
    backend.bindings[componentId] = { table };
    return { table };
  }

  return null;
}

/**
 * CRUD generator for Supabase-style endpoints.
 */
function generateCRUD(table) {
  return {
    create: { method: "POST", path: `/api/${table}` },
    read: { method: "GET", path: `/api/${table}` },
    update: { method: "PUT", path: `/api/${table}/:id` },
    delete: { method: "DELETE", path: `/api/${table}/:id` }
  };
}

/**
 * Extract fields from commands like:
 *   "with name, email, avatar"
 */
function extractFields(command) {
  const match = command.match(/with (.+)/i);
  if (!match) return [];

  return match[1]
    .split(",")
    .map((f) => f.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Infer field type from name.
 */
function inferFieldType(field) {
  if (field.includes("email")) return { type: "text" };
  if (field.includes("name")) return { type: "text" };
  if (field.includes("title")) return { type: "text" };
  if (field.includes("description")) return { type: "text" };
  if (field.includes("age")) return { type: "number" };
  if (field.includes("count")) return { type: "number" };
  if (field.includes("price")) return { type: "number" };
  if (field.includes("date")) return { type: "date" };
  if (field.includes("avatar") || field.includes("image")) return { type: "image" };

  return { type: "text" };
}
