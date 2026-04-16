import OpenAI from "openai";

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
          content: "You are TWIN, the builder AI for Blue Lotus."
        },
        ...messages
      ]
    });

    const reply = completion.choices?.[0]?.message?.content || "";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("TWIN Backend Error:", err);
    return res.status(500).json({ error: "TWIN internal error" });
  }
}
