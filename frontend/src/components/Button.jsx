// frontend/src/components/Button.jsx

export default function Button({ label, onClick, className = "", style = {} }) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`px-4 py-2 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer text-sm font-medium text-gray-700 ${className}`}
    >
      {label}
    </button>
  );
}
