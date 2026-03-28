import { useEffect } from "react";
import { useRuntime } from "./index";
import { ActionTypes } from "./actions/ActionTypes";

export default function RuntimeApp() {
  const { action } = useRuntime();

  useEffect(() => {
    action.execute({
      type: ActionTypes.LOG_MESSAGE,
      payload: {
        message: "TWIN governance pipeline verified",
      },
    });
  }, [action]);

  return null;
}
