import { useAutomata } from "@/context";
import {
  Sketch as P5Sketch,
  ReactP5Wrapper,
  SketchProps,
} from "@p5-wrapper/react";

type MySketchProps = SketchProps & {
  rule: RuleType;
  iterations: number;
};

export const Sketch = () => {
  const sketch: P5Sketch<MySketchProps> = (p5) => {
    let ruleValue: number = 0;
    let cells: number[] = [];
    let ruleSet: string;
    const w = 5;
    let rows = 20;
    let y = 0;

    const buildFirstRow = () => {
      // Convert the rule value to a binary string.
      ruleSet = ruleValue.toString(2).padStart(8, "0");

      // Calculate the total number of cells based on canvas width.
      const total = p5.width / w;
      // Initialize all cells to state 0 (inactive).
      // Set the middle cell to state 1 (active) as the initial condition.
      cells = Array.from({ length: total }, (_, i: number) =>
        i === p5.floor(total / 2) ? 1 : 0
      );
    };

    const calculateState = (a: number, b: number, c: number) => {
      // Create a string representing the state of the cell and its neighbors.
      const neighborhood = "" + a + b + c;
      // Convert the string to a binary number
      const value = 7 - parseInt(neighborhood, 2);
      // Return the new state based on the ruleset.
      return parseInt(ruleSet[value], 10);
    };

    const buildNextRow = () => {
      // Prepare an array for the next generation of cells.
      const nextCells: number[] = [];

      // Iterate over each cell to calculate its next state.
      const len = cells.length;
      for (let i = 0; i < len; i++) {
        // Calculate the states of neighboring cells
        const left = cells[(i - 1 + len) % len];
        const right = cells[(i + 1) % len];
        const state = cells[i];
        // Set the new state based on the current state and neighbors.
        const newState = calculateState(left, state, right);
        nextCells[i] = newState;
      }

      // Update the cells array for the next generation.
      cells = nextCells;
    };

    p5.setup = () => {
      p5.createCanvas(800, rows * w);
      p5.background(255);
      buildFirstRow();
    };

    p5.updateWithProps = function ({ rule, iterations }: MySketchProps) {
      ruleValue = rule;
      rows = iterations;
      p5.setup();
    };

    p5.draw = () => {
      // Draw each cell based on its state.
      for (let i = 0; i < cells.length; i++) {
        const x = i * w;
        p5.noStroke();
        p5.fill(255 - cells[i] * 255);
        p5.square(x, y, w);
      }

      // Move to the next row.
      y += w;

      buildNextRow();

      // stop the loop
      if (y >= p5.height) {
        p5.noLoop();
      }
    };
  };

  const { state } = useAutomata();

  return (
    <ReactP5Wrapper
      sketch={sketch}
      rule={state.rule}
      iterations={state.iterations}
    />
  );
};
