import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [project, setProject] = useState({
    name: "Untitled App",
    pages: [
      {
        id: "page-1",
        name: "Home",
        components: []
      }
    ],
    currentPageId: "page-1"
  });

  // Get current page object
  const currentPage = project.pages.find(
    (p) => p.id === project.currentPageId
  );

  // Add a component to the current page
  function addComponent(type) {
    const newComponent = {
      id: "comp-" + Date.now(),
      type,
      props: {}
    };

    const updatedPages = project.pages.map((page) =>
      page.id === project.currentPageId
        ? { ...page, components: [...page.components, newComponent] }
        : page
    );

    setProject({ ...project, pages: updatedPages });
  }

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        currentPage,
        addComponent
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}
