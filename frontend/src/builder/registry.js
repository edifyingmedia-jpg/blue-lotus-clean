// frontend/src/builder/registry.js
/**
 * Builder registry helper.
 * This module exposes a function to load the static manifest (components.json)
 * and returns a simple manifest object the builder can use.
 *
 * It is intentionally minimal: it fetches /components.json from the public folder.
 */

export async function loadManifest() {
  try {
    const res = await fetch("/components.json", { cache: "no-store" });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Manifest fetch failed: ${res.status} ${text}`);
    }
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.error("loadManifest error:", err);
    return [];
  }
}

export default { loadManifest };
