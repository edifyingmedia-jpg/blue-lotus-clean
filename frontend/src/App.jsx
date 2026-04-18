import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Zap, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [billing, setBilling] = useState("monthly");
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const calculatePrice = (base) => {
    if (billing === "monthly") return `$${base}`;
    return `$${(base * 12 * 0.85).toFixed(0)}/yr`;
  };

  const plans = [
    { name: 'SPROUT', icon: <Leaf size={14}/>, price: 'Free', credits: '10 Credits' },
    { name: 'SAPLING', icon: <Sprout size={14}/>, price: calculatePrice(9.99), credits: '100 Credits', toggle: true, healing: true },
    { name: 'OAK', icon: <Trees size={14}/>, price: calculatePrice(19.99), credits: '200 Credits', toggle: true, feat: true, healing: true },
    { name: 'SOVEREIGN', icon: <Crown size={14}/>, price: calculatePrice(29.99), credits: '300 Credits', toggle: true, premium: true, healing: true },
    { name: 'REFUEL', icon: <Zap size={14}/>, price: '$19', credits: '200 Credits', isAddon: true }
  ];

  return (
    <div style={{ 
      height: '100vh', width: '100vw', 
      background: 'radial-gradient(circle at top right, #F8FAFF 0%, #FFFFFF 50%, #F5F3FF 100%)',
      margin: 0, padding: 0, fontFamily: '"Inter", system-ui, sans-serif',
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      
      {/* 1. HEADER */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '0.5rem 3rem', background: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.05)', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* THE REBUILT BLUE LOTUS LOGO */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px' }}>
            <svg viewBox="0 0 100 100" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lotusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Outer Glow Circle */}
              <circle cx="50" cy="50" r="35" fill="url(#lotusGradient)" opacity="0.1" />
              {/* The Lotus Flower */}
              <g filter="url(#glow)">
                <path 
                  d="M50 15C55 35 75 45 90 50C75 55 55 65 50 85C45 65 25 55 10 50C25 45 45 35 50 15Z" 
                  fill="url(#lotusGradient)" 
                />
                <path 
                  d="M50 35C52 45 60 50 70 52C60 54 52 60 50 70C48 60 40 54 30 52C40 50 48 45 50 35Z" 
                  fill="white" opacity="0.5" 
                />
                <circle cx="50" cy="52" r="4" fill="white" />
              </g>
            </svg>
          </div>

          <span style={{ fontSize: '0.9rem', fontWeight: '900', letterSpacing: '0.2em', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BLUE LOTUS
          </span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
          <button style={{ background: '#0F172A', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}>Sign Up</button>
        </div>
      </nav>

      {/* 2. HERO - TIGHTENED */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 2rem' }}>
        <div style={{ width: '100%', maxWidth: '680px', textAlign: 'center', transform: 'translateY(-5%)' }}>
          <h2 style={{ marginBottom: '1.25rem', letterSpacing: '-0.04em', lineHeight: '1.05' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: '300', color: '#94A3B8' }}>What shall we </span>
            <br />
            <span style={{ fontSize: '3.2rem', fontWeight: '900', color: '#0F172A', background: 'linear-gradient(180deg, #0F172A, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>build today?</span>
          </h2>
          
          <div style={{ 
            background: 'white', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '1rem',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
          }}>
            <textarea 
              ref={textareaRef}
              placeholder="Describe your vision..."
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.1rem', minHeight: '50px', resize: 'none', background: 'transparent', color: '#1E293B', fontFamily: 'inherit' }}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                BUILD <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. PRICING - SUPER COMPACT */}
      <div style={{ padding: '0 3rem 1rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '10px', maxWidth: '1100px', margin: '0 auto' }}>
          {plans.map((plan, i) => (
            <div key={i} 
              style={{ 
                flex: 1, padding: '0.85rem', borderRadius: '14px', 
                background: plan.premium ? '#0F172A' : 'white', 
                color: plan.premium ? 'white' : '#1E293B',
                border: plan.feat ? '2px solid #4F46E5' : '1px solid #F1F5F9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <span style={{ color: plan.premium ? '#A5B4FC' : '#4F46E5' }}>{plan.icon}</span>
                  <span style={{ fontSize: '0.55rem', fontWeight: '800', letterSpacing: '0.05em', color: plan.premium ? '#94A3B8' : '#64748B' }}>{plan.name}</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{plan.price}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{plan.credits}</div>
                
                {plan.healing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', color: '#10B981', fontSize: '0.55rem', fontWeight: '700' }}>
                    <CheckCircle2 size={9} /> HEALING ACTIVE
                  </div>
                )}
              </div>

              {plan.toggle && (
                <div 
                  onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')} 
                  style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <div style={{ width: '24px', height: '12px', background: billing === 'yearly' ? '#10B981' : '#E2E8F0', borderRadius: '10px', position: 'relative' }}>
                    <div style={{ position: 'absolute', width: '8px', height: '8px', background: 'white', borderRadius: '50%', top: '2px', left: billing === 'monthly' ? '2px' : '14px', transition: '0.2s' }} />
                  </div>
                  <span style={{ fontSize: '0.5rem', fontWeight: '800', color: '#94A3B8' }}>{billing.toUpperCase()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.45rem', color: '#94A3B8', letterSpacing: '0.4em', fontWeight: '900', opacity: 0.5 }}>
          BLUE LOTUS SOVEREIGN // V.1.07
        </div>
      </div>
    </div>
  );
};

export default App;
