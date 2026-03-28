import { dispatchAction } from "./ActionDispatcher";

export default function ActionEngine({ runtime }) {
  if (!runtime?.twin) {
    throw new Error("ActionEngine: TWIN session missing from runtime");
  }

  const { profile } = runtime.twin;

  return {
    execute(actionRequest, handlers) {
      return dispatchAction({
        profile,
        actionRequest,
        handlers
      });
    }
  };
}
