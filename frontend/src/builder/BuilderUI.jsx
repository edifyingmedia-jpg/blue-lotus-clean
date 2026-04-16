// A modernized version of BuilderUI (for comparison only)
export default function BuilderUI({ appDefinition }) {
  return (
    <div className="flex h-screen bg-slate-950">
      <div className="flex-1 border-r border-slate-800 p-6 overflow-auto">
        <BuilderCanvas appDefinition={appDefinition} />
      </div>
      <div className="w-80 bg-slate-900 p-4 space-y-4 overflow-y-auto">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Node Tree</h3>
        {appDefinition?.nodes?.map((node, index) => (
          <NodeRenderer key={node.id || index} node={node} />
        ))}
      </div>
    </div>
  );
}
