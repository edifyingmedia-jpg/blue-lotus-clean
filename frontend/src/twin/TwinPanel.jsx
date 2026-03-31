import "./TwinPanel.css";
import { useMemo, useState } from "react";
import { classifyIntent } from "./intentClassifier";

/**
 * Authority model (enforced here):
 * - OWNER: can build app builders, meta-builders, and anything else.
 * - NON-OWNER: can build apps, but cannot build app builders, clone TWIN, or expose TWIN internals.
 *
 * How OWNER is detected (any one true):
 * - props.authority?.isOwner === true
 * - window.__BLUE_LOTUS_OWNER__ === true
 * - localStorage["bl_owner"] === "true"
 * - import.meta.env.VITE_BLUE_LOTUS_OWNER === "true"
 *
 * Optional props:
 * - authority: { isOwner?: boolean, actorId?: string, ownerId?: string, scope?: "owner"|"platform"|"user" }
 */
export default function TwinPanel({ onBuild, authority }) {
  const [command, setCommand] = useState("");
  const [log, setLog] = useState([
    {
      id: id(),
      role: "system",
      text:
        "TWIN online — Architect Mode active.\n" +
        "Default: Meta-builder forge (builds app builders).\n" +
        "Authority enforced: only the owner can generate app builders or clone TWIN."
    }
  ]);

  const canSend = useMemo(() => command.trim().length > 0, [command]);

  const send = () => {
    const text = command.trim();
    if (!text) return;

    const userMsg = { id: id(), role: "user", text };
    const twinMsg = executeArchitectCommand(text, onBuild, authority);

    setLog((prev) => [...prev, userMsg, twinMsg]);
    setCommand("");
  };

  return (
    <div style={panel}>
      <header style={header}>
        <strong style={{ color: "#e5e7eb" }}>TWIN</strong>
        <span style={sub}>Architect</span>
      </header>

      <div style={logBox}>
        {log.map((m) => (
          <div key={m.id} style={bubbleWrap(m.role)}>
            <div style={bubble(m.role)}>
              <div style={label(m.role)}>{m.role}</div>
              <div style={{ whiteSpace: "pre-wrap", color: "#e5e7eb" }}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        style={composer}
      >
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Tell me what to build…"
          rows={3}
          style={input}
        />
        <button disabled={!canSend} style={sendBtn(!canSend)}>
          Execute
        </button>
      </form>
    </div>
  );
}

/* ============================
   ARCHITECT EXECUTION LOGIC
============================ */

function executeArchitectCommand(text, onBuild, authority) {
  const intent = classifyIntent(text);
  const auth = resolveAuthority(authority);

  // Hard blocks (non-owner)
  if (!auth.isOwner) {
    const blocked = detectBlockedNonOwnerRequest(text);
    if (blocked) {
      return {
        id: id(),
        role: "twin",
        text:
          "Denied.\n" +
          blocked +
          "\n\n" +
          "I can still build apps for you (trackers, stores, booking, websites, tools). " +
          "Tell me what app you want."
      };
    }
  }

  switch (intent.type) {
    case "greeting":
      return {
        id: id(),
        role: "twin",
        text: auth.isOwner
          ? "Architect Mode active (OWNER). Say what to build—I will generate immediately."
          : "Architect Mode active. Tell me what app you want—I will generate immediately."
      };

    case "build_app": {
      // OWNER default: meta-builder forge (builds app builders)
      if (auth.isOwner) {
        const metaBuilder = makeMetaBuilderForge({ prompt: intent.query, auth });

        safeOnBuild(onBuild, metaBuilder);

        return {
          id: id(),
          role: "twin",
          text:
            "Meta-builder forge generated and rendered.\n\n" +
            "Capabilities (OWNER):\n" +
            "• Generates app builders\n" +
            "• Generates apps\n" +
            "• Owner-locked builder generation\n\n" +
            "Tell me what builder you want next (e.g., “Build a booking app builder”)."
        };
      }

      // NON-OWNER: generate an app (not a builder)
      const app = makeUserAppScaffold({ prompt: intent.query, auth });

      safeOnBuild(onBuild, app);

      return {
        id: id(),
        role: "twin",
        text:
          "App scaffold generated and rendered.\n\n" +
          "Tell me what to add next (pages, forms, lists, payments, booking, etc.)."
      };
    }

    case "empty":
      return {
        id: id(),
        role: "twin",
        text: auth.isOwner
          ? "Say: “Build an app builder that…” or “Build an app that…”"
          : "Say: “Build an app that…”"
      };

    default:
      return {
        id: id(),
        role: "twin",
        text: auth.isOwner
          ? "State what to build. Example: “Build an app builder for booking apps.”"
          : "State what app to build. Example: “Build a booking app for my salon.”"
      };
  }
}

/* ============================
   AUTHORITY
============================ */

function resolveAuthority(authority) {
  const fromProps = authority?.isOwner === true;

  const fromWindow =
    typeof window !== "undefined" && window.__BLUE_LOTUS_OWNER__ === true;

  const fromLocalStorage =
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined" &&
    window.localStorage.getItem("bl_owner") === "true";

  const fromEnv =
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_BLUE_LOTUS_OWNER === "true";

  const isOwner = Boolean(fromProps || fromWindow || fromLocalStorage || fromEnv);

  return {
    isOwner,
    scope: authority?.scope || (isOwner ? "owner" : "user"),
    actorId: authority?.actorId || null,
    ownerId: authority?.ownerId || null
  };
}

function detectBlockedNonOwnerRequest(raw) {
  const t = (raw || "").toLowerCase();

  // Builder / forge / meta-builder attempts
  const asksForBuilder =
    t.includes("app builder") ||
    t.includes("builder that builds") ||
    t.includes("build a builder") ||
    t.includes("meta builder") ||
    t.includes("metabuilder") ||
    t.includes("forge") ||
    t.includes("generate builders") ||
    t.includes("create builders");

  // Self-clone / TWIN internals attempts
  const asksToCloneTwin =
    t.includes("clone twin") ||
    t.includes("copy twin") ||
    t.includes("replicate twin") ||
    t.includes("make another twin") ||
    t.includes("build twin") ||
    t.includes("recreate twin") ||
    t.includes("export twin") ||
    t.includes("twin source") ||
    t.includes("twin code") ||
    t.includes("twin internals");

  if (asksForBuilder) {
    return "App-builder generation is owner-only on this platform.";
  }

  if (asksToCloneTwin) {
    return "Cloning TWIN or exposing TWIN internals is owner-only.";
  }

  return null;
}

/* ============================
   BUILD OUTPUTS
============================ */

function makeMetaBuilderForge({ prompt, auth }) {
  return {
    kind: "blue-lotus-builder",
    builderType: "meta-forge",
    name: "Blue Lotus Meta-Builder Forge",
    capabilities: {
      canGenerateApps: true,
      canGenerateBuilders: true,
      canCloneTwin: false, // still explicit—owner can override elsewhere, but default is no
      ownerOnlyBuilderGeneration: true
    },
    governance: {
      ownerOnly: {
        builders: true,
        twinInternals: true,
        twinCloning: true
      },
      actor: {
        isOwner: auth.isOwner,
        scope: auth.scope,
        actorId: auth.actorId,
        ownerId: auth.ownerId
      }
    },
    workspace: {
      panels: [
        { id: "registry", type: "panel", role: "registry", title: "Registry" },
        { id: "schema", type: "panel", role: "schema", title: "Schema" },
        { id: "canvas", type: "canvas", role: "canvas", title: "Canvas" },
        { id: "twin", type: "panel", role: "twin", title: "TWIN" }
      ]
    },
    builderKernel: {
      // Minimal kernel contract—expand later without breaking shape
      appDefinition: {
        pages: [],
        components: [],
        data: { models: [] },
        navigation: { type: "tabs", items: [] }
      },
      builderDefinition: {
        templates: [
          { id: "generic-app", label: "Generic app" },
          { id: "booking-app", label: "Booking app" },
          { id: "store-app", label: "Store app" },
          { id: "tracker-app", label: "Tracker app" }
        ],
        rules: {
          // Enforced at runtime by governance + UI gating
          ownerOnlyBuilderGeneration: true
        }
      }
    },
    meta: {
      generatedBy: "TWIN",
      mode: "architect",
      prompt
    }
  };
}

function makeUserAppScaffold({ prompt }) {
  return {
    kind: "blue-lotus-app",
    appType: "generic",
    name: "Generated App",
    pages: [
      {
        id: "home",
        title: "Home",
        components: [
          { id: "hero", type: "text", title: "Welcome" },
          { id: "primary-action", type: "button", title: "Get started" }
        ]
      }
    ],
    meta: {
      generatedBy: "TWIN",
      mode: "architect",
      prompt
    }
  };
}

function safeOnBuild(onBuild, payload) {
  if (typeof onBuild === "function") onBuild(payload);
}

/* ============================
   UTIL
============================ */

function id() {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
}

/* ============================
   STYLES
============================ */

const panel = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const sub = {
  fontSize: "12px",
  color: "#94a3b8"
};

const logBox = {
  flex: 1,
  overflow: "auto",
  padding: "8px",
  border: "1px solid #1e293b",
  borderRadius: "10px",
  background: "#020617"
};

const bubbleWrap = (r) => ({
  display: "flex",
  justifyContent: r === "user" ? "flex-end" : "flex-start",
  marginBottom: "8px"
});

const bubble = (r) => ({
  maxWidth: "90%",
  padding: "10px",
  borderRadius: "12px",
  background: r === "user" ? "#0f172a" : "#07101f",
  border: "1px solid #1e293b",
  color: "#e5e7eb"
});

const label = (r) => ({
  fontSize: "11px",
  color: r === "user" ? "#a5b4fc" : "#67e8f9",
  marginBottom: "4px"
});

const composer = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const input = {
  resize: "none",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #1e293b",
  background: "#020617",
  color: "#e5e7eb"
};

const sendBtn = (disabled) => ({
  alignSelf: "flex-end",
  padding: "8px 14px",
  borderRadius: "10px",
  border: "1px solid #1e293b",
  background: disabled ? "#020617" : "#2563eb",
  color: disabled ? "#64748b" : "#e5e7eb",
  cursor: disabled ? "not-allowed" : "pointer"
});
