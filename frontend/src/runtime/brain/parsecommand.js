function slugify(name) {
  return (
    String(name || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "blue-lotus-app"
  );
}

function pickQuoted(text) {
  const m = String(text).match(/["“”']([^"“”']+)["“”']/);
  return m?.[1]?.trim() || null;
}

function pickCalled(text) {
  const m = String(text).match(/\bcalled\s+(.+)$/i);
  return m?.[1]?.trim() || null;
}

function pickUsingTemplate(text) {
  const m = String(text).match(/\busing\s+([a-z0-9-]+)\b/i);
  return m?.[1]?.trim().toLowerCase() || null;
}

export function parseCommandToBlueprint(commandText) {
  const text = String(commandText || "").trim();
  const lower = text.toLowerCase();

  if (lower === "help" || lower.includes("what can you do")) {
    return { intent: "help" };
  }

  const wantsBuilder =
    lower.includes("app builder") ||
    lower.includes("app-builder") ||
    /\bbuilder\b/.test(lower);

  const wantsBuild =
    /\bbuild\b/.test(lower) ||
    /\bcreate\b/.test(lower) ||
    /\bgenerate\b/.test(lower);

  if (!wantsBuild && !wantsBuilder) {
    return { intent: "help" };
  }

  const templateId =
    pickUsingTemplate(text) || (wantsBuilder ? "builder-core" : "dashboard");

  const name =
    pickQuoted(text) ||
    pickCalled(text) ||
    (wantsBuilder ? "Blue Lotus App Builder" : "Blue Lotus App");

  return {
    intent: wantsBuilder ? "build_app_builder" : "build_app",
    name,
    appSlug: slugify(name),
    templateId,
    meta: {
      raw: text
    }
  };
}
