/**
 * twinClient.js
 * -------------
 * The primary API interface for TWIN's neural engine.
 * Synchronizes identity, intent, and strategic context.
 */

const TWIN_ENDPOINT = '/api/twin-brain';

export const twinClient = {
  /**
   * Sends a message to the TWIN brain with full context.
   * @param {string} content - The user's input.
   * @param {Object} context - Optional metadata (isPrime, userBalance, etc).
   */
  async sendMessage(content, context = {}) {
    const { isPrime = false, intent = 'unknown' } = context;

    try {
      const response = await fetch(TWIN_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Twin-Access-Level': isPrime ? 'PRIME' : 'GOVERNESS'
        },
        body: JSON.stringify({
          messages: [{ role: "user", content }],
          metadata: {
            isPrime,
            intent,
            timestamp: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Neural Bridge Error: ${response.status}`);
      }

      const data = await response.json();

      // Ensure we return a structured object for the UI to consume
      return {
        reply: data.reply,
        usage: data.usage || null,
        isStrategic: isPrime || intent === 'STRATEGIC_INVOCATION'
      };

    } catch (error) {
      console.error("twinClient Failed:", error);
      throw error;
    }
  }
};

export default twinClient;
