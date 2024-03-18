import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAutomata } from "@/context";
import { Label } from "./ui/label";

export const Form = () => {
  const { state, actions } = useAutomata();

  return (
    <div className="flex-1 p-4">
      <h1 className="text-3xl font-bold mb-2">Cellular Automata</h1>
      <div className="p-4">
        <Label htmlFor="rule">Rule #</Label>
        <Input
          name="rule"
          type="number"
          placeholder="Rule #"
          value={state.rule || 0}
          min={0}
          max={255}
          step={1}
          onChange={(e) => actions.setRule(parseInt(e.target.value))}
        />
      </div>
      <div className="flex justify-center items-center gap-10 mb-10">
        <Button
          onClick={() => actions.setRule(state.rule - 1)}
          disabled={state.rule === 0}
        >
          -
        </Button>
        <Button
          onClick={() => actions.setRule(state.rule + 1)}
          disabled={state.rule === 255}
        >
          +
        </Button>
      </div>
      <div className="p-4">
        <Label htmlFor="iterations">Iterations</Label>
        <Input
          name="iterations"
          type="number"
          placeholder="Iterations"
          value={state.iterations || 0}
          min={0}
          max={100}
          step={1}
          onChange={(e) => actions.setIterations(parseInt(e.target.value))}
        />
      </div>
      <div className="flex justify-center items-center gap-10 mb-10">
        <Button
          onClick={() => actions.setIterations(state.iterations - 1)}
          disabled={state.iterations === 0}
        >
          -
        </Button>
        <Button onClick={() => actions.setIterations(state.iterations + 1)}>
          +
        </Button>
      </div>
    </div>
  );
};
