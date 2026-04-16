// frontend/src/builder/ComponentPanel.jsx
import React from "react";

const COMPONENT_CATEGORIES = [
  {
    id: "layout",
    title: "Layout",
    items: ["Container", "Grid", "Section", "Divider"],
  },
  {
    id: "content",
    title: "Content",
    items: ["Text", "Image", "Video", "Icon"],
  },
  {
    id: "interactive",
    title: "Interactive",
    items: ["Button", "Input", "Form", "Modal"],
  },
  {
    id: "data",
    title: "Data",
    items: ["List", "Table", "Chart"],
  },
];

export default function ComponentPanel() {
  return (
    <aside className="flex flex-col bg-slate-900/40 rounded-xl border border-slate-800/60 overflow-hidden">
      <header className="p-4 border-b border-slate-800/60 bg-slate-900/20">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
          Available Components
        </h2>
        <span className="text-[9px] text-slate-500 font-medium uppercase mt-1 block">
          Used by TWIN during builds
        </span>
      </header>

      <div className="p-4 space-y-6 overflow-y-auto custom-scrollbar">
        {COMPONENT_CATEGORIES.map((category) => (
          <section key={category.id} className="space-y-2">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
              {category.title}
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="px-3 py-2 bg-slate-800/40 border border-slate-700/30 rounded-lg text-[11px] text-slate-300 font-medium hover:border-blue-500/50 hover:bg-slate-800/60 transition-all cursor-default text-center"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
