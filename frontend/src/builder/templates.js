// frontend/src/builder/templates.js

export function builderCoreTemplate(name = "Lotus Builder") {
  return {
    kind: "app-builder",
    name,
    entry: "index.html",
    manifest: {
      twin: "public",
      capabilities: ["generate-app", "preview", "export"],
      version: "2.0.0", // Upgraded version
    },
    files: {
      "index.html": htmlShell(name),
      "src/main.jsx": viteEntry(),
      "src/App.jsx": builderShell(name),
      "src/builder/generate.js": publicGenerateEngine(),
    },
  };
}

function htmlShell(title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <title>${title}</title>
</head>
<body class="bg-slate-950 text-slate-200">
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;
}

function builderShell(name) {
  return `import { useState } from "react";
import { generateApp } from "./builder/generate";

export default function App() {
  const [input, setInput] = useState("");
  const [artifact, setArtifact] = useState(null);

  const build = () => {
    const result = generateApp(input);
    setArtifact(result);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans">
      <aside className="w-80 border-r border-slate-800 p-6 flex flex-col gap-4 bg-slate-900/50">
        <h2 className="text-xs font-black uppercase tracking-widest text-blue-400">${name}</h2>
        <textarea 
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          placeholder="Describe your app..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={build} className="bg-blue-600 hover:bg-blue-500 py-2 rounded font-bold text-xs uppercase transition-all">
          Actuate Build
        </button>
      </aside>
      <main className="flex-1 p-12 overflow-auto">
        {artifact ? (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-2xl">
            {artifact}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
            Ready for instructions...
          </div>
        )}
      </main>
    </div>
  );
}`;
}

function publicGenerateEngine() {
  return `export function generateApp(prompt) {
    return \`Generated view for: \${prompt}\`;
  }`;
}
