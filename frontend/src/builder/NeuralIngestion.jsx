// Inside your NeuralIngestion component, add this overlay below the ActionButton
{isIngesting && (
  <div className="mt-4 p-4 border border-cyan-500/20 bg-cyan-500/5 rounded-[1rem] animate-pulse">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Neural_Mapping_Active</span>
      <span className="text-[10px] font-mono text-cyan-400">88%</span>
    </div>
    <div className="h-1 w-full bg-white/5 overflow-hidden">
      <div className="h-full bg-cyan-500 w-3/4 animate-[ingest-progress_2s_ease-in-out_infinite]"></div>
    </div>
    <p className="mt-2 text-[8px] font-mono text-slate-500 uppercase">
      Detecting semantic nodes... Identifying revenue triggers...
    </p>
  </div>
)}
