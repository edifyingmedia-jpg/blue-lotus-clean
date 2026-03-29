// frontend/src/builder/ai/interpretCommand.js

import { getCurrentTWINCapabilities, isTWINPrime } from "../../twin/identity";
import { applyLayoutIntelligence } from "./layoutEngine";

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
    text.includes("card") ||
    text.includes("form") ||
    text.includes("list")
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
        type: "text",
        props: {
          value: `AI interpretation (generic): "${command}"`,
          size: 16
        },
        children: []
      }
    ]
  };
}

// ---- INTERPRETERS -------------------------------------------------------

function interpretAppLevel(command, { isPrime }) {
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
              id: `cmp_${now}_section`,
              type: "section",
              props: { title: "Overview" },
              children: [
                {
                  id: `cmp_${now}_heading`,
                  type: "heading",
                  props: { value: `App created from: "${command}"`, level: 2 },
                  children: []
                },
                {
                  id: `cmp_${now}_text`,
                  type: "text",
                  props: {
                    value: "This is a generated home screen. You can refine it with more commands.",
                    size: 14
                  },
                  children: []
                },
                {
                  id: `cmp_${now}_spacer`,
                  type: "spacer",
                  props: { size: 16 },
                  children: []
                },
                {
                  id: `cmp_${now}_button`,
                  type: "button",
                  props: { label: "Primary Action" },
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    meta: {
      source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
      note: "App-level structure using Registry v2 primitives."
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
          id: `cmp_${now}_card`,
          type: "card",
          props: {},
          children: [
            {
              id: `cmp_${now}_heading`,
              type: "heading",
              props: { value: `Screen: ${guessScreenNameFromCommand(command)}`, level: 2 },
              children: []
            },
            {
              id: `cmp_${now}_text`,
              type: "text",
              props: {
                value: `Screen created from: "${command}"`,
                size: 14
              },
              children: []
            }
          ]
        }
      ]
    },
    meta: {
      source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
      note: "Screen-level structure using Registry v2 primitives."
    }
  };
}

function interpretComponentLevel(command, { isPrime }) {
  const now = Date.now();
  const lower = command.toLowerCase();

  let baseComponents = [];

  // --- Base component generation (Registry v2) ---
  if (lower.includes("button")) {
    baseComponents.push({
      id: `cmp_${now}_button`,
      type: "button",
      props: { label: extractLabel(command) || "Click me" },
      children: []
    });
  } else if (lower.includes("input") || lower.includes("field")) {
    baseComponents.push({
      id: `cmp_${now}_input`,
      type: "input",
      props: { placeholder: extractLabel(command) || "Enter value" },
      children: []
    });
  } else if (lower.includes("image")) {
    baseComponents.push({
      id: `cmp_${now}_image`,
      type: "image",
      props: { src: null, alt: extractLabel(command) || "Generated image" },
      children: []
    });
  } else if (lower.includes("card")) {
    baseComponents.push({
      id: `cmp_${now}_card`,
      type: "card",
      props: {},
      children: [
        {
          id: `cmp_${now}_card_heading`,
          type: "heading",
          props: { value: "Card Title", level: 3 },
          children: []
        },
        {
          id: `cmp_${now}_card_text`,
          type: "text",
          props: { value: "Card content generated from your command.", size: 14 },
          children: []
        }
      ]
    });
  } else if (lower.includes("list")) {
    baseComponents.push({
      id: `cmp_${now}_list`,
      type: "list",
      props: {},
      children: [
        { id: `cmp_${now}_item1`, type: "listItem", props: { value: "First item" }, children: [] },
        { id: `cmp_${now}_item2`, type: "listItem", props: { value: "Second item" }, children: [] }
      ]
    });
  } else {
    baseComponents.push({
      id: `cmp_${now}`,
      type: "text",
      props: { value: `Component created from: "${command}"`, size: 14 },
      children: []
    });
  }

  // --- Apply layout intelligence ---
  const intelligent = applyLayoutIntelligence(baseComponents, command);

  return {
    intent: INTENT_TYPES.COMPONENT,
    structureType: "component",
    components: intelligent,
    meta: {
      source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
      note: "Component-level structure with layout intelligence (Registry v2)."
    }
  };
}

// ---- SMALL HELPERS ------------------------------------------------------

function guessAppNameFromCommand(command) {
  const match = command.match(/build (an?|the)? (.+?) app/i);
  if (match && match[2]) {
    return capitalizeWords(match[2].trim()) + " App";
  }
  return "Generated App";
}

function guessScreenNameFromCommand(command) {
  const match = command.match(/create (an?|the)? (.+?) screen/i);
  if (match && match[2]) {
    return capitalizeWords(match[2].trim()) + " Screen";
  }
  return "Generated Screen";
}

function extractLabel(command) {
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
