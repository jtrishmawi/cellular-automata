type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

interface AutomataContextType {
  state: AutomataState;
  actions: AutomataDispatchActions;
}

type RuleType = IntRange<0, 255>;

interface AutomataState {
  rule: RuleType
  iterations: number
}

type AutomataPayload = {
  ["SET_RULE"]: number;
  ["SET_ITERATIONS"]: number;
};

interface AutomataDispatchActions {
  setRule: (rule: number) => void;
  setIterations: (iterations: number) => void;
}

type AutomataActions =
  ActionMap<AutomataPayload>[keyof ActionMap<AutomataPayload>];
