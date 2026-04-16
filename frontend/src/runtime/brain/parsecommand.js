// frontend/src/runtime/brain/parsecommand.js

export function parseCommandToBlueprint(commandText) {
  const text = String(commandText || "").trim();
  const lower = text.toLowerCase();

  // 1. Enhanced Intent Detection
  const wantsBuilder = /\b(builder|architect|constructor)\b/i.test(lower);
  const wantsBuild = /\b(build|create|generate|actuate|spawn)\b/i.test(lower);

  if (!wantsBuild && !wantsBuilder && lower !== "help") {
    return { intent: "unknown", original: text };
  }

  // 2. Sophisticated Template Resolution
  // If the user says "using basic-v2", we grab that ID.
  const templateId = pickUsingTemplate(text) || (wantsBuilder ? "lotus-builder-v2" : "standard-app");

  // 3. Name Resolution
  const name = pickQuoted(text) || pickCalled(text) || "New Blue Lotus Project";

  return {
    intent: wantsBuilder ? "build_app_builder" : "build_app",
    name,
    appSlug: slugify(name),
    templateId,
    meta: {
      raw: text,
      timestamp: new Date().toISOString(),
      engine: "Blue Lotus NLP v2"
    }
  };
}
