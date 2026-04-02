import React from "react";
import AppRenderer from "./AppRenderer";

export default function LivePreview({ appDefinition }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AppRenderer appDefinition={appDefinition} />
    </div>
  );
}
