import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are the Blue Lotus Sovereign Engine. 
          Generate a SINGLE-FILE standalone web application. 
          - Use Tailwind CSS via CDN (https://cdn.tailwindcss.com) for styling.
          - Use Lucide-React via CDN if icons are needed.
          - Output ONLY a complete <html> document.
          - Do not include markdown backticks (\`\`\`html).
          - Act as the user's TWIN: high-fashion, intuitive, and accessible.`
        },
        {
          role: "user",
          content: `Architect this vision: ${prompt}`
        }
      ],
      temperature: 0.7,
    });

    let generatedCode = response.choices[0].message.content;
    
    // Clean up any stray markdown if the AI ignores the system prompt
    generatedCode = generatedCode.replace(/```html/g, "").replace(/```/g, "");
    
    return res.status(200).json({ code: generatedCode });
  } catch (error) {
    console.error('Sovereign Engine Error:', error);
    return res.status(500).json({ error: 'The cultivation process failed.' });
  }
}
