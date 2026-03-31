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
      "src/App.jsx": `import React from "react";

function Shell({ children }) {
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
      <p style={{ opacity: 0.85 }}>Stubbed report view.</p>
    </>
  );
}

function Settings() {
  return (
    <>
      <h1 style={{ marginTop: 0 }}>Settings</h1>
      <p style={{ opacity: 0.85 }}>Stubbed settings view.</p>
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
body { margin: 0; font-family: ui-sans-serif, system-ui; background:#020617; color:#e2e8f0; }
`,
      "src/App.jsx": `import React from "react";

export default function App() {
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ marginTop: 0 }}>${name}</h1>
      <p>Builder core online.</p>
    </div>
  );
}
`
    })
  }
};

export function getTemplateOrThrow(templateId) {
  const t = TemplateRegistry?.[templateId];
  if (!t) throw new Error(\`Unknown templateId: \${templateId}\`);
  return t;
}
