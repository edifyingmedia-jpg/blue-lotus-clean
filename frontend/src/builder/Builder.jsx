import React from "react";
import { BuilderApp } from "./index.js";
import { ProjectProvider } from "../state";

export default function Builder() {
  return (
    <ProjectProvider>
      <BuilderApp />
    </ProjectProvider>
  );
}
