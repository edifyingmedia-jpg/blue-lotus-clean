import OpenAI from "openai";
import { generateProjectPreview } from "../backend/twin/actions/generateProjectPreview";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages, mode = "architect" } = req.body; 
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Mode 1: The Architect (JSON for Blue Lotus Builder)
    if (mode === "architect") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are TWIN Architect. Respond ONLY with a JSON object representing a website structure." },
          ...messages
        ],
        response_format: { type: "json_object" }
      });

      const aiOutput = JSON.parse(completion.choices[0].message.content);
      const { preview } = await generateProjectPreview({ project: aiOutput });

      return res.status(200).json({ type: "blueprint", reply: aiOutput, preview });
    }

    // Mode 2: The Emergent (Raw HTML fallback from twin.js)
    if (mode === "html") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You generate complete, working single-file HTML apps with inline CSS/JS." },
          ...messages
        ]
      });

      return res.status(200).json({ type: "html", html: completion.choices[0].message.content });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
