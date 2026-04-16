import OpenAI from "openai";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Expect { messages: [...] }
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Missing messages array",
        details: "Expected { messages: [...] }"
      });
    }

    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Call the model
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are TWIN, the builder AI for Blue Lotus."
        },
        ...messages
      ],
      temperature: 0.4
    });

    // Extract reply safely
    const reply =
      completion?.choices?.[0]?.message?.content ||
      "I’m online, but I didn’t receive a valid response.";

    // Return reply to frontend
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("TWIN Backend Error:", err);

    return res.status(500).json({
      error: "TWIN_INTERNAL_ERROR",
      details: err.message || "Unknown error"
    });
  }
}
