import React from "react";
import Face from "./Face";
import Workspace from "./Workspace";

export default function App() {
  return (
    <div>
      <Face messages={[]} />
      <Workspace preview={null} />
    </div>
  );
}
