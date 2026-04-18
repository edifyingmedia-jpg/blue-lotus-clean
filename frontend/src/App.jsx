import React, { useState } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, RefreshCw, Eye, Zap, Database, ShieldCheck } from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); 
  const [billing, setBilling] = useState("monthly");
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);

  const plans = [
    { n: 'SPROUT', i: <Leaf size={32}/>, p: 0, c: 10, d: "Perfect for testing ideas." },
    { n: 'SAPLING', i: <Sprout size={32}/>, p: 9.99, c: 100, d: "For growing projects." },
    { n: 'OAK', i: <Trees size={32}/>, p: 19.99, c: 200, d: "Advanced architectural power." },
    { n: 'SOVEREIGN', i: <Crown size={32}/>, p: 29.99, c: 300, d: "The ultimate builder experience." }
  ];

  const calculatePrice = (base) => {
    if (base === 0) return "Free";
    return billing === "monthly" ? `$${base}` : `$${(base * 12 * 0.85).toFixed(0)}/yr`;
  };

  const handleBeginCultivation = () => {
    if (!prompt) return;
    setView("forge");
    setIsBuilding(true);
    setConsoleLogs(["> Initializing Blue Lotus V.1.07...", "> Establishing OpenAI Secure Tunnel..."]);
    setTimeout(() => {
      setConsoleLogs(prev => [...prev, "> Analyzing architectural request...", "> Sprouting UI components..."]);
      setGeneratedCode("// Code generation in progress...");
      setIsBuilding(false);
    }, 1500);
  };

  if (view === "garden") {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
        
        {/* HEADER */}
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

        {/* HERO */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#111827', margin: '0 0 2rem 0', textAlign: 'center' }}>
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
            <button onClick={() => setBilling('monthly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'monthly' ? 'white' : 'transparent', boxShadow: billing === 'monthly' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}>Monthly</button>
            <button onClick={() => setBilling('yearly')} style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'yearly' ? 'white' : 'transparent', boxShadow: billing === 'yearly' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}>Yearly (-15%)</button>
          </div>
        </div>

        {/* PRICING TIERS */}
        <div style={{ padding: '0 4rem 4rem', display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ padding: '2.5rem', borderRadius: '35px', border: '2px solid #eee', width: '240px', textAlign: 'center', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827', position: 'relative' }}>
              <div style={{ color: '#4F46E5', marginBottom: '15px' }}>{plan.i}</div>
              <div style={{ fontWeight: '900', fontSize: '1.1rem', letterSpacing: '2px', marginBottom: '10px' }}>{plan.n}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>{calculatePrice(plan.p)}</div>
              <div style={{ background: '#EEF2FF', color: '#4F46E5', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                <Zap size={14} fill="#4F46E5" /> {plan.c} Credits
              </div>
              <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{plan.d}</p>
            </div>
          ))}
        </div>

        {/* REFUEL SECTION */}
        <div style={{ padding: '4rem', background: '#F9FAFB', textAlign: 'center', borderTop: '1px solid #eee' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Need a Refuel?</h3>
          <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Top up your architectural power instantly.</p>
          <div style={{ display: 'inline-flex', gap: '20px' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '25px', border: '2px solid #4F46E5', width: '250px' }}>
              <Database color="#4F46E5" size={40} style={{ marginBottom: '1rem' }} />
              <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>200 Credits</div>
              <div style={{ fontSize: '2rem', fontWeight: '900', margin: '10px 0' }}>$19.99</div>
              <button style={{ width: '100%', background: '#4F46E5', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '12px', fontWeight: 'bold' }}>REFUEL</button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#020617', color: 'white', padding: '4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '3px', marginBottom: '1rem' }}>BLUE LOTUS</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', color: '#64748B', marginBottom: '2rem' }}>
            <span>Privacy Policy</span><span>Terms of Service</span><span>Contact</span>
          </div>
          <p style={{ color: '#334155' }}>© 2026 SOVEREIGN APP BUILDER // VERSION 1.07</p>
        </footer>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
       {/* FORGE VIEW CODE REMAINS THE SAME TO ENSURE STABILITY */}
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
            {consoleLogs.map((log, i) => <p key={i}>{log}</p>)}
          </div>
        </div>
        <div style={{ flex: 1, background: '#F1F5F9', padding: '2rem' }}>
          <div style={{ width: '100%', height: '100%', background: 'white', borderRadius: '35px', color: '#1e293b', padding: '2rem' }}>
            {isBuilding ? <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.3 }}><Eye size={100} /></div> : <pre>{generatedCode}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
