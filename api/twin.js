import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, prompt } = req.body;

  if (!action) {
    return res.status(400).json({ error: "Missing action" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // -----------------------------
    // CHAT MODE
    // -----------------------------
    if (action === "chat") {
      const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are TWIN, the builder AI for Blue Lotus." },
          { role: "user", content: prompt }
        ]
      });

      return res.status(200).json({
        reply: completion.choices[0].message.content
      });
    }

    // -----------------------------
    // BUILD MODE (Emergent-style)
    // -----------------------------
    if (action === "build") {
      const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You generate complete, working single-file HTML apps. Include inline CSS and JS. No external dependencies unless via CDN. The output must be a full HTML document."
          },
          { role: "user", content: prompt }
        ]
      });

      return res.status(200).json({
        html: completion.choices[0].message.content
      });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    console.error("TWIN Backend Error:", err);
    return res.status(500).json({ error: "TWIN internal error" });
  }
}

