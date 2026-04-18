import React, { useState } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Loader2, RefreshCw, Eye, UserCircle } from 'lucide-react';

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
    // Yearly discount logic (15% off)
    return `$${(base * 12 * 0.85).toFixed(0)}/yr`;
  };

  const handleBeginCultivation = async () => {
    if (!prompt) return;
    
    // 1. Instant View Switch (Fixes "Button not working" feeling)
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
      addLog("ERROR: Connection to OpenAI failed.");
      setGeneratedCode("// Error: Check your OPENAI_API_KEY in Vercel Settings.");
    } finally {
      setIsBuilding(false);
    }
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
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button style={{ background: 'transparent', border: 'none', fontWeight: 'bold', color: '#6B7280', fontSize: '1.1rem', cursor: 'pointer' }}>Sign In</button>
            <button style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Join</button>
          </div>
        </nav>

        {/* HERO AREA */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <div style={{ width: '100%', maxWidth: '850px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#111827', margin: '0 0 2rem 0', lineHeight: '1' }}>
              Plant a <span style={{ color: '#4F46E5' }}>new idea.</span>
            </h2>
            <div style={{ background: '#f8faff', border: '3px solid #4F46E5', borderRadius: '40px', padding: '2.5rem', boxShadow: '0 30px 60px rgba(79, 70, 229, 0.2)' }}>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want to build..."
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.8rem', minHeight: '140px', background: 'transparent', resize: 'none', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button 
                  onClick={handleBeginCultivation} 
                  style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '1.2rem 4rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  BEGIN CULTIVATION <ArrowRight size={32} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* BILLING TOGGLE (RE-ADDED) */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ background: '#F3F4F6', display: 'inline-flex', padding: '6px', borderRadius: '14px', border: '1px solid #E5E7EB' }}>
            <button 
              onClick={() => setBilling('monthly')} 
              style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'monthly' ? 'white' : 'transparent', boxShadow: billing === 'monthly' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBilling('yearly')} 
              style={{ padding: '0.8rem 2rem', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', background: billing === 'yearly' ? 'white' : 'transparent', boxShadow: billing === 'yearly' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }}
            >
              Yearly (15% Off)
            </button>
          </div>
        </div>

        {/* PRICING TIERS */}
        <div style={{ padding: '0 2rem 6rem', display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { n: 'SPROUT', i: <Leaf size={32}/>, p: 0 }, 
            { n: 'SAPLING', i: <Sprout size={32}/>, p: 10 }, 
            { n: 'OAK', i: <Trees size={32}/>, p: 20 }, 
            { n: 'SOVEREIGN', i: <Crown size={32}/>, p: 30 }
          ].map((plan, idx) => (
            <div key={idx} style={{ padding: '2.5rem', borderRadius: '30px', border: '2px solid #eee', width: '220px', textAlign: 'center', background: plan.n === 'SOVEREIGN' ? '#111827' : 'white', color: plan.n === 'SOVEREIGN' ? 'white' : '#111827' }}>
              <div style={{ color: '#4F46E5', marginBottom: '15px' }}>{plan.i}</div>
              <div style={{ fontWeight: '900', fontSize: '1.1rem', letterSpacing: '2px', marginBottom: '10px' }}>{plan.n}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{calculatePrice(plan.p)}</div>
            </div>
          ))}
        </div>

        <footer style={{ background: '#020617', color: 'white', padding: '4rem', textAlign: 'center' }}>
          <div
