import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuilderApp from "../builder/BuilderApp";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<BuilderApp />} />
      </Routes>
    </BrowserRouter>
  );
}
