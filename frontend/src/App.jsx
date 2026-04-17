import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Sparkles, Zap, ShieldCheck, Coins } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState("landing");
  const [billing, setBilling] = useState("monthly");
  const [prompt, setPrompt] = useState("");

  const calculatePrice = (base) => {
    if (billing === "monthly") return `$${base}`;
    const discounted = (base * 12 * 0.9).toFixed(0);
    return `$${discounted}/yr`;
  };

  const LotusLogo = () => (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M50 20C55 35 65 45 80 50C65 55 55 65 50 80C45 65 35 55 20 50C35 45 45 35 50 20Z" 
        stroke="#2563EB" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M50 40C52 45 55 48 60 50C55 52 52 55 50 60C48 55 45 52 40 50C45 48 48 45 50 40Z" 
        fill="#2563EB"
      />
    </svg>
  );

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: 'white', fontFamily: 'Inter, sans-serif', color: '#111827', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', position: 'fixed', top: 0, width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LotusLogo />
          <h1 style={{ fontSize: '1.1rem', fontWeight: '900', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1E3A8A', margin: 0 }}>Blue Lotus</h1>
        </div>
        <button style={{ background: 'none', border: '1px solid #E5E7EB', padding: '0.5rem 1.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.05em' }}>SIGN IN</button>
      </nav>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
        
        {/* CENTERED CREATION SPACE */}
        <div style={{ width: '100%', maxWidth: '1000px', textAlign: 'center', marginTop: '10vh' }}>
          <h2 style={{ fontSize: '4.5rem', fontWeight: '800', letterSpacing: '-0.05em', color: '#111827', marginBottom: '3rem', lineHeight: '1.1' }}>
            What shall we build today?
          </h2>
          
          <div style={{ 
            display: 'flex', 
            border: '1px solid #D1D5DB', 
            borderRadius: '8px', 
            padding: '0.75rem', 
            backgroundColor: '#FFFFFF', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
            marginBottom: '2rem'
          }}>
            <input 
              type="text" 
              placeholder="Describe your vision..." 
              style={{ flex: 1, border: 'none', padding: '1.5rem 2rem', fontSize: '1.5rem', outline: 'none', color: '#374151', fontWeight: '300' }} 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button 
              onClick={() => setStage("workspace")} 
              style={{ backgroundColor: '#2563EB', color: 'white', padding: '0 3.5rem', borderRadius: '4px', border: 'none', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase' }}
            >
              Build <ArrowRight size={20} />
            </button>
          </div>

          {/* Billing Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '8rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: billing === 'monthly' ? '700' : '400', color: billing === 'monthly' ? '#111827' : '#9CA3AF' }}>Monthly</span>
            <div 
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')} 
              style={{ width: '44px', height: '22px', background: '#F3F4F6', borderRadius: '20px', cursor: 'pointer', position: 'relative', border: '1px solid #E5E7EB' }}
            >
              <div style={{ position: 'absolute', width: '16px', height: '16px', background: '#2563EB', borderRadius: '50%', top: '2px', left: billing === 'monthly' ? '3px' : '23px', transition: '0.2s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: billing === 'yearly' ? '700' : '400', color: billing === 'yearly' ? '#111827' : '#9CA3AF' }}>
              Yearly <span style={{ color: '#10B981', marginLeft: '4px' }}>(Save 10%)</span>
            </span>
          </div>
        </div>

        {/* LOWER THIRD: Pricing & Bundles */}
        <div style={{ display: 'flex', gap: '1.25rem', width: '100%', maxWidth: '1300px', paddingBottom: '5rem' }}>
          {[
            { name: 'Explore', price: 'Free', credits: '10 Credits', features: ['Standard Access', 'Non-expiring'], icon: <Sparkles size={16} color="#9CA3AF"/> },
            { name: 'Pro', price: calculatePrice(9.99), credits: '100 Credits', features: ['Priority Core', 'Credit Rollover'], icon: <Zap size={16} color="#2563EB"/>, featured: true },
            { name: 'Elite', price: calculatePrice(19.99), credits: '200 Credits', features: ['Full Suite', 'Instant Allotment'], icon: <ShieldCheck size={16} color="#2563EB"/> },
            { name: 'Sovereign', price: calculatePrice(29.99), credits: '300 Credits', features: ['DevOps Sync', 'White Label'], icon: <Coins size={16} color="#2563EB"/> },
            { name: 'Refuel', price: '$19.99', credits: '200 Credits', features: ['Instant Bundle', 'One-time Buy'], icon: <ArrowRight size={16} color="#8B5CF6"/> }
          ].map((tier, i) => (
            <div key={i} style={{ 
              flex: 1, padding: '2rem 1.5rem', border: tier.featured ? '1.5px solid #2563EB' : '1px solid #F3F4F6', borderRadius: '4px', textAlign: 'left',
              backgroundColor: tier.featured ? '#F9FAFB' : 'white', display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ marginBottom: '1.25rem' }}>{tier.icon}</div>
              <h3 style={{ fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: tier.featured ? '#2563EB' : '#9CA3AF', margin: '0 0 0.5rem 0' }}>{tier.name}</h3>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>{tier.price}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#4B5563', marginBottom: '1.5rem' }}>{tier.credits}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.7rem', color: '#9CA3AF', lineHeight: '1.8', fontWeight: '500' }}>
                {tier.features.map((f, idx) => <li key={idx}>— {f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', fontSize: '0.6rem', color: '#D1D5DB', letterSpacing: '0.5em', fontWeight: '800', textTransform: 'uppercase' }}>
        Sovereign Engine // Blue Lotus 2026
      </footer>
    </div>
  );
};

export default App;
