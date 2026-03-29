import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import BuilderApp from "../builder/BuilderApp";
import { ComponentPanel } from "../builder/ComponentPanel";

export default function AppRouter() {
  const [components, setComponents] = useState([]);

  function handleAddComponent(component) {
    setComponents((prev) => [...prev, component]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              left={<ComponentPanel onAddComponent={handleAddComponent} />}
              right={<BuilderApp components={components} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
