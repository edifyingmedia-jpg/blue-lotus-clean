// lib/twin/buildApp.js
import { TwinEngine } from "./twinEngine.js";
import { generateProjectStructure } from "./codeGenerator.js";

export async function buildApp(instructions) {
  const engine = new TwinEngine({
    owner: "edifyingmedia-jpg",
    repo: "blue-lotus-clean",
    branch: "main"
  });

  const fileMap = await generateProjectStructure(instructions);

  const results = await engine.pushProject(fileMap);

  return {
    success: true,
    files: Object.keys(fileMap),
    results
  };
}
