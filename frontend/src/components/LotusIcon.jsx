import { motion } from 'framer-motion'

export default function LotusIcon({ className, size = 22, ...props }) {
  return (
    <svg
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <path d="M 12,108 Q -10,84 16,54 Q 44,78 52,108 Z" />
      <path d="M 188,108 Q 210,84 184,54 Q 156,78 148,108 Z" />
      <path d="M 50,108 Q 38,70 68,36 Q 85,70 83,108 Z" />
      <path d="M 150,108 Q 162,70 132,36 Q 115,70 117,108 Z" />
      <path d="M 81,108 Q 74,56 96,18 Q 111,56 109,108 Z" />
      <path d="M 119,108 Q 126,56 104,18 Q 89,56 91,108 Z" />
      <path d="M 93,108 Q 88,48 100,4 Q 112,48 107,108 Z" />
      <ellipse cx="100" cy="110" rx="88" ry="9" />
    </svg>
  )
}
