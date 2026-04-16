// api/twin.js (Proposed Hardening)
if (mode === "architect") {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { 
        role: "system", 
        content: `You are the Blue Lotus Architect. 
                  - Use Tailwind 'slate-950' for backgrounds.
                  - Use 'cyan-500' for primary accents.
                  - Output ONLY valid JSON representing a component tree.` 
      },
      ...messages 
    ],
    response_format: { type: "json_object" }
  });
  // ... rest of logic
}
