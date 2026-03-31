// frontend/src/builder/templates.js

export function builderCoreTemplate(name = "Lotus Builder") {
  return {
    kind: "app-builder",
    name,
    entry: "index.html",
    manifest: {
      twin: "public",
      capabilities: ["generate-app", "preview", "export"],
      version: "1.0.0",
    },
    files: {
      "index.html": htmlShell(name),
      "src/main.jsx": viteEntry(),
      "src/App.jsx": builderShell(name),
      "src/twin/PublicTwin.jsx": publicTwinRuntime(),
      "src/builder/generate.js": publicGenerateEngine(),
      "src/builder/templates.js": publicTemplates(),
    },
  };
}

function htmlShell(title) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
}

function viteEntry() {
  return `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
`;
}

function builderShell(name) {
  return `import { useState } from "react";
import PublicTwin from "./twin/PublicTwin";

export default function App() {
  const [artifact, setArtifact] = useState(null);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", height: "100vh", background: "#020617", color: "#e2e8f0" }}>
      <PublicTwin onArtifact={setArtifact} />
      <div style={{ padding: 24 }}>
        {!artifact ? (
          <div style={{ color: "#64748b" }}>Generated apps will appear here.</div>
        ) : (
          <pre style={{ background: "#0b1220", padding: 16, borderRadius: 6 }}>
{artifact}
          </pre>
        )}
      </div>
    </div>
  );
}
`;
}

function publicTwinRuntime() {
  return `import { useState } from "react";
import { generateApp } from "../builder/generate";

export default function PublicTwin({ onArtifact }) {
  const [input, setInput] = useState("");

  const submit = () => {
    if (!input.trim()) return;
    const result = generateApp(input);
    onArtifact(result);
    setInput("");
  };

  return (
    <div style={{ borderRight: "1px solid #1e293b", padding: 16 }}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe the app you want to build"
        style={{ width: "100%", minHeight: 80 }}
      />
      <button onClick={submit} style={{ marginTop: 8 }}>
        Build App
      </button>
    </div>
  );
}
`;
}

function publicGenerateEngine() {
  return `import { appTemplates } from "./templates";

export function generateApp(prompt) {
  const template = appTemplates.basicApp(prompt);
  return template;
}
`;
}

function publicTemplates() {
  return `export const appTemplates = {
  basicApp(name) {
    return \`// Generated App
export default function App() {
  return <h1>\${name}</h1>;
}\`;
  },
};
`;
}
