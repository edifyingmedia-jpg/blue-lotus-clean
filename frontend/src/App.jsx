import React, { useState } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Loader2, RefreshCw, Eye } from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); 
  const [billing, setBilling] = useState("monthly");
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);

  const addLog = (msg) => {
    setConsoleLogs(prev => [...prev, `> ${msg}`]);
  };

  const calculatePrice = (base) => {
    if (base === 0) return "Free";
    if (billing === "monthly") return `$${base}`;
    return `$${(base * 12 * 0.85).toFixed(0)}/yr`;
  };

  const handleBeginCultivation = async () => {
    if (!prompt) return;
    setView("forge");
    setIsBuilding(true);
    setConsoleLogs(["> Initializing Blue Lotus V.1.07..."]);
    
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
        setGeneratedCode(data.code);
        addLog("HEALING COMPLETE. App Face Generated.");
      } else {
        throw new Error();
      }
    } catch (error) {
      addLog("ERROR: Connection failed.");
      setGeneratedCode("// Error: Check your OpenAI API Key in Vercel.");
    } finally {
      setIsBuilding(false);
    }
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#4F46E5', padding: '8px', borderRadius: '8px' }}>
               <svg width="24" height="24" viewBox="0 0 100 100" fill="white"><path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" /></svg>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#111827', letterSpacing: '2px' }}>BLUE LOTUS</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button style={{ background: 'transparent', border: 'none', fontWeight: 'bold', color: '#6B7280', fontSize: '1.1rem', cursor: 'pointer' }}>Sign In</button>
            <button style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Join</button>
          </div>
        </nav>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <div style={{ width: '100%', maxWidth: '850px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#111827', marginBottom: '2rem' }}>Plant a <span style={{ color: '#4F46E5' }}>new idea.</span></h2>
            <div style={{ background: '#f8faff', border: '3px solid #4F46E5', borderRadius: '40px', padding: '2.5rem' }}>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your app..."
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.8rem', minHeight: '140px', background: 'transparent', resize: 'none' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button onClick={handleBeginCultivation} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 4rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  BEGIN CULTIVATION <ArrowRight size={32} />
                </button>
              </div>
            </div>
          </div>
        </main>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ background: '#F3F4F6', display: 'inline-flex', padding: '6px', borderRadius: '14px' }}>
            <button onClick={() => setBilling('monthly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'monthly' ? 'white' : 'transparent' }}>Monthly</button>
            <button onClick={() => setBilling('yearly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'yearly' ? 'white' : 'transparent' }}>Yearly (Save 15%)</button>
          </div>
        </div>

        <div style={{ padding: '0 2rem 6rem', display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { n: 'SPROUT', i: <Leaf size={32}/>, p: 0 }, 
            { n: 'SAPLING', i: <Sprout size={32}/>, p: 10 }, 
            { n: 'OAK', i: <Trees size={32}/>, p: 20 }, 
            { n: 'SOVEREIGN', i: <Crown size={32}/>, p: 30 }
          ].map((plan, idx) => (
            <div key={idx} style={{ padding: '2.5rem', borderRadius: '30px', border: '2px solid #eee', width: '220px', textAlign: 'center', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827' }}>
              <div style={{ color: '#4F46E5', marginBottom: '15px' }}>{plan.i}</div>
              <div style={{ fontWeight: '900', fontSize: '1.1rem', marginBottom: '10px' }}>{plan.n}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{calculatePrice(plan.p)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <nav style={{ height: '80px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 3rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <RefreshCw size={32} className={isBuilding ? "animate-spin" : ""} color="#818CF8" />
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>FORGE MODE</span>
        </div>
        <button onClick={() => setView("garden")} style={{ background: '#1E293B', color: 'white', border: '2px solid #334155', padding: '0.8rem 1.5rem', borderRadius: '10px', cursor: 'pointer' }}>EXIT</button>
      </nav>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '450px', borderRight: '1px solid #1E293B', padding: '3rem', overflowY: 'auto' }}>
          <h3 style={{ color: '#818CF8', borderBottom: '2px solid #1E293B', paddingBottom: '1.5rem', fontSize: '1.3rem' }}>CONSOLE</h3>
          <div style={{ marginTop: '2rem', color: '#94A3B8', fontSize: '1.2rem', lineHeight: '1.8' }}>
            {consoleLogs.map((log, i) => (
              <p key={i} style={{ color: log.includes('COMPLETE') ? '#10B981' : '#94A3B8' }}>{log}</p>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, background: '#F1F5F9', padding: '2rem' }}>
          <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: '35px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ height: '80px', background: '#4F46E5' }}></div>
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', color: '#1e293b' }}>
              {isBuilding ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.3 }}>
                  <Eye size={100} style={{ marginBottom: '2rem' }} />
                  <p style={{ fontWeight: '900', fontSize: '2.2rem' }}>CULTIVATING...</p>
                </div>
              ) : (
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1.2rem' }}>{generatedCode || "Waiting for prompt..."}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
