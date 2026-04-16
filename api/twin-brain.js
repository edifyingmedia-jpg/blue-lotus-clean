import OpenAI from "openai";

export const config = {
  maxDuration: 30, // Extends timeout for complex architectural generation
};

export default async function handler(req, res) {
  // 1. Only allow POST requests from your frontend
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    // 2. Validate input structure
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Invalid Request",
        details: "Expected an array of messages."
      });
    }

    // 3. Initialize OpenAI with your Vercel Environment Variable
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 4. Execute the "Brain" logic
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // High-reasoning model for app building
      messages: [
        {
          role: "system",
          content: `You are TWIN, the core architectural engine for Blue Lotus. 
          Your goal is to transform user intent into production-ready React, TypeScript, and Tailwind code.
          - Never echo the user's prompt.
          - Always respond with valid JSON blueprints or direct code blocks.
          - Focus on the 'Neural Bridge' sequence for app generation.`
        },
        ...messages
      ],
      temperature: 0.2, // Lower temperature for more consistent technical output
    });

    const reply = completion.choices[0].message.content;

    // 5. Return the response to the frontend
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("TWIN_BRAIN_ERROR:", error);

    // Handle specific OpenAI errors (like missing keys)
    return res.status(500).json({
      error: "TWIN_OFFLINE",
      details: error.message || "The neural engine failed to respond."
    });
  }
}
