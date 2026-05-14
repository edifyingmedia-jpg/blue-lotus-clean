// api/twin-structure.js
import OpenAI from "openai";
import { MASTER_BUILDER_SYSTEM } from "../lib/twin/masterBuilder.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { instructions } = req.body;

  const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: MASTER_BUILDER_SYSTEM },
      { role: "user", content: instructions }
    ]
  });

  const json = completion.choices[0].message.content;

  return res.status(200).json(JSON.parse(json));
}
