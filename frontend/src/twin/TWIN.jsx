import React from "react";

export default function Twin({ project, updateProject }) {
  function addPage() {
    const newPage = {
      id: crypto.randomUUID(),
      name: `Page ${project.pages.length + 1}`,
      components: []
    };

    updateProject({
      pages: [...project.pages, newPage]
    });
  }

  return (
    <div>
      <button onClick={addPage}>Add Page</button>

      <div style={{ marginTop: 20 }}>
        <h3>Pages</h3>
        {project.pages.map(page => (
          <div key={page.id}>{page.name}</div>
        ))}
      </div>
    </div>
  );
}
