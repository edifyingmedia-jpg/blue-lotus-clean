import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}
