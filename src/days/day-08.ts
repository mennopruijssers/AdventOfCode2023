import { BaseDay } from '../day';
import { leastCommonMultiple } from '../utils/math';

type Node = {
  L: string;
  R: string;
};
type Direction = keyof Node;
type Input = { instructions: Direction[]; nodes: Record<string, Node> };

const stepsNeeded = (
  start: string,
  { nodes, instructions }: Input,
  isEnd: (n: string) => boolean,
) => {
  let steps = 0;

  let current = start;
  while (!isEnd(current)) {
    const direction = instructions[steps % instructions.length];
    steps++;
    current = nodes[current][direction];
  }
  return steps;
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const [instructionsLine, nodesInput] = input.split('\n\n');

    const instructions = [...instructionsLine] as Direction[];

    const nodes = nodesInput
      .split('\n')
      .map((line) => {
        const match = line.match(
          /(?<name>\w+) = \((?<left>\w+), (?<right>\w+)\)/,
        );

        // istanbul ignore next
        if (!match || !match.groups) throw new Error('No match!');
        const { name, left, right } = match.groups;

        return { name, left, right };
      })
      .reduce<Record<string, Node>>((acc, { name, left, right }) => {
        acc[name] = { L: left, R: right };
        return acc;
      }, {});

    return { instructions, nodes };
  }

  async partOne(): Promise<number> {
    return stepsNeeded('AAA', this.input, (n) => n === 'ZZZ');
  }

  async partTwo(): Promise<number> {
    const starts = Object.keys(this.input.nodes).filter((n) => n.endsWith('A'));

    const steps = starts.map((n) => {
      return stepsNeeded(n, this.input, (n) => n.endsWith('Z'));
    });

    const result = leastCommonMultiple(steps);
    return result;
  }
}

export default Day;
