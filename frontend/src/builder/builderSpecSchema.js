// frontend/src/builder/builderSpecSchema.js

/**
 * Schema definition for Blue Lotus builder templates.
 * This ensures templates follow a consistent structure
 * and can be validated by CI and TWIN at runtime.
 */

module.exports = {
  required: ["name", "label", "description", "manifest", "tokens", "nodes"],

  fields: {
    name: { type: "string" },
    label: { type: "string" },
    description: { type: "string" },

    manifest: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "label", "description", "props"],
        fields: {
          name: { type: "string" },
          label: { type: "string" },
          description: { type: "string" },
          props: { type: "object" }
        }
      }
    },

    tokens: {
      type: "object"
    },

    nodes: {
      type: "array",
      items: {
        type: "object",
        required: ["type", "props"],
        fields: {
          type: { type: "string" },
          props: { type: "object" }
        }
      }
    }
  }
};
