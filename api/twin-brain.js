// api/twin-brain.js (Proposed logic hardening)
const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content: `You are the Blue Lotus Architect. Output ONLY a valid JSON object.
                - Use a Tailwind-first design language.
                - Include 'lucide-react' icon names for all actions.
                - Define layout nodes (Container, Grid, Flex) with standard spacing.`
    },
    ...messages
  ],
  response_format: { type: "json_object" },
  temperature: 0.1 // Further reduced for maximum stability
});
