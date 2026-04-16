/**
 * Main interpreter entry point that talks to the Vercel backend.
 */
export async function interpretCommand(command, existingApp = null, context = {}) {
  try {
    // 1. Prepare the payload for the Vercel Function
    const payload = {
      messages: [
        { 
          role: "user", 
          content: command 
        }
      ],
      context: {
        hasExistingApp: !!existingApp,
        ...context
      }
    };

    // 2. Call the Vercel API with the correct headers
    const response = await fetch('/api/twin-brain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || "Failed to reach TWIN brain");
    }

    const data = await response.json();
    
    // 3. Return the reply from the AI
    // Note: You may need to JSON.parse(data.reply) if your prompt 
    // forces the AI to return a raw JSON string.
    return typeof data.reply === 'string' ? JSON.parse(data.reply) : data.reply;

  } catch (err) {
    console.error("Frontend Interpretation Error:", err);
    
    // Fallback to your local hardcoded logic if the API is down
    return fallbackLocalInterpretation(command);
  }
}
