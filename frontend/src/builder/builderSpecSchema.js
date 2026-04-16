// frontend/src/builder/builderSpecSchema.js

/**
 * Schema definition for Blue Lotus Empire templates.
 * Enforces architectural integrity and monetization rules.
 */
export const builderSpecSchema = {
  // Added 'meta' as a top-level requirement for tracking sales and tiers
  required: ["meta", "name", "label", "description", "manifest", "tokens", "nodes"],
  
  fields: {
    meta: {
      type: "object",
      required: ["tier", "commission_rate"],
      fields: {
        tier: { type: "string" },           // ACOLYTE, ARCHITECT, FOUNDER
        commission_rate: { type: "number" }, // Always 0.10 for the 10% tax
        storefrontId: { type: "string" },    // Links to the member's profile
        version: { type: "string" }
      }
    },
    name: { type: "string" },
    label: { type: "string" },
    description: { type: "string" },
    manifest: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "label", "props"],
        fields: {
          name: { type: "string" },
          label: { type: "string" },
          description: { type: "string" },
          props: { type: "object" }
        }
      }
    },
    tokens: { type: "object" }, // Theme, colors, spacing tokens
    nodes: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "type", "props"],
        fields: {
          id: { type: "string" },
          type: { type: "string" },
          props: { type: "object" },
          children: { type: "array" } // Allows for nested neural structures
        }
      }
    }
  }
};

export default builderSpecSchema;
