import OpenAI from 'openai';

// Initialize OpenAI with your environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Only allow POST requests from your frontend
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract prompt and mode from the request body
    // Defaulting mode to 'architect' if not provided to prevent crashes
    const { prompt, messages = [], mode = "architect" } = req.body;

    if (mode === "architect") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Ensure you have credits for this model
        messages: [
          { 
            role: "system", 
            content: `You are the Blue Lotus Architect. 
                      - Use Tailwind 'slate-950' for backgrounds.
                      - Use 'cyan-500' for primary accents.
                      - Output ONLY valid JSON representing a component tree.` 
          },
          ...messages,
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });

      // Parse the AI's response and send it back to the frontend
      const aiResponse = JSON.parse(completion.choices[0].message.content);
      return res.status(200).json(aiResponse);
    }

    // Fallback if mode doesn't match
    return res.status(400).json({ error: "Invalid mode specified." });

  } catch (error) {
    // Log the actual error to your Vercel console for debugging
    console.error("Forge Error:", error);

    // Return a structured error so the frontend doesn't show a raw HTML page
    return res.status(500).json({ 
      error: "Sovereign Link Severed", 
      details: error.message 
    });
  }
}
