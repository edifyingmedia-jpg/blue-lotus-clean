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

  const isYearly = billing === "yearly";

  const calculatePrice = (base) => {
    if (!isYearly) return `$${base}`;
    return `$${(base * 12 * 0.85).toFixed(0)}/yr`;
  };

  // Logic to scale credits based on billing cycle
  const getCredits = (baseCredits) => {
    if (typeof baseCredits === 'string' && baseCredits.includes('Free')) return baseCredits;
    const amount = parseInt(baseCredits);
    return isYearly ? `${amount * 12} Credits` : `${amount} Credits`;
  };

  const plans = [
    { name: 'SPROUT', icon: <Leaf size={14}/>, price: 'Free', credits: '10 Credits' },
    { name: 'SAPLING', icon: <Sprout size={14}/>, price: calculatePrice(9.99), credits: getCredits('100'), toggle: true, healing: true },
    { name: 'OAK', icon: <Trees size={14}/>, price: calculatePrice(19.99), credits: getCredits('200'), toggle: true, feat: true, healing: true },
    { name: 'SOVEREIGN', icon: <Crown size={14}/>, price: calculatePrice(29.99), credits: getCredits('300'), toggle: true, premium: true, healing: true },
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
          
          {/* THE RE-ENGINEERED BLUE LOTUS LOGO (High Compatibility) */}
          <div style={{ 
            width: '38px', height: '38px', 
            background: 'linear-gradient(135deg, #4F46E5, #9333EA)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}>
            <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M50 10C55 35 75 45 95 50C75 55 55 65 50 90C45 65 25 55 5 50C25 45 45 35 50 10Z" 
                fill="white" 
              />
              <path 
                d="M50 30C53 45 65 52 75 55C65 58 53 65 50 75C47 65 35 58 25 55C35 52 47 45 50 30Z" 
                fill="#4F46E5" opacity="0.4" 
              />
              <circle cx="50" cy="52" r="6" fill="white" />
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

      {/* 2. HERO */}
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

      {/* 3. PRICING */}
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
                <div style={{ fontSize: '0.7rem', fontWeight: '600', color: plan.premium ? '#A5B4FC' : '#6366F1' }}>{plan.credits}</div>
                
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
