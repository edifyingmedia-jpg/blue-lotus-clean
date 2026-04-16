/**
 * intentClassifier.js
 * -------------------
 * The "Brain's Ear" for Blue Lotus. 
 * Distinguishes between standard user requests, monetized strategic 
 * deep-dives, and Founder (Prime) level directives.
 */

export function classifyIntent(rawMessage, isPrime = false) {
  const text = (rawMessage || '').trim().toLowerCase();
  
  if (!text) return { type: 'empty' };

  // 1. PRIME COMMAND OVERRIDES (Architect Only)
  // These intents are invisible and inaccessible to standard users.
  if (isPrime) {
    if (text.includes("market") || text.includes("trend")) {
      return { type: 'PRIME_MARKET_ANALYSIS' };
    }
    if (text.includes("patent") || text.includes("legal")) {
      return { type: 'PRIME_IP_STRATEGY' };
    }
    if (text.includes("tax") || text.includes("revenue")) {
      return { type: 'PRIME_REV_ENFORCEMENT' };
    }
  }

  // 2. Standard Member Intent (Governess Protocol)
  if (['hi', 'hey', 'hello', 'greetings'].includes(text)) {
    return { type: 'greeting' };
  }

  // Natural-language detection for project initiation
  if (
    text.startsWith("build") || 
    text.includes("create an app") || 
    text.includes("new project") ||
    text.includes("scaffold")
  ) {
    return { type: 'build_app', query: rawMessage };
  }

  // 3. MONETIZED INVOCATION (Charged Engagement)
  // Triggers the Success Architect's strategic mode (usually costs credits)
  if (
    text.includes("help me scale") || 
    text.includes("how do i make money") ||
    text.includes("business strategy") ||
    text.includes("analyze my success")
  ) {
    return { type: 'STRATEGIC_INVOCATION' };
  }

  // 4. Fallback
  return { type: 'unknown' };
}
