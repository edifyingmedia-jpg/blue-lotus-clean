// frontend/src/twin/intentClassifier.js

export function classifyIntent(rawMessage) {
  const text = (rawMessage || '').trim().toLowerCase();

  if (!text) return { type: 'empty' };

  // Basic greeting detection
  if (['hi', 'hey', 'hello'].includes(text)) {
    return { type: 'greeting' };
  }

  // Natural-language "build an app" detection
  if (text.startsWith("build") || text.includes("create an app")) {
    return { type: 'build_app', query: rawMessage };
  }

  // Fallback
  return { type: 'unknown' };
}
