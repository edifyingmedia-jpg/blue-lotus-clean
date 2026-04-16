// frontend/brain/TemplateRegistry.js

export const TemplateRegistry = {
  "dashboard": {
    id: "dashboard",
    kind: "app",
    description: "Premium SaaS dashboard with Tailwind utility architecture and glassmorphism.",
    generateFiles: ({ name }) => ({
      "index.html": `
        <!doctype html>
        <html lang="en" class="dark">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${name}</title>
          </head>
          <body class="bg-slate-950 text-slate-200 antialiased">
            <div id="root"></div>
            <script type="module" src="/src/main.jsx"></script>
          </body>
        </html>`,
      
      "src/App.jsx": `
        import React from "react";

        const Shell = ({ children }) => (
          <div className="flex min-h-screen bg-slate-950">
            <aside className="w-64 border-r border-slate-800 p-6 bg-slate-900/50 backdrop-blur-xl">
              <div className="text-xl font-black tracking-tighter text-cyan-500 mb-8">${name}</div>
              <nav className="space-y-2">
                {['Overview', 'Reports', 'Settings'].map(item => (
                  <a key={item} href={\`#/\${item.toLowerCase()}\`} 
                     className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                    {item}
                  </a>
                ))}
              </nav>
            </aside>
            <main className="flex-1 p-8 overflow-auto">{children}</main>
          </div>
        );

        export default function App() {
          return <Shell><h1 className="text-3xl font-bold">Dashboard Overview</h1></Shell>;
        }
      `
    })
  }
};
