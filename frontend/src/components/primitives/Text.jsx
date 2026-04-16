// frontend/src/components/primitives/Text.jsx
import React from "react";

export default function Text({ 
  children, 
  as: Component = "p", 
  className = "", 
  style = {} 
}) {
  return (
    <Component 
      style={style}
      className={`text-gray-800 leading-relaxed ${className}`}
    >
      {children}
    </Component>
  );
}
