import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Zap, Activity, CheckCircle2 } from 'lucide-react';

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

  const plans = [
    { name: 'SPROUT', icon: <Leaf size={14}/>, price: 'Free', credits: '10 Credits' },
    { name: 'SAPLING', icon: <Sprout size={14}/>, price: calculatePrice(9.99), credits: '100 Credits', toggle: true, healing: true },
    { name: 'OAK', icon: <Trees size={14}/>, price: calculatePrice(19.99), credits: '200 Credits', toggle: true, feat: true, healing: true },
    { name: 'SOVEREIGN', icon: <Crown size={14}/>, price: calculatePrice(29.99), credits: '300 Credits', toggle: true, premium: true, healing: true },
    { name: 'REFUEL', icon: <Zap size={14}/>, price: '$19', credits: '200 Credits', isAddon: true, subtext: "Refuel anytime" }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', width: '100vw', 
      background: 'radial-gradient(circle at top right, #F8FAFF 0%, #FFFFFF 50%, #F9F7FF 100%)',
      margin: 0, padding: 0, fontFamily: '"Inter", system-ui, sans-serif',
      display: 'flex', flexDirection: 'column', overflowX: 'hidden', color: '#111827'
    }}>
      
      {/* 1. HEADER */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem 4rem', background: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.05)', zIndex: 10, flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', padding: '6px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' }}>
            <svg width="22" height="22" viewBox="0 0 100 100" fill="white">
              <path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" />
            </svg>
          </div>
          <span style={{ fontSize: '0.95rem', fontWeight: '800', letterSpacing: '0.15em', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BLUE LOTUS
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', transition: '0.2s' }}>Sign Up</button>
        </div>
      </nav>

      {/* 2. HERO */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '750px', textAlign: 'center', transform: 'translateY(-10%)' }}>
          <h2 style={{ marginBottom: '2.5rem', letterSpacing: '-0.03em', lineHeight: '1.2' }}>
            <span style={{ fontSize: '3rem', fontWeight: '300', color: '#94A3B8' }}>What shall we </span>
            <br />
            <span style={{ fontSize: '4rem', fontWeight: '900', color: '#0F172A', background: 'linear-gradient(180deg, #0F172A, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>build today?</span>
          </h2>
          
          <div style={{ 
            background: 'white', 
            border: '1px solid #E2E8F0', borderRadius: '24px', padding: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)', position: 'relative'
          }}>
            <textarea 
              ref={textareaRef}
              placeholder="Describe your vision..."
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.25rem', minHeight: '70px', resize: 'none', background: 'transparent', color: '#1E293B', fontFamily: 'inherit', lineHeight: '1.5' }}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button style={{ 
                background: 'linear-gradient(135deg, #4F46E5, #3730A3)', color: 'white', border: 'none', 
                padding: '0.8rem 2.4rem', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', 
                display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem',
                boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)'
              }}>
                BUILD <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. PRICING GRID */}
      <div style={{ padding: '0 4rem 3rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '16px', maxWidth: '1200px', margin: '0 auto' }}>
          {plans.map((plan, i) => (
            <div key={i} 
              style={{ 
                flex: 1, padding: '1.5rem', borderRadius: '20px', textAlign: 'left',
                background: plan.premium ? '#0F172A' : 'white', 
                color: plan.premium ? 'white' : '#1E293B',
                border: plan.feat ? '2px solid #4F46E5' : '1px solid #F1F5F9',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.04)', 
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                transition: 'transform 0.2s ease', cursor: 'default'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: plan.premium ? '#A5B4FC' : '#4F46E5' }}>{plan.icon}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em', color: plan.premium ? '#94A3B8' : '#64748B' }}>{plan.name}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>{plan.price}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: plan.premium ? '#64748B' : '#94A3B8' }}>{plan.credits}</div>
                
                {plan.healing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', color: '#10B981', fontSize: '0.65rem', fontWeight: '700' }}>
                    <CheckCircle2 size={12} /> HEALING ACTIVE
                  </div>
                )}
              </div>

              {plan.toggle && (
                <div 
                  onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')} 
                  style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  <div style={{ width: '32px', height: '18px', background: billing === 'yearly' ? '#10B981' : '#E2E8F0', borderRadius: '20px', position: 'relative', transition: '0.3s' }}>
                    <div style={{ position: 'absolute', width: '12px', height: '12px', background: 'white', borderRadius: '50%', top: '3px', left: billing === 'monthly' ? '3px' : '17px', transition: '0.2s' }} />
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', color: billing === 'yearly' ? '#10B981' : '#64748B' }}>{billing.toUpperCase()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.6rem', color: '#94A3B8', letterSpacing: '0.6em', fontWeight: '900', opacity: 0.6 }}>
          BLUE LOTUS SOVEREIGN // V.1.07
        </div>
      </div>
    </div>
  );
};

export default App;
