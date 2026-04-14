const twinClient = {
  generate: async ({ prompt, contract }) => {
    // This points to the new /api route we just set up in Vercel
    const response = await fetch('/api/twin-brain', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        prompt,
        systemContext: contract
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'ACTUATION_OFFLINE');
    }
    
    return await response.json();
  }
};

export default twinClient;
