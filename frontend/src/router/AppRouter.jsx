import React from "react";
import { PageRenderer } from "../pages";

export default function AppRouter({ project }) {
  if (!project || !project.pages || project.pages.length === 0) {
    return <div style={{ padding: 20 }}>No pages defined.</div>;
  }

  // For now, render the first page
  const page = project.pages[0];

  return <PageRenderer page={page} />;
}
