// frontend/api/twin-brain.ts
import OpenAI from "openai";

export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers });

  try {
    const { messages, context } = await req.json();

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // ELITE UPGRADE: Injecting the "Architectural Intent"
    const completion = await client.chat.completions.create({
      model: "gpt-4o", // Upgraded to full GPT-4o for complex logic
      messages: [
        { 
          role: "system", 
          content: "You are the Blue Lotus Architect. Output ONLY valid JSON for component structures or clean Tailwind/React code. No conversational filler." 
        },
        ...messages
      ],
      temperature: 0.2, // Lowered for higher precision in code generation
      response_format: { type: "json_object" } // Forces the AI to return valid code structures
    });

    const reply = completion.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), { status: 200, headers });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: "TWIN_BACKEND_FAILURE", details: error.message }), { status: 500, headers });
  }
}
