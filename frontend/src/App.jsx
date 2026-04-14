import React, { useState } from 'react';

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [activeTab, setActiveTab] = useState('BUILD'); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [consoleLog, setConsoleLog] = useState([
    "// TWIN_CORE: ONLINE",
    "// AUTH_LEVEL: MASTER_OWNER",
    "// Awaiting architecture parameters..."
  ]);

  const theme = {
    bg: '#010204',
    blue: '#38bdf8',
    purple: '#a78bfa',
    border: '1px solid rgba(56, 189, 248, 0.15)',
    fontMono: '"JetBrains Mono", monospace'
  };

  // The "Sovereign Build" Function
  const handleExecuteBuild = () => {
    setIsGenerating(true);
    setConsoleLog(prev => [...prev, "> INITIATING_BUILD_SEQUENCE...", "> ANALYZING_PROFITABILITY...", "> TWIN: 'I am architecting a superior solution now.'"]);
    
    // Simulate the AI "thinking" and generating
    setTimeout(() => {
      setIsGenerating(false);
      setConsoleLog(prev => [...prev, "> RENDER_COMPLETE: v1.0 deployed to preview."]);
    }, 3000);
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
            <button onClick={() => setActiveTab('STORE')} style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>[ STOREFRONT ]</button>
          </div>
        </div>
        <div style={{ fontSize: '0.65rem', color: theme.blue }}>STATUS: TWIN_MASTER_ACTIVE // {isGenerating ? "GENERATING..." : "IDLE"}</div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT COLUMN: THE CONSOLE */}
        <div style={{ width: '450px', borderRight: theme.border, display: 'flex', flexDirection: 'column', backgroundColor: '#010204', padding: '20px' }}>
          <div style={{ fontSize: '0.7rem', color: theme.blue, marginBottom: '10px' }}>&gt; TWIN_CONSOLE_v4.0</div>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.blue, fontSize: '0.85rem', position: 'relative', overflowY: 'auto' }}>
            {consoleLog.map((line, i) => <div key={i} style={{ marginBottom: '5px' }}>{line}</div>)}
            {isGenerating && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: theme.blue, animation: 'scanline 2s linear infinite' }} />}
          </div>

          <div style={{ marginTop: '20px' }}>
            <textarea 
              placeholder="Command TWIN to architect..." 
              style={{ width: '100%', height: '100px', padding: '15px', backgroundColor: '#0a0f1d', border: theme.border, borderRadius: '4px', color: '#fff', fontSize: '1rem', outline: 'none' }} 
            />
            <button 
              onClick={handleExecuteBuild}
              style={{ width: '100%', marginTop: '10px', padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: '900', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {isGenerating ? "ARCHITECTING..." : "EXECUTE_BUILD"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW */}
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, backgroundColor: isGenerating ? '#000' : '#fff', borderRadius: '4px', transition: 'background 0.5s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {isGenerating ? <div style={{ color: theme.blue, fontSize: '1rem', animation: 'pulse 1s infinite' }}>[ PREVIEW_RECONSTRUCTING ]</div> : null}
          </div>
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '7rem', fontWeight: '900' }}><span style={{ color: theme.blue }}>Blue</span> Lotus</h1>
      <button onClick={() => setView('workspace')} style={{ marginTop: '30px', padding: '20px 80px', background: 'none', border: `1px solid ${theme.blue}`, color: theme.blue, fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}>ENTER_CORE</button>
    </div>
  ) : <Workspace />;
}

export default App;
