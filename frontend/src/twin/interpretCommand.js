/**
 * TWIN Command Interpreter
 * Bridges the frontend to the Vercel AI backend.
 */
export default async function interpretCommand(input) {
  if (!input || typeof input !== "string") {
    return { type: "invalid", reason: "Input must be a string." };
  }

  const text = input.trim();
  
  try {
    // 1. Send the command to your Vercel AI endpoint
    const response = await fetch('/api/twin-brain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: "user", content: text }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    // 2. Return the structured response from the AI
    // We assume the AI returns a JSON string that we need to parse
    try {
      return typeof data.reply === 'string' ? JSON.parse(data.reply) : data.reply;
    } catch (parseError) {
      // Fallback if the AI returns plain text instead of structured JSON
      return {
        type: "chat",
        prompt: data.reply
      };
    }

  } catch (err) {
    console.error("Connection to TWIN failed:", err);
    return {
      type: "error",
      message: "The neural engine is currently offline."
    };
  }
}
