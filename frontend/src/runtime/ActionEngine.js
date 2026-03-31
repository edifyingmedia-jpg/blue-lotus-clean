import { parseCommandToBlueprint } from "./brain/parsecommand.js";
import { validateBlueprintOrThrow } from "./brain/QualityGate.js";
import { generateFromBlueprint } from "./brain/GeneratorEngine.js";

export function execute(command, authority) {
  if (!authority?.isOwner) {
    return { type: "error", message: "Unauthorized: owner access required." };
  }

  const text = String(command || "").trim();
  if (!text) return { type: "noop", message: "No command provided." };

  let blueprint;
  try {
    blueprint = parseCommandToBlueprint(text);
  } catch (e) {
    return {
      type: "error",
      message: `Parse error: ${e?.message || "Unknown error"}`
    };
  }

  if (blueprint.intent === "help") {
    return {
      type: "info",
      message:
        'Try: "Build an app builder called Lotus Forge" or "Build an app called My Storefront using dashboard".'
    };
  }

  try {
    validateBlueprintOrThrow(blueprint);
  } catch (e) {
    return {
      type: "error",
      message: `QualityGate failed: ${e?.message || "Invalid blueprint"}`
    };
  }

  const artifact = generateFromBlueprint(blueprint);

  return {
    type: "build",
    message: `Built: ${artifact.appName} (${artifact.kind}) using template "${artifact.templateId}".`,
    artifact,
    blueprint
  };
}
