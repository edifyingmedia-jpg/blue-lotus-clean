import React, { useState } from 'react';

const animationKeyframes = `
  @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
  @keyframes pulseGlow { 0% { box-shadow: 0 0 5px rgba(56, 189, 248, 0.2); } 50% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.5); } 100% { box-shadow: 0 0 5px rgba(56, 189, 248, 0.2); } }
`;

function App() {
  const [view, setView] = useState('landing'); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [renderStatus, setRenderStatus] = useState('AWAITING_COMMAND');
  const [previewContent, setPreviewContent] = useState(null);

  const theme = {
    bg: '#010204', blue: '#38bdf8', purple: '#a78bfa',
    border: '1px solid rgba(56, 189, 248, 0.15)', fontMono: '"JetBrains Mono", monospace'
  };

  const handleSmartBuild = () => {
    setIsGenerating(true);
    setRenderStatus('ARCHITECTING...');
    
    // TWIN "Thinking" and verifying code before rendering
    setTimeout(() => {
      setRenderStatus('VERIFYING_DOM_INTEGRITY...');
      setTimeout(() => {
        setPreviewContent(
          <div style={{ padding: '30px', color: '#0f172a', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Smart Module v1.0</h3>
              <span style={{ fontSize: '0.6rem', padding: '4px 8px', background: '#dcfce7', color: '#166534', borderRadius: '10px', fontWeight: 'bold' }}>PASS: 100% HEALTH</span>
            </div>
            <div style={{ height: '150px', background: 'linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
               <span style={{ fontWeight: 'bold' }}>Interactive Hero Component</span>
            </div>
            <button style={{ marginTop: '20px', width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              ACTIVATE_SMART_LISTENERS
            </button>
          </div>
        );
        setRenderStatus('RENDER_SUCCESSFUL');
        setIsGenerating(false);
      }, 1500);
    }, 1500);
  };

  const Workspace = () => (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: theme.fontMono }}>
      <style>{animationKeyframes}</style>
      
      {/* HEADER */}
      <div style={{ height: '60px', borderBottom: theme.border, display: 'flex', alignItems: 'center', padding: '0 25px', justifyContent: 'space-between', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ fontSize: '1.2rem', color: theme.blue }}>🪷</span><span style={{ fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px' }}>BLUE_LOTUS_CORE</span></div>
        <div style={{ fontSize: '0.65rem', color: theme.blue }}>INTELLIGENCE: TWIN_v4.9 // STATUS: {renderStatus}</div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* LEFT: COMMAND CONSOLE */}
        <div style={{ width: '420px', borderRight: theme.border, display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: '#010204' }}>
          <div style={{ flex: 1, backgroundColor: '#000', border: '1px solid #111827', padding: '15px', color: theme.blue, fontSize: '0.85rem' }}>
            <div>// TWIN_DIAGNOSTIC_MODE</div>
            <div style={{ color: '#475569', marginTop: '10px' }}>&gt; Initializing Smart Preview bridge...</div>
            {isGenerating && <div style={{ marginTop: '5px' }}>&gt; {renderStatus}</div>}
          </div>
          <button onClick={handleSmartBuild} style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: theme.blue, color: '#000', fontWeight: '900', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isGenerating ? "GENERATING..." : "EXECUTE_SMART_BUILD"}
          </button>
        </div>

        {/* RIGHT: SMART PREVIEW SCREEN */}
        <div style={{ flex: 1, backgroundColor: '#020408', padding: '30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ 
            flex: 1, backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', 
            position: 'relative', animation: isGenerating ? 'pulseGlow 2s infinite' : 'none' 
          }}>
             {/* SMART TOP BAR */}
             <div style={{ height: '40px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 15px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#fbbf24' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} />
                </div>
                <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold' }}>SMART_PREVIEW_v1.0</div>
             </div>

             {/* RENDER AREA */}
             <div style={{ height: 'calc(100% - 40px)', position: 'relative' }}>
                {previewContent || (
                  <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                    AWAITING_COMMAND...
                  </div>
                )}
                {isGenerating && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: theme.blue, animation: 'scanline 2s linear infinite' }} />}
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return view === 'landing' ? (
    <div style={{ backgroundColor: theme.bg, color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '7rem', fontWeight: '900' }}><span style={{ color: theme.blue }}>Blue</span> Lotus</h1>
      <button onClick={() => setView('workspace')} style={{ marginTop: '30px', padding: '20px 80px', background: 'none', border: `1px solid ${theme.blue}`, color: theme.blue, fontWeight: 'bold', cursor: 'pointer' }}>ENTER_CORE</button>
    </div>
  ) : <Workspace />;
}

export default App;
