import { generateBuilder } from "../builder/generate";

export function execute(input, authority) {
  if (!authority?.isOwner) {
    return {
      type: "error",
      message: "Unauthorized: owner access required."
    };
  }

  const text = String(input || "").toLowerCase();

  if (text.includes("build") && text.includes("app builder")) {
    const nameMatch =
      input.match(/called\s+["']?([^"']+)["']?/i) ||
      input.match(/named\s+["']?([^"']+)["']?/i);

    const appName = nameMatch?.[1]?.trim() || "untitled-builder";

    const artifact = generateBuilder({
      appName,
      templateId: "builder-core"
    });

    return {
      type: "build",
      message: `Built: ${artifact.appName} (${artifact.kind}) using template "${artifact.templateId}".`,
      artifact
    };
  }

  return {
    type: "message",
    message: "I didn't understand that command."
  };
}
