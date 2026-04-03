import React from "react";
import "./Workspace.css";

export default function Workspace({ preview }) {
  return (
    <div className="workspace-root">
      <div className="workspace-frame">
        {preview}
      </div>
    </div>
  );
}
