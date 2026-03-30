// ADD THIS IMPORT AT THE TOP OF TwinPanel.jsx
import { classifyIntent } from "./intentClassifier";


// REPLACE YOUR ENTIRE executeArchitectCommand FUNCTION WITH THIS
function executeArchitectCommand(text, onBuild) {
  const intent = classifyIntent(text);

  switch (intent.type) {
    case "greeting":
      return {
        id: id(),
        role: "twin",
        text:
          "Hi. I’m in Architect Mode — tell me what you want to build."
      };

    case "build_app":
      return {
        id: id(),
        role: "twin",
        text:
          "I understand you want to build an app.\n" +
          "I’ll draft a proposal next so you can approve it."
      };

    case "empty":
      return {
        id: id(),
        role: "twin",
        text: "Say something like: “Build a recipe app.”"
      };

    default:
      return {
        id: id(),
        role: "twin",
        text:
          "Tell me what you want to build, like: “Build a recipe app” or “Create a fitness tracker.”"
      };
  }
}
