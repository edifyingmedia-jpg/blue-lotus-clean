// frontend/src/builder/ComponentPanel.jsx
import React from "react";

const COMPONENT_CATEGORIES = [
  {
    id: "layout",
    title: "Structural Primitives",
    items: ["Container", "Grid", "Section", "Divider"],
  },
  {
    id: "content",
    title: "Core Content",
    items: ["Text", "Image", "Video", "Icon"],
  },
  {
    id: "interactive",
    title: "Action Triggers",
    items: ["Button", "Input", "Form", "Modal"],
  },
  {
    id: "premium",
    title: "Architect Exclusive",
    items: ["Storefront_Node", "Payment_Gate", "Member_Auth"],
    locked: true
  },
];

export default function ComponentPanel() {
  return (
    <aside className="flex flex-col bg-[#0F0F14] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
      <header className="p-6 border-b border-white/5 bg-white/[0.02]">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">
          Neural Library
        </h2>
        <span className="text-[9px] text-slate-600 font-mono uppercase mt-2 block tracking-widest">
          System_Registry_v4
        </span>
      </header>

      <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
        {COMPONENT_CATEGORIES.map((category) => (
          <section key={category.id} className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                {category.title}
              </h3>
              {category.locked && (
                <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold uppercase">Locked</span>
              )}
            </div>
            
            <ul className="grid grid-cols-2 gap-3">
              {category.items.map((item) => (
                <li
                  key={item}
                  className={`px-3 py-3 border rounded-xl text-[10px] font-bold transition-all text-center uppercase tracking-tighter ${
                    category.locked 
                      ? 'bg-black/20 border-white/5 text-slate-700 cursor-not-allowed'
                      : 'bg-white/[0.02] border-white/10 text-slate-300 hover:border-cyan-500/50 hover:bg-cyan-500/5 hover:text-white cursor-grab active:scale-95'
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      
      {/* Tier Awareness Footer */}
      <footer className="p-4 bg-white/[0.01] border-t border-white/5 text-center">
        <p className="text-[8px] font-mono text-slate-700 uppercase tracking-widest">
          Free Tier: Standard Primitives Only
        </p>
      </footer>
    </aside>
  );
}
