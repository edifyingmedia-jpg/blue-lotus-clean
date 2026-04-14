import React, { useState } from 'react';

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [activeTab, setActiveTab] = useState('BUILD'); 
  const [healingStatus, setHealingStatus] = useState('IDLE'); // IDLE, ANALYZING, HEALING

  const theme = {
    bg: '#010204',
    blue: '#38bdf8',
    purple: '#a78bfa',
    border: '1px solid rgba(56, 189, 248, 0.12)',
    fontMono: '"JetBrains Mono", monospace'
  };

  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.fontMono }}>
      <style>{animationKeyframes}</style>

      {/* TOP COMMAND BAR */}
      <div style={{ height: '55px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <span style={{ fontSize: '1.2rem', color: theme.blue, fontWeight: '900' }}>🪷 BLUE_LOTUS</span>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => setActiveTab('BUILD')} style={{ background: 'none', border: 'none', color: activeTab === 'BUILD' ? theme.blue : '#475569', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>[ BUILDER ]</button>
            <button onClick={() => setActiveTab('HEAL')} style={{ background: 'none', border: 'none', color: activeTab === 'HEAL' ? theme.purple : '#475569', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>[ CODE_HEALER ]</button>
            <button onClick={() => setActiveTab('STORE')} style={{ background: 'none', border: 'none', color: activeTab === 'STORE' ? '#fbbf24' : '#475569', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>[ STOREFRONT ]</button>
          </div>
        </div>
        <div style={{ fontSize: '0.65rem', color: '#475569' }}>PLATFORM_FEE: 10% // TWIN_HEALER: v2.4</div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* LEFT COLUMN: THE MASTER CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          
          {activeTab === 'HEAL' ? (
            <>
              <div style={{ fontSize: '0.7rem', color: theme.purple, marginBottom: '10px', fontWeight: 'bold' }}>&gt; TWIN_HEALING_ENGINE</div>
              
              <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.purple, fontSize: '0.8rem', position: 'relative', overflowY: 'auto' }}>
                <div style={{ marginBottom: '10px' }}>[SYSTEM] Initialization successful.</div>
                {healingStatus === 'IDLE' && <div>// Awaiting broken code for diagnostic...</div>}
                {healingStatus === 'ANALYZING' && <div style={{ animation: 'pulse 1s infinite' }}>// ANALYZING EXTERNAL ERRORS...</div>}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: theme.purple, opacity: 0.2, animation: 'scanline 4s linear infinite' }} />
              </div>

              {/* UPLOAD AREA */}
              <div style={{ marginTop: '20px', padding: '20px', border: `2px dashed rgba(167, 139, 250, 0.3)`, borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: '0.7rem', color: theme.purple }}>[ DROP_BROKEN_FILE_HERE ]</span>
              </div>

              <textarea placeholder="Or paste raw code..." style={{ width: '100%', height: '100px', marginTop: '15px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff' }} />
              <button 
                onClick={() => setHealingStatus('ANALYZING')}
                style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.purple, color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                INITIATE_HEALING_CORE
              </button>
            </>
          ) : (
             <div style={{ color: '#475569', fontSize: '0.8rem' }}>// BUILDER_CONSOLE_ACTIVE</div>
          )}
        </div>

        {/* RIGHT COLUMN: PREVIEW */}
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }} />
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '7rem', fontWeight: '900' }}><span style={{ color: theme.blue }}>Blue</span> Lotus</h1>
      <button onClick={() => setView('workspace')} style={{ marginTop: '30px', padding: '20px 60px', background: 'none', border: `1px solid ${theme.blue}`, color: theme.blue, fontWeight: 'bold', cursor: 'pointer' }}>ENTER_CORE</button>
    </div>
  ) : <Workspace />;
}

export default App;
