import React from "react";
import "./ComponentPanel.css";

const COMPONENT_CATEGORIES = [
  {
    id: "layout",
    title: "Layout",
    items: ["Container", "Grid", "Section", "Divider"],
  },
  {
    id: "content",
    title: "Content",
    items: ["Text", "Image", "Video", "Icon"],
  },
  {
    id: "interactive",
    title: "Interactive",
    items: ["Button", "Input", "Form", "Modal"],
  },
  {
    id: "data",
    title: "Data",
    items: ["List", "Table", "Chart"],
  },
];

export default function ComponentPanel() {
  return (
    <aside className="component-panel">
      <header className="component-panel-header">
        <h2>Available Components</h2>
        <span className="component-panel-subtitle">
          Used by TWIN during builds
        </span>
      </header>

      <div className="component-panel-body">
        {COMPONENT_CATEGORIES.map((category) => (
          <section key={category.id} className="component-category">
            <h3 className="component-category-title">
              {category.title}
            </h3>

            <ul className="component-list">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="component-item passive"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
