import React from "react";

export default function Text({ children, ...props }) {
  return <span {...props}>{children}</span>;
}
