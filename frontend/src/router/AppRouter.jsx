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
            <AppLayout>
              <BuilderApp />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
