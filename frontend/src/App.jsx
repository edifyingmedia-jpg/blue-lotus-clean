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
    const discounted = (base * 12 * 0.85).toFixed(0); // 15% off for premium feel
    return `$${discounted}/yr`;
  };

  return (
    <div style={{ 
      height: '100vh', width: '100vw', 
      background: 'radial-gradient(circle at top right, #F0F4FF 0%, #FFFFFF 50%, #FDF2FF 100%)', // Mesh-style background
      margin: 0, padding: 0, fontFamily: '"Inter", sans-serif',
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      
      {/* 1. PREMIUM HEADER */}
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1.25rem 4rem', background: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(15px)', borderBottom: '1px solid rgba(0,0,0,0.03)', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', padding: '6px', borderRadius: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 100 100" fill="white">
              <path d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" />
            </svg>
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: '900', letterSpacing: '0.1em', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BLUE LOTUS
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>Sign In</button>
          <button style={{ background: '#111827', color: 'white', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', transition: '0.2s' }}>Sign Up</button>
        </div>
      </nav>

      {/* 2. ELEVATED HERO SECTION */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
          <span style={{ fontSize: '3.8rem', fontWeight: '300', color: '#6B7280' }}>What shall we </span>
          <br />
          <span style={{ fontSize: '4.2rem', fontWeight: '900', color: '#111827', background: 'linear-gradient(180deg, #111827, #4B5563)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>build today?</span>
        </h2>
        
        {/* GLASSMORPHISM INPUT BOX */}
        <div style={{ 
          width: '100%', maxWidth: '820px', 
          background: 'rgba(255, 255, 255, 0.8)', 
          border: '1px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '24px', padding: '1.5rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
          backdropFilter: 'blur(10px)'
        }}>
          <textarea 
            ref={textareaRef}
            placeholder="Describe your vision..."
            style={{ 
              width: '100%', border: 'none', outline: 'none', fontSize: '1.5rem', 
              minHeight: '80px', resize: 'none', background: 'transparent',
              color: '#111827', fontWeight: '400', fontFamily: 'inherit'
            }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button style={{ 
              background: 'linear-gradient(135deg, #4F46E5, #3730A3)', color: 'white', 
              border: 'none', padding: '0.8rem 2.8rem', borderRadius: '12px', 
              fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', 
              display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2)'
            }}>
              BUILD <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* 3. "GROWTH" PRICING ECOSYSTEM */}
      <div style={{ padding: '0 4rem 4rem' }}>
        <div style={{ display: 'flex', gap: '15px', maxWidth: '1400px', margin: '0 auto' }}>
          {[
            { name: 'SPROUT', icon: <Leaf size={16}/>, price: 'Free', credits: '10 Credits' },
            { name: 'SAPLING', icon: <Sprout size={16}/>, price: calculatePrice(9.99), credits: '100 Credits', toggle: true },
            { name: 'OAK', icon: <Trees size={16}/>, price: calculatePrice(19.99), credits: '200 Credits', toggle: true, feat: true },
            { name: 'SOVEREIGN', icon: <Crown size={16}/>, price: calculatePrice(29.99), credits: '300 Credits', toggle: true, premium: true },
            { name: 'REFUEL', icon: <Zap size={16}/>, price: '$19.99', credits: '200 Credits', isAddon: true }
          ].map((plan, i) => (
            <div key={i} 
              style={{ 
                flex: 1, padding: '1.8rem 1.5rem', borderRadius: '16px', textAlign: 'left',
                background: plan.premium ? 'linear-gradient(145deg, #111827, #1F2937)' : 'white',
                color: plan.premium ? 'white' : '#111827',
                border: plan.feat ? '2px solid #4F46E5' : '1px solid rgba(0,0,0,0.05)',
                boxShadow: plan.feat ? '0 10px 30px rgba(79, 70, 229, 0.1)' : '0 4px 6px rgba(0,0,0,0.02)',
                transition: 'transform 0.3s ease', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: plan.premium ? '#A5B4FC' : '#4F46E5' }}>{plan.icon}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '0.1em', color: plan.premium ? '#9CA3AF' : '#9CA3AF' }}>{plan.name}</span>
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: '900' }}>{plan.price}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.7 }}>{plan.credits}</div>
              </div>

              {plan.toggle && (
                <div onClick={(e) => { e.stopPropagation(); setBilling(billing === 'monthly' ? 'yearly' : 'monthly'); }} style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '32px', height: '16px', background: billing === 'yearly' ? '#10B981' : '#E5E7EB', borderRadius: '10px', position: 'relative' }}>
                    <div style={{ position: 'absolute', width: '12px', height: '12px', background: 'white', borderRadius: '50%', top: '2px', left: billing === 'monthly' ? '2px' : '18px', transition: '0.2s' }} />
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '800', color: billing === 'yearly' ? '#10B981' : '#9CA3AF' }}>{billing.toUpperCase()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.65rem', color: '#9CA3AF', letterSpacing: '0.6em', fontWeight: '900', opacity: 0.5 }}>
          BLUE LOTUS SOVEREIGN // V.1.05
        </div>
      </div>
    </div>
  );
};

export default App;
