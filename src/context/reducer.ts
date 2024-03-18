export const reducer = (state: AutomataState, action: AutomataActions) => {
  switch (action.type) {
    case "SET_RULE":
      return {
        ...state,
        rule: action.payload,
      };
    case "SET_ITERATIONS":
      return {
        ...state,
        iterations: action.payload,
      };
    default:
      return state;
  }
};
