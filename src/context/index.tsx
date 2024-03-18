import { ComponentType, useContext, useReducer } from "react";
import { AutomataContext } from "./context";
import { reducer } from "./reducer";
import { actions } from "./actions";

const initialState: AutomataState = {
  rule: 30,
  iterations: 20,
};

export const withAutomataContext = (Component: ComponentType<unknown>) => {
  const AutomataContextProvider = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchedActions = actions(dispatch);
    return (
      <AutomataContext.Provider value={{ state, actions: dispatchedActions }}>
        <Component />
      </AutomataContext.Provider>
    );
  };
  return AutomataContextProvider;
};

export const useAutomata = () => {
  if (!AutomataContext) {
    throw new Error("useAutomata must be used within an AutomataProvider");
  }
  return useContext(AutomataContext);
};
