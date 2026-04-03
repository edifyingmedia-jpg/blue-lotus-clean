import React from "react";

export default function ActionToggle({ checked = false, onChange, className, ...rest }) {
  return (
    <button
      type="button"
      className={className}
      aria-pressed={!!checked}
      onClick={() => onChange && onChange(!checked)}
      {...rest}
    >
      {checked ? "On" : "Off"}
    </button>
  );
}
