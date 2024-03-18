import { Dispatch } from "react";
import { throttle } from "throttle-debounce-ts";

export const actions = (dispatch: Dispatch<AutomataActions>) => ({
  setRule: throttle(500, (rule: number) =>
    dispatch({ type: "SET_RULE", payload: rule % 255 })
  ),
  setIterations: throttle(500, (iterations: number) =>
    dispatch({ type: "SET_ITERATIONS", payload: iterations })
  ),
});
