// frontend/src/components/Card.jsx
import React from "react";

export default function Card({ 
  title = "Card", 
  children, 
  className = "", 
  style = {} 
}) {
  return (
    <div 
      style={style}
      className={`p-4 rounded-lg bg-[#0b1220] text-white shadow-lg max-w-[480px] border border-slate-800 ${className}`}
    > 
      {title && (
        <h3 className="mb-2 text-lg font-semibold border-b border-slate-700 pb-1">
          {title}
        </h3>
      )}
      <div className="text-sm opacity-90">
        {children}
      </div> 
    </div>
  );
}
