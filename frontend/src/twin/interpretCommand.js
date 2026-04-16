/**
 * interpretCommand.js
 * -------------------
 * Bridges the frontend to the Vercel AI neural engine.
 * Now integrated with Prime Awareness and Intent Classification.
 */
import { classifyIntent } from './intentClassifier';

export default async function interpretCommand(input, isPrime = false) {
  if (!input || typeof input !== "string") {
    return { type: "invalid", reason: "Input must be a string." };
  }

  const text = input.trim();

  // 1. Run local Intent Classification
  // This allows the client to know what KIND of command is being sent
  const intent = classifyIntent(text, isPrime);

  try {
    // 2. Send the command to the neural engine with Identity Context
    const response = await fetch('/api/twin-brain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: text }],
        context: {
          isPrime: isPrime, // Crucial for backend routing
          intentType: intent.type // Informs the brain of the detected intent
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Neural engine responded with ${response.status}`);
    }

    const data = await response.json();

    // 3. Return structured response
    try {
      // If the engine returns a JSON string, we parse it
      return typeof data.reply === 'string' ? JSON.parse(data.reply) : data.reply;
    } catch (parseError) {
      // Fallback if the AI returns plain text instead of structured JSON
      return { type: "chat", prompt: data.reply };
    }
  } catch (err) {
    console.error("Connection to TWIN failed:", err);
    return { type: "error", message: "The neural engine is currently offline." };
  }
}
