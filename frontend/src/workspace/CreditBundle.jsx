import React from 'react';
import { ActionCard, ActionButton } from '../rxgui/primitives';
import { useAppDefinition } from '../state';

/**
 * Credit Bundle Deck
 * ------------------
 * Fuel for the AI Surgeon (Healing) and the Storefront Actuator.
 */
export const CreditBundle = () => {
  const { userBalance, purchaseCredits } = useAppDefinition();

  const BUNDLES = [
    { id: 'spark', amount: 10, price: '$5', icon: 'zap' },
    { id: 'surge', amount: 50, price: '$20', icon: 'activity' },
    { id: 'monolith', amount: 200, price: '$75', icon: 'database' }
  ];

  return (
    <ActionCard title="Neural_Fuel_Depot" icon="BatteryCharging">
      <div className="space-y-6 py-2">
        {/* Current Balance Display */}
        <div className="flex flex-col items-center justify-center p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-[1.5rem]">
          <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] mb-1">Available_Balance</span>
          <h2 className="text-4xl font-mono text-white tracking-tighter">{userBalance}</h2>
          <span className="text-[8px] font-mono text-cyan-500/40 uppercase mt-2 italic">Credits_Synchronized</span>
        </div>

        {/* Purchase Options */}
        <div className="space-y-3">
          {BUNDLES.map((bundle) => (
            <div 
              key={bundle.id}
              className="group flex items-center justify-between p-4 bg-black border border-white/5 rounded-[1rem] hover:border-cyan-500/40 transition-all cursor-pointer"
              onClick={() => purchaseCredits(bundle.amount)}
            >
              <div className="flex flex-col">
                <span className="text-[11px] font-mono text-white uppercase tracking-wider">{bundle.amount} CREDITS</span>
                <span className="text-[8px] font-mono text-slate-500 uppercase">{bundle.id}_package</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-cyan-400">{bundle.price}</span>
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                  <span className="text-[10px] text-white">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[7px] font-mono text-slate-700 text-center uppercase leading-tight">
          Credits are consumed by the Code Healer <br /> and Storefront Actuators. Non-refundable.
        </p>
      </div>
    </ActionCard>
  );
};
