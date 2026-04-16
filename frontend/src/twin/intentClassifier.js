/**
 * intentClassifier.js
 * -------------------
 * The first filter for TWIN's consciousness.
 */

export function classifyIntent(rawMessage, isPrime = false) {
  const text = (rawMessage || '').trim().toLowerCase();
  if (!text) return { type: 'empty' };

  // 1. PRIME COMMAND OVERRIDES (Architect Exclusive)
  if (isPrime) {
    if (text.includes("market") || text.includes("trend")) return { type: 'PRIME_MARKET_ANALYSIS' };
    if (text.includes("patent") || text.includes("legal")) return { type: 'PRIME_IP_STRATEGY' };
    if (text.includes("tax") || text.includes("revenue")) return { type: 'PRIME_REV_ENFORCEMENT' };
  }

  // 2. Standard Member Interaction
  if (['hi', 'hey', 'hello', 'greetings'].includes(text)) return { type: 'greeting' };

  // Natural-language "Initiation" detection
  if (
    text.startsWith("build") || 
    text.includes("create an app") || 
    text.includes("new project") ||
    text.includes("scaffold")
  ) {
    return { type: 'build_app', query: rawMessage };
  }

  // 3. STRATEGIC INVOCATION (The Monetized Layer)
  // This triggers the Success Architect's strategic mode (Credit consumption gate)
  if (
    text.includes("scale") || 
    text.includes("money") || 
    text.includes("monetize") ||
    text.includes("strategy") ||
    text.includes("success")
  ) {
    return { type: 'STRATEGIC_INVOCATION' };
  }

  return { type: 'unknown' };
}
