// frontend/src/builder/ai/interpretCommand.js

import { getCurrentTWINCapabilities, isTWINPrime } from "../../twin/identity";

/**
 * High-level intent types TWIN can infer from a command.
 */
export const INTENT_TYPES = {
  APP: "app",
  SCREEN: "screen",
  COMPONENT: "component",
  UNKNOWN: "unknown"
};

/**
 * Very simple heuristic intent classifier for now.
 * You can replace this later with a real LLM call.
 */
export function inferIntentType(command) {
  const text = command.toLowerCase();

  if (text.includes("full app") || text.includes("entire app") || text.includes("build an app")) {
    return INTENT_TYPES.APP;
  }

  if (
    text.includes("screen") ||
    text.includes("page") ||
    text.startsWith("create a ") ||
    text.startsWith("make a ")
  ) {
    return INTENT_TYPES.SCREEN;
  }

  if (
    text.includes("button") ||
    text.includes("input") ||
    text.includes("field") ||
    text.includes("text") ||
    text.includes("image") ||
    text.includes("card")
  ) {
    return INTENT_TYPES.COMPONENT;
  }

  return INTENT_TYPES.UNKNOWN;
}

/**
 * Main interpreter entry point.
 * For now this is deterministic and local; later it can call TWIN PRIME / PUBLIC remotely.
 */
export async function interpretCommand(command) {
  const caps = getCurrentTWINCapabilities();
  const intent = inferIntentType(command);

  // Owner vs public behavior can diverge here later
  const isPrime = isTWINPrime();

  if (intent === INTENT_TYPES.APP) {
    return interpretAppLevel(command, { isPrime, caps });
  }

  if (intent === INTENT_TYPES.SCREEN) {
    return interpretScreenLevel(command, { isPrime, caps });
  }

  if (intent === INTENT_TYPES.COMPONENT) {
    return interpretComponentLevel(command, { isPrime, caps });
  }

  // Fallback: treat as a generic description and render as text
  return {
    intent,
    structureType: "component",
    components: [
      {
        id: `cmp_${Date.now()}`,
        type: "generated-text",
        props: {
          text: `AI interpretation (generic): "${command}"`
        },
        children: []
      }
    ]
  };
}

// ---- INTERPRETERS -------------------------------------------------------

function interpretAppLevel(command, { isPrime }) {
  // Later: call real TWIN PRIME / PUBLIC here.
  // For now, we simulate a simple multi-screen app.

  const now = Date.now();

  return {
    intent: INTENT_TYPES.APP,
    structureType: "app",
    app: {
      id: `app_${now}`,
      name: guessAppNameFromCommand(command),
      screens: [
        {
          id: `screen_${now}_home`,
          name: "Home",
          components: [
            {
              id: `cmp_${now}_title`,
              type: "generated-text",
              props: {
                text: `App created from: "${command}"`
              },
              children: []
            }
          ]
        }
      ]
    },
    meta: {
      source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
      note: "Simulated app-level structure. Replace with real TWIN call later."
    }
  };
}

function interpretScreenLevel(command, { isPrime }) {
  const now = Date.now();

  return {
    intent: INTENT_TYPES.SCREEN,
    structureType: "screen",
    screen: {
      id: `screen_${now}`,
      name: guessScreenNameFromCommand(command),
      components: [
        {
          id: `cmp_${now}_header`,
          type: "generated-text",
          props: {
            text: `Screen created from: "${command}"`
          },
          children: []
        }
      ]
    },
    meta: {
      source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
      note: "Simulated screen-level structure. Replace with real TWIN call later."
    }
  };
}

function interpretComponentLevel(command, { isPrime }) {
  const now = Date.now();

  // Very naive mapping for now
  const lower = command.toLowerCase();
  let type = "generated-text";
  let text = `Component created from: "${command}"`;

  if (lower.includes("button")) {
    type = "button";
    text = extractLabel(command, "button") || "Click me";
  } else if (lower.includes("input") || lower.includes("field")) {
    type = "input";
    text = extractLabel(command, "field") || "Input";
  } else if (lower.includes("image")) {
    type = "image";
    text = extractLabel(command, "image") || "Image";
  }

  return {
    intent: INTENT_TYPES.COMPONENT,
    structureType: "component",
    components: [
      {
        id: `cmp_${now}`,
        type,
        props: { text },
        children: []
      }
    ],
    meta: {
      source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
      note: "Simulated component-level structure. Replace with real TWIN call later."
    }
  };
}

// ---- SMALL HELPERS ------------------------------------------------------

function guessAppNameFromCommand(command) {
  // crude: "Build a budgeting app" -> "Budgeting App"
  const match = command.match(/build (an?|the)? (.+?) app/i);
  if (match && match[2]) {
    return capitalizeWords(match[2].trim()) + " App";
  }
  return "Generated App";
}

function guessScreenNameFromCommand(command) {
  // crude: "Create a login screen" -> "Login Screen"
  const match = command.match(/create (an?|the)? (.+?) screen/i);
  if (match && match[2]) {
    return capitalizeWords(match[2].trim()) + " Screen";
  }
  return "Generated Screen";
}

function extractLabel(command, keyword) {
  // crude: "Add a button that says Submit" -> "Submit"
  const match = command.match(/says ([^.,!?]+)/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

function capitalizeWords(str) {
  return str
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
