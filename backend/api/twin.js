// backend/api/twin.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        ok: false,
        error: "TWIN requires a 'prompt' string."
      });
    }

    // REAL TWIN SYSTEM PROMPT
    const systemPrompt = `
You are TWIN, the Blue Lotus sovereign architect.
Your job is to generate clean, safe, minimal HTML for the preview panel.
Return ONLY HTML. No explanations. No markdown. No commentary.
    `.trim();

    // REAL OPENAI CALL
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.4
    });

    const html = completion.choices[0].message.content || "";

    return res.status(200).json({
      ok: true,
      html,
      timestamp: Date.now()
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "TWIN engine failure.",
      details: err.message
    });
  }
}
