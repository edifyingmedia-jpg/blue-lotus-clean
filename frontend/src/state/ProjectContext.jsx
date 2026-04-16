// frontend/src/state/ProjectContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { findNodeById } from "../utils/findNodeById";

const ProjectContext = createContext(null);

/**
 * ProjectProvider (Empire Edition)
 * ------------------------------
 * The master construction vessel for Blue Lotus.
 * Hardened to prevent tree corruption during complex site-cloning.
 */
export function ProjectProvider({ children }) {
  const [project, setProject] = useState({
    root: {
      id: "root",
      type: "root",
      props: {},
      children: [],
    },
  });
  
  const [selectedId, setSelectedId] = useState(null);

  // Hardened Component Insertion
  const addComponent = useCallback((component) => {
    setProject((prev) => {
      const newProject = { ...prev };
      const targetId = selectedId || "root";
      
      // Use our hardened traversal utility
      const targetNode = findNodeById(newProject.root, targetId);

      if (targetNode) {
        targetNode.children = [...(targetNode.children || []), component];
        console.log(`CONSTRUCTION_SUCCESS: Node [${component.type}] fused to [${targetId}]`);
      } else {
        console.warn(`CONSTRUCTION_WARNING: Target [${targetId}] vanished. Defaulting to root.`);
        newProject.root.children.push(component);
      }

      return { ...newProject };
    });
  }, [selectedId]);

  return (
    <ProjectContext.Provider value={{ 
      project, 
      addComponent, 
      selectedId, 
      setSelectedId,
      architect_tax: 0.10 
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("ARCHITECT_ERROR: useProject must be used within a ProjectProvider");
  }
  return context;
}
