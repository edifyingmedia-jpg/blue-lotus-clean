// api/twin-generate.js
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  const completion = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: "You generate clean, production-ready code." },
      { role: "user", content: prompt }
    ]
  });

  const code = completion.choices[0].message.content;

  return res.status(200).json({ code });
}
