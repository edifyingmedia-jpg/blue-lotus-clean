import OpenAI from "openai";
import { generateProjectPreview } from "../backend/twin/actions/generateProjectPreview";

export const config = {
  maxDuration: 30, 
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing messages array" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 1. Get the Architectural Blueprint
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are TWIN. Respond ONLY with a valid JSON object representing a website structure for Blue Lotus."
        },
        ...messages
      ],
      response_format: { type: "json_object" }, // Ensures valid JSON output
      temperature: 0.2,
    });

    const aiOutput = JSON.parse(completion.choices[0].message.content);

    // 2. Generate the Preview Snapshot
    const { preview } = await generateProjectPreview({ project: aiOutput });

    // 3. Return both to the frontend
    return res.status(200).json({ 
      reply: aiOutput,
      preview: preview 
    });

  } catch (error) {
    console.error("TWIN_BRAIN_ERROR:", error);
    return res.status(500).json({
      error: "TWIN_OFFLINE",
      details: error.message || "The neural engine failed to respond."
    });
  }
}
