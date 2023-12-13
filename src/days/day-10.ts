//istanbul ignore file
import { BaseDay } from '../day';
import { Point } from '../utils/types';

type Input = Tile[][];

type Pipe = '|' | '-' | 'L' | 'J' | '7' | 'F';

function isPipe(value: Tile): value is Pipe {
  return ['|', '-', 'L', 'J', '7', 'F'].includes(value);
}

type Tile = Pipe | '.' | 'S';

const N = { x: 0, y: -1 };
const S = { x: 0, y: 1 };
const W = { x: -1, y: 0 };
const E = { x: 1, y: 0 };

const nextMap: Record<Pipe, Point[]> = {
  '|': [N, S],
  '-': [E, W],
  L: [N, E],
  J: [N, W],
  '7': [S, W],
  F: [S, E],
};

const findPath1 = (grid: Input): Point[] => {
  const findStart = (): Point => {
    for (let y = 0; y < grid.length; y++) {
      const x = grid[y].indexOf('S');
      if (x !== -1) {
        return { y, x };
      }
    }
    throw new Error('start not found');
  };

  const startPoint = findStart();

  const nextOptions = (grid: Input, { x, y }: Point): Point[] => {
    const options: Point[] = [];
    // to west
    if (x - 1 >= 0) {
      const c = grid[y][x - 1];
      if (['-', 'L', 'F'].includes(c)) {
        options.push({ x: x - 1, y });
      }
    }

    // to north
    if (y - 1 >= 0) {
      const c = grid[y - 1][x];
      if (['|', '7', 'F'].includes(c)) {
        options.push({ x, y: y - 1 });
      }
    }

    // to east
    if (x + 1 < grid[y].length) {
      const c = grid[y][x + 1];
      if (['-', 'J', '7'].includes(c)) {
        options.push({ x: x + 1, y });
      }
    }

    // to south
    if (y + 1 < grid[y].length) {
      const c = grid[y + 1][x];
      if (['|', 'L', 'J'].includes(c)) {
        options.push({ x, y: y + 1 });
      }
    }

    return options;
  };

  const paths = nextOptions(grid, startPoint)
    .map((p) => {
      const path = findPath(grid, p, startPoint);
      return path;
    })
    .filter((path) => path !== null);
  return paths[0]!;
};
const findPath = (grid: Input, p: Point, s: Point): Point[] | null => {
  const path = [s];

  const visited = new Set<string>();
  while (p) {
    visited.add(JSON.stringify(p));
    path.push(p);
    const c = grid[p.y][p.x];

    if (c === 'S') return path;
    if (isPipe(c)) {
      const directions = nextMap[c]!;
      const nextPoints = directions.map(({ x, y }) => {
        return { x: p.x + x, y: p.y + y };
      });

      const nextPoint = nextPoints.find((next) => {
        if (grid[next.y][next.x] === 'S' && path.length <= 3) return false;
        return !visited.has(JSON.stringify(next));
      });
      if (!nextPoint) {
        //path not closed;
        return null;
      }

      if (!nextPoint) break;
      p = nextPoint;
    } else {
      throw new Error(':|!');
    }
  }

  return null;
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n').map((line) => {
      return [...line] as Tile[];
    });
  }

  async partOne(): Promise<number> {
    const path = findPath1(this.input);

    return Math.floor(path.length / 2);
  }

  async partTwo(): Promise<number> {
    const grid = this.input;
    const path = findPath1(grid);

    const intersects = ({ x, y }: Point, p1: Point, p2: Point): boolean => {
      if (p1.y < y && p2.y < y) return false;
      if (p1.y > y && p2.y > y) return false;

      if (p1.x < x && p2.x < x) return false;

      return true;
    };

    const isInPolygon = (path: Point[], point: Point): boolean => {
      if (
        path.some(({ x, y }) => {
          return x === point.x && y === point.y;
        })
      ) {
        return false;
      }
      const crossCount = path.reduce((count, p1, index) => {
        const p2 = path[(index + 1) % path.length];

        if (intersects(point, p1, p2)) {
          return count + 1;
        }
        return count;
      }, 0);

      return crossCount % 2 === 1;
    };

    let count = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (isInPolygon(path, { x, y })) {
          count++;
        }
      }
    }
    return count;
  }
}

export default Day;
