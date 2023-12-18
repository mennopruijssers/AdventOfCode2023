import { BaseDay } from '../day';

type Input = number[][];
type Direction = 'N' | 'E' | 'S' | 'W';
const DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];

type Current = {
  score: number;
  x: number;
  y: number;
  d: Direction;
  heatLoss: number;
  stepsInDirection: number;
};

const getKey = ({ x, y, d, stepsInDirection }: Current) =>
  JSON.stringify({ x, y, d, stepsInDirection });

const findPath = (
  grid: number[][],
  minSameDirection: number = 0,
  maxSameDirection: number = 3,
) => {
  const queue: Current[] = [
    // { score: 0, x: 0, y: 0, d: 'E', heatLoss: 0, stepsInDirection: 0 },
    { score: 0, x: 0, y: 0, d: 'S', heatLoss: 0, stepsInDirection: 0 },
  ];

  const endX = grid[0].length - 1;
  const endY = grid.length - 1;

  const visited = new Set<string>();

  const nextDirections = ({
    x,
    y,
    d,
    stepsInDirection,
  }: Pick<Current, 'x' | 'y' | 'd' | 'stepsInDirection'>): (Pick<
    Current,
    'x' | 'y'
  > & { newD: Direction })[] => {
    const directions = new Set<Direction>(['N', 'E', 'S', 'W']);
    directions.delete(DIRECTIONS[(DIRECTIONS.indexOf(d) + 2) % 4]);

    if (stepsInDirection >= maxSameDirection) {
      directions.delete(d);
    }
    // istanbul ignore next
    if (stepsInDirection < minSameDirection) {
      // istanbul ignore next
      DIRECTIONS.filter((dir) => dir !== d).forEach((d) =>
        directions.delete(d),
      );
    }

    return [...directions].map((newD) => {
      if (newD === 'E') return { x: x + 1, y, newD };
      if (newD === 'W') return { x: x - 1, y, newD };
      if (newD === 'N') return { x, y: y - 1, newD };
      if (newD === 'S') return { x, y: y + 1, newD };
      // istanbul ignore next
      throw new Error('should not happen');
    });
  };

  while (queue.length > 0) {
    const { x, y, d, heatLoss, stepsInDirection } = queue.pop()!;

    if (x === endX && y === endY) return heatLoss;

    const directions = nextDirections({ x, y, d, stepsInDirection });
    const next = directions
      .filter(({ x, y }) => {
        if (x < 0 || x > endX) return false;
        if (y < 0 || y > endY) return false;
        return true;
      })
      .map(({ x, y, newD }) => {
        const score = heatLoss + grid[y][x] + endX - x + endY - y;
        const newStepsInDirection = newD === d ? stepsInDirection + 1 : 1;
        return {
          score,
          x,
          y,
          d: newD,
          heatLoss: heatLoss + grid[y][x],
          stepsInDirection: newStepsInDirection,
        };
      });

    let resort = false;
    next.forEach((n) => {
      const key = getKey(n);
      if (!visited.has(key)) {
        resort = true;
        queue.push(n);
        visited.add(key);
      }
    });

    if (resort) {
      queue.sort((a, b) => b.score - a.score);
    }
  }

  //istanbul ignore next
  throw new Error('no path found');
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input
      .trim()
      .split('\n')
      .map((l) => [...l.trim()].map((c) => parseInt(c, 10)));
  }

  async partOne(): Promise<number> {
    return findPath(this.input);
  }

  // istanbul ignore next
  async partTwo(): Promise<number> {
    // istanbul ignore next
    return findPath(this.input, 4, 10);
  }
}

export default Day;
