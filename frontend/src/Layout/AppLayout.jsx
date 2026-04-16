import React from "react";
import RegistrySidebar from "../builder/RegistrySidebar";
import Canvas from "../builder/Canvas";
import TWINPanel from "../twin/TWINPanel";
import { useAppDefinition } from "../state/AppDefinitionContext";

export default function AppLayout() {
  const { isPrimeActive } = useAppDefinition();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050505] text-white">
      {/* 1. The Inventory (Left) */}
      <div className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold">Registry</h2>
        </div>
        <RegistrySidebar />
      </div>

      {/* 2. The Great Canvas (Center) */}
      <main className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat">
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[length:40px_40px] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
        
        <div className="h-full w-full flex items-center justify-center p-8">
          <div className="w-full h-full max-w-5xl bg-[#0a0a0a] rounded-xl border border-white/5 shadow-2xl overflow-hidden relative">
             <Canvas />
          </div>
        </div>
      </main>

      {/* 3. The TWIN Command Center (Right) */}
      <TWINPanel />
    </div>
  );
}
