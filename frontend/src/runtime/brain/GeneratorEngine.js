import { getTemplateOrThrow } from "./TemplateRegistry";

function slugify(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "blue-lotus-app";
}

export function generateFromBlueprint(blueprint) {
  const template = getTemplateOrThrow(blueprint.templateId);

  const kind =
    blueprint.intent === "build_app_builder" ? "app-builder" : "app";

  const appName = slugify(blueprint.name);

  const files = template.generateFiles({
    name: blueprint.name,
    appName,
    kind,
    templateId: template.id
  });

  // Hard minimum: app-level scaffold must include these
  const required = ["index.html", "src/main.jsx", "src/App.jsx"];
  for (const k of required) {
    if (!files?.[k]) throw new Error(`Template "${template.id}" missing required file: ${k}`);
  }

  return {
    appName,
    kind,
    templateId: template.id,
    files
  };
}
