export const TemplateRegistry = {
  "dashboard": {
    id: "dashboard",
    kind: "app",
    description: "Multi-section dashboard scaffold with layout shell.",
    generateFiles: ({ name }) => ({
      "index.html": `<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${name}</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>
`,
      "src/main.jsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
`,
      "src/styles.css": `:root { color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; background: #020617; color: #e2e8f0; }
a { color: inherit; text-decoration: none; }
`,
      "src/App.jsx": `function Shell({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
      <aside style={{ padding: 16, borderRight: "1px solid #1e293b" }}>
        <div style={{ fontWeight: 900, marginBottom: 12 }}>${name}</div>
        <nav style={{ display: "grid", gap: 8, opacity: 0.9 }}>
          <a href="#/overview">Overview</a>
          <a href="#/reports">Reports</a>
          <a href="#/settings">Settings</a>
        </nav>
      </aside>
      <main style={{ padding: 24 }}>{children}</main>
    </div>
  );
}

function route() {
  const h = (window.location.hash || "#/overview").replace("#", "");
  return h.startsWith("/") ? h : "/overview";
}

function Overview() {
  return (
    <>
      <h1 style={{ marginTop: 0 }}>Overview</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ border: "1px solid #1e293b", borderRadius: 12, padding: 14, background: "#0b1220" }}>
            <div style={{ fontWeight: 800 }}>Card {i + 1}</div>
            <div style={{ opacity: 0.8 }}>Metric / content</div>
          </div>
        ))}
      </div>
    </>
  );
}

function Reports() {
  return (
    <>
      <h1 style={{ marginTop: 0 }}>Reports</h1>
      <p style={{ opacity: 0.85 }}>Stubbed report view—wire data later.</p>
    </>
  );
}

function Settings() {
  return (
    <>
      <h1 style={{ marginTop: 0 }}>Settings</h1>
      <p style={{ opacity: 0.85 }}>Stubbed settings view—wire persistence later.</p>
    </>
  );
}

export default function App() {
  const [path, setPath] = React.useState(route());

  React.useEffect(() => {
    const onHash = () => setPath(route());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  let View = Overview;
  if (path === "/reports") View = Reports;
  if (path === "/settings") View = Settings;

  return (
    <Shell>
      <View />
    </Shell>
  );
}
`
    })
  },

  "builder-core": {
    id: "builder-core",
    kind: "app-builder",
    description: "Builder that outputs full app trees from templates.",
    generateFiles: ({ name }) => ({
      "index.html": `<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${name}</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>
`,
      "src/main.jsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
`,
      "src/styles.css": `:root { color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; background: #020617; color: #e2e8f0; }
button, input, select, textarea { font: inherit; }
pre { margin: 0; }
`,
      "src/builder/templates.js": `export const templates = [
  { id: "dashboard", name: "Dashboard app", commandHint: 'Build an app called "My Dashboard" using dashboard' }
];
`,
      "src/builder/generate.js": `export function generateAppTree({ name = "Generated App", templateId = "dashboard" } = {}) {
  // Minimal deterministic output: full app scaffold, not fragments.
  if (templateId !== "dashboard") templateId = "dashboard";

  return {
    "index.html": \`<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>\${name}</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>\`,
    "src/main.jsx": \`import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);\`,
    "src/styles.css": \`:root { color-scheme: dark; } body { margin: 0; font-family: ui-sans-serif, system-ui; background:#020617; color:#e2e8f0; }\`,
    "src/App.jsx": \`export default function App() {
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ marginTop: 0 }}>\${name}</h1>
      <p>Generated by a Blue Lotus builder.</p>
      <p>Template: <strong>\${templateId}</strong></p>
    </div>
  );
}\`
  };
}
`,
      "src/App.jsx": `import React from "react";
import { templates } from "./builder/templates.js";
import { generateAppTree } from "./builder/generate.js";

function FileList({ files, active, onPick }) {
  const keys = Object.keys(files || {}).sort();
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {keys.map((k) => (
        <button
          key={k}
          onClick={() => onPick(k)}
          style={{
            textAlign: "left",
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid #1e293b",
            background: k === active ? "#0b1220" : "#020617",
            color: "#e2e8f0",
            cursor: "pointer"
          }}
        >
          {k}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [name, setName] = React.useState("Generated App");
  const [templateId, setTemplateId] = React.useState("dashboard");
  const [files, setFiles] = React.useState(() => generateAppTree({ name, templateId }));
  const [active, setActive] = React.useState("src/App.jsx");

  const regenerate = () => {
    const next = generateAppTree({ name, templateId });
    setFiles(next);
    const first = Object.keys(next).sort()[0] || "src/App.jsx";
    setActive(first);
  };

  const content = files?.[active] ?? "";

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "360px 1fr" }}>
      <aside style={{ padding: 16, borderRight: "1px solid #1e293b" }}>
        <div style={{ fontWeight: 900, marginBottom: 10 }}>${name}</div>

        <label style={{ display: "grid", gap: 6, marginBottom: 10 }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>App name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#020617", color: "#e2e8f0" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6, marginBottom: 10 }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Template</div>
          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #334155", background: "#020617", color: "#e2e8f0" }}
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </label>

        <button
          onClick={regenerate}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "none", background: "#2563eb", color: "white", cursor: "pointer", fontWeight: 800 }}
        >
          Generate app tree
        </button>

        <div style={{ marginTop: 14, fontSize: 12, opacity: 0.8 }}>Files</div>
        <div style={{ marginTop: 8 }}>
          <FileList files={files} active={active} onPick={setActive} />
        </div>
      </aside>

      <main style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ fontWeight: 900 }}>{active}</div>
          <button
            onClick={() => navigator.clipboard.writeText(String(content))}
            style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #334155", background: "#0b1220", color: "#e2e8f0", cursor: "pointer", fontWeight: 800 }}
          >
            Copy
          </button>
        </div>

        <pre style={{ marginTop: 12, padding: 14, borderRadius: 14, border: "1px solid #1e293b", background: "#0b1220", overflow: "auto", minHeight: "80vh", whiteSpace: "pre" }}>
{String(content)}
        </pre>
      </main>
    </div>
  );
}
`
    })
  }
};

export function getTemplateOrThrow(templateId) {
  const t = TemplateRegistry?.[templateId];
  if (!t) throw new Error(`Unknown templateId: ${templateId}`);
  return t;
}
