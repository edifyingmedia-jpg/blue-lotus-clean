// frontend/src/runtime/components/primitives/Image.jsx
import React from "react";

/**
 * Image Primitive (Modernized)
 * ---------------------------
 * Standardizes image rendering across the Blue Lotus workspace.
 * Uses object-cover by default for a professional, "un-stretched" look.
 */
export default function Image({ 
  src, 
  alt = "", 
  className = "", 
  aspect = "aspect-video" 
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-800 bg-slate-900 ${aspect} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
