import { builderCoreTemplate } from "./templates";

export function generateBuilder({ appName, templateId }) {
  if (!appName) {
    throw new Error("generateBuilder requires appName");
  }

  if (templateId !== "builder-core") {
    throw new Error(`Unknown template: ${templateId}`);
  }

  const files = builderCoreTemplate(appName);

  return {
    kind: "app-builder",
    appName,
    templateId,
    files
  };
}
