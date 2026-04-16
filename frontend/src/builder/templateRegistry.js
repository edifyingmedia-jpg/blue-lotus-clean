// frontend/src/builder/templateRegistry.js

/**
 * BLUE LOTUS TEMPLATE REGISTRY (Empire Edition)
 * -------------------------------------------
 * Manages the library of starting templates.
 * Enforces Tier-based access and Monetization DNA.
 */

const templateRegistry = {};

/**
 * Register a template with Monetization and Tier metadata.
 */
export function registerTemplate(name, template) {
  templateRegistry[name] = {
    ...template,
    meta: {
      ...template.meta,
      architectFee: 0.10, // Global 10% Platform Tax
      tier: template.meta?.tier || "ACOLYTE", // Default to Free
    },
    registeredAt: new Date().toISOString(),
    engine: "Blue Lotus v2-PRIME"
  };
}

export function getTemplate(name, userTier = "ACOLYTE") {
  const template = templateRegistry[name];
  if (!template) return null;

  // FOUNDER tier (You) bypasses all restrictions
  if (userTier === "FOUNDER") return template;

  // Check if the user's tier is high enough for this template
  const tiers = ["ACOLYTE", "ARCHITECT", "FOUNDER"];
  if (tiers.indexOf(userTier) < tiers.indexOf(template.meta.tier)) {
    return { error: "RESTRICTED_TIER", required: template.meta.tier };
  }

  return template;
}

export function listTemplates(userTier = "ACOLYTE") {
  return Object.keys(templateRegistry).map(name => {
    const t = templateRegistry[name];
    return {
      name,
      label: t.label || name,
      tier: t.meta.tier,
      isLocked: userTier !== "FOUNDER" && t.meta.tier === "ARCHITECT" && userTier === "ACOLYTE"
    };
  });
}

/**
 * Built-in Empire Blueprints
 */
import basicBuilder from "./templates/basic-builder.json";

// Registering the basic starter as a Free (Acolyte) template
registerTemplate("basic-builder", basicBuilder);

export default { registerTemplate, getTemplate, listTemplates, templateRegistry };
