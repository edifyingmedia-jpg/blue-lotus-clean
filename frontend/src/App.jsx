import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Sparkles, CreditCard,Zap } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState("landing");
  const [prompt, setPrompt] = useState("");

  const LotusLogo = () => (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5C53.75 20.75 62.5 31.25 76.25 36.25C90 41.25 96.25 50 93.75 62.5C91.25 75 80 83.75 66.25 88.75C52.5 93.75 50 96.25 50 96.25C50 96.25 47.5 93.75 33.75 88.75C20 83.75 8.75 75 6.25 62.5C3.75 50 10 41.25 23.75 36.25C37.5 31.25 46.25 20.75 50 5Z" fill="#2563EB" />
    </svg>
  );

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: 'white', fontFamily: 'Inter, sans-serif', color: '#111827' }}>
      <AnimatePresence mode="wait">
        {stage === "landing" ? (
          <motion.div key="landing" exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            
            {/* NAVIGATION */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <LotusLogo />
                <h1 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0, color: '#1e3a8a' }}>
                  Blue Lotus
                </h1>
              </div>
              <button style={{ background: 'none', border: '1px solid #e5e7eb', padding: '0.6rem 2rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.05em' }}>
                SIGN IN
              </button>
            </nav>

            {/* MAIN CONTENT: Centered & Weighted */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem' }}>
              
              <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center', marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '4.5rem', fontWeight: '800', letterSpacing: '-0.05em', marginBottom: '3rem', color: '#111827', lineHeight: '1' }}>
                  What shall we build today?
                </h2>
                
                <div style={{ display: 'flex', border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '0.75rem', backgroundColor: '#f9fafb', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
                  <input 
                    type="text"
                    placeholder="Describe your vision..."
                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '1.25rem 2rem', fontSize: '1.5rem', outline: 'none', color: '#374151', fontWeight: '300' }}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <button 
                    onClick={() => setStage("workspace")}
                    style={{ backgroundColor: '#2563EB', color: 'white', padding: '0 3rem', borderRadius: '0.75rem', border: 'none', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}
                  >
                    GENERATE <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              {/* PRICING: Three Columns with Explicit Credits */}
              <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1100px', paddingBottom: '4rem' }}>
                {[
                  { name: 'Explorer', price: 'Free', credits: '10 Credits', sub: 'Initial Forge access', icon: <Sparkles size={20} color="#10b981"/> },
                  { name: 'Sovereign', price: '$29', credits: 'Unlimited', sub: 'Monthly subscription', featured: true, icon: <Zap size={20} color="#2563EB"/> },
                  { name: 'Refuel', price: '$5', credits: '50 Credits', sub: 'One-time credit pack', icon: <CreditCard size={20} color="#8b5cf6"/> }
                ].map((tier, i) => (
                  <div key={i} style={{ 
                    flex: 1, 
                    padding: '3rem 2.5rem', 
                    border: tier.featured ? '2px solid #2563EB' : '1px solid #f3f4f6', 
                    borderRadius: '1rem',
                    textAlign: 'left',
                    backgroundColor: tier.featured ? '#F8FAFC' : 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ marginBottom: '1.5rem' }}>{tier.icon}</div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: tier.featured ? '#2563EB' : '#9CA3AF', letterSpacing: '0.15em' }}>
                        {tier.name}
                      </span>
                      <div style={{ fontSize: '3rem', fontWeight: '900', margin: '0.5rem 0', letterSpacing: '-0.03em' }}>
                        {tier.price}<span style={{fontSize: '1rem', color: '#9CA3AF', fontWeight: '500'}}>{tier.name === 'Sovereign' ? '/mo' : ''}</span>
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: '700', color: tier.featured ? '#1e40af' : '#374151', marginBottom: '0.5rem' }}>
                        {tier.credits}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '2.5rem' }}>{tier.sub}</p>
                    </div>
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
                      <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>— <span>Full Sovereign Forge</span></li>
                      <li style={{ display: 'flex', gap: '0.5rem' }}>— <span>Neural Memory Access</span></li>
                    </ul>
                  </div>
                ))}
              </div>
            </main>

            <footer style={{ padding: '3rem', textAlign: 'center', fontSize: '0.7rem', color: '#D1D5DB', letterSpacing: '0.4em', fontWeight: '700' }}>
              BLUE LOTUS SOVEREIGN // EST. 2026
            </footer>
          </motion.div>
        ) : (
          /* WORKSPACE */
          <div style={{ backgroundColor: '#F9FAFB', height: '100vh', width: '100%' }}>
            {/* Full Workspace functionality */}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
