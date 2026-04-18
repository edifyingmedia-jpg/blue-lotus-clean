import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    // 2. The TWIN Logic starts here: We tell the AI how to behave
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are the Blue Lotus Sovereign Engine. Your job is to generate clean, professional React code based on user prompts. You act as an advocate for the user (TWIN logic), ensuring accessibility and modern design. Return ONLY the code, no conversational text."
        },
        {
          role: "user",
          content: `Build a React component for: ${prompt}`
        }
      ],
      temperature: 0.7,
    });

    const generatedCode = response.choices[0].message.content;
    
    // 3. Send the "Sprout" back to the frontend
    return res.status(200).json({ code: generatedCode });
  } catch (error) {
    console.error('Sovereign Engine Error:', error);
    return res.status(500).json({ error: 'The cultivation process failed.' });
  }
}
