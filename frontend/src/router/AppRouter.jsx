import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import BuilderApp from "../builder/BuilderApp";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              left={null}
              right={
                <div style={{ height: "100%", display: "flex" }}>
                  <BuilderApp />
                </div>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
