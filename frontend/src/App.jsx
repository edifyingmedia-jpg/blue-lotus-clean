import React, { useState } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, RefreshCw, Eye, Zap } from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); 
  const [billing, setBilling] = useState("monthly");
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);

  const plans = [
    { n: 'SPROUT', i: <Leaf size={32}/>, p: 0, c: "5 Credits" },
    { n: 'SAPLING', i: <Sprout size={32}/>, p: 10, c: "50 Credits" },
    { n: 'OAK', i: <Trees size={32}/>, p: 20, c: "150 Credits" },
    { n: 'SOVEREIGN', i: <Crown size={32}/>, p: 30, c: "Unlimited Credits" }
  ];

  const calculatePrice = (base) => {
    if (base === 0) return "Free";
    return billing === "monthly" ? `$${base}` : `$${(base * 12 * 0.85).toFixed(0)}/yr`;
  };

  const handleBeginCultivation = () => {
    if (!prompt) return;
    setView("forge");
    setIsBuilding(true);
    setConsoleLogs(["> Initializing Blue Lotus V.1.07...", "> Analyzing architectural request..."]);
    
    // Simulating build for UI check
    setTimeout(() => {
      setConsoleLogs(prev => [...prev, "> Sprouting UI components...", "> HEALING COMPLETE."]);
      setGeneratedCode("// Your Sovereign App code will render here...");
      setIsBuilding(false);
    }, 1500);
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', color: '#111827' }}>
        
        {/* HEADER */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 4rem', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#4F46E5', padding: '6px', borderRadius: '8px' }}>
               <svg width="20" height="20" viewBox="0 0 100 100" fill="white"><path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" /></svg>
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>BLUE LOTUS</span>
          </div>
          
          {/* THE TOGGLE - MOVED TO HEADER FOR VISIBILITY */}
          <div style={{ background: '#F3F4F6', display: 'flex', padding: '4px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <button onClick={() => setBilling('monthly')} style={{ padding: '0.5rem 1.2rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'monthly' ? 'white' : 'transparent', fontSize: '0.9rem' }}>Monthly</button>
            <button onClick={() => setBilling('yearly')} style={{ padding: '0.5rem 1.2rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'yearly' ? 'white' : 'transparent', fontSize: '0.9rem' }}>Yearly (-15%)</button>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={{ background: 'transparent', border: 'none', fontWeight: 'bold', color: '#6B7280', cursor: 'pointer' }}>Sign In</button>
            <button style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Join</button>
          </div>
        </nav>

        {/* HERO AREA */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>
            Plant a <span style={{ color: '#4F46E5' }}>new idea.</span>
          </h2>
          <div style={{ width: '100%', maxWidth: '750px', background: '#f8faff', border: '2px solid #4F46E5', borderRadius: '30px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(79, 70, 229, 0.1)' }}>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your app..."
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.6rem', minHeight: '120px', background: 'transparent', resize: 'none' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={handleBeginCultivation} style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '18px', fontWeight: '900', fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                BEGIN CULTIVATION <ArrowRight size={28} />
              </button>
            </div>
          </div>
        </main>

        {/* PRICING WITH CREDITS */}
        <div style={{ padding: '2rem 4rem 6rem', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ padding: '2.5rem', borderRadius: '28px', border: '1px solid #eee', width: '220px', textAlign: 'center', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827' }}>
              <div style={{ color: '#4F46E5', marginBottom: '12px' }}>{plan.i}</div>
              <div style={{ fontWeight: '900', fontSize: '1rem', letterSpacing: '1.5px', marginBottom: '8px' }}>{plan.n}</div>
              <div style={{ fontSize: '2rem', fontWeight: '900' }}>{calculatePrice(plan.p)}</div>
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#4F46E5', fontWeight: 'bold' }}>
                <Zap size={16} fill="#4F46E5" /> {plan.c}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <nav style={{ height: '70px', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <RefreshCw size={24} className={isBuilding ? "animate-spin" : ""} color="#818CF8" />
          <span style={{ fontWeight: 'bold' }}>FORGE MODE</span>
        </div>
        <button onClick={() => setView("garden")} style={{ background: '#1E293B', color: 'white', border: '1px solid #334155', padding: '0.6rem 1.2rem', borderRadius: '10px', cursor: 'pointer' }}>EXIT</button>
      </nav>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: '400px', borderRight: '1px solid #1E293B', padding: '2.5rem', overflowY: 'auto' }}>
          <h3 style={{ color: '#818CF8', borderBottom: '1px solid #1E293B', paddingBottom: '1rem' }}>SOVEREIGN CONSOLE</h3>
          <div style={{ marginTop: '1.5rem', color: '#94A3B8', fontSize: '1rem', lineHeight: '1.7' }}>
            {consoleLogs.map((log, i) => <p key={i}>{log}</p>)}
          </div>
        </div>
        <div style={{ flex: 1, background: '#F1F5F9', padding: '2rem' }}>
          <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: '30px', overflow: 'hidden', color: '#1e293b', padding: '2rem' }}>
            {isBuilding ? <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.2 }}><Eye size={100} /></div> : <pre>{generatedCode}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
