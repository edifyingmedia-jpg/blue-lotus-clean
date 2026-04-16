// frontend/src/builder/templates.js

export function builderCoreTemplate(name = "Lotus Builder") {
  return {
    kind: "app-builder",
    name,
    entry: "index.html",
    manifest: {
      twin: "public",
      capabilities: ["generate-app", "preview", "monetize"],
      version: "2.5.0-PRIME", // Upgraded to the Empire version
      architect_fee: 0.10    // The 10% hardcoded tax DNA
    },
    files: {
      "index.html": htmlShell(name),
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
<body class="bg-[#09090B] text-slate-200 selection:bg-cyan-500/30">
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

  return (
    <div className="flex h-screen bg-[#09090B] text-slate-200 font-sans overflow-hidden">
      {/* LEFT: THE INK CONSOLE */}
      <aside className="w-85 border-r border-white/5 p-8 flex flex-col gap-6 bg-[#0F0F14] shadow-2xl">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">${name}</h2>
          <span className="text-[8px] font-mono text-slate-600 mt-1 uppercase tracking-widest">Actuation_Engine_v2.5</span>
        </div>
        
        <textarea 
          className="flex-1 bg-black/20 border border-white/5 rounded-2xl p-4 text-xs font-medium focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-700" 
          placeholder="Describe the neural architecture..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        
        <button 
          onClick={() => setArtifact(generateApp(input))} 
          className="bg-white text-black hover:bg-cyan-400 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl"
        >
          Actuate Build
        </button>
      </aside>

      {/* RIGHT: THE RENDERING VOID */}
      <main className="flex-1 p-16 overflow-auto bg-[#050505] relative flex items-center justify-center">
        <div className="absolute inset-0 bg-cyan-500/[0.02] pointer-events-none" />
        
        {artifact ? (
          <div className="w-full max-w-4xl bg-[#121217] border border-white/10 p-10 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in duration-500">
            {artifact}
          </div>
        ) : (
          <div className="flex flex-col items-center opacity-20">
             <div className="w-12 h-12 border-2 border-slate-800 border-t-cyan-500 rounded-full animate-spin mb-4" />
             <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-slate-500 text-center">Awaiting_Instructions</p>
          </div>
        )}
      </main>
    </div>
  );
}`;
}

function publicGenerateEngine() {
  return `export function generateApp(prompt) {
  // Every generated app is tagged with the Architect's 10% DNA
  console.log("ACTUATING_BLUE_LOTUS_NODE: COMMISSION_SET_10PCT");
  return \`Neural reconstruction complete for: \${prompt}\`;
}`;
}
