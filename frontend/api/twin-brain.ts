import OpenAI from "openai";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: "INVALID_PAYLOAD",
          details: "Expected { messages: [...] }",
        }),
        { status: 400, headers }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Convert messages into OpenAI format
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      temperature: 0.4,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "I’m online, but I didn’t receive a valid response.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "TWIN_BACKEND_FAILURE",
        details: error.message,
      }),
      { status: 500, headers }
    );
  }
}
