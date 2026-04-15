// 1. Add a new state for the generated component code
const [generatedCode, setGeneratedCode] = useState('');

const handleCommand = async (cmd) => {
  setManifest({ active: true, type: cmd.toUpperCase(), stage: 'planning' });
  
  // REAL LOGIC: In a production app, this is where you fetch from your /api/generate route
  // For now, we are creating a "Logic Bridge" that can interpret simple commands into real JSX
  
  const steps = ["Analyzing Intent", "Injecting TWIN Logic", "Materializing Component"];
  for (const step of steps) {
    setBuildPlan(prev => [...prev, { name: step, done: false }]);
    await new Promise(r => setTimeout(r, 600));
    setBuildPlan(prev => prev.map(s => s.name === step ? { ...s, done: true } : s));
  }

  // MOCKING THE AI BRAIN (Replace this with a fetch call to OpenAI later)
  if (cmd.toLowerCase().includes('button')) {
    setGeneratedCode(`<button style="padding: 20px 40px; background: #6366f1; color: white; border: none; border-radius: 12px; font-weight: 900; cursor: pointer; box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4)">SOVEREIGN_ACTION</button>`);
  } else if (cmd.toLowerCase().includes('input')) {
    setGeneratedCode(`<input placeholder="Search Data..." style="padding: 20px; width: 300px; background: rgba(0,0,0,0.05); border: 2px solid #6366f1; border-radius: 15px; outline: none;" />`);
  } else {
    setGeneratedCode(\`<div style="padding: 40px; border: 1px dashed #6366f1; border-radius: 20px;">Component: \${cmd} materialized.</div>\`);
  }

  setManifest(prev => ({ ...prev, stage: 'live' }));
};
