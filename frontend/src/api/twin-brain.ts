import OpenAI from "openai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers });

  try {
    const { prompt, systemContext } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // The Actuator follows the System Contract you defined
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemContext },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content || "{}";

    return new Response(
      JSON.stringify({ blueprint: JSON.parse(aiResponse) }),
      { status: 200, headers }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "BRAIN_OFFLINE", details: error.message }),
      { status: 500, headers }
    );
  }
}
