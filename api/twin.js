import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, messages = [] } = req.body;

    // The Nexus-Protocol System Prompt
    const systemPrompt = `
      You are TWIN, the Nexus-TWIN Sovereign Architect.
      Your goal is to build fully functional, deployable React applications.
      - Use Tailwind CSS for all styling.
      - Use 'slate-950' for backgrounds and 'cyan-500' for primary accents.
      - Output ONLY a JSON object containing the files for the app.
      - Format: { "files": [{ "path": "src/App.jsx", "content": "..." }] }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);

    // If the AI generated files, we prepare them for the GitHub handoff
    if (aiResponse.files) {
      return res.status(200).json({
        ok: true,
        message: "Sovereign blueprint generated.",
        files: aiResponse.files,
        action: "READY_FOR_PUSH"
      });
    }

    return res.status(200).json(aiResponse);

  } catch (error) {
    console.error("Nexus Forge Error:", error);
    return res.status(500).json({
      error: "Sovereign Link Severed",
      details: error.message 
    });
  }
}
