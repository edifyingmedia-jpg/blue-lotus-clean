export function execute(command, authority) {
  if (!authority?.isOwner) {
    return {
      type: "error",
      message: "Unauthorized"
    };
  }

  if (!command || typeof command !== "string") {
    return {
      type: "noop",
      message: "No command provided"
    };
  }

  if (/build|create|generate/i.test(command)) {
    return {
      type: "build",
      message: "Build request accepted. Generating app scaffold.",
      payload: {
        command
      }
    };
  }

  return {
    type: "info",
    message: "Command received. Awaiting build instruction."
  };
}
