const twinClient = {
  generate: async ({ prompt, contract }) => {
    const response = await fetch('/api/twin-brain', { // Double-check this filename!
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        systemContext: contract
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Use the 'details' field if the AI error handling provides it
      throw new Error(data.details || data.error || 'ACTUATION_OFFLINE');
    }

    return data;
  }
};

export default twinClient;
