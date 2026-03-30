// frontend/src/twin/intentClassifier.js

export function classifyIntent(rawMessage) {
  const text = (rawMessage || '').trim().toLowerCase();

  if (!text) return { type: 'empty' };

  if (['hi', 'hey', 'hello'].includes(text)) {
    return { type: 'greeting' };
  }

  if (text.includes('build') && text.includes('app builder')) {
    return { type: 'build_app_builder' };
  }

  return { type: 'unknown' };
}
