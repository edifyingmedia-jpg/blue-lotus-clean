const twinClient = {
  generate: async ({ prompt, contract }) => {
    try {
      const response = await fetch('/api/twin-brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemContext: contract
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Log it for your dev console, but return a clean error for the UI
        console.error('Architectural Sync Failed:', data);
        throw new Error(data.details || data.error || 'SYNTHESIS_INTERRUPTED');
      }

      return data;
    } catch (error) {
      // Catching network timeouts or server crashes
      throw new Error(error.message === 'Failed to fetch' ? 'ACTUATION_OFFLINE' : error.message);
    }
  }
};

export default twinClient;
