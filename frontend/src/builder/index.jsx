// frontend/src/builder/index.js
export { generateBuilder } from "./generate";
export { loadManifest } from "./registry";
export default { generateBuilder: require("./generate").generateBuilder };
