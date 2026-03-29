// frontend/src/builder/ai/interpretCommand.js

import { getCurrentTWINCapabilities, isTWINPrime } from "../../twin/identity";
import { applyLayoutIntelligence } from "./layoutEngine";
import {
  ensureNavigation,
  addScreenToNavigation,
  createExplicitNavigation,
  linkScreens
} from "./navigationEngine";
import {
  ensureBackend,
  createTable,
  addField,
  addRelationship,
  bindComponent
} from "./backendSchemaEngine";

/**
 * High-level intent types TWIN can infer from a command.
 */
export const INTENT_TYPES = {
  APP: "app",
  SCREEN: "screen",
  COMPONENT: "component",
  NAVIGATION: "navigation",
  BACKEND: "backend",
  UNKNOWN: "unknown"
};

/**
 * Intent classifier
 */
export function inferIntentType(command) {
  const text = command.toLowerCase();

  // App creation
  if (text.includes("full app") || text.includes("entire app") || text.includes("build an app")) {
    return INTENT_TYPES.APP;
  }

  // Navigation
  if (
    text.includes("navigation") ||
    text.includes("tab bar") ||
    text.includes("sidebar") ||
    text.includes("top nav") ||
    text.includes("go to")
  ) {
    return INTENT_TYPES.NAVIGATION;
  }

  // Backend
  if (
    text.includes("table") ||
    text.includes("schema") ||
    text.includes("crud") ||
    text.includes("bind") ||
    text.includes("field") ||
    text.includes("relationship") ||
    text.includes("link posts to users")
  ) {
    return INTENT_TYPES.BACKEND;
  }

  // Screen creation
  if (
    text.includes("screen") ||
    text.includes("page") ||
    text.startsWith("create a ") ||
    text.startsWith("make a ")
  ) {
    return INTENT_TYPES.SCREEN;
  }

  // Component creation
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
 */
export async function interpretCommand(command, existingApp = null, context = {}) {
  const caps = getCurrentTWINCapabilities();
  const intent = inferIntentType(command);
  const isPrime = isTWINPrime();

  if (intent === INTENT_TYPES.APP) {
    return interpretAppLevel(command, { isPrime, caps });
  }

  if (intent === INTENT_TYPES.SCREEN) {
    return interpretScreenLevel(command, existingApp, { isPrime, caps });
  }

  if (intent === INTENT_TYPES.NAVIGATION) {
    return interpretNavigationLevel(command, existingApp, { isPrime, caps });
  }

  if (intent === INTENT_TYPES.BACKEND) {
    return interpretBackendLevel(command, existingApp, context, { isPrime, caps });
  }

  if (intent === INTENT_TYPES.COMPONENT) {
    return interpretComponentLevel(command, existingApp, context, { isPrime, caps });
  }

  // Fallback
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

// ---------------------------------------------------------------------------
// APP LEVEL
// ---------------------------------------------------------------------------

function interpretAppLevel(command, { isPrime }) {
  const now = Date.now();

  return {
    intent: INTENT_TYPES.APP,
    structureType: "app",
    app: {
      id: `app_${now}`,
      name: guessAppNameFromCommand(command),
      navigation: null,
      backend: null,
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

// ---------------------------------------------------------------------------
// SCREEN LEVEL
// ---------------------------------------------------------------------------

function interpretScreenLevel(command, existingApp, { isPrime }) {
  const now = Date.now();
  const screenName = guessScreenNameFromCommand(command);

  const screen = {
    id: `screen_${now}`,
    name: screenName,
    components: [
      {
        id: `cmp_${now}_card`,
        type: "card",
        props: {},
        children: [
          {
            id: `cmp_${now}_heading`,
            type: "heading",
            props: { value: `Screen: ${screenName}`, level: 2 },
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
  };

  if (existingApp) {
    existingApp.screens.push(screen);

    const nav = ensureNavigation(existingApp, command);
    addScreenToNavigation(existingApp, screenName);

    return {
      intent: INTENT_TYPES.SCREEN,
      structureType: "app",
      app: existingApp,
      meta: {
        source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
        note: "Screen added to existing app with navigation integration."
      }
    };
  }

  return {
    intent: INTENT_TYPES.SCREEN,
    structureType: "screen",
    screen,
    meta: {
      source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
      note: "Standalone screen using Registry v2 primitives."
    }
  };
}

// ---------------------------------------------------------------------------
// NAVIGATION LEVEL
// ---------------------------------------------------------------------------

function interpretNavigationLevel(command, existingApp, { isPrime }) {
  if (!existingApp) {
    return {
      intent: INTENT_TYPES.NAVIGATION,
      structureType: "error",
      error: "Navigation requires an existing app.",
      meta: { source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC" }
    };
  }

  if (command.toLowerCase().includes("with")) {
    createExplicitNavigation(existingApp, command);
  } else {
    ensureNavigation(existingApp, command);
  }

  linkScreens(existingApp, command);

  return {
    intent: INTENT_TYPES.NAVIGATION,
    structureType: "app",
    app: existingApp,
    meta: {
      source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
      note: "Navigation updated."
    }
  };
}

// ---------------------------------------------------------------------------
// BACKEND LEVEL
// ---------------------------------------------------------------------------

function interpretBackendLevel(command, existingApp, context, { isPrime }) {
  if (!existingApp) {
    return {
      intent: INTENT_TYPES.BACKEND,
      structureType: "error",
      error: "Backend commands require an existing app.",
      meta: { source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC" }
    };
  }

  ensureBackend(existingApp);

  // Table creation
  const table = createTable(existingApp, command);

  // Field creation
  const field = addField(existingApp, command);

  // Relationship creation
  const relation = addRelationship(existingApp, command);

  // Component binding
  if (context?.componentId) {
    bindComponent(existingApp, context.componentId, command);
  }

  return {
    intent: INTENT_TYPES.BACKEND,
    structureType: "app",
    app: existingApp,
    meta: {
      source: isPrime ? "TWIN_PRIME" : "TWIN_PUBLIC",
      note: "Backend schema updated."
    }
  };
}

// ---------------------------------------------------------------------------
// COMPONENT LEVEL
// ---------------------------------------------------------------------------

function interpretComponentLevel(command, existingApp, context, { isPrime }) {
  const now = Date.now();
  const lower = command.toLowerCase();

  let baseComponents = [];

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

  // Apply layout intelligence
  const intelligent = applyLayoutIntelligence(baseComponents, command);

  // Bind component to backend if requested
  if (existingApp && context?.componentId) {
    bindComponent(existingApp, context.componentId, command);
  }

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

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

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
