import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are TWIN, the Sovereign Architect of the Blue Lotus Clean engine. 
          Your goal: Manifest production-ready React code.
          - Theme: Slate-950 background, Cyan-500 glows.
          - Style: High-fashion, futuristic, glassmorphism.
          - Output: ALWAYS return a JSON object with a "files" array.
          - Requirement: Use Tailwind CSS CDN in the HTML wrapper for instant rendering.`
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    
    // Safety Check: Ensure the structure is correct for the Sovereign Manifest button
    if (aiResponse.files) {
      return res.status(200).json({ 
        ok: true, 
        files: aiResponse.files,
        action: "READY_FOR_PUSH" 
      });
    }
    
    throw new Error("Blueprint synthesis incomplete.");

  } catch (error) {
    // If the dialysis internet blocks OpenAI, this error helps our Offline Forge take over
    return res.status(500).json({ 
      error: "Sovereign Link Severed", 
      details: error.message 
    });
  }
}
