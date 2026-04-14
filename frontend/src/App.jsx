import React, { useState, useEffect } from 'react';

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 80% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes glowPulse { 0% { opacity: 0.3; } 50% { opacity: 0.7; } 100% { opacity: 0.3; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [credits, setCredits] = useState(500);
  const [isOwner, setIsOwner] = useState(true); // Owner Mode: Enabled

  const theme = {
    bg: '#010204',
    blue: '#38bdf8',
    purple: '#a78bfa',
    gold: '#fbbf24', // For Credits/Premium
    border: '1px solid rgba(56, 189, 248, 0.12)',
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
      
      {/* 1. MASTER UTILITY HEADER */}
      <div style={{ height: '60px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <UnifiedLotus size={32} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '3px', color: theme.blue }}>BLUE_LOTUS_CORE</span>
            <span style={{ fontSize: '0.6rem', color: theme.purple }}>{isOwner ? 'AUTH: OWNER_MASTER_ACCESS' : 'AUTH: STANDARD_USER'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {/* Credit Display (Monetization Hub) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#0a0f1d', padding: '8px 15px', borderRadius: '4px', border: '1px solid #1e293b' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>CREDITS:</span>
            <span style={{ color: theme.gold, fontWeight: 'bold' }}>{credits}</span>
            <button style={{ background: theme.gold, color: '#000', border: 'none', borderRadius: '2px', fontSize: '0.6rem', padding: '2px 6px', fontWeight: 'bold', cursor: 'pointer' }}>TOP_UP</button>
          </div>
          <button onClick={() => setView('landing')} style={{ color: '#e11d48', background: 'none', border: 'none', fontSize: '0.7rem', cursor: 'pointer' }}>[ DISCONNECT ]</button>
        </div>
      </div>

      {/* 2. PRODUCTION & DEPLOYMENT STRIP */}
      <div style={{ height: '40px', borderBottom: theme.border, backgroundColor: '#020408', display: 'flex', alignItems: 'center', padding: '0 25px', gap: '25px', fontSize: '0.7rem' }}>
        <div style={{ color: '#475569', fontWeight: 'bold' }}>OPERATIONS:</div>
        <button style={{ color: theme.blue, background: 'none', border: 'none', cursor: 'pointer' }}>PUSH_TO_GITHUB</button>
        <button style={{ color: theme.purple, background: 'none', border: 'none', cursor: 'pointer' }}>STAGING_PREVIEW</button>
        <button style={{ color: theme.blue, background: 'none', border: 'none', cursor: 'pointer' }}>DEPLOY_LIVE</button>
        <div style={{ flex: 1 }} />
        <div style={{ color: theme.blue, animation: 'glowPulse 2s infinite' }}>● TWIN_ENGINE_ONLINE</div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT: TWIN AI CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          <div style={{ marginBottom: '15px', fontSize: '0.7rem', color: theme.blue }}>&gt; TWIN_CONSTRUCT_MODE: {isOwner ? 'FULL_AUTONOMY' : 'RESTRICTED'}</div>
          
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ color: theme.blue, fontSize: '0.85rem' }}>
              <div style={{ color: theme.purple }}>[SYSTEM] Initialization successful.</div>
              <div style={{ color: theme.purple }}>[TWIN] I am aware of current monetization targets.</div>
              <div style={{ color: theme.purple }}>[TWIN] Ready to architect profitable infrastructure.</div>
              <div style={{ marginTop: '10px' }}>awaiting_instructions..._</div>
            </div>
            {/* Scanline effect for that "Capable AI" look */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'rgba(56, 189, 248, 0.2)', animation: 'scanline 4s linear infinite' }} />
          </div>

          <div style={{ marginTop: '20px' }}>
            <textarea placeholder="Direct TWIN to build..." style={{ width: '100%', height: '100px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'none' }} />
            <button style={{ width: '100%', marginTop: '12px', padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: '900', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              ARCHITECT_AND_DEPLOY
            </button>
          </div>
        </div>

        {/* RIGHT: PREVIEW & PROFITABILITY MONITOR */}
        <div style={{ flex: 1, backgroundColor: '#020408', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '35px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.65rem', color: '#475569' }}>MASTER_PREVIEW_WINDOW</span>
            <span style={{ fontSize: '0.65rem', color: theme.gold }}>ESTIMATED_VALUE: $0.00</span>
          </div>
          <div style={{ flex: 1, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', overflow: 'hidden' }}>
               <div style={{ height: '40px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? <LandingPage onEnter={() => setView('workspace')} /> : <Workspace />;
}

const LandingPage = ({ onEnter }) => (
  <div style={{ backgroundColor: '#010204', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
    <svg width="250" height="250" viewBox="0 0 100 100" fill="none"><path d="M50 20C60 40 90 50 50 90C10 50 40 40 50 20Z" fill="#a78bfa" fillOpacity="0.3" /><path d="M50 90C75 75 95 65 85 45C75 25 55 50 50 90Z" fill="#38bdf8" fillOpacity="0.6" /><path d="M50 90C25 75 5 65 15 45C25 25 45 50 50 90Z" fill="#38bdf8" fillOpacity="0.6" /><path d="M50 85L58 65L50 45L42 65L50 85Z" fill="#fff" /></svg>
    <h1 style={{ fontSize: '8rem', fontWeight: '900', margin: '20px 0', letterSpacing: '-6px' }}>
      <span style={{ color: '#38bdf8' }}>Blue</span> Lotus
    </h1>
    <p style={{ fontSize: '1.4rem', color: '#475569', marginBottom: '40px', letterSpacing: '2px' }}>TWIN_CORE_ENABLED // ARCHITECT_MODE</p>
    <button onClick={onEnter} style={{ padding: '22px 80px', backgroundColor: 'transparent', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}>START_BUILD</button>
  </div>
);

export default App;
