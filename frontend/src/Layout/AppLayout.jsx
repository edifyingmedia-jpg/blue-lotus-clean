import React from "react";

export default function AppLayout({ left, right }) {
  return (
    <div className="flex h-screen w-full bg-[#09090B] overflow-hidden">
      {/* We are removing the hardcoded <header> because our new App.jsx 
          already has a premium integrated header. 
      */}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: The Architect */}
        <aside className="w-[400px] border-r border-white/5 bg-[#0F0F14] overflow-y-auto custom-scrollbar shadow-2xl z-10">
          {left}
        </aside>

        {/* Right Area: The Preview Canvas */}
        <main className="flex-1 bg-[#09090B] overflow-hidden relative">
          {right}
        </main>
      </div>
    </div>
  );
}
