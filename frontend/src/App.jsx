import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Sprout, Trees, Crown, Zap } from 'lucide-react';

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
    { name: 'SAPLING', icon: <Sprout size={14}/>, price: calculatePrice(9.99), credits: '100 Credits', toggle: true },
    { name: 'OAK', icon: <Trees size={14}/>, price: calculatePrice(19.99), credits: '200 Credits', toggle: true },
    { name: 'SOVEREIGN', icon: <Crown size={14}/>, price: calculatePrice(29.99), credits: '300 Credits', toggle: true, premium: true },
    { name: 'REFUEL', icon: <Zap size={14}/>, price: '$19', credits: '200 Credits', isAddon: true }
  ];

  return (
    <div style={{ 
      height: '100vh', width: '100vw', 
      background: 'radial-gradient(circle at top right, #F0F4FF 0%, #FFFFFF 50%, #FDF2FF 100%)',
      margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      
      {/* 1. HEADER */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '0.75rem 2rem', background: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(15px)', borderBottom: '1px solid rgba(0,0,0,0.03)', zIndex: 10, flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', padding: '5px', borderRadius: '6px' }}>
            <svg width="24" height="24" viewBox="0 0 120 120">
              <path d="M60 15C65 30 75 45 90 55C75 60 65 75 60 95C55 75 45 60 30 55C45 45 55 30 60 15Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: '900', letterSpacing: '0.1em', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BLUE LOTUS
          </span>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {/* Toggle for Monthly/Yearly */}
          <div style={{ display: 'flex', background: '#F3F4F6', padding: '2px', borderRadius: '20px', marginRight: '10px' }}>
             <button onClick={() => setBilling("monthly")} style={{ padding: '4px 12px', fontSize: '0.7rem', border: 'none', borderRadius: '15px', cursor: 'pointer', background: billing === 'monthly' ? 'white' : 'transparent', fontWeight: '600' }}>Monthly</button>
             <button onClick={() => setBilling("yearly")} style={{ padding: '4px 12px', fontSize: '0.7rem', border: 'none', borderRadius: '15px', cursor: 'pointer', background: billing === 'yearly' ? 'white' : 'transparent', fontWeight: '600' }}>Yearly (-15%)</button>
          </div>
          <button style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Sign Up</button>
        </div>
      </nav>

      {/* 2. HERO */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
        <div style={{ width: '100%', maxWidth: '700px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '300', color: '#6B7280' }}>What shall we </span>
            <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827' }}>build today?</span>
          </h2>
          
          <div style={{ 
            background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '20px', padding: '1.25rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
          }}>
            <textarea 
              ref={textareaRef}
              placeholder="Describe your vision..."
              style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.1rem', minHeight: '50px', resize: 'none', background: 'transparent', color: '#111827' }}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button style={{ background: '#4F46E5', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                BUILD <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. PRICING */}
      <div style={{ padding: '0 2rem 2rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '1200px', margin: '0 auto' }}>
          {plans.map((plan, i) => (
            <div key={i} 
              style={{ 
                flex: 1, padding: '1.25rem', borderRadius: '16px', textAlign: 'left',
                background: plan.premium ? '#111827' : 'white', 
                color: plan.premium ? 'white' : '#111827',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', fontWeight: '800', marginBottom: '8px', opacity: 0.8 }}>
                {plan.icon} {plan.name}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '2px' }}>{plan.price}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{plan.credits}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
