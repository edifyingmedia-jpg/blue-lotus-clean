import React, { useState } from 'react';

// --- PROFESSIONAL MOTION & SHINE ---
const animationKeyframes = `
  @keyframes bloom {
    0% { transform: scale(0.8) translateY(10px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes glassShine {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

function App() {
  const [view, setView] = useState('landing'); 

  const theme = {
    bg: '#020408',         // Deep Industrial Black
    glass: 'rgba(15, 23, 42, 0.8)', // Professional Glass
    blue: '#38bdf8',       // Electric Cyan
    purple: '#a78bfa',     // Amethyst
    border: '1px solid rgba(56, 189, 248, 0.15)',
    fontMono: '"JetBrains Mono", "Fira Code", monospace',
    fontSans: '"Inter", "System UI", sans-serif'
  };

  // --- UNIFIED PROFESSIONAL LOTUS ---
  const UnifiedLotus = ({ size = 150 }) => (
    <div style={{ animation: 'bloom 1s cubic-bezier(0.16, 1, 0.3, 1) forwards', display: 'inline-block' }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.3))' }}>
        <style>{animationKeyframes}</style>
        {/* Layered Amethyst Petals */}
        <path d="M50 20C60 40 90 50 50 90C10 50 40 40 50 20Z" fill={theme.purple} fillOpacity="0.3" />
        {/* Blue "Spread" Petals */}
        <path d="M50 90C75 75 95 65 85 45C75 25 55 50 50 90Z" fill={theme.blue} fillOpacity="0.6" />
        <path d="M50 90C25 75 5 65 15 45C25 25 45 50 50 90Z" fill={theme.blue} fillOpacity="0.6" />
        {/* Professional Diamond Core */}
        <path d="M50 85L58 65L50 45L42 65L50 85Z" fill="#fff" />
      </svg>
    </div>
  );

  // --- LANDING PAGE (The Professional Face) ---
  const LandingPage = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: theme.fontSans }}>
      <UnifiedLotus size={220} />
      <div style={{ letterSpacing: '10px', color: theme.blue, fontSize: '0.9rem', fontWeight: 'bold', marginTop: '20px' }}>SYSTEM.INITIALIZE</div>
      <h1 style={{ fontSize: '7rem', fontWeight: '900', margin: '10px 0', letterSpacing: '-5px' }}>
        <span style={{ color: theme.blue }}>Blue</span> Lotus
      </h1>
      <p style={{ fontSize: '1.4rem', color: '#64748b', fontWeight: '300', marginBottom: '50px' }}>Industrial-grade AI architecture.</p>
      
      <button 
        onClick={() => setView('workspace')}
        style={{ 
          padding: '20px 60px', backgroundColor: 'transparent', color: theme.blue, 
          border: `1px solid ${theme.blue}`, borderRadius: '4px', fontSize: '1.2rem', 
          fontWeight: 'bold', cursor: 'pointer', overflow: 'hidden', position: 'relative' 
        }}>
        ENTER CORE
        <div style={{ position: 'absolute', top: 0, height: '100%', width: '50px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'glassShine 3s infinite' }} />
      </button>
    </div>
  );

  // --- WORKSPACE (The Heavy-Duty Workbench) ---
  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.fontMono }}>
      {/* Precision Header */}
      <div style={{ height: '60px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <UnifiedLotus size={30} />
          <span style={{ fontWeight: 'bold', fontSize: '1rem', letterSpacing: '2px' }}>
            <span style={{color: theme.blue}}>BLUE</span>LOTUS_CORE.v1
          </span>
        </div>
        <button onClick={() => setView('landing')} style={{ backgroundColor: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '0.8rem' }}>[ DISCONNECT ]</button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* COLUMN 1: AI COMMAND CONSOLE */}
        <div style={{ width: '420px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          <div style={{ fontSize: '0.7rem', color: theme.blue, marginBottom: '10px' }}>// TERMINAL_READY</div>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.blue, fontSize: '0.9rem', borderRadius: '4px' }}>
            <span style={{ opacity: 0.4 }}>root@bluelotus:~$</span> awaiting_input_
          </div>
          <div style={{ marginTop: '20px' }}>
            <textarea placeholder="PROMPT_ARCH_VISION..." style={{ width: '100%', height: '120px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
            <button style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.blue, color: '#000', border: 'none', borderRadius: '4px', fontWeight: '900', cursor: 'pointer' }}>
              EXECUTE_BUILD
            </button>
          </div>
        </div>

        {/* COLUMN 2: ARCHITECTURE PREVIEW */}
        <div style={{ flex: 1, backgroundColor: '#020408', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 20px', fontSize: '0.7rem', color: '#334155', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>PREVIEW_RENDER_OUTPUT</div>
          <div style={{ flex: 1, padding: '30px' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 0 100px rgba(0,0,0,0.8)', position: 'relative', overflow: 'hidden' }}>
               {/* This represents the "Capable" app preview area */}
               <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 15px', gap: '5px' }}>
                 <div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#cbd5e1'}} />
                 <div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#cbd5e1'}} />
                 <div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: '#cbd5e1'}} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? <LandingPage /> : <Workspace />;
}

export default App;
