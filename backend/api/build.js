import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing or invalid prompt" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Ask OpenAI to generate a full HTML/JS app
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You generate complete, working HTML/JS/CSS code for small apps. Return ONLY code, no explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const code = completion.choices[0].message.content;

    return res.status(200).json({ code });
  } catch (err) {
    console.error("BUILD ERROR:", err);
    return res.status(500).json({ error: "BUILD_FAILED", details: err.message });
  }
}
