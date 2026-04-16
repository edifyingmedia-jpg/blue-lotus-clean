import React, { useState } from "react";

export default function SignInGate({ children }) {
  const [email, setEmail] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const OWNER_EMAIL = "tiffany@edifyingmedia.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase()) {
      setAuthorized(true);
    } else {
      alert("UNAUTHORIZED_ACCESS: Identity mismatch.");
    }
  };

  if (!authorized) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#09090B] text-white">
        {/* Decorative Background Glow */}
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
        
        <div className="z-10 w-full max-w-md p-10 bg-[#0F0F14] border border-white/5 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black tracking-tighter uppercase">Identity <span className="text-cyan-500 text-sm block tracking-[0.3em] font-mono mt-1">Verification</span></h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Architect Email</label>
              <input 
                type="email" 
                placeholder="Enter owner credentials..." 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-700"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all active:scale-[0.98]"
            >
              Authorize Session
            </button>
          </form>

          <p className="mt-8 text-center text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            Protected by Blue Lotus Neural Bridge
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
