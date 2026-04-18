// force vercel rebuild

import OpenAI from "openai"; // esm enforced

import twinBrain from "./twin-brain";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    // Initialize OpenAI client
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Use your twin-brain logic to generate the system prompt
    const systemPrompt = twinBrain(prompt);

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    });

    const code = completion.choices[0].message.content;

    return res.status(200).json({ code });
  } catch (err) {
    console.error("TWIN ERROR:", err);
    return res.status(500).json({
      error: "TWIN_FAILED",
      details: err.message
    });
  }
}

