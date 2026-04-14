import { TWIN_PRIME_SYSTEM_CONTRACT } from '../contracts/TWIN_PRIME_SYSTEM_CONTRACT';

const twinClient = {
  generate: async ({ prompt }) => {
    // Points to your Vercel Edge Function or local API
    const response = await fetch('/api/twin-brain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        systemContext: TWIN_PRIME_SYSTEM_CONTRACT.content,
        options: {
          temperature: 0.2, // Low temp for precision architecting
          model: "gpt-4o"
        }
      }),
    });

    if (!response.ok) throw new Error('ACTUATION_OFFLINE');
    
    const data = await response.json();
    return data; // Returns the { blueprint: { ui_stack, database_migration } }
  }
};

export default twinClient;
