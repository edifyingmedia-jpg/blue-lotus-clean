// frontend/src/runtime/AppRouter.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

/**
 * The Global Navigator using the Data Router API.
 * This setup enables pre-fetching and high-concurrency state management.
 */
const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
    // Future expansion point: add a 'loader' here to fetch Supabase data 
    // before the UI even renders.
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
