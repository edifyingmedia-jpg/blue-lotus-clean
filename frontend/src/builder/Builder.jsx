import React, { useState } from "react";
import Twin from "../twin/Twin";

export default function Builder() {
  const [project, setProject] = useState({
    name: "Untitled App",
    pages: [],
    components: []
  });

  function updateProject(next) {
    setProject(prev => ({ ...prev, ...next }));
  }

  return (
    <div>
      <h2>App Builder</h2>
      <Twin project={project} updateProject={updateProject} />
    </div>
  );
}
