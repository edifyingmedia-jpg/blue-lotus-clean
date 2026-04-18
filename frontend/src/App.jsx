import React, { useState } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Loader2, Code, Eye, RefreshCw, CheckCircle2, UserCircle } from 'lucide-react';

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
    setView("forge");
    
    try {
      addLog("Analyzing architectural request...");
      addLog("Contacting Sovereign OpenAI Bridge...");

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
      addLog("ERROR: Connection to OpenAI failed. Check Environment Variables.");
      setGeneratedCode("// Error: Make sure OPENAI_API_KEY is set in Vercel Settings.");
    } finally {
      setIsBuilding(false);
    }
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
        
        {/* HEADER */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', borderBottom: '1px solid #eee', background: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#4F46E5', padding: '8px', borderRadius: '8px' }}>
               <svg width="24" height="24" viewBox="0 0 100 100" fill="white"><path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" /></svg>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#111827', letterSpacing: '2px' }}>BLUE LOTUS</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button style={{ background: 'transparent', border: 'none', fontWeight: 'bold', color: '#6B7280', cursor: 'pointer' }}>Sign In</button>
            <button style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCircle size={20} /> Join Sovereign
            </button>
          </div>
        </nav>

        {/* HERO / INPUT SECTION */}
        <main style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem' }}>
          <div style={{ width: '100%', maxWidth: '850px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#111827', margin: '0 0 2rem 0', lineHeight: '1' }}>
              Plant a <span style={{ color: '#4F46E5' }}>new idea.</span>
            </h2>
            <div style={{ background: '#f8faff', border: '3px solid #4F46E5', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(79, 70, 229, 0.2)' }}>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want the Blue Lotus to build..."
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.8rem', minHeight: '140px', background: 'transparent', resize: 'none', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button 
                  onClick={handleBeginCultivation} 
                  disabled={isBuilding}
                  style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 4rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  {isBuilding ? <Loader2 size={32} className="animate-spin" /> : 'BEGIN CULTIVATION'} <ArrowRight size={32} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* PRICING */}
        <div style={{ padding: '4rem 4rem', display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap', background: '#fafafa', borderTop: '1px solid #eee' }}>
          {[
            { n: 'SPROUT', i: <Leaf size={28}/>, p: 'Free' }, 
            { n: 'SAPLING', i: <Sprout size={28}/>, p: '$9.99' }, 
            { n: 'OAK', i: <Trees size={28}/>, p: '$19.99' }, 
            { n: 'SOVEREIGN', i: <Crown size={28}/>, p: '$29.99' }
          ].map((plan, idx) => (
            <div key={idx} style={{ padding: '2.5rem', borderRadius: '30px', border: '2px solid #eee', width: '220px', textAlign: 'center', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827', boxShadow: '0 10px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ color: '#4F46E5', marginBottom: '15px' }}>{plan.i}</div>
              <div style={{ fontWeight: '900', fontSize: '1rem', letterSpacing: '2px', marginBottom: '10px' }}>{plan.n}</div>
              <div style={{ fontSize: '2rem', fontWeight: '900' }}>{plan.p}</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#020617', color: 'white', padding: '4rem', textAlign: 'center', borderTop: '1px solid #1E293B' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '3px', marginBottom: '1rem' }}>BLUE LOTUS</div>
          <p style={{ color: '#64748B', fontSize: '1rem' }}>© 2026 SOVEREIGN APP BUILDER // VERSION 1.07</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <nav style={{ height: '80px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 3rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <RefreshCw size={32} className={isBuilding ? "animate-spin" : ""} color="#818CF8" />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>FORGE MODE: {prompt.substring(0, 20)}...</span>
        </div>
        <button onClick={() => setView("garden")} style={{ background: '#1E293B', color: 'white', border: '2px solid #334155', padding: '0.8rem 1.5rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>EXIT FORGE</button>
      </nav>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* LEFT CONSOLE */}
        <div style={{ width: '450px', borderRight: '1px solid #1E293B', padding: '3rem', background: '#020617', overflowY: 'auto' }}>
          <h3 style={{ color: '#818CF8', borderBottom: '2px solid #1E293B', paddingBottom: '1.5rem', fontSize: '1.2rem', letterSpacing: '2px' }}>SOVEREIGN CONSOLE</h3>
          <div style={{ marginTop: '2rem', color: '#94A3B8', fontSize: '1.2rem', lineHeight: '1.8' }}>
            {consoleLogs.map((log, i) => (
              <p key={i} style={{ color: log.includes('COMPLETE') ? '#10B981' : '#94A3B8' }}>{log}</p>
            ))}
            {!isBuilding && generatedCode && (
              <div style={{ marginTop: '3rem', color: 'white', background: '#1E293B', padding: '1.5rem', borderRadius: '15px', borderLeft: '5px solid #4F46E5' }}>
                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>[TWIN ADVOCATE]:</p>
                <p>"The code has sprouted. Review the architecture in the preview window."</p>
              </div>
            )}
          </div>
        </div>
        {/* RIGHT PREVIEW */}
        <div style={{ flex: 1, background: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ width: '94%', height: '90%', background: 'white', borderRadius: '35px', boxShadow: '0 50px 100px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ height: '80px', background: '#4F46E5', width: '100%', display: 'flex', alignItems: 'center', padding: '0 2.5rem' }}>
               <div style={{ display: 'flex', gap: '12px' }}>
                 <div style={{ width: '15px', height: '15px', background: '#FF5F56', borderRadius: '50%' }}></div>
                 <div style={{ width: '15px', height: '15px', background: '#FFBD2E', borderRadius: '50%' }}></div>
                 <div style={{ width: '15px', height: '15px', background: '#27C93F', borderRadius: '50%' }}></div>
               </div>
            </div>
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', color: '#1e293b' }}>
              {isBuilding ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.3 }}>
                  <Eye size={100} style={{ marginBottom: '2rem' }} />
                  <p style={{ fontWeight: '900', fontSize: '2rem' }}>CULTIVATING FACE...</p>
                </div>
              ) : (
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1rem', background: '#f8f9fa', padding: '2rem', borderRadius: '20px', border: '1px solid #eee' }}>
                  {generatedCode || "Describe an app to begin..."}
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
