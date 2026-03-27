import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext(null);

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

  function addComponent(component) {
    function insertNode(node) {
      // Insert into selected component
      if (node.id === selectedId) {
        return {
          ...node,
          children: [...(node.children || []), component],
        };
      }

      // Recurse through children
      if (Array.isArray(node.children)) {
        return {
          ...node,
          children: node.children.map(insertNode),
        };
      }

      return node;
    }

    setProject((prev) => {
      // No selection → add to root
      if (!selectedId) {
        return {
          ...prev,
          root: {
            ...prev.root,
            children: [...prev.root.children, component],
          },
        };
      }

      // Selection exists → insert into tree
      return {
        ...prev,
        root: insertNode(prev.root),
      };
    });
  }

  return (
    <ProjectContext.Provider
      value={{
        project,
        addComponent,
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
