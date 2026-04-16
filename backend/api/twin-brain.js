import OpenAI from "openai";
// Adjust this import path once you move the file to the root /api folder
import { generateProjectPreview } from "../backend/twin/actions/generateProjectPreview"; 

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing messages array" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are TWIN, the builder AI for Blue Lotus. Respond only with structured JSON blueprints for apps."
        },
        ...messages
      ],
      response_format: { type: "json_object" }, // Forces valid JSON
      temperature: 0.2
    });

    const aiOutput = JSON.parse(completion.choices[0].message.content);

    // This converts the AI's raw thoughts into a format your frontend can render
    const { preview } = await generateProjectPreview({ project: aiOutput });

    return res.status(200).json({ 
      reply: aiOutput,
      preview: preview 
    });

  } catch (err) {
    console.error("TWIN Backend Error:", err);
    return res.status(500).json({ error: "TWIN_INTERNAL_ERROR", details: err.message });
  }
}
