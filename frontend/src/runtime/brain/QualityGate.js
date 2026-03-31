const REQUIRED_INTENTS = new Set(["build_app", "build_app_builder"]);

export function validateBlueprintOrThrow(blueprint) {
  if (!blueprint || typeof blueprint !== "object") {
    throw new Error("Blueprint missing.");
  }

  if (!REQUIRED_INTENTS.has(blueprint.intent)) {
    throw new Error(`Unsupported intent: ${String(blueprint.intent)}`);
  }

  if (!blueprint.name || String(blueprint.name).trim().length < 3) {
    throw new Error("Blueprint.name must be at least 3 characters.");
  }

  if (!blueprint.appSlug || !/^[a-z0-9-]+$/.test(blueprint.appSlug)) {
    throw new Error("Blueprint.appSlug invalid.");
  }

  if (!blueprint.templateId || !/^[a-z0-9-]+$/.test(blueprint.templateId)) {
    throw new Error("Blueprint.templateId invalid.");
  }

  // Hard rule: app-level output only
  // (We enforce by requiring templates that include routing + layout shell)
  return true;
}
