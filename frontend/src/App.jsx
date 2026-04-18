import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Zap, Activity } from 'lucide-react';

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
    const discounted = (base * 12 * 0.85).toFixed(0);
    return `$${discounted}/yr`;
  };

  return (
    <div style={{ 
      height: '100vh', width: '100vw', 
      background: 'radial-gradient(circle at top right, #F0F4FF 0%, #FFFFFF 50%, #FDF2FF 100%)',
      margin: 0, padding: 0, fontFamily: '"Inter", sans-serif',
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      
      {/* 1. HEADER */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '0.75rem 4rem', background: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(15px)', borderBottom: '1px solid rgba(0,0,0,0.03)', zIndex: 10, flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', padding: '5px', borderRadius: '6px' }}>
            <svg width="20" height="20" viewBox="0 0 100 100" fill="white">
              <path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" />
            </svg>
          </div>
          <span style={{ fontSize: '1rem', fontWeight: '900', letterSpacing: '0.1em', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BLUE LOTUS
          </span>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Sign Up</button>
        </div>
      </nav>

      {/* 2. HERO - COMPACTED */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
        <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center', transform: 'translateY(-12%)' }}>
          <h2 style={{ marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: '300', color: '#6B7280' }}>What shall we </span>
            <span style={{ fontSize: '3rem', fontWeight: '900', color: '#111827', background: 'linear-gradient(180deg, #111827, #4B5563)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>build today?</span>
          </h2>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.8)', 
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', padding: '1.25rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.04)', backdropFilter: 'blur(10px)'
          }}>
            <textarea 
              ref={textareaRef}
              placeholder="Describe your vision..."
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.25rem', minHeight: '60px', resize: 'none', background: 'transparent', color: '#111827', fontFamily: 'inherit' }}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
              <button style={{ background: 'linear-gradient(135deg, #4F46E5, #3730A3)', color: 'white', border: 'none', padding: '0.6rem 2.2rem', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                BUILD <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. PRICING & HEALING FEATURES - SHRUNK FOR FIT */}
      <div style={{ padding: '0 4rem 2rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '10px', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { name: 'SPROUT', icon: <Leaf size={14}/>, price: 'Free', credits: '10 Credits' },
            { name: 'SAPLING', icon: <Sprout size={14}/>, price: calculatePrice(9.99), credits: '100 Credits', toggle: true, healing: true },
            { name: 'OAK', icon: <Trees size={14}/>, price: calculatePrice(19.99), credits: '200 Credits', toggle: true, feat: true, healing: true },
            { name: 'SOVEREIGN', icon: <Crown size={14}/>, price: calculatePrice(29.99), credits: '300 Credits', toggle: true, premium: true, healing: true },
            { name: 'REFUEL', icon: <Zap size={14}/>, price: '$19', credits: '200 Credits', isAddon: true, subtext: "Refuel anytime" }
          ].map((plan, i) => (
            <div key={i} 
              style={{ 
                flex: 1, padding: '1.25rem 1rem', borderRadius: '14px', textAlign: 'left',
                background: plan.premium ? '#111827' : 'white', color: plan.premium ? 'white' : '#111827',
                border: plan.feat ? '2px solid #4F46E5' : '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.01)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '135px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <span style={{ color: plan.premium ? '#A5B4FC' : '#4F46E5' }}>{plan.icon}</span>
                  <span style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '0.05em', color: '#9CA3AF' }}>{plan.name}</span>
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: '900' }}>{plan.price}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: plan.premium ? '#9CA3AF' : '#4B5563' }}>{plan.credits}</div>
                
                {plan.healing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', color: '#10B981', fontSize: '0.55rem', fontWeight: '800' }}>
                    <Activity size={9} /> HEALING CODE ACTIVE
                  </div>
                )}
                {plan.isAddon && (
                  <div style={{ marginTop: '6px', color: '#7C3AED', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase' }}>
                    {plan.subtext}
                  </div>
                )}
              </div>

              {plan.toggle && (
                <div onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')} style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <div style={{ width: '26px', height: '13px', background: billing === 'yearly' ? '#10B981' : '#E5E7EB', borderRadius: '10px', position: 'relative' }}>
                    <div style={{ position: 'absolute', width: '9px', height: '9px', background: 'white', borderRadius: '50%', top: '2px', left: billing === 'monthly' ? '2px' : '15px', transition: '0.2s' }} />
                  </div>
                  <span style={{ fontSize: '0.55rem', fontWeight: '800', color: billing === 'yearly' ? '#10B981' : '#9CA3AF' }}>{billing.toUpperCase()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.55rem', color: '#9CA3AF', letterSpacing: '0.5em', fontWeight: '900', opacity: 0.5 }}>
          BLUE LOTUS SOVEREIGN // V.1.07
        </div>
      </div>
    </div>
  );
};

export default App;
