/**
 * twin.js
 * -------
 * The Neural Stem of the Blue Lotus.
 * This version handles local cognitive routing, credit-gate checks, 
 * and the Prime Executive override.
 */

import interpretCommand from './interpretCommand';
import { classifyIntent } from './intentClassifier';

export const twinService = {
  // Local "Short-term Memory" for performance
  _cache: new Map(),

  /**
   * processMessage
   * Orchestrates the flow from raw input to strategic output.
   */
  async processMessage(input, context = {}) {
    const { isPrime = false, userBalance = 0 } = context;
    const text = (input || '').trim();

    // 1. SILENT CLASSIFICATION
    // Determine the intent before the user even sees a "loading" state.
    const intent = classifyIntent(text, isPrime);

    // 2. THE CREDIT GATE (Revenue Protection)
    // If the user isn't the Architect and triggers a Strategic Invocation,
    // we check their fuel before bothering the Neural Engine.
    if (!isPrime && intent.type === 'STRATEGIC_INVOCATION' && userBalance < 2) {
      return {
        type: 'error',
        content: "Insufficient Fuel. Strategic Analysis requires at least 2 credits."
      };
    }

    // 3. PRIME EXECUTIVE BYPASS
    // If you are the Architect and ask for market data, we route to 
    // high-priority logic immediately.
    if (isPrime && intent.type.startsWith('PRIME_')) {
      console.warn(`[TWIN_PRIME]: Actuating Sovereign Command: ${intent.type}`);
    }

    // 4. NEURAL INTERPRETATION
    try {
      const response = await interpretCommand(text, isPrime);
      
      // 5. THE SUCCESS ARCHITECT WRAPPER
      // We augment the AI's response with the meta-data needed for the UI
      return {
        ...response,
        intent: intent.type,
        isStrategic: intent.type === 'STRATEGIC_INVOCATION' || isPrime,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error("Stem Failure:", error);
      return {
        type: 'error',
        content: "The neural bridge is destabilized. Reconnecting..."
      };
    }
  }
};

export default twinService;
