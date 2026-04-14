import React, { useState } from 'react';

const animationKeyframes = `
  @keyframes glassShine { 0% { left: -100%; } 100% { left: 100%; } }
  @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [projectName, setProjectName] = useState("UNTITLED_PROJECT_01");

  const theme = {
    bg: '#020408',
    blue: '#38bdf8',
    purple: '#a78bfa',
    border: '1px solid rgba(56, 189, 248, 0.15)',
    fontMono: '"JetBrains Mono", monospace'
  };

  const UnifiedLotus = ({ size = 150 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.4))' }}>
      <path d="M50 20C60 40 90 50 50 90C10 50 40 40 50 20Z" fill={theme.purple} fillOpacity="0.3" />
      <path d="M50 90C75 75 95 65 85 45C75 25 55 50 50 90Z" fill={theme.blue} fillOpacity="0.6" />
      <path d="M50 90C25 75 5 65 15 45C25 25 45 50 50 90Z" fill={theme.blue} fillOpacity="0.6" />
      <path d="M50 85L58 65L50 45L42 65L50 85Z" fill="#fff" />
    </svg>
  );

  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.fontMono }}>
      <style>{animationKeyframes}</style>
      
      {/* 1. INDUSTRIAL TOP HEADER */}
      <div style={{ height: '50px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <UnifiedLotus size={24} />
          <input 
            value={projectName} 
            onChange={(e) => setProjectName(e.target.value)}
            style={{ background: 'none', border: 'none', color: theme.blue, fontWeight: 'bold', fontSize: '0.9rem', width: '250px', outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ background: 'none', border: '1px solid #1e293b', color: '#64748b', padding: '5px 12px', fontSize: '0.7rem', borderRadius: '3px', cursor: 'pointer' }}>SAVE</button>
          <button style={{ background: 'none', border: '1px solid #1e293b', color: '#e11d48', padding: '5px 12px', fontSize: '0.7rem', borderRadius: '3px', cursor: 'pointer' }}>DELETE</button>
          <button onClick={() => setView('landing')} style={{ background: theme.blue, color: '#000', border: 'none', padding: '5px 12px', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: '3px', cursor: 'pointer' }}>EXIT</button>
        </div>
      </div>

      {/* 2. THE PRODUCTION CONTROL STRIP (New Section) */}
      <div style={{ height: '45px', borderBottom: theme.border, backgroundColor: '#05070a', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '20px' }}>
        <div style={{ fontSize: '0.7rem', color: '#475569' }}>PIPELINE:</div>
        <button style={{ background: 'none', border: 'none', color: theme.blue, fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '1rem' }}>⊕</span> PUSH_TO_GITHUB
        </button>
        <button style={{ background: 'none', border: 'none', color: theme.purple, fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '1rem' }}>⚡</span> DEPLOY_LIVE
        </button>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: '0.7rem', color: theme.blue, animation: 'pulse 2s infinite' }}>[ STATUS: PRODUCTION_IDLE ]</div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT: CONSOLE */}
        <div style={{ width: '420px', borderRight: theme.border, display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: '#010204' }}>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.blue, fontSize: '0.85rem' }}>
            <span style={{ opacity: 0.4 }}>root@bluelotus:~$</span> awaiting_vision_
          </div>
          <textarea placeholder="PROMPT_ARCHITECTURE..." style={{ width: '100%', height: '100px', marginTop: '20px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff' }} />
          <button style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: '900', border: 'none', borderRadius: '4px' }}>
            GENERATE_CODE
          </button>
        </div>

        {/* RIGHT: PREVIEW */}
        <div style={{ flex: 1, padding: '25px', backgroundColor: '#020408' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '4px', position: 'relative' }}>
             <div style={{ height: '35px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 15px', gap: '5px' }}>
               <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: '#cbd5e1'}} />
               <div style={{width: 6, height: 6, borderRadius: '50%', backgroundColor: '#cbd5e1'}} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? <LandingPage onEnter={() => setView('workspace')} /> : <Workspace />;
}

// Separate Landing Component for Cleanliness
const LandingPage = ({ onEnter }) => (
  <div style={{ backgroundColor: '#020408', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
    <svg width="200" height="200" viewBox="0 0 100 100" fill="none"><path d="M50 20C60 40 90 50 50 90C10 50 40 40 50 20Z" fill="#a78bfa" fillOpacity="0.3" /><path d="M50 90C75 75 95 65 85 45C75 25 55 50 50 90Z" fill="#38bdf8" fillOpacity="0.6" /><path d="M50 90C25 75 5 65 15 45C25 25 45 50 50 90Z" fill="#38bdf8" fillOpacity="0.6" /><path d="M50 85L58 65L50 45L42 65L50 85Z" fill="#fff" /></svg>
    <h1 style={{ fontSize: '6rem', fontWeight: '900', margin: '20px 0', letterSpacing: '-4px' }}>
      <span style={{ color: '#38bdf8' }}>Blue</span> Lotus
    </h1>
    <button onClick={onEnter} style={{ padding: '20px 60px', backgroundColor: 'transparent', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>ENTER CORE</button>
  </div>
);

export default App;
