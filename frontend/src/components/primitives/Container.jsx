// frontend/src/components/primitives/Container.jsx
import React from "react";

export default function Container({ 
  children, 
  className = "", 
  style = {},
  maxWidth = "none" 
}) {
  return (
    <div 
      className={`w-full mx-auto box-border ${className}`}
      style={{ 
        maxWidth: maxWidth !== "none" ? maxWidth : undefined,
        ...style 
      }} 
    >
      {children}
    </div>
  );
}
