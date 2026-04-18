import React, { useState } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Loader2, Code, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); 
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);

  const addLog = (msg) => {
    setConsoleLogs(prev => [...prev, `> ${msg}`]);
  };

  const handleBeginCultivation = async () => {
    if (!prompt) return;
    setIsBuilding(true);
    setConsoleLogs(["> Initializing Blue Lotus V.1.07..."]);
    
    try {
      // 1. Switch to Forge view immediately to show progress
      setView("forge");
      addLog("Analyzing architectural request...");
      addLog("Contacting Sovereign OpenAI Bridge...");

      // 2. Call your new API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.code) {
        addLog("Sprouting UI components...");
        addLog("Throttling logic generation...");
        setGeneratedCode(data.code);
        addLog("HEALING COMPLETE. App Face Generated.");
      } else {
        throw new Error("Cultivation failed");
      }
    } catch (error) {
      addLog("ERROR: The cultivation process was interrupted.");
      console.error(error);
    } finally {
      setIsBuilding(false);
    }
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', borderBottom: '1px solid #eee', background: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#111827', letterSpacing: '2px' }}>BLUE LOTUS</span>
          </div>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontWeight: 'bold' }}>GET STARTED</button>
        </nav>

        <main style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem' }}>
          <div style={{ width: '100%', maxWidth: '850px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#111827', margin: '0 0 2rem 0' }}>
              Plant a <span style={{ color: '#4F46E5' }}>new idea.</span>
            </h2>
            <div style={{ background: '#f8faff', border: '3px solid #4F46E5', borderRadius: '32px', padding: '2.5rem', boxShadow: '0 25px 50px rgba(79, 70, 229, 0.15)' }}>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want to build..."
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.6rem', minHeight: '120px', background: 'transparent', resize: 'none' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button 
                  onClick={handleBeginCultivation} 
                  disabled={isBuilding}
                  style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 3.5rem', borderRadius: '18px', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  {isBuilding ? <Loader2 size={28} className="animate-spin" /> : 'BEGIN CULTIVATION'} <ArrowRight size={28} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer style={{ background: '#020617', color: 'white', padding: '3rem 4rem', textAlign: 'center' }}>
          <span style={{ letterSpacing: '2px', fontWeight: 'bold', fontSize: '0.8rem', color: '#64748B' }}>V.1.07 // SOVEREIGN ENGINE ACTIVE</span>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <nav style={{ height: '70px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <RefreshCw size={28} className={isBuilding ? "animate-spin" : ""} color="#818CF8" />
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>FORGE: {prompt.substring(0, 20)}...</span>
        </div>
        <button onClick={() => setView("garden")} style={{ background: '#1E293B', color: 'white', border: '1px solid #334155', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>EXIT FORGE</button>
      </nav>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* LEFT PANEL: Console */}
        <div style={{ width: '420px', borderRight: '1px solid #1E293B', padding: '2.5rem', background: '#020617', overflowY: 'auto' }}>
          <h3 style={{ color: '#818CF8', borderBottom: '1px solid #1E293B', paddingBottom: '1rem', letterSpacing: '2px' }}>SOVEREIGN CONSOLE</h3>
          <div style={{ marginTop: '1.5rem', color: '#94A3B8', fontSize: '1.1rem', lineHeight: '1.8' }}>
            {consoleLogs.map((log, i) => (
              <p key={i} style={{ color: log.includes('COMPLETE') ? '#10B981' : '#94A3B8' }}>{log}</p>
            ))}
            {!isBuilding && generatedCode && (
              <div style={{ marginTop: '2rem', color: 'white', background: '#1E293B', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ fontWeight: 'bold' }}>[TWIN ADVOCATE]:</p>
                <p>"The code is ready. Review it in the preview panel."</p>
              </div>
            )}
          </div>
        </div>
        {/* RIGHT PANEL: Preview */}
        <div style={{ flex: 1, background: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ width: '92%', height: '88%', background: 'white', borderRadius: '28px', boxShadow: '0 40px 60px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ height: '70px', background: '#4F46E5', width: '100%', display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
               <div style={{ width: '12px', height: '12px', background: '#FF5F56', borderRadius: '50%', marginRight: '8px' }}></div>
               <div style={{ width: '12px', height: '12px', background: '#FFBD2E', borderRadius: '50%', marginRight: '8px' }}></div>
               <div style={{ width: '12px', height: '12px', background: '#27C93F', borderRadius: '50%' }}></div>
            </div>
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', color: '#1e293b' }}>
              {isBuilding ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.3 }}>
                  <Eye size={80} style={{ marginBottom: '2rem' }} />
                  <p style={{ fontWeight: '900', fontSize: '1.5rem' }}>GENERATING FACE...</p>
                </div>
              ) : (
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', background: '#f8f9fa', padding: '1rem', borderRadius: '10px' }}>
                  {generatedCode || "Waiting for prompt..."}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
