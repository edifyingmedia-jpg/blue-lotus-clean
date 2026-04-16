// frontend/src/components/primitives/Spacer.jsx

export default function Spacer({ size = "4", horizontal = false, className = "" }) {
  // Map 'size' to Tailwind spacing values (e.g., 4 -> 1rem/16px)
  const spacingClass = horizontal ? `w-${size} h-full` : `h-${size} w-full`;
  
  return (
    <div 
      className={`flex-shrink-0 ${spacingClass} ${className}`} 
      aria-hidden="true"
    />
  );
}
