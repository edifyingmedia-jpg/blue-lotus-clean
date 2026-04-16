/**
 * interpretCommand.js
 * -------------------
 * Bridges the frontend to the Neural Engine.
 * Integrated with Intent Classification and Prime Awareness.
 */
import { classifyIntent } from './intentClassifier';

export default async function interpretCommand(input, isPrime = false) {
  if (!input || typeof input !== "string") {
    return { type: "invalid", reason: "Input must be a string." };
  }

  // 1. Local Intent Classification
  // This uses the file you just updated to check for Prime directives.
  const intent = classifyIntent(input, isPrime);
  
  // 2. Route Prime Commands Locally or via Strategy
  if (isPrime && intent.type.startsWith('PRIME_')) {
     console.log(`TWIN_PRIME: Executing high-level directive: ${intent.type}`);
     // We can add specific local handlers for patent/market scans here later.
  }

  try {
    // 3. Send to Neural Engine with Identity Context
    const response = await fetch('/api/twin-brain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: "user", content: input }],
        context: {
          isPrime: isPrime,
          intent: intent.type
        }
      })
    });

    if (!response.ok) throw new Error(`Neural engine responded with ${response.status}`);
    
    const data = await response.json();

    // 4. Return structured response
    try {
      return typeof data.reply === 'string' ? JSON.parse(data.reply) : data.reply;
    } catch (parseError) {
      // Fallback to chat if the engine returns plain text
      return { type: "chat", prompt: data.reply };
    }
  } catch (err) {
    console.error("Connection to TWIN failed:", err);
    return { type: "error", message: "The neural engine is currently offline." };
  }
}
