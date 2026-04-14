import React, { useState } from 'react';

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes textFlicker { 0% { opacity: 0.8; } 50% { opacity: 1; } 100% { opacity: 0.8; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [activeTab, setActiveTab] = useState('BUILD'); // BUILD, HEAL, STORE
  const [healingLog, setHealingLog] = useState([
    "// TWIN HEALING_CORE INITIALIZED...",
    "// Awaiting broken input for diagnostic analysis."
  ]);

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
        <div style={{ fontSize: '0.65rem', color: '#475569' }}>PLATFORM_FEE: 10% // STATUS: SECURE</div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* LEFT COLUMN: TWIN DYNAMIC CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          
          {activeTab === 'HEAL' ? (
            <>
              <div style={{ fontSize: '0.7rem', color: theme.purple, marginBottom: '10px' }}>&gt; TWIN_HEALING_DIAGNOSTIC</div>
              <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.purple, fontSize: '0.8rem', position: 'relative', overflowY: 'auto' }}>
                {healingLog.map((line, i) => <div key={i} style={{ marginBottom: '5px' }}>{line}</div>)}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: theme.purple, opacity: 0.2, animation: 'scanline 4s linear infinite' }} />
              </div>
              <textarea placeholder="Paste broken code here..." style={{ width: '100%', height: '120px', marginTop: '15px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff' }} />
              <button style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.purple, color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px' }}>INITIATE_HEALING</button>
            </>
          ) : activeTab === 'STORE' ? (
            <>
              <div style={{ fontSize: '0.7rem', color: '#fbbf24', marginBottom: '10px' }}>&gt; MERCHANT_HUB</div>
              <div style={{ flex: 1, border: '1px dashed #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
                <p style={{ color: '#475569', fontSize: '0.8rem' }}>No active listings.<br/>Build an app to open your storefront.</p>
              </div>
              <button style={{ width: '100%', marginTop: '15px', padding: '15px', border: '1px solid #fbbf24', color: '#fbbf24', background: 'none', fontWeight: 'bold', borderRadius: '4px' }}>LIST_CURRENT_APP</button>
            </>
          ) : (
            <>
              <div style={{ fontSize: '0.7rem', color: theme.blue, marginBottom: '10px' }}>&gt; ARCHITECT_COMMAND</div>
              <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.blue }}>
                <div>[TWIN] Awaiting architecture parameters...</div>
              </div>
              <textarea placeholder="Describe your vision..." style={{ width: '100%', height: '120px', marginTop: '15px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff' }} />
              <button style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '4px' }}>EXECUTE_BUILD</button>
            </>
          )}
        </div>

        {/* RIGHT COLUMN: PREVIEW & MARKET MONITOR */}
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', overflow: 'hidden' }}>
             <div style={{ height: '35px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 15px', justifyContent: 'space-between' }}>
               <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
                  <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
               </div>
               {activeTab === 'STORE' && <span style={{ fontSize: '0.6rem', color: '#000', fontWeight: 'bold' }}>MERCHANT_PREVIEW_MODE</span>}
             </div>
          </div>
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
