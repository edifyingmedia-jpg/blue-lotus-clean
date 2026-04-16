// frontend/api/twin.js
import OpenAI from "openai";

export default async function handler(req, res) {
  // 1. Hardened Method Check
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const { action, prompt, context } = req.body;
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    // ELITE UPGRADE: Context-Aware Building
    if (action === "build") {
      const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { 
            role: "system", 
            content: `You are the Blue Lotus Architect. Generate high-end, single-file HTML apps. 
                     - Use Tailwind CSS via CDN. 
                     - Use Lucide Icons for professional UI. 
                     - Ensure the design is responsive and uses a 'Slate/Cyan' dark-mode palette.` 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.2 // Precision over creativity for build stability
      });

      return res.status(200).json({ html: completion.choices[0].message.content });
    }

    // Standard Chat Fallback
    const chatCompletion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: "You are TWIN, the builder AI." }, { role: "user", content: prompt }]
    });

    return res.status(200).json({ reply: chatCompletion.choices[0].message.content });

  } catch (err) {
    return res.status(500).json({ error: "TWIN_CORE_FAILURE", detail: err.message });
  }
}
