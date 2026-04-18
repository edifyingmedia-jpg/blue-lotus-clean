import React, { useState } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, RefreshCw, Eye, Zap, Database, Loader2 } from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); 
  const [billing, setBilling] = useState("monthly");
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);

  const plans = [
    { n: 'SPROUT', i: <Leaf size={32}/>, p: 0, c: 10, d: "Test your ideas." },
    { n: 'SAPLING', i: <Sprout size={32}/>, p: 9.99, c: 100, d: "Growing projects." },
    { n: 'OAK', i: <Trees size={32}/>, p: 19.99, c: 200, d: "Architectural power." },
    { n: 'SOVEREIGN', i: <Crown size={32}/>, p: 29.99, c: 300, d: "The ultimate builder." }
  ];

  const calculatePrice = (base) => {
    if (base === 0) return "Free";
    const price = billing === "monthly" ? base : (base * 12 * 0.85).toFixed(0);
    return billing === "monthly" ? `$${price}` : `$${price}/yr`;
  };

  const handleBeginCultivation = async () => {
    if (!prompt) return;
    setView("forge");
    setIsBuilding(true);
    setConsoleLogs(["> Initializing Blue Lotus V.1.07...", "> Establishing OpenAI Tunnel..."]);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      
      if (data.code) {
        setConsoleLogs(prev => [...prev, "> Sprouting UI components...", "> HEALING COMPLETE."]);
        setGeneratedCode(data.code);
      }
    } catch (err) {
      setConsoleLogs(prev => [...prev, "> ERROR: Connection failed.", "> Check OpenAI Key."]);
      setGeneratedCode("<html><body style='background:#fee2e2; padding:2rem; font-family:sans-serif;'><h2>Connection Error</h2><p>Please check your Vercel Environment Variables.</p></body></html>");
    } finally {
      setIsBuilding(false);
    }
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', color: '#111827' }}>
        
        {/* HEADER */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#4F46E5', padding: '8px', borderRadius: '8px' }}>
               <svg width="24" height="24" viewBox="0 0 100 100" fill="white"><path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" /></svg>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '2px' }}>BLUE LOTUS</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={() => setView("forge")} style={{ background: 'transparent', border: 'none', fontWeight: 'bold', color: '#6B7280', fontSize: '1.1rem', cursor: 'pointer' }}>Sign In</button>
            <button onClick={() => setView("forge")} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Join</button>
          </div>
        </nav>

        {/* HERO */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '2rem', textAlign: 'center' }}>
            Plant a <span style={{ color: '#4F46E5' }}>new idea.</span>
          </h2>
          <div style={{ width: '100%', maxWidth: '850px', background: '#f8faff', border: '3px solid #4F46E5', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(79, 70, 229, 0.2)' }}>
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
        </main>

        {/* BILLING TOGGLE */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ background: '#F3F4F6', display: 'inline-flex', padding: '6px', borderRadius: '14px', border: '1px solid #E5E7EB' }}>
            <button onClick={() => setBilling('monthly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'monthly' ? 'white' : 'transparent', color: billing === 'monthly' ? '#4F46E5' : '#6B7280' }}>Monthly</button>
            <button onClick={() => setBilling('yearly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'yearly' ? 'white' : 'transparent', color: billing === 'yearly' ? '#4F46E5' : '#6B7280' }}>Yearly (-15%)</button>
          </div>
        </div>

        {/* PRICING & REFUEL ROW */}
        <div style={{ padding: '0 2rem 6rem', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ padding: '2.5rem 1.5rem', borderRadius: '35px', border: '2px solid #eee', width: '210px', textAlign: 'center', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: '#4F46E5', marginBottom: '10px' }}>{plan.i}</div>
                <div style={{ fontWeight: '900', fontSize: '1rem', letterSpacing: '1px', marginBottom: '8px' }}>{plan.n}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '10px' }}>{calculatePrice(plan.p)}</div>
                <div style={{ background: '#EEF2FF', color: '#4F46E5', padding: '4px 12px', borderRadius: '15px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>
                  <Zap size={14} fill="#4F46E5" /> {plan.c} Credits
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '15px' }}>{plan.d}</p>
            </div>
          ))}

          {/* REFUEL OPTION */}
          <div style={{ padding: '2.5rem 1.5rem', borderRadius: '35px', border: '3px dashed #4F46E5', width: '210px', textAlign: 'center', background: '#F8FAFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Database color="#4F46E5" size={32} style={{ marginBottom: '10px' }} />
              <div style={{ fontWeight: '900', fontSize: '1rem', letterSpacing: '1px', marginBottom: '8px' }}>REFUEL</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '10px' }}>$19.99</div>
              <div style={{ background: '#4F46E5', color: 'white', padding: '4px 12px', borderRadius: '15px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>
                <Zap size={14} fill="white" /> 200 Credits
              </div>
            </div>
            <button onClick={() => setView("forge")} style={{ marginTop: '15px', width: '100%', background: '#4F46E5', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>TOP UP</button>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#020617', color: 'white', padding: '4rem', textAlign: 'center', marginTop: 'auto' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '3px', marginBottom: '1rem' }}>BLUE LOTUS</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', color: '#64748B', marginBottom: '2rem', fontSize: '0.9rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
          </div>
          <p style={{ color: '#334155', fontSize: '0.8rem' }}>© 2026 SOVEREIGN APP BUILDER // VERSION 1.07</p>
        </footer>
      </div>
    );
  }

  // FORGE VIEW (WORKSPACE)
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
        {/* LEFT PANEL: CONSOLE */}
        <div style={{ width: '400px', borderRight: '1px solid #1E293B', padding: '2.5rem', overflowY: 'auto' }}>
          <h3 style={{ color: '#818CF8', borderBottom: '1px solid #1E293B', paddingBottom: '1rem' }}>CONSOLE</h3>
          <div style={{ marginTop: '1.5rem', color: '#94A3B8', fontSize: '1rem', lineHeight: '1.7' }}>
            {consoleLogs.map((log, i) => <p key={i} style={{ color: log.includes('COMPLETE') ? '#10B981' : '#94A3B8' }}>{log}</p>)}
          </div>
        </div>
        
        {/* RIGHT PANEL: LIVE PREVIEW SPROUT */}
        <div style={{ flex: 1, background: '#F1F5F9', padding: '1.5rem' }}>
          <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
             <div style={{ background: '#f8fafc', padding: '10px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                <span style={{ marginLeft: '10px', fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8' }}>LIVE PREVIEW</span>
             </div>
             <div style={{ flex: 1, position: 'relative' }}>
                {isBuilding ? (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Loader2 size={60} className="animate-spin" color="#4F46E5" />
                    <p style={{ marginTop: '1rem', color: '#4F46E5', fontWeight: '900' }}>CULTIVATING...</p>
                  </div>
                ) : (
                  <iframe
                    srcDoc={generatedCode || `<html><body style="font-family:sans-serif; display:flex; justify-content:center; align-items:center; height:90vh; color:#cbd5e1; text-align:center;"><div><h2>Ready to Build</h2><p>Enter a prompt to sprout your first component.</p></div></body></html>`}
                    title="preview"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
