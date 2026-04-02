// frontend/src/builder/BuilderUI.jsx

import React from "react";
import BuilderCanvas from "./BuilderCanvas";
import NodeRenderer from "./NodeRenderer";
import "./BuilderUI.css";

export default function BuilderUI({ appDefinition }) {
  return (
    <div className="builder-ui">
      <div className="builder-header">
        <h1>Blue Lotus Builder</h1>
      </div>

      <div className="builder-body">
        <div className="builder-left">
          <BuilderCanvas appDefinition={appDefinition} />
        </div>

        <div className="builder-right">
          {appDefinition?.nodes?.map((node, index) => (
            <div key={index} className="builder-node">
              <NodeRenderer node={node} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
