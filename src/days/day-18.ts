import { BaseDay } from '../day';

type Input = Instruction[];
type Instruction = {
  direction: Direction;
  length: number;
  color: string;
};
type Direction = 'R' | 'D' | 'L' | 'U';
const directions: Direction[] = ['R', 'D', 'L', 'U'];
type Point = [number, number];

const move = ([x, y]: Point, d: Direction, l: number): Point => {
  if (d === 'R') return [x + l, y];
  if (d === 'D') return [x, y + l];
  if (d === 'L') return [x - l, y];
  // U
  return [x, y - l];
};

const dig = (
  instructions: Pick<Instruction, 'direction' | 'length'>[],
): number => {
  let perimeter = 0;
  const polygon = instructions.reduce<Point[]>(
    (polygon, instruction) => {
      const lastPoint = polygon.at(-1)!;
      const nextPoint = move(
        lastPoint,
        instruction.direction,
        instruction.length,
      );
      polygon.push(nextPoint);
      perimeter += instruction.length;
      return polygon;
    },
    [[0, 0]],
  );

  // shoelace formulate: https://en.wikipedia.org/wiki/Shoelace_formula

  const area = polygon.reduce((area, p, index) => {
    const nextPoint = polygon[(index + 1) % polygon.length];
    return area + ((p[1] + nextPoint[1]) * (p[0] - nextPoint[0])) / 2;
  }, 0);

  return area + perimeter / 2 + 1;
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input
      .trim()
      .split('\n')
      .map((line) => {
        const { direction, length, color } = line.match(
          /(?<direction>.) (?<length>\d+) \((?<color>.+)\)/,
        )!.groups!;
        return {
          direction: direction as Direction,
          length: parseInt(length),
          color,
        };
      });
  }

  async partOne(): Promise<number> {
    const instructions = this.input;
    return dig(instructions);
  }

  async partTwo(): Promise<number> {
    const instructions = this.input.map(({ color }) => {
      const lengthHex = color.substring(1, 6);
      const directionIndex = parseInt(color.substring(6));
      const length = parseInt(lengthHex, 16);
      const direction = directions[directionIndex];

      return { length, direction };
    });

    return dig(instructions);
  }
}

export default Day;
