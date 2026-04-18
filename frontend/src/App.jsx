import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Zap, Activity, Loader2, Code, Eye, RefreshCw, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [view, setView] = useState("garden"); // "garden" or "forge"
  const [billing, setBilling] = useState("monthly");
  const [prompt, setPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const textareaRef = useRef(null);

  // Pricing Logic
  const calculatePrice = (base) => {
    if (billing === "monthly") return `$${base}`;
    const discounted = (base * 12 * 0.85).toFixed(0);
    return `$${discounted}/yr`;
  };

  // Switch to the Forge
  const handleBeginCultivation = () => {
    if (!prompt) return;
    setIsBuilding(true);
    // Simulate the transition to the creation phase
    setTimeout(() => {
      setView("forge");
      setIsBuilding(false);
    }, 1500);
  };

  // --- VIEW 1: THE GARDEN (Landing/Entry) ---
  if (view === "garden") {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'radial-gradient(circle at top right, #F0F4FF 0%, #FFFFFF 50%, #FDF2FF 100%)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 4rem', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(15px)', borderBottom: '1px solid rgba(0,0,0,0.03)', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', padding: '5px', borderRadius: '6px' }}>
              <svg width="20" height="20" viewBox="0 0 100 100" fill="white"><path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" /></svg>
            </div>
            <span style={{ fontSize: '1rem', fontWeight: '900', letterSpacing: '0.1em', color: '#4F46E5' }}>BLUE LOTUS</span>
          </div>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', fontWeight: '700' }}>Get Started</button>
        </nav>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center', transform: 'translateY(-10%)' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.8rem', fontWeight: '300', color: '#6B7280' }}>Plant a </span>
              <span style={{ fontSize: '3rem', fontWeight: '900', color: '#111827' }}>new idea.</span>
            </h2>
            <div style={{ background: 'white', border: '1px solid rgba(79, 70, 229, 0.2)', borderRadius: '20px', padding: '1.25rem', boxShadow: '0 15px 35px rgba(0,0,0,0.04)' }}>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want the Blue Lotus to build..."
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.25rem', minHeight: '80px', resize: 'none' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleBeginCultivation} disabled={isBuilding} style={{ background: 'linear-gradient(135deg, #4F46E5, #3730A3)', color: 'white', border: 'none', padding: '0.8rem 2.2rem', borderRadius: '8px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isBuilding ? <Loader2 className="animate-spin" size={16} /> : 'BEGIN CULTIVATION'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Pricing Tiers */}
        <div style={{ padding: '0 4rem 2rem' }}>
          <div style={{ display: 'flex', gap: '10px', maxWidth: '1400px', margin: '0 auto' }}>
            {[{ name: 'SPROUT', icon: <Leaf size={14}/>, price: 'Free' }, { name: 'SAPLING', icon: <Sprout size={14}/>, price: calculatePrice(9.99), healing: true }, { name: 'OAK', icon: <Trees size={14}/>, price: calculatePrice(19.99), feat: true, healing: true }, { name: 'SOVEREIGN', icon: <Crown size={14}/>, price: calculatePrice(29.99), premium: true, healing: true }].map((plan, i) => (
              <div key={i} style={{ flex: 1, padding: '1.25rem 1rem', borderRadius: '14px', background: plan.premium ? '#111827' : 'white', color: plan.premium ? 'white' : '#111827', border: plan.feat ? '2px solid #4F46E5' : '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>{plan.icon} <span style={{ fontSize: '0.6rem', fontWeight: '900' }}>{plan.name}</span></div>
                <div style={{ fontSize: '1.35rem', fontWeight: '900' }}>{plan.price}</div>
                {plan.healing && <div style={{ color: '#10B981', fontSize: '0.55rem', fontWeight: '800', marginTop: '5px' }}><Activity size={9} /> SOVEREIGN NODE ACTIVE</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: THE FORGE (Two-Panel Workspace) ---
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#0F172A', color: 'white', display: 'flex', flexDirection: 'column' }}>
      {/* Forge Header */}
      <nav style={{ height: '60px', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <RefreshCw size={18} className="animate-spin" style={{ color: '#818CF8' }} />
          <span style={{ fontWeight: '800', letterSpacing: '0.1em', fontSize: '0.9rem' }}>FORGE MODE: CULTIVATING {prompt.substring(0, 15)}...</span>
        </div>
        <button onClick={() => setView("garden")} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid #334155', padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.75rem' }}>Back to Garden</button>
      </nav>

      {/* Main Panels */}
      <div style={{ flex: 1, display: 'flex' }}>
        
        {/* LEFT PANEL: The AI Console (The "Nervous System") */}
        <div style={{ width: '400px', borderRight: '1px solid #1E293B', display: 'flex', flexDirection: 'column', background: '#020617' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #1E293B', background: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={16} /> <span style={{ fontSize: '0.7rem', fontWeight: '800' }}>SOVEREIGN CONSOLE</span>
          </div>
          <div style={{ flex: 1, padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#94A3B8', overflowY: 'auto' }}>
            <p style={{ color: '#818CF8' }}>{`> Initializing Blue Lotus V.1.07...`}</p>
            <p>{`> Analyzing architectural request...`}</p>
            <p style={{ color: '#10B981' }}>{`> Sprouting UI components...`}</p>
            <p>{`> Throttling logic generation...`}</p>
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#1E293B', borderRadius: '8px', borderLeft: '4px solid #4F46E5' }}>
              <p style={{ color: 'white', fontWeight: 'bold', marginBottom: '5px' }}>Sovereign Suggestion:</p>
              <p style={{ fontSize: '0.75rem' }}>"I am applying a dark-mode optimized layout for this client. Shall I add a secure database connection next?"</p>
              <button
